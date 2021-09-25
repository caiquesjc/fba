import React from "react";
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  TouchableOpacity,
  SafeAreaView,
  TouchableWithoutFeedback,
  Keyboard,
} from "react-native";

export default function Login() {
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
          />
          <TextInput
            style={styles.input}
            placeholder="senha"
            textContentType="password"
            autoCompleteType="password"
            secureTextEntry={true}     
          />
          <View style={styles.buttonPassCont}>
          <TouchableOpacity style={styles.buttonPass} activeOpacity={0.9}>
              <Text style={styles.text}>Mostrar senha</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.buttonPass} activeOpacity={0.9}>
              <Text style={styles.text}>Esqueci a senha</Text>
            </TouchableOpacity>
          </View>

          <TouchableOpacity style={styles.button} activeOpacity={0.4}>
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
  },
});
