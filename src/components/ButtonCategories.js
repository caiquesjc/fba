import React from "react";
import { Text, StyleSheet, TouchableOpacity } from "react-native";

export default function ButtonCategories({
  title,
  active,
  onPress,
}) {
  return (
    <TouchableOpacity
      style={[styles.container, active && styles.clicked]}
      onPress={onPress}
    >
      <Text style={[styles.text, , active && styles.clickedText]}>{title}</Text>
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
    color: "#000",
  },
  clicked: {
    backgroundColor: "#aaa",
  },
  clickedText: {
    color: "#000",
    fontWeight: "bold",
  },
});
