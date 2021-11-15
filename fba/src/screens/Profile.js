import React, { useState } from "react";

import {
  View,
  Text,
  StyleSheet,
  Image,
  Dimensions,
  TouchableOpacity,
} from "react-native";
import * as SecureStore from 'expo-secure-store';

import { useAuth } from "../contexts/auth";

const minhaFoto =
  "https://cdn.icon-icons.com/icons2/2643/PNG/512/male_boy_person_people_avatar_icon_159358.png";

export default function Profile() {
  const [state, setState] = useAuth();

  let user = {
    use_age: "null",
    use_email: "null",
    use_name: "null",
    use_password: "null",
    use_photo: "null",
    use_telephone: "null",
  };
  if (state) user = state.user;

  async function deleteLogin(key) {
    await SecureStore.deleteItemAsync(key);
  }

  return (
    <View style={styles.conatiner}>
      <TouchableOpacity style={styles.containerImage}>
        <Image source={{ uri: minhaFoto }} style={styles.image} />
      </TouchableOpacity>

      <View style={styles.containerInf}>
        <Text style={styles.text}>Nome: {user.use_name}</Text>
        <Text style={styles.text}>Idade: {user.use_age}</Text>
        <Text style={styles.text}>Email: {user.use_email}</Text>
        <Text style={styles.text}>Senha: {user.use_password}</Text>
        <Text style={styles.text}>Outra </Text>
      </View>

      <View style={styles.containerLogout}>
        <TouchableOpacity
          style={styles.buttonLogout}
          onPress={() => {
            setState(false);
            deleteLogin("fbaLogin");
          }}
        >
          <Text style={{ color: "#212121", fontSize: 24 }}>Sair</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  conatiner: {
    flex: 1,
    alignItems: "center",
    justifyContent: "space-around",
    backgroundColor: "#212121",
  },
  containerImage: {
    width: "20%",
    height: "20%",
    alignItems: "center",
    marginTop: 20,
  },
  image: {
    width: Dimensions.get("window").width * 0.5,
    height: Dimensions.get("window").width * 0.5,
    borderRadius: 100,
    borderWidth: 5,
    borderColor: "#aaa",
  },
  containerInf: {
    height: "auto",
    width: "90%",
    marginTop: 20,
    justifyContent: "flex-start",
  },
  text: {
    fontSize: 20,
    color: "#aaa",
    padding: 10,
  },
  containerLogout: {
    alignItems: "flex-end",
    width: "90%",
  },
  buttonLogout: {
    width: "30%",
    backgroundColor: "#aaa",
    alignItems: "center",
    borderRadius: 10,
    padding: 5,
    marginBottom: 10,
  },
});
