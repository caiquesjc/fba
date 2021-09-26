import React from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";

export default function ButtonCategories({ title, active, onPress, navigation }) {
  return (
    <TouchableOpacity
      style={[styles.container, active && styles.clicked]}
    >
      <Text style={styles.text}>{title}</Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#aaa",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 10,
    margin: 15,
    height: 50,
  },
  text: {
    fontSize: 18,
    padding: 10,
  },
  clicked: {
    backgroundColor: "green",
  },
});

