import { createStackNavigator } from 'react-navigation';
import { AuthScreen } from '../screens/auth-screen';
import { ContestsOverviewScreen } from '../screens/contests-overview-screen';
import { ContestScreen } from '../screens/contest-screen';
import { RoundScreen } from '../screens/round-screen';
import { color } from '../theme/color';
import { VotingScreen } from '../screens/voting-screen';
import { ResultsScreen } from '../screens/results-screen';

export const PrimaryNavigator = createStackNavigator(
  {
    auth: {
      screen: AuthScreen,
      navigationOptions: {
        header: null,
      },
    },
    overview: {
      screen: ContestsOverviewScreen,
      navigationOptions: {
        title: 'Your Contests',
      },
    },
    contest: {
      screen: ContestScreen,
      navigationOptions: {
        header: null,
      },
    },
    round: {
      screen: RoundScreen,
      navigationOptions: {
        header: null,
      },
    },
    vote: {
      screen: VotingScreen,
      navigationOptions: {
        header: null,
      },
    },
    results: {
      screen: ResultsScreen,
      navigationOptions: {
        header: null,
      },
    },
  },
  {
    headerMode: 'screen',
    initialRouteName: 'overview',
    defaultNavigationOptions: {
      headerStyle: {
        backgroundColor: color.primary,
      },
      headerTintColor: color.textInverted,
      headerTitleStyle: {
        fontWeight: 'bold',
        textAlign: 'center',
      },
    },
  },
);

/**
 * A list of routes from which we're allowed to leave the app when
 * the user presses the back button on Android.
 *
 * Anything not on this list will be a standard `back` action in
 * react-navigation.
 */
export const exitRoutes: string[] = ['auth', 'overview'];
