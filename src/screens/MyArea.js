import React from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import { Icon } from "react-native-elements";
import { fbaColors } from "../assets/colors";

export default function MyArea({ navigation }) {
  return (
    <View style={styles.container}>
      <TouchableOpacity
        style={styles.buttonInf}
        onPress={() => navigation.navigate("Profile")}
      >
        <Icon
          name="account-circle"
          type="material"
          color="#fff"
          style={styles.icon}
        />
        <Text style={styles.text}>Meu Perfil</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={styles.buttonInf}
        onPress={() => navigation.navigate("MyCourses")}
      >
        <Icon
          name="class"
          type="material"
          color="#fff"
          style={styles.icon}
        />
        <Text style={styles.text}>Meus Cursos</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: fbaColors.Nero,
  },
  button: {
    borderWidth: 1,
    width: "90%",
    flexDirection: "row",
    justifyContent: "space-around",
  },
  buttonInf: {
    flexDirection: "row",
    justifyContent: "flex-start",
    alignItems: "center",
    padding: 10,
    borderWidth: 2,
    borderColor: "#fff",
    borderRadius: 20,
    marginTop: 15,
    width: "90%",
  },
  icon: {
    padding: 10,
  },
  text: {
    fontSize: 25,
    color: "#fff",
    fontWeight: "bold",
  },
});
