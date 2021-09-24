import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { NavigationContainer } from '@react-navigation/native';
import { Icon } from "react-native-elements"


const Tab = createBottomTabNavigator();

tabBarIcon: ({ focused, color, size }) => {return <Icon name='g-translate' color='#00aced' />}

import Login from "../screens/Login"
import Home from "../screens/Home";
import CoursePresentation from "../screens/CoursePresentation";
import TestVideo from "../screens/TestVideo";
import Class from "../screens/Class";

export default function MyTabs() {
  return (
    <Tab.Navigator initialRouteName="Home" screenOptions={{  }}>
      <Tab.Screen name="Home" component={Home} options={{ headerShown: false, tabBarIcon: () => {return <Icon name='home' color='#00aced' />} }}/>
      <Tab.Screen name="Login" component={Login} />
      <Tab.Screen name="CoursePresentation" component={CoursePresentation} />
      <Tab.Screen name="TestVideo" component={TestVideo} />
      <Tab.Screen name="Class" component={Class} />
    </Tab.Navigator>
  );
}