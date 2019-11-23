import React, { useState, useEffect } from 'react';
import { View, ViewStyle, TextStyle, SafeAreaView, ActivityIndicator } from 'react-native';
import { NavigationScreenProps } from 'react-navigation';
import { Text } from '../../components/text';
import { Button } from '../../components/button';
import { Screen } from '../../components/screen';
import { FormRow } from '../../components/form-row';
import { Header } from '../../components/header';
import { color, spacing } from '../../theme';
import { TextInput } from 'react-native-gesture-handler';
import { UserCredentials } from './auth.types';
import { RootStore, useStores } from '../../models/root-store';
import { observer } from 'mobx-react';

const FULL: ViewStyle = { flex: 1 };
const CONTAINER: ViewStyle = {
  flex: 1,
  backgroundColor: color.transparent,
  paddingHorizontal: spacing[4],
  justifyContent: 'center',
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

const CONTENT: TextStyle = {
  ...TEXT,
  color: color.text,
  fontSize: 15,
  lineHeight: 22,
  marginBottom: spacing[5],
};

const CONTINUE: ViewStyle = {
  paddingVertical: spacing[4],
  paddingHorizontal: spacing[4],
  backgroundColor: color.primary,
};
const CONTINUE_TEXT: TextStyle = {
  ...TEXT,
  ...BOLD,
  fontSize: 13,
  letterSpacing: 2,
  color: color.textInverted,
};
const FOOTER: ViewStyle = { backgroundColor: color.background, flex: 0.2 };
const FOOTER_CONTENT: ViewStyle = {
  backgroundColor: color.background,
  paddingVertical: spacing[4],
  paddingHorizontal: spacing[4],
};

const FORM_INPUT: ViewStyle = {
  height: 60,
  flexDirection: 'row',
  alignItems: 'center',
  marginTop: 20,
  backgroundColor: color.top,
};

const TEXT_INPUT: TextStyle = {
  flex: 1,
  color: color.text,
};

const ERROR_MSG: ViewStyle = {
  ...FORM_INPUT,
  borderColor: color.palette.angry,
  position: 'absolute',
  bottom: 0,
};

// const ERROR_TEXT: TextStyle = {
//   ...
// }

export interface AuthScreenProps extends NavigationScreenProps<{}> {
  rootStore: RootStore;
}

const AuthScreenComponent: React.FunctionComponent<AuthScreenProps> = props => {
  const { user, login, navigationStore } = useStores();

  const [userCredentials, setUserCredentials] = useState<UserCredentials>({
    username: '',
    password: '',
  });
  const [loading, setLoading] = useState<boolean>(true);
  const { status } = user;
  // const nextScreen = React.useMemo(() => () => props.navigation.navigate('overview'), [
  //   props.navigation,
  // ]);
  const nextScreen = () => navigationStore.navigateTo('overview');

  useEffect(() => {
    if (status === 'success') {
      nextScreen();
    }
    setLoading(false);
  }, [status]);

  const onLoginPress = () => {
    login(userCredentials);
  };

  const onChangeUsername = (username: string): void => {
    const newUserCredentials: UserCredentials = {
      username: username,
      password: userCredentials.password || '',
    };
    setUserCredentials(newUserCredentials);
  };

  const onPasswordChange = (password: string): void => {
    const newUserCredentials: UserCredentials = {
      username: userCredentials.username || '',
      password: password || '',
    };
    setUserCredentials(newUserCredentials);
  };

  return loading ? (
    <ActivityIndicator size="large" color={color.primary} />
  ) : (
    <View testID="WelcomeScreen" style={FULL}>
      <Screen style={CONTAINER} preset="scroll" backgroundColor={color.background}>
        <Header headerText={'Login to start voting'} titleStyle={HEADER_TITLE} />

        <FormRow preset={'soloRound'} style={FORM_INPUT}>
          <TextInput
            placeholder="Username"
            placeholderTextColor={color.textMuted}
            style={TEXT_INPUT}
            textContentType="nickname"
            onChangeText={onChangeUsername}
            value={userCredentials.username}
            autoCapitalize="none"
          ></TextInput>
        </FormRow>
        <FormRow preset={'soloRound'} style={FORM_INPUT}>
          <TextInput
            placeholder="password"
            style={TEXT_INPUT}
            placeholderTextColor={color.textMuted}
            textContentType="password"
            value={userCredentials.password}
            onChangeText={onPasswordChange}
            autoCapitalize="none"
            secureTextEntry={true}
          ></TextInput>
        </FormRow>
        {status === 'error' && (
          <FormRow preset={'top'} style={ERROR_MSG}>
            <Text>Something went wrong. Please try again</Text>
          </FormRow>
        )}
      </Screen>
      <SafeAreaView style={FOOTER}>
        <View style={FOOTER_CONTENT}>
          <Button
            testID="next-screen-button"
            style={CONTINUE}
            textStyle={CONTINUE_TEXT}
            text="Login"
            onPress={onLoginPress}
          />
        </View>
      </SafeAreaView>
    </View>
  );
};

export const AuthScreen = observer(AuthScreenComponent);
