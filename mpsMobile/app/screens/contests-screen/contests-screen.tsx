import * as React from 'react';
import { observer } from 'mobx-react-lite';
import { ViewStyle } from 'react-native';
import { Text } from '../../components/text';
import { Screen } from '../../components/screen';
// import { useStores } from "../../models/root-store"
import { color } from '../../theme';
import { NavigationScreenProps } from 'react-navigation';
import { Button } from '../../components/button';
import SplashScreen from 'react-native-splash-screen';

export interface ContestsScreenProps extends NavigationScreenProps<{}> {}

const ROOT: ViewStyle = {
  backgroundColor: color.background,
};

export const ContestsScreen: React.FunctionComponent<ContestsScreenProps> = observer(props => {
  // const { someStore } = useStores()
  React.useEffect(() => {
    SplashScreen.hide();
  }, []);
  return (
    <Screen style={ROOT} preset="scroll">
      <Text preset="header">Your Contests</Text>
      <Button
        text="ZII MA"
        onPress={() => {
          props.navigation.navigate('auth');
        }}
      />
    </Screen>
  );
});
