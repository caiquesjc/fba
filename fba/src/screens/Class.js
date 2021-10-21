import React from "react";
import { View, Text, StyleSheet, Dimensions, ScrollView } from "react-native";

import Video from "../components/Video";

export default function Class({ route, navigation }) {
  const { classInf } = route.params;
  return (
    <View style={styles.container}>
      <View style={styles.video}>
        <Video videoId={classInf.cla_video}/>
      </View>

      <ScrollView style={{ backgroundColor: "#212121", width: "90%" }}>
        <Text style={{ fontSize: 24, padding: 10, color: "#aaa" }}>
          {classInf.cla_name}
        </Text>
        <View style={{ height: "auto", backgroundColor: "#212121" }}>
          <Text
            style={{
              textAlign: "justify",
              fontSize: 16,
              padding: 5,
              marginBottom: 10,
              color: "#aaa",
            }}
          >
            {classInf.cla_description}
          </Text>
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "space-between",
    alignItems: "center",
    backgroundColor: "#212121",
  },
  video: {
    width: Dimensions.get("window").width,
    height: 250,
    margin: 10,
  },
  backgroundVideo: {
    height: "auto",
  },
});
