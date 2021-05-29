import React from "react";

//import navigation
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";

//import screens
import Home from "../screens/Home";
import Ajout from "../screens/AddHouse";

//import styles and assets
import { FontAwesome5  } from "@expo/vector-icons";

const Tab = createBottomTabNavigator();

const HomeTab = () => (
  <Tab.Navigator>
    <Tab.Screen
      name="Home"
      component={Home}
      options={{
        tabBarIcon: ({ color, size }) => (
          <FontAwesome5 name="home" color={color} size={size} />
        ),
      }}
    />
    <Tab.Screen
      name="Ajout"
      component={Ajout}
      options={{
        tabBarIcon: ({ color, size }) => (
          <FontAwesome5 name="plus" color={color} size={size} />
        ),
      }}
    />
  </Tab.Navigator>
);

export default HomeTab;
