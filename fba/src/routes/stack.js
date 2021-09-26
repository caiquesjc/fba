import React, { useContext } from "react";
import { createStackNavigator } from "@react-navigation/stack";
import { NavigationContainer } from '@react-navigation/native';
import {useAuth} from "../contexts/auth";

import MyTabs from "./tab";

import VideoCustom from "../components/Video"
import CoursePresentation from "../screens/CoursePresentation";
import Class from "../screens/Class";
import Login from "../screens/Login"



const Stack = createStackNavigator();

export default function StackCustom(props) {
  const [state] = useAuth()

  if (!state || !state.success)
  return (
      <Stack.Navigator>
        <Stack.Screen name="Login" component={Login} options={{headerShown: false}}/>
      </Stack.Navigator>
  )
  return (
    <Stack.Navigator initialRouteName="Home">
      <Stack.Screen name="Tab" component={MyTabs} options={{headerShown: false}} />

      <Stack.Group screenOptions={{ presentation: "modal" }}>
        <Stack.Screen
          options={{ headerShown: false }}
          name="Video"
          component={VideoCustom}
        />

        <Stack.Screen
          options={{ headerShown: false }}
          name="CoursePresentation"
          component={CoursePresentation}
        />

      <Stack.Screen
          options={{ headerShown: false }}
          name="Class"
          component={Class}
        />
          
      </Stack.Group>
    </Stack.Navigator>
  )
}