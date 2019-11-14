import * as React from 'react';
import { observer } from 'mobx-react-lite';
import { ViewStyle, View, FlatList } from 'react-native';
import { Screen } from '../../components/screen';
import { useStores, RootStore } from '../../models/root-store';
import { NavigationScreenProps } from 'react-navigation';
import { spacing, color } from '../../theme';
import { getSnapshot } from 'mobx-state-tree';
import { ContestCard } from '../../components/contest-card';

export interface ContestsScreenProps extends NavigationScreenProps<{}> {
  rootStore: RootStore;
}

const FULL: ViewStyle = { flex: 1 };
const CONTAINER: ViewStyle = {
  backgroundColor: color.background,
  flex: 1,
  paddingHorizontal: spacing[4],
  alignItems: 'center',
};

const LIST: ViewStyle = {
  marginTop: 20,
  width: '100%',
};

const renderContest = ({ item }) => <ContestCard contest={item} />;

export const ContestsScreen: React.FunctionComponent<ContestsScreenProps> = observer(props => {
  const { getContests, user, contests } = useStores();

  const sendToLogin = React.useMemo(() => () => props.navigation.navigate('auth'), [
    props.navigation,
  ]);

  React.useEffect(() => {
    if (user.status === 'offline' || user.status === 'error') {
      sendToLogin();
    }
    if (user.status === 'success') {
      getContests();
    }
  }, [user.status]);

  return (
    <View testID="ContestsScreen" style={FULL}>
      <Screen style={CONTAINER} preset="fixed" backgroundColor={color.background}>
        <FlatList
          style={LIST}
          data={getSnapshot(contests)}
          renderItem={renderContest}
          keyExtractor={item => 'contest' + item.id}
        />
      </Screen>
    </View>
  );
});
