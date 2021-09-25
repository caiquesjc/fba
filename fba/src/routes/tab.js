import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { Icon } from "react-native-elements"


const Tab = createBottomTabNavigator();

import Home from "../screens/Home";
import Profile from "../screens/Profile"
export default function MyTabs() {
  return (
    <Tab.Navigator initialRouteName="Home" screenOptions={{ tabBarInactiveBackgroundColor: "#212121", tabBarActiveBackgroundColor: "#212121", tabBarActiveTintColor: "#fff" }}>
      <Tab.Screen name="Home" component={Home} options={{ headerShown: false, tabBarIcon: () => {return <Icon name='home' color='#aaa' />} }} />
      <Tab.Screen name="Profile" component={Profile} options={{title: "Perfil", headerShown: false, tabBarIcon: () => {return <Icon name='account-circle' type='material' color='#aaa'/>} }} />
    </Tab.Navigator>
  );
}

<Icon reverse name='ios-american-football' type='ionicon' color='#517fa4'/>