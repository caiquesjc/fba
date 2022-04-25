import React from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Dimensions,
} from "react-native";

import { fbaColors } from "../assets/colors";
export default function ButtonUser({ navigation, userInf }) {
  return (
    <View style={styles.container}>
      <TouchableOpacity
        onPress={() => navigation.navigate("User", { userInf })}
        style={styles.content}
      >
        <View style={styles.viewHorizontal}>
          <Text style={styles.textBold} numberOfLines={1}>
            {userInf.use_name}
          </Text>
          <Text>{userInf.use_nickname}</Text>
        </View>
        <Text>{userInf.use_email}</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    backgroundColor: fbaColors.DarkGray,
    width: Dimensions.get("window").width * 0.95,
    padding: 10,
    borderRadius: 10,
    margin: 10,
  },
  text: {
    color: fbaColors.DarkGray,
    textAlign: "center",
  },
  content: {
    margin: 10,
  },
  viewHorizontal: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  textBold: { fontSize: 18, fontWeight: "bold", maxWidth: "50%" },
});
