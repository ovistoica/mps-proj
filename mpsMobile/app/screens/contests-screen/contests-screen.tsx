import * as React from 'react';
import { observer } from 'mobx-react-lite';
import { ViewStyle, View, TextStyle, FlatList, TouchableOpacity } from 'react-native';
import { Text } from '../../components/text';
import { Screen } from '../../components/screen';
import { useStores, RootStore } from '../../models/root-store';
import { NavigationScreenProps } from 'react-navigation';
import { spacing, color, typography } from '../../theme';
import { getSnapshot } from 'mobx-state-tree';
import Icon from 'react-native-vector-icons/FontAwesome';

const trophyIcon = <Icon name="trophy" size={30} color={color.secondary} />;

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
const TEXT: TextStyle = {
  color: color.text,
  fontFamily: typography.primary,
};
const BOLD: TextStyle = { fontWeight: 'bold' };

const HEADER_TITLE: TextStyle = {
  ...TEXT,
  ...BOLD,
  fontSize: 16,
  lineHeight: 15,
  textAlign: 'center',
  letterSpacing: 1.5,
};
const CONTEST: ViewStyle = {
  height: 60,
  flexDirection: 'row',
  alignItems: 'center',
  justifyContent: 'space-between',
  backgroundColor: color.top,
  padding: 20,
  marginVertical: 10,
};
const CONTEST_NAME: TextStyle = {
  ...TEXT,
  ...BOLD,
};
const LIST: ViewStyle = {
  marginTop: 20,
  width: '100%',
};

const renderContest = ({ item }) => (
  <TouchableOpacity style={CONTEST}>
    <View>{trophyIcon}</View>

    <View style={{ marginLeft: 10, justifyContent: 'flex-start', flexDirection: 'row', width: 150 }}>
      <Text style={[CONTEST_NAME, { alignSelf: 'flex-start' }]}>{item.name} </Text>
    </View>

    <View>
      <Text style={CONTEST_NAME}>Type: {item.type} </Text>
      <Text style={CONTEST_NAME}>Round: {item.currentRound} </Text>
    </View>
  </TouchableOpacity>
);

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
