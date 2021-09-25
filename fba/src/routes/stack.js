import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import { NavigationContainer } from '@react-navigation/native';



import MyTabs from "./tab";

import VideoCustom from "../components/Video"
import CoursePresentation from "../screens/CoursePresentation";
import Class from "../screens/Class";


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
    </NavigationContainer>
  )
}