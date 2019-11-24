import * as React from 'react';
import { observer } from 'mobx-react-lite';
import { ViewStyle, View, FlatList } from 'react-native';
import { Screen } from '../../components/screen';
import { useStores, RootStore } from '../../models/root-store';
import { NavigationScreenProps } from 'react-navigation';
import { spacing, color } from '../../theme';
import { getSnapshot } from 'mobx-state-tree';
import { ContestCard } from '../../components/contest-card';
import { ContestSnapshot } from '../../models';
import { Text } from '../../components/text';
import { Button } from '../../components/button';

export interface ContestsOverviewScreenProps extends NavigationScreenProps<{}> {
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

export const ContestsOverviewScreen: React.FunctionComponent<
  ContestsOverviewScreenProps
> = observer(props => {
  const { user, contestsStore, navigationStore, logout } = useStores();

  const renderContest = ({ item }: { item: ContestSnapshot }) => (
    <ContestCard
      contest={item}
      onPress={() => props.navigation.push('contest', { contestId: item.id as any })}
    />
  );

  const sendToLogin = React.useCallback(() => navigationStore.navigateTo('auth'), []);
  React.useEffect(() => {
    if (user.status === 'offline' || user.status === 'error') {
      sendToLogin();
    }
    if (user.status === 'success') {
      contestsStore.fetchContests();
    }
  }, [user.status]);

  return (
    <View testID="ContestsScreen" style={FULL}>
      <Screen style={CONTAINER} preset="fixed" backgroundColor={color.background}>
        <View style={{ position: 'absolute', top: 5, right: 15 }}>
          <Text preset="default">
            Hello{' '}
            <Text style={{ color: color.primaryDarker, fontWeight: 'bold' }}>{user.name}</Text>
          </Text>
          <Button
            style={{ marginTop: 5, backgroundColor: color.top, width: 80, alignSelf: 'center' }}
            textStyle={{ color: color.text }}
            text="Sign Out"
            onPress={logout}
          />
        </View>
        <FlatList
          style={LIST}
          data={getSnapshot(contestsStore.contests)}
          renderItem={renderContest}
          keyExtractor={item => 'contest' + item.id}
        />
      </Screen>
    </View>
  );
});
