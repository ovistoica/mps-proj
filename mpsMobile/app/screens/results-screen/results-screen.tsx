import * as React from 'react';
import { observer } from 'mobx-react-lite';
import { ViewStyle, TextStyle } from 'react-native';
import { Text } from '../../components/text';
import { Screen } from '../../components/screen';
import { useStores } from '../../models/root-store';
import { color } from '../../theme';
import { NavigationScreenProps, FlatList } from 'react-navigation';
import { Button } from '../../components/button';
import { ResultCard } from '../../components/result-card';
import { Header } from '../../components/header';
import { getStatusBarHeight } from 'react-native-iphone-x-helper';
import { getSnapshot } from 'mobx-state-tree';
import { ContestantResultSnapshot } from '../../models/contestant-result';

export interface ResultsScreenProps extends NavigationScreenProps<{}> {}

const ROOT: ViewStyle = {
  backgroundColor: color.background,
};
const TITLE: TextStyle = {
  color: color.textInverted,
  fontSize: 20,
  fontWeight: 'bold',
};

const HEADER: ViewStyle = {
  backgroundColor: color.primary,
  paddingTop: getStatusBarHeight(),
};

export const ResultsScreen: React.FunctionComponent<ResultsScreenProps> = observer(props => {
  const { contestsStore, navigationStore } = useStores();
  const currentContest = contestsStore.currentContest;

  React.useEffect(() => {
    currentContest.results.getCurrentResults();
  });
  const round = contestsStore.currentContest.currentRound;

  const data: ContestantResultSnapshot[] = getSnapshot(currentContest.results.results);

  const renderItem = ({ item }: { item: ContestantResultSnapshot }) => <ResultCard result={item} />;

  return (
    <Screen style={ROOT} preset="scroll">
      <Header
        headerText={`Results for Round ${round.roundNumber}`}
        style={HEADER}
        titleStyle={TITLE}
      />
      <FlatList<ContestantResultSnapshot> data={data} renderItem={renderItem} />
      <Button
        text="Back to rounds"
        textStyle={{ color: color.textInverted, fontSize: 16 }}
        style={{ flex: 2, alignSelf: 'center' }}
        onPress={() =>
          navigationStore.navigateTo('contest', {
            contestId: contestsStore.currentContest.id,
          })
        }
      />
    </Screen>
  );
});
