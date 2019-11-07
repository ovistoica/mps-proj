import { createStackNavigator } from 'react-navigation';
import { AuthScreen } from '../screens/auth-screen';

export const PrimaryNavigator = createStackNavigator(
  {
    auth: { screen: AuthScreen },
  },
  {
    headerMode: 'none',
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
