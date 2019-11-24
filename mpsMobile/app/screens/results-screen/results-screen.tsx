import * as React from 'react';
import { observer } from 'mobx-react-lite';
import { ViewStyle } from 'react-native';
import { Screen, Text } from '../components';
// import { useStores } from "../models/root-store"
import { color } from '../../theme';
import { NavigationScreenProps } from 'react-navigation';

export interface ResultsScreenProps extends NavigationScreenProps<{}> {}

const ROOT: ViewStyle = {
  backgroundColor: color.background,
};

export const ResultsScreen: React.FunctionComponent<ResultsScreenProps> = observer(props => {
  // const { someStore } = useStores()
  return <Screen style={ROOT} preset="scroll">
    
  </Screen>;
});
