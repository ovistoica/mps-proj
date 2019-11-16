import * as React from 'react';
import { observer } from 'mobx-react-lite';
import { ViewStyle, TextStyle } from 'react-native';
import { Text } from '../../components/text';
import { Screen } from '../../components/screen';
import { useStores } from '../../models/root-store';
import { color } from '../../theme';
import { NavigationScreenProps } from 'react-navigation';
import { Header } from '../../components/header';
import { ContestSnapshot } from '../../models';

export interface ContestScreenProps extends NavigationScreenProps<{}> {
  contestId: string;
}

const ROOT: ViewStyle = {
  backgroundColor: color.palette.black,
};

const HEADER: ViewStyle = {
  backgroundColor: color.primary,
};

const TITLE: TextStyle = {
  color: color.textReversed,
  fontSize: 20,
  fontWeight: 'bold',
};

export const ContestScreen: React.FunctionComponent<ContestScreenProps> = observer(props => {
  const { contestsStore, user } = useStores();

  const id = props.navigation.getParam('contestId', 'NO_ID');
  const contest = contestsStore.getContest(id);

  React.useEffect(() => {
    contest.fetchRounds(user.token);
  }, []);

  return (
    <Screen style={ROOT} preset="scroll">
      <Header
        style={HEADER}
        leftIcon="back"
        onLeftPress={() => props.navigation.pop()}
        headerText={contest.name}
        titleStyle={TITLE}
      />
      {/* <Text preset="header" style={{ color: 'white' }}>
        {contest.name}
      </Text> */}
    </Screen>
  );
});

// ContestScreen.prop.navigationOptions = ({navigation}) => {
//   return {
//     title: navigation.state.params.title,
//     headerLeft: (
//       <Icon
//         name="chevron-left"
//         size={40}
//         color="#ffffff"
//         onPress={() => navigation.goBack()}
//       />
//     ),
//   };
// };
