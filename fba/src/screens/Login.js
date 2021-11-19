import React, { useState, useEffect } from "react";
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
  Image,
  Dimensions
} from "react-native";
import * as SecureStore from 'expo-secure-store';

import { Icon } from "react-native-elements"

import { useAuth } from "../contexts/auth"
import api from "../services/api";

const logoFba = require("../../assets/logo.png")

import { fbaColors } from "../assets/colors"
import Loading from "../components/Loading"

export default function Login() {
  const [use_email, setUse_email] = useState("")
  const [use_password, setUse_password] = useState("") 
  const [state, setState] = useAuth()
  const [passVisible, setPassVisible] = useState(true)
  const [passIcon, setPassIcon] = useState("visibility-off")
  const [loading, setLoading] = useState("")



  function handleSignIn() {
    setLoading("Carregando...")
    const user = {
      use_email,
      use_password
    }
    api.post("/login", user)
    .then(res => {
      if(!res.data.success)
        Alert.alert("Email ou senha incorretos!")
        setLoading("")
      setState(res.data)
      saveLogin("fbaLogin", JSON.stringify(res.data))
    })
    .catch(err => {
      setLoading("")
      Alert.alert("Erro ao tentar fazer login!")})
  }

  function showPass() {
    passVisible ? setPassVisible(false) : setPassVisible(true)
    passIcon == "visibility-off" ? setPassIcon("visibility") : setPassIcon("visibility-off")
  }

  async function saveLogin(key, value) {
    await SecureStore.setItemAsync(key, value);
  }

  async function getLoginSaved() {
    let result = await SecureStore.getItemAsync("fbaLogin")
    if (result) {
      setState(JSON.parse(result))
    }
  }


  useEffect(() => {
    getLoginSaved()
  },[])

  return (
    <SafeAreaView style={styles.container}>
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <View style={styles.container}>
          <View style={styles.containerImage}>
            <Image source={logoFba} style={styles.image}/>
          </View>

          <View style={styles.containerInfs}>
        <Text style={styles.text}>
            Insira seu e-mail e senha para continuar
          </Text>
          <TextInput
            style={styles.input}
            placeholder="e-mail"
            textContentType="emailAddress"
            autoCompleteType="email"
            value={use_email}
            onChangeText={text => setUse_email(text.toLowerCase())}
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
              <Icon name={passIcon} type="material" color={fbaColors.DarkGray}/>
            </TouchableOpacity>
            <TouchableOpacity style={styles.buttonPass} activeOpacity={0.9}>
              <Text style={styles.text}>Esqueci a senha</Text>
            </TouchableOpacity>
          </View>

          <TouchableOpacity style={styles.button} activeOpacity={0.4} onPress={() => handleSignIn()}>
            <Text style={styles.text}>Login</Text>
          </TouchableOpacity>
          <Text style={styles.text}>{loading}</Text>
          </View>
        </View>
      </TouchableWithoutFeedback>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: fbaColors.Nero,
    alignItems: "center",
    justifyContent: "center",
    width: "100%"
  },
  containerImage: {
    marginBottom: 50
  },
  image: {
    width: Dimensions.get("window").width * 0.400,
    height: Dimensions.get("window").height * 0.120,
  },
  containerInfs: {
    alignItems: "center",
    justifyContent: "center",
    width: "100%"
  },
  text: {
    color: fbaColors.DarkGray,
    fontWeight: "bold"
  },
  input: {
    width: "70%",
    color: fbaColors.Nero,
    borderWidth: 1,
    marginTop: 20,
    borderColor: fbaColors.DarkGray,
    borderRadius: 20,
    padding: 10,
    textAlign: "center",
    fontSize: 18,
    backgroundColor: fbaColors.DarkGray
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
    borderColor: fbaColors.DarkGray,
    width: "50%",
    padding: 10,
    marginTop: 20,
    borderRadius: 20,
    alignItems: "center",
  }
});
