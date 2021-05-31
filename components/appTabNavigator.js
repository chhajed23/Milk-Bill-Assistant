import * as React from "react";
import { Image } from "react-native";
import { createBottomTabNavigator } from "react-navigation-tabs";
import CalenderSample from "../screens/calenderPicker";
import FillMilk from '../screens/fillDailyMilk'



export const AppTabNavigator = createBottomTabNavigator({
  Calender: {
    screen: CalenderSample,
    navigationOptions: {
      tabBarIcon: (
        <Image
          source={require("../assets/calender.png")}
          style={{ width: 20, height: 20 }}
        />
      ),
      tabBarLabel: "Calender",
    },
  },
  FillDailyMilk: {
    screen: FillMilk,
    navigationOptions: {
      tabBarIcon: (
        <Image
          source={require("../assets/fillDailyMilk.png")}
          style={{ width: 20, height: 20 }}
        />
      ),
      tabBarLabel: "Fill Daily Milk",
    },
  },
});
