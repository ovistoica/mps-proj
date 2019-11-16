import * as React from 'react';
import { observer } from 'mobx-react-lite';
import { ViewStyle, TextStyle } from 'react-native';
import { Text } from '../../components/text';
import { Screen } from '../../components/screen';
import { useStores } from '../../models/root-store';
import { color } from '../../theme';
import { NavigationScreenProps } from 'react-navigation';
import { Header } from '../../components/header';
import { FlatList } from 'react-native-gesture-handler';
import { getSnapshot } from 'mobx-state-tree';
import { RoundSnapshot } from '../../models';
import { RoundCard } from '../../components/round-card';

export interface ContestScreenProps extends NavigationScreenProps<{}> {
  contestId: string;
}

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

export const ContestScreen: React.FunctionComponent<ContestScreenProps> = observer(props => {
  const { contestsStore, user } = useStores();

  const id = props.navigation.getParam('contestId' as never);
  const contest = contestsStore.getContest(id);

  React.useEffect(() => {
    contest.fetchRounds(user.token);
  }, []);

  const renderRound = ({ item }: { item: RoundSnapshot }) => <RoundCard round={item} />;

  return (
    <Screen style={ROOT} preset="fixed">
      <Header
        style={HEADER}
        leftIcon="back"
        onLeftPress={() => props.navigation.pop()}
        headerText={contest.name}
        titleStyle={TITLE}
      />
      <FlatList<RoundSnapshot>
        data={contest.orderedRounds}
        renderItem={renderRound}
        keyExtractor={it => `round ${it.id}`}
      />
    </Screen>
  );
});
