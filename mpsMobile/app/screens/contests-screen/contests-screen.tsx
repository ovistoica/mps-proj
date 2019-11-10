import * as React from 'react';
import { observer } from 'mobx-react-lite';
import { ViewStyle, View, TextStyle, FlatList, TouchableOpacity } from 'react-native';
import { Text } from '../../components/text';
import { Screen } from '../../components/screen';
import { useStores } from '../../models/root-store';
import { NavigationScreenProps } from 'react-navigation';
import { spacing, color } from '../../theme';

export interface ContestsScreenProps extends NavigationScreenProps<{}> {}

const FULL: ViewStyle = { flex: 1 };
const CONTAINER: ViewStyle = {
  flex: 1,
  backgroundColor: color.transparent,
  paddingHorizontal: spacing[4],
  alignItems: 'center',
};
const TEXT: TextStyle = {
  color: color.text,
  fontFamily: 'Montserrat',
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
  // width: '100%',
  height: 60,
  flexDirection: 'column',
  alignItems: 'center',
  justifyContent: 'center',
  backgroundColor: color.primaryDarker,
  padding: 20,
  marginVertical: 10,
  borderRadius: 8,
};
const ROUND: TextStyle = {
  ...TEXT,
  ...BOLD,
  color: color.primary,
};
const LIST: ViewStyle = {
  marginTop: 20,
  width: '100%',
};

const renderContest = ({ item }) => (
  <TouchableOpacity onPress={() => console.log('PRESSS')} style={CONTEST}>
    <Text style={TEXT}>{item.name} </Text>
    <Text style={TEXT}>
      Current Round: <Text style={ROUND}>{item.currentRound}</Text>
    </Text>
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
          data={contests}
          renderItem={renderContest}
          keyExtractor={item => 'contest' + item.id}
        />
      </Screen>
    </View>
  );
});
