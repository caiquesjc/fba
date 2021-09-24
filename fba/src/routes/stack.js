import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import { NavigationContainer } from '@react-navigation/native';


import Home from "../screens/Home";
import Login from "../screens/Login";
import MyTabs from "./tab";

import VideoCustom from "../components/Video"


const Stack = createStackNavigator();

export default function StackCustom(props) {
  return (
    <NavigationContainer>
    <Stack.Navigator initialRouteName="Home">
      <Stack.Screen name="Tab" component={MyTabs} options={{headerShown: false}} />

      <Stack.Group screenOptions={{ presentation: "modal" }}>
        <Stack.Screen
          options={{ headerShown: false }}
          name="Video"
          component={VideoCustom}
        />
          
      </Stack.Group>
    </Stack.Navigator>
    </NavigationContainer>
  )
}