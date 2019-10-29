import * as React from 'react';
import { View, ViewStyle, TextStyle, ImageStyle } from 'react-native';
import { NavigationScreenProps } from 'react-navigation';
import { Text } from '../../components/text';
import { Screen } from '../../components/screen';
import { Wallpaper } from '../../components/wallpaper';
import { Header } from '../../components/header';
import { color, spacing } from '../../theme';
import { FormRow } from '../../components/form-row';
const FULL: ViewStyle = { flex: 1 };
const CONTAINER: ViewStyle = {
  backgroundColor: color.transparent,
  paddingHorizontal: spacing[4],
};
const TEXT: TextStyle = {
  color: color.palette.white,
  fontFamily: 'Montserrat',
};
const BOLD: TextStyle = { fontWeight: 'bold' };
const HEADER: TextStyle = {
  paddingTop: spacing[3],
  paddingBottom: spacing[4] + spacing[1],
  paddingHorizontal: 0,
};
const HEADER_TITLE: TextStyle = {
  ...TEXT,
  ...BOLD,
  fontSize: 12,
  lineHeight: 15,
  textAlign: 'center',
  letterSpacing: 1.5,
};
const TITLE_WRAPPER: TextStyle = {
  ...TEXT,
  textAlign: 'center',
};
const TITLE: TextStyle = {
  ...TEXT,
  ...BOLD,
  fontSize: 28,
  lineHeight: 38,
  textAlign: 'center',
};
const ALMOST: TextStyle = {
  ...TEXT,
  ...BOLD,
  fontSize: 26,
  fontStyle: 'italic',
};
const BOWSER: ImageStyle = {
  alignSelf: 'center',
  marginVertical: spacing[5],
  maxWidth: '100%',
};
const CONTENT: TextStyle = {
  ...TEXT,
  color: '#BAB6C8',
  fontSize: 15,
  lineHeight: 22,
  marginBottom: spacing[5],
};
const CONTINUE: ViewStyle = {
  paddingVertical: spacing[4],
  paddingHorizontal: spacing[4],
  backgroundColor: '#5D2555',
};
const CONTINUE_TEXT: TextStyle = {
  ...TEXT,
  ...BOLD,
  fontSize: 13,
  letterSpacing: 2,
};
const FOOTER: ViewStyle = { backgroundColor: '#20162D' };
const FOOTER_CONTENT: ViewStyle = {
  paddingVertical: spacing[4],
  paddingHorizontal: spacing[4],
};

export interface WelcomeScreenProps extends NavigationScreenProps<{}> {}

export const WelcomeScreen: React.FunctionComponent<
  WelcomeScreenProps
> = props => {
  // const nextScreen = React.useMemo(() => () => props.navigation.navigate("demo"), [
  //   props.navigation,
  // ])

  return (
    <View testID="WelcomeScreen" style={FULL}>
      <Wallpaper />
      <Screen
        style={CONTAINER}
        preset="scroll"
        backgroundColor={color.transparent}
      >
        <Header style={HEADER} titleStyle={HEADER_TITLE} />
        <Text style={TITLE_WRAPPER} preset="header" text={'MPS PROJ'} />
        <FormRow preset="top">
          <Text>Test</Text>
        </FormRow>
      </Screen>
      {/* <SafeAreaView style={FOOTER}>
       
      </SafeAreaView> */}
    </View>
  );
};
