import { createStackNavigator } from 'react-navigation';
import { AuthScreen } from '../screens/auth-screen';
import { ContestsOverviewScreen } from '../screens/contests-overview-screen';
import { ContestScreen } from '../screens/contest-screen';
import { color } from '../theme/color';

export const PrimaryNavigator = createStackNavigator(
  {
    auth: {
      screen: AuthScreen,
      navigationOptions: {
        header: null,
      },
    },
    contests: {
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
  },
  {
    headerMode: 'screen',
    initialRouteName: 'contests',
    defaultNavigationOptions: {
      headerStyle: {
        backgroundColor: color.primary,
      },
      headerTintColor: color.textReversed,
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
export const exitRoutes: string[] = ['auth'];
