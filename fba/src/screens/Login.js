import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  TouchableOpacity,
  SafeAreaView,
  TouchableWithoutFeedback,
  Keyboard,
  Alert,
} from "react-native";

import { Icon } from "react-native-elements"

import { useAuth } from "../contexts/auth"
import api from "../services/api";

export default function Login() {
  const [use_email, setUse_email] = useState("")
  const [use_password, setUse_password] = useState("") 
  const [state, setState] = useAuth()
  const [passVisible, setPassVisible] = useState(true)
  const [passIcon, setPassIcon] = useState("visibility-off")

  function handleSignIn() {
    const user = {
      use_email,
      use_password
    }
    api.post("/login", user)
    .then(res => {
      if(!res.data.success)
        Alert.alert("Email ou senha incorretos!")
      setState(res.data)
    })
    .catch(err => console.log(err))
  }

  function showPass() {
    passVisible ? setPassVisible(false) : setPassVisible(true)
    passIcon == "visibility-off" ? setPassIcon("visibility") : setPassIcon("visibility-off")
  }
  return (
    <SafeAreaView style={styles.container}>
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <View style={styles.container}>
        <Text style={styles.text}>
            Insira seu e-mail e senha para continuar
          </Text>
          <TextInput
            style={styles.input}
            placeholder="e-mail"
            textContentType="emailAddress"
            autoCompleteType="email"
            value={use_email}
            onChangeText={text => setUse_email(text)}
          />
          <TextInput
            style={styles.input}
            placeholder="senha"
            textContentType="password"
            autoCompleteType="password"
            secureTextEntry={passVisible}
            value={use_password}
            onChangeText={text => setUse_password(text)} 
          />
          <View style={styles.buttonPassCont}>
          <TouchableOpacity 
            style={styles.buttonPass} 
            activeOpacity={0.9}
            onPress={() => {showPass()}}
          >
              {/*<Text style={styles.text}>
                Mostrar senha
            </Text>*/}
              <Icon name={passIcon} type="material" color="#aaa"/>
            </TouchableOpacity>
            <TouchableOpacity style={styles.buttonPass} activeOpacity={0.9}>
              <Text style={styles.text}>Esqueci a senha</Text>
            </TouchableOpacity>
          </View>

          <TouchableOpacity style={styles.button} activeOpacity={0.4} onPress={() => handleSignIn()}>
            <Text style={styles.text}>Login</Text>
          </TouchableOpacity>
        </View>
      </TouchableWithoutFeedback>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#212121",
    alignItems: "center",
    justifyContent: "center",
    width: "100%"
  },
  text: {
    color: "#aaa",
    fontWeight: "bold"
  },
  input: {
    width: "70%",
    color: "#212121",
    borderWidth: 1,
    marginTop: 20,
    borderColor: "#aaa",
    borderRadius: 20,
    padding: 10,
    textAlign: "center",
    fontSize: 18,
    backgroundColor: "#aaa"
  },
  buttonPassCont: {
    width: "70%",
    flexDirection: "row",
    justifyContent: "space-between",
  },
  buttonPass: {
    //alignItems: 'flex-end',
    width: "auto",
    marginTop: 5,
  },
  button: {
    borderWidth: 1,
    borderColor: "#aaa",
    width: "50%",
    padding: 10,
    marginTop: 20,
    borderRadius: 20,
    alignItems: "center",
  }
});
