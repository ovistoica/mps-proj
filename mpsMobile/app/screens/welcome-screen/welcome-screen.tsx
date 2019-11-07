import React, { useEffect, useState } from "react"
import { View, ViewStyle, TextStyle, SafeAreaView } from "react-native"
import { NavigationScreenProps } from "react-navigation"
import { Text } from "../../components/text"
import { Button } from "../../components/button"
import { Screen } from "../../components/screen"
import { FormRow } from "../../components/form-row"
import { Wallpaper } from "../../components/wallpaper"
import { Header } from "../../components/header"
import { color, spacing } from "../../theme"
import { TextInput } from "react-native-gesture-handler"
import { Api, User, GetUsersResult } from "../../services/api"

const FULL: ViewStyle = { flex: 1 }
const CONTAINER: ViewStyle = {
  flex: 0.8,
  backgroundColor: color.transparent,
  paddingHorizontal: spacing[4],
  justifyContent: "center",
  alignItems: "center",
}
const TEXT: TextStyle = {
  color: color.palette.white,
  fontFamily: "Montserrat",
}
const BOLD: TextStyle = { fontWeight: "bold" }

const HEADER_TITLE: TextStyle = {
  ...TEXT,
  ...BOLD,
  fontSize: 16,
  lineHeight: 15,
  textAlign: "center",
  letterSpacing: 1.5,
}

const CONTENT: TextStyle = {
  ...TEXT,
  color: "#BAB6C8",
  fontSize: 15,
  lineHeight: 22,
  marginBottom: spacing[5],
}

const CONTINUE: ViewStyle = {
  paddingVertical: spacing[4],
  paddingHorizontal: spacing[4],
  backgroundColor: "#5D2555",
}
const CONTINUE_TEXT: TextStyle = {
  ...TEXT,
  ...BOLD,
  fontSize: 13,
  letterSpacing: 2,
}
const FOOTER: ViewStyle = { backgroundColor: "#20162D", flex: 0.2 }
const FOOTER_CONTENT: ViewStyle = {
  paddingVertical: spacing[4],
  paddingHorizontal: spacing[4],
}
const FOOTER_TEXT: TextStyle = {
  ...CONTENT,
  fontSize: 11,
  marginTop: 25,
  textAlign: "left",
  paddingLeft: 0,
  alignSelf: "flex-start",
}

const SUPPORT_EMAIL: TextStyle = {
  ...FOOTER_TEXT,
  textDecorationLine: "underline",
}

const FORM_INPUT: ViewStyle = {
  height: 50,
  flexDirection: "row",
  alignItems: "center",
  marginTop: 20,
}

const TEXT_INPUT: TextStyle = {
  flex: 0.8,
  color: "white",
}

export interface WelcomeScreenProps extends NavigationScreenProps<{}> {}
export interface UserCredentials {
  email: string
  password: string
}

export const WelcomeScreen: React.FunctionComponent<WelcomeScreenProps> = props => {
  const [userCredentials, setUserCredentials] = useState<UserCredentials>(undefined)
  const api = new Api()
  const nextScreen = React.useMemo(() => () => props.navigation.navigate("demo"), [
    props.navigation,
  ])

  const onChangeEmail = (email: string): void => {
    const newUserCredentials: UserCredentials = {
      email: email,
      password: userCredentials.password || "",
    }
    setUserCredentials(newUserCredentials)
  }

  const onPasswordChange = (password: string): void => {
    const newUserCredentials: UserCredentials = {
      email: userCredentials.email || "",
      password: password || "",
    }
    setUserCredentials(newUserCredentials)
  }

  const fetch = async () => {
    const users: GetUsersResult = await api.getUsers()
    console.log(users)
  }

  useEffect(() => {
    api.setup()
    fetch()
  }, [])

  return (
    <View testID="WelcomeScreen" style={FULL}>
      <Wallpaper />
      <Screen style={CONTAINER} preset="scroll" backgroundColor={color.transparent}>
        <Header headerText={"Login to start voting"} titleStyle={HEADER_TITLE} />
        <FormRow preset={"soloRound"} style={FORM_INPUT}>
          <Text preset={"fieldLabel"} style={{ flex: 0.2 }}>
            E-mail
          </Text>
          <TextInput
            style={TEXT_INPUT}
            textContentType="emailAddress"
            onChangeText={onChangeEmail}
          ></TextInput>
        </FormRow>
        <FormRow preset={"soloRound"} style={FORM_INPUT}>
          <Text preset={"fieldLabel"} style={{ flex: 0.2 }}>
            Password
          </Text>
          <TextInput
            style={TEXT_INPUT}
            textContentType="password"
            onChangeText={onPasswordChange}
          ></TextInput>
        </FormRow>
        <Text preset="secondary" style={FOOTER_TEXT}>
          If you don't have an account, contact administration at{" "}
          <Text style={SUPPORT_EMAIL}>admin@voteMps.com</Text> to register as a jury member
        </Text>
      </Screen>
      <SafeAreaView style={FOOTER}>
        <View style={FOOTER_CONTENT}>
          <Button
            testID="next-screen-button"
            style={CONTINUE}
            textStyle={CONTINUE_TEXT}
            text="Login"
            onPress={nextScreen}
          />
        </View>
      </SafeAreaView>
    </View>
  )
}
