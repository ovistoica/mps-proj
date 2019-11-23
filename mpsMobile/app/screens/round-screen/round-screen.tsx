import * as React from 'react';
import { observer } from 'mobx-react-lite';
import {
  ViewStyle,
  TextStyle,
  SectionBase,
  View,
  SectionListData,
  ActivityIndicator,
} from 'react-native';
import { Text } from '../../components/text';
import { Screen } from '../../components/screen';
import { useStores } from '../../models/root-store';
import { color, spacing } from '../../theme';
import { NavigationScreenProps, SectionList } from 'react-navigation';
import { Header } from '../../components/header';
import { getSnapshot } from 'mobx-state-tree';
import { ParticipantSnapshot } from '../../models';

import { ParticipantCard } from '../../components/participant-card';
import { TimeStatus, getTimeStatus } from '../../utils/contest.utils';
import { SectionTitle } from '../../components/section-title';

export interface ContestScreenProps extends NavigationScreenProps<{}> {}

const ROOT: ViewStyle = {
  backgroundColor: color.background,
};

const HEADER: ViewStyle = {
  backgroundColor: color.primary,
};

const TITLE: TextStyle = {
  color: color.textInverted,
  fontSize: 20,
  fontWeight: 'bold',
};

export const RoundScreen: React.FunctionComponent<ContestScreenProps> = observer(props => {
  const { contestsStore } = useStores();
  const roundId = props.navigation.getParam('roundId' as never);
  const contestId = props.navigation.getParam('contestId' as never);

  const round = contestsStore.getContest(contestId).getRound(roundId);

  React.useEffect(() => {
    if (round !== undefined) {
      round.fetchSeries();
    }
  }, []);

  if (round === undefined) {
    return (
      <Screen style={ROOT} preset="fixed">
        <Header
          style={HEADER}
          leftIcon="back"
          onLeftPress={() => props.navigation.pop()}
          headerText={`Round`}
          titleStyle={TITLE}
        />
        <Text preset="header">Something went wrong. Please restart the app</Text>
      </Screen>
    );
  }
  const roundSnapshot = getSnapshot(round);

  const onPress = (seriesId: number, participantId: number) => {
    props.navigation.push('vote', { contestId, roundId, seriesId, participantId });
  };

  const sections: SectionListData<ParticipantSnapshot>[] = roundSnapshot.series.map(seriesItem => {
    const seriesStatus: TimeStatus = getTimeStatus(seriesItem);
    return {
      seriesStatus,
      seriesItem,
      data: seriesItem.participants as ParticipantSnapshot[],
      title: `Series no. ${seriesItem.seriesNumber}`,
      renderItem: ({ item }: { item: ParticipantSnapshot }) => {
        return (
          <ParticipantCard
            participant={item}
            seriesStatus={seriesStatus}
            onPress={() => onPress(seriesItem.id, item.id)}
          />
        );
      },
    };
  });

  const renderSectionList = () => {
    if (getSnapshot(round).status !== 'success') {
      return (
        <ActivityIndicator size="large" color={color.secondary} style={{ marginTop: spacing[6] }} />
      );
    }
    return (
      <SectionList
        sections={sections}
        keyExtractor={(item, index) => item.firstName + index + item.id}
        renderSectionHeader={({ section: { title, seriesStatus, seriesItem } }) => (
          <SectionTitle sectionStatus={seriesStatus} series={seriesItem} />
        )}
      />
    );
  };

  return (
    <Screen style={ROOT} preset="fixed">
      <Header
        style={HEADER}
        leftIcon="back"
        onLeftPress={() => props.navigation.pop()}
        headerText={`Round ${round.roundNumber}`}
        titleStyle={TITLE}
      />
      {renderSectionList()}
    </Screen>
  );
});
