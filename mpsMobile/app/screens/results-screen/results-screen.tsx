import * as React from 'react';
import { observer } from 'mobx-react-lite';
import { ViewStyle } from 'react-native';
import { Text } from '../../components/text';
import { Screen } from '../../components/screen';
import { useStores } from '../../models/root-store';
import { color } from '../../theme';
import { NavigationScreenProps } from 'react-navigation';
import { Button } from '../../components/button';

export interface ResultsScreenProps extends NavigationScreenProps<{}> {}

const ROOT: ViewStyle = {
  backgroundColor: color.background,
};

export const ResultsScreen: React.FunctionComponent<ResultsScreenProps> = observer(props => {
  const { contestsStore, navigationStore } = useStores();
  const round = contestsStore.currentContest.currentRound;
  return (
    <Screen style={ROOT} preset="scroll">
      <Text>HELLO {round.roundNumber}</Text>
      <Button
        text="Back to rounds"
        textStyle={{ color: color.textInverted }}
        onPress={() =>
          navigationStore.navigateTo('contest', {
            contestId: contestsStore.currentContest.id,
          })
        }
      />
    </Screen>
  );
});
