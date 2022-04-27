import React, { useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  TextInput,
  Keyboard,
  TouchableWithoutFeedback,
  Alert,
  ScrollView,
} from "react-native";
import { fbaColors } from "../assets/colors";
import { Picker } from "@react-native-community/picker";
import { Icon } from "react-native-elements";

import api from "../services/api";
import { validateEmail, validatePass } from "../services/validations";
export default function NewUser({ setVisible, setRefresh }) {
  const [use_name, setUse_name] = useState("");
  const [use_email, setUse_email] = useState("");
  const [use_telephone, setUse_telephone] = useState("");
  const [use_password, setUse_password] = useState("");
  const [use_age, setUse_age] = useState("");
  const [use_nickname, setUse_nickname] = useState("");
  const [use_is_admin, setUse_is_admin] = useState("false");

  const [passIcon, setPassIcon] = useState("visibility-off");
  const [passVisible, setPassVisible] = useState(true);
  function createUser() {
    if (
      !use_name ||
      !use_email ||
      !use_telephone ||
      !use_password ||
      !use_age ||
      !use_nickname ||
      !use_is_admin
    ) {
      Alert.alert("Erro!", "Preencha os campos vazios!");
    } else if (!validateEmail(use_email)) {
      Alert.alert("Erro!", "Email inválido!");
    } else if (!validatePass(use_password)) {
      Alert.alert("Erro!", "Senha inválida!");
    } else {
      api
        .post("user/register", {
          use_name,
          use_email,
          use_telephone,
          use_password,
          use_age,
          use_nickname,
          use_is_admin,
        })
        .then((res) => {
          if (res.data.success) {
            Alert.alert(`Usuário ${use_name} cadastrado com sucesso!`);
            setRefresh(true);
            setVisible(false);
          } else {
            res.data.error.includes("use_nickname")
              ? Alert.alert(
                  "Erro!",
                  "Erro ao cadastrar usuário\nNome de usuário já existe!"
                )
              : Alert.alert(
                  "Erro!",
                  "Erro ao cadastrar usuário\nEmail já está sendo utilizado!"
                );
          }
        })
        .catch((error) => Alert.alert("Erro!", "Erro ao cadastrado o usuário!"));
    }
  }
  function showPass() {
    passVisible ? setPassVisible(false) : setPassVisible(true);
    passIcon == "visibility-off"
      ? setPassIcon("visibility")
      : setPassIcon("visibility-off");
  }
  return (
    <TouchableWithoutFeedback
      onPress={Keyboard.dismiss}
      style={styles.container}
    >
      <ScrollView
        contentContainerStyle={{
          justifyContent: "center",
          alignItems: "center",
          width: "100%",
          minHeight: "100%",
        }}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.container}>
          <View style={styles.viewInput}>
            <Text style={styles.text}>Nome</Text>
            <TextInput
              style={styles.input}
              value={use_name}
              onChangeText={(e) => setUse_name(e)}
            />
          </View>

          <View style={styles.viewInput}>
            <Text style={styles.text}>Email</Text>
            <TextInput
              style={styles.input}
              value={use_email}
              onChangeText={(e) => setUse_email(e)}
              keyboardType="email-address"
            />
          </View>

          <View style={styles.viewInput}>
            <Text style={styles.text}>Telefone</Text>
            <TextInput
              style={styles.input}
              value={use_telephone}
              onChangeText={(e) => setUse_telephone(e)}
              keyboardType="phone-pad"
            />
          </View>

          <View style={styles.viewInput}>
            <Text style={styles.text}>Usuário</Text>
            <TextInput
              style={styles.input}
              value={use_nickname}
              onChangeText={(e) => setUse_nickname(e)}
            />
          </View>

          <View style={styles.viewHorizontal}>
            <View style={[styles.viewInput, { width: "40%" }]}>
              <Text style={styles.text}>Idade</Text>
              <TextInput
                style={styles.input}
                keyboardType="decimal-pad"
                value={use_age}
                onChangeText={(e) => setUse_age(e)}
              />
            </View>

            <View style={[styles.viewInput, { width: "40%" }]}>
              <Text style={styles.text}>Administrador</Text>
              <View style={[styles.input, { padding: 0 }]}>
                <Picker
                  selectedValue={use_is_admin}
                  onValueChange={(itemValue, itemIndex) => {
                    setUse_is_admin(itemValue);
                  }}
                  on
                  mode="dialog"
                >
                  <Picker.Item label="Não" value="false" />
                  <Picker.Item label="Sim" value="true" />
                </Picker>
              </View>
            </View>
          </View>

          <View style={styles.viewInput}>
            <Text style={styles.text}>Senha</Text>
            <View style={styles.viewPass}>
              <TextInput
                value={use_password}
                onChangeText={(e) => setUse_password(e)}
                secureTextEntry={passVisible}
                style={styles.inputPass}
              />
              <View style={{ width: "10%" }}>
                <Icon
                  name={passIcon}
                  type="material"
                  color={fbaColors.Nero}
                  onPress={() => showPass()}
                />
              </View>
            </View>
          </View>

          <View style={[styles.viewHorizontal, { justifyContent: "center" }]}>
            <TouchableOpacity
              style={styles.button}
              activeOpacity={0.5}
              onPress={() => setVisible(false)}
            >
              <Text style={styles.textButton}>Cancelar</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.button}
              activeOpacity={0.5}
              onPress={() => createUser()}
            >
              <Text style={styles.textButton}>Salvar</Text>
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
    </TouchableWithoutFeedback>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: fbaColors.Nero,
    paddingBottom: 10,
    width: "100%",
  },
  viewInput: {
    width: "90%",
    padding: 5,
    marginTop: 15,
  },
  input: {
    width: "100%",
    color: fbaColors.Nero,
    borderWidth: 1,
    marginTop: 5,
    borderColor: fbaColors.DarkGray,
    borderRadius: 20,
    padding: 10,
    fontSize: 18,
    backgroundColor: fbaColors.DarkGray,
  },
  text: {
    color: fbaColors.DarkGray,
    marginLeft: 10,
  },
  picker: {
    height: "20%",
    color: "#fff",
    width: "100%",
  },
  viewHorizontal: {
    flexDirection: "row",
    justifyContent: "space-between",
    width: "90%",
  },
  button: {
    padding: 10,
    backgroundColor: fbaColors.DarkGray,
    width: "40%",
    borderRadius: 15,
    marginTop: 30,
    alignItems: "center",
    marginHorizontal: 15,
  },
  textButton: {
    color: fbaColors.Nero,
    fontSize: 18,
  },
  inputPass: {
    padding: 10,
    width: "90%",
    borderRadius: 15,
    color: fbaColors.Nero,
    fontSize: 18,
  },
  viewPass: {
    justifyContent: "space-between",
    flexDirection: "row",
    backgroundColor: "#aaa",
    borderRadius: 15,
    alignItems: "center",
  },
});
