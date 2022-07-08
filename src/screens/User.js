import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  Alert,
  TouchableOpacity,
  TextInput,
  Keyboard,
  TouchableWithoutFeedback,
  ScrollView,
} from "react-native";
import { fbaColors } from "../assets/colors";
import api from "../services/api";
import Loading from "../components/Loading";
import { Icon } from "react-native-elements";

import { validateEmail, validatePass } from "../services/validations";

export default function User({ navigation, route }) {
  const { userInf } = route.params;
  const [user, setUser] = useState({ userInf });
  const [loading, setLoading] = useState(false);
  const [editable, setEditable] = useState(false);
  const [use_name, setUse_name] = useState(userInf.use_name);
  const [use_email, setUse_email] = useState(userInf.use_email);
  const [use_telephone, setUse_telephone] = useState(userInf.use_telephone);
  const [use_password, setUse_password] = useState("******");
  const [use_age, setUse_age] = useState(userInf.use_age);
  const [use_nickname, setUse_nickname] = useState(userInf.use_nickname);
  function getUser() {
    setLoading(true);
    api
      .get(`user/get/${userInf.use_id}`)
      .then((res) => {
        if (res.data.success) {
          setUser(res.data.user[0]);
        }
      })
      .catch((err) => {
        Alert.alert("Erro!", "Erro ao buscar informações do usuário!");
      });

    setLoading(false);
  }

  function deleteUser() {
    Alert.alert(
      "Deletar!",
      `Você deseja deletar o usúario ${userInf.use_name}?`,
      [
        {
          text: "Sim!",
          onPress: () => {
            api
              .delete("/user/delete", { data: { use_id: userInf.use_id } })
              .then((res) => {
                if (res.data.success) {
                  navigation.goBack();
                  Alert.alert("Sucesso!", "Usuário excluído!");
                }
              })
              .catch((e) => {
                Alert.alert("Erro!", "Erro ao excluir usuário!");
              });
          },
        },
        { text: "Não!", onPress: () => {} },
      ]
    );
  }

  function editUser() {
    if (
      !use_name ||
      !use_email ||
      !use_telephone ||
      !use_password ||
      !use_age ||
      !use_nickname
    ) {
      Alert.alert("Erro", "Preencha os campos vazios!");
    } else if (!validateEmail(use_email)) {
      Alert.alert("Erro", "Email inválido!");
    } else if (!validatePass(use_password)) {
      Alert.alert("Erro", "Senha inválida!");
    } else {
      api
        .put("user/update", {
          use_id: userInf.use_id,
          use_name,
          use_email,
          use_telephone,
          use_password,
          use_age,
          use_nickname,
        })
        .then((res) => {
          if (res.data.success) {
            Alert.alert("Sucesso!", `Usuário ${use_name} atualizado com sucesso!`);
            setEditable(false);
          } else {
            res.data.error.includes("use_nickname")
              ? Alert.alert(
                "Erro",
                  "Erro ao cadastrar usuário\nNome de usuário já existe!"
                )
              : Alert.alert(
                "Erro",
                  "Erro ao cadastrar usuário\nEmail já está sendo utilizado!"
                );
          }
        })
        .catch((error) => Alert.alert("Erro!", "Erro ao atualizar o usuário!"));
    }
  }

  useEffect(() => {
    getUser();
  }, []);
  if (loading) return <Loading />;
  return (
    <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
      <ScrollView
        contentContainerStyle={{
          width: "100%",
          minHeight: "100%",
        }}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.container}>
          <View style={styles.viewButton}>
            <TouchableOpacity
              style={styles.button}
              onPress={() => deleteUser()}
            >
              <Icon type="material" name="delete" size={30} />
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.button}
              onPress={() => {
                editable ? setEditable(false) : setEditable(true);
              }}
            >
              <Icon
                type="material"
                name={editable ? "visibility" : "edit"}
                size={30}
              />
            </TouchableOpacity>
          </View>
          <View style={styles.content}>
            <Text style={styles.textM}>Nome</Text>
            <TextInput
              style={[styles.text, editable && styles.edit]}
              value={use_name}
              editable={editable}
              onChangeText={(e) => {
                setUse_name(e);
              }}
            />
            {/* <Text style={styles.text}>{user.use_name}</Text> */}

            <Text style={styles.textM}>Email</Text>
            <TextInput
              style={[styles.text, editable && styles.edit]}
              value={use_email}
              editable={editable}
              onChangeText={(e) => {
                setUse_email(e);
              }}
              keyboardType="email-address"
            />

            <Text style={styles.textM}>Telefone</Text>
            <TextInput
              style={[styles.text, editable && styles.edit]}
              value={use_telephone}
              editable={editable}
              onChangeText={(e) => {
                setUse_telephone(e);
              }}
              keyboardType="phone-pad"
            />

            <Text style={styles.textM}>Idade</Text>
            <TextInput
              style={[styles.text, editable && styles.edit]}
              value={JSON.stringify(use_age)}
              editable={editable}
              onChangeText={(e) => {
                setUse_age(e);
              }}
              keyboardType="numeric"
            />

            <Text style={styles.textM}>Usuário</Text>
            <TextInput
              style={[styles.text, editable && styles.edit]}
              value={use_nickname}
              editable={editable}
              onChangeText={(e) => {
                setUse_nickname(e);
              }}
            />

            <Text style={styles.textM}>Senha</Text>
            <TextInput
              style={[styles.text, editable && styles.edit]}
              value={use_password}
              editable={editable}
              secureTextEntry={true}
              onChangeText={(e) => {
                setUse_password(e);
              }}
            />

            <Text style={styles.textM}>Administrador</Text>
            <Text style={styles.text}>{user.use_is_admin ? "Sim" : "Não"}</Text>
          </View>

          <View style={[styles.viewButton, !editable && { display: "none" }]}>
            <TouchableOpacity
              style={styles.button}
              onPress={() => {
                editable ? setEditable(false) : setEditable(true);
              }}
            >
              <Text style={styles.textButton}>Cancelar</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.button}
              onPress={() => {
                editUser();
              }}
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
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: fbaColors.Nero,
  },
  text: {
    fontSize: 24,
    color: fbaColors.Nero,
    padding: 10,
    backgroundColor: fbaColors.DarkGray,
    borderRadius: 15,
  },
  content: {
    width: "90%",
    height: "80%",
  },
  textM: {
    fontSize: 18,
    color: fbaColors.DarkGray,
    marginTop: 15,
  },
  viewButton: {
    flexDirection: "row",
    width: "90%",
    justifyContent: "space-between",
    alignItems: "center",
  },
  button: {
    width: "40%",
    backgroundColor: fbaColors.DarkGray,
    padding: 5,
    borderRadius: 15,
  },
  textButton: { fontSize: 26, color: fbaColors.Nero, textAlign: "center" },
  edit: { borderWidth: 2, borderColor: "#fff" },
});
