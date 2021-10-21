import React from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Dimensions,
} from "react-native";

import { fbaColors } from "../assets/colors"
export default function ButtonCourse({
  navigation,
  courseInf,
}) {
  return (
    <View style={styles.container}>
      <TouchableOpacity
        onPress={() => navigation.navigate("CoursePresentation", { courseInf })}
      >
        <View
          style={{
            flexDirection: "row",
            justifyContent: "space-between",
            margin: 10,
          }}
        >
          <Text style={{ fontSize: 18, fontWeight: "bold", maxWidth: "50%"}} numberOfLines={1}>
            {courseInf.cou_name}
          </Text>
          <Text>Tempo do Curso: {courseInf.cou_duration}hr</Text>
        </View>
        <View
          style={{
            flexDirection: "row",
            justifyContent: "space-between",
            margin: 10,
          }}
        >
          <Text style={{maxWidth: "70%"}} numberOfLines={2}>{courseInf.cou_description}</Text>
          <Text style={{ fontWeight: "bold" }}>Básico</Text>
        </View>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    //alignItems: "center",
    justifyContent: "center",
    backgroundColor: fbaColors.DarkGray,
    width: Dimensions.get("window").width * 0.95,
    padding: 10,
    borderRadius: 10,
    margin: 10,
  },
});