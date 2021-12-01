import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import { useAuth } from "../contexts/auth";

import MyTabs from "./tab";

import CoursePresentation from "../screens/CoursePresentation";
import Class from "../screens/Class";
import Login from "../screens/Login";
import VideoPage from "../screens/VideoPage";
import MyCourses from "../screens/MyCourses";
import Profile from "../screens/Profile";

const Stack = createStackNavigator();

export default function StackCustom() {
  const [state] = useAuth();

  if (!state || !state.success)
    return (
      <Stack.Navigator>
        <Stack.Screen
          name="Login1"
          component={Login}
          options={{ headerShown: false }}
        />
      </Stack.Navigator>
    );
  return (
    <Stack.Navigator initialRouteName="Home">
      <Stack.Screen
        name="Tab"
        component={MyTabs}
        options={{ headerShown: false }}
      />

      <Stack.Group screenOptions={{ presentation: "modal" }}>
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

        <Stack.Screen
          options={{ headerShown: false }}
          name="VideoPage"
          component={VideoPage}
        />
        <Stack.Screen
          options={{ headerShown: false }}
          name="MyCourses"
          component={MyCourses}
        />
        <Stack.Screen
          options={{ headerShown: false }}
          name="Profile"
          component={Profile}
        />
      </Stack.Group>
    </Stack.Navigator>
  );
}
