import React from "react";

//import navigation
import { createStackNavigator } from "@react-navigation/stack";
import HomeTab from "./HomeTab";
import Details from '../screens/Details'
import colors from "../config/colors";

const Stack = createStackNavigator();

const HomeStack = () => (
  <Stack.Navigator>
    <Stack.Screen
      name="HomeTab"
      component={HomeTab}
      options={{ headerShown: false }}
    />
    <Stack.Screen
      name="Details"
      component={Details}
      options={{ headerShown: true}}
    />
  </Stack.Navigator>
);

export default HomeStack;
