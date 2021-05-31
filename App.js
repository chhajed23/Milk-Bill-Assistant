import * as React from "react";
import { StyleSheet, Text, View } from "react-native";

import { createAppContainer, createSwitchNavigator } from "react-navigation";
import { AppTabNavigator } from "./components/appTabNavigator";
import WelcomeScreen from "./screens/welcomeScreen";
import {AppDrawerNavigator} from './components/appDrawerNavigator'

export default function App() {
  return <AppContainer />;
}

const switchNavigator = createSwitchNavigator({
 WelcomeScreen:{screen:WelcomeScreen},
  Drawer:{screen:AppDrawerNavigator}
});

const AppContainer = createAppContainer(switchNavigator);


