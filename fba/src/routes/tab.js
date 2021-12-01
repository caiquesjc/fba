import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { Icon } from "react-native-elements";

import { fbaColors } from "../assets/colors";

const Tab = createBottomTabNavigator();

import Home from "../screens/Home";
import MyArea from "../screens/MyArea";

export default function MyTabs() {
  return (
    <Tab.Navigator
      initialRouteName="Home"
      screenOptions={{
        tabBarInactiveBackgroundColor: fbaColors.Nero,
        tabBarActiveBackgroundColor: fbaColors.Nero,
        tabBarActiveTintColor: fbaColors.Withe,
        tabBarLabelStyle: { fontSize: 15 },
      }}
    >
      <Tab.Screen
        name="Home"
        component={Home}
        options={{
          headerShown: false,
          tabBarIcon: () => {
            return <Icon name="home" color={fbaColors.DarkGray} />;
          },
        }}
      />
      <Tab.Screen
        name="MyArea"
        component={MyArea}
        options={{
          title: "Minha Area",
          headerShown: false,
          tabBarIcon: () => {
            return (
              <Icon
                name="account-circle"
                type="material"
                color={fbaColors.DarkGray}
              />
            );
          },
        }}
      />
    </Tab.Navigator>
  );
}
