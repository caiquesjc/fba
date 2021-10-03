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
import AsyncStorage from '@react-native-async-storage/async-storage';

import { Icon } from "react-native-elements"

import { useAuth } from "../contexts/auth"
import api from "../services/api";

const logoFba = require("../../assets/logo.png")

import { fbaColors } from "../assets/colors"

export default function Login() {
  const [use_email, setUse_email] = useState("")
  const [use_password, setUse_password] = useState("") 
  const [state, setState] = useAuth()
  const [passVisible, setPassVisible] = useState(true)
  const [passIcon, setPassIcon] = useState("visibility-off")

  const storeDataLocal = async (value) => {
    try {
      const jsonValue = JSON.stringify(value)
      await AsyncStorage.setItem('@auth', jsonValue)
    } catch (e) {
      // saving error
    }
  }

  
const getDataLocal = async () => {
    try {
      const jsonValue = await AsyncStorage.getItem('@auth')
      console.log(jsonValue)
      return jsonValue != null ? JSON.parse(jsonValue) : null;
    } catch(e) {
      // error reading value
    }
  }



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
      storeDataLocal(state)
    })
    .catch(err => console.log(err))
  }

  function showPass() {
    passVisible ? setPassVisible(false) : setPassVisible(true)
    passIcon == "visibility-off" ? setPassIcon("visibility") : setPassIcon("visibility-off")
  }

  useEffect(() => {
    () => {
      if(getDataLocal() != null)
      setState(getDataLocal())
    }
  })

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
