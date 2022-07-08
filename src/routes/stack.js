import React, { useEffect } from "react";
import { createStackNavigator } from "@react-navigation/stack";
import { useAuth } from "../contexts/auth";

import * as SecureStore from "expo-secure-store";

import api from "../services/api";

import MyTabs from "./tab";

import CoursePresentation from "../screens/CoursePresentation";
import Class from "../screens/Class";
import Login from "../screens/Login";
import VideoPage from "../screens/VideoPage";
import MyCourses from "../screens/MyCourses";
import Profile from "../screens/Profile";
import AdminCourses from "../screens/AdminCourses";
import NewCourse from "../screens/NewCourse";
import CourseAdmin from "../screens/CourseAdmin";
import EditCourse from "../screens/EditCourse";
import NewClass from "../screens/NewClass";
import Users from "../screens/Users";
import User from "../screens/User";

const Stack = createStackNavigator();

export default function StackCustom() {
  const [state, setState] = useAuth();

  async function deleteLogin(key) {
    await SecureStore.deleteItemAsync(key);
  }

  function logOff() {
    setState(false);
    deleteLogin("fbaLogin");
  }

  function verifyLogged() {
    api.get("/auth").then((res) => {
      if (!res.data.success) {
        logOff();
      }
    });
  }

  useEffect(() => {
    verifyLogged();
  }, []);
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
  else if ((state || state.success) && !state.user.use_is_admin)
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
        <Stack.Screen
          options={{ headerShown: false }}
          name="AdminCourses"
          component={AdminCourses}
        />
        <Stack.Screen
          options={{ headerShown: false }}
          name="NewCourse"
          component={NewCourse}
        />
        <Stack.Screen
          options={{ headerShown: false }}
          name="CourseAdmin"
          component={CourseAdmin}
        />
        <Stack.Screen
          options={{ headerShown: false }}
          name="EditCourse"
          component={EditCourse}
        />
        <Stack.Screen
          options={{ headerShown: false }}
          name="NewClass"
          component={NewClass}
        />
        <Stack.Screen
          options={{ headerShown: false }}
          name="Users"
          component={Users}
        />
        <Stack.Screen
          options={{ headerShown: false }}
          name="User"
          component={User}
        />
      </Stack.Group>
    </Stack.Navigator>
  );
}
