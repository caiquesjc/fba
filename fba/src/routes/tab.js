import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { Icon } from "react-native-elements";
import { useAuth } from "../contexts/auth";

import { fbaColors } from "../assets/colors";

const Tab = createBottomTabNavigator();

import Home from "../screens/Home";
import MyArea from "../screens/MyArea";
import AdminArea from "../screens/AdminArea"

export default function MyTabs() {
  const [user] = useAuth();
  if (user.user.use_is_admin)
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
          name="AdminArea"
          component={AdminArea}
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
