import React, { useEffect, useState } from "react";
import { View, Text, StyleSheet, Alert, TouchableOpacity } from "react-native";
import { fbaColors } from "../assets/colors";
import api from "../services/api";
import Loading from "../components/Loading";
import { Icon } from "react-native-elements"

export default function User({ navigation, route }) {
  const { userInf } = route.params;
  const [user, setUser] = useState({ userInf });
  const [loading, setLoading] = useState(false);
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
        Alert.alert("Erro!");
      });

    setLoading(false);
  }
  useEffect(() => {
    getUser();
  }, []);
  if (loading) return <Loading />;
  return (
    <View style={styles.container}>
      <View style={styles.viewButton}>
        <TouchableOpacity style={styles.button}>
            <Icon type="material" name="delete" size={30}/>
        </TouchableOpacity>

        <TouchableOpacity style={styles.button}>
            <Icon type="material" name="edit" size={30}/>
        </TouchableOpacity>
      </View>
      <View style={styles.content}>
        <Text style={styles.textM}>Nome</Text>
        <Text style={styles.text}>{user.use_name}</Text>

        <Text style={styles.textM}>Email</Text>
        <Text style={styles.text}>{user.use_email}</Text>

        <Text style={styles.textM}>Telefone</Text>
        <Text style={styles.text}>{user.use_telephone}</Text>

        <Text style={styles.textM}>Idade</Text>
        <Text style={styles.text}>{user.use_age}</Text>

        <Text style={styles.textM}>Usuário</Text>
        <Text style={styles.text}>{user.use_nickname}</Text>

        <Text style={styles.textM}>Administrador</Text>
        <Text style={styles.text}>{user.use_is_admin ? "Sim" : "Não"}</Text>
      </View>
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
  text: {
    fontSize: 24,
    color: fbaColors.Nero,
    padding: 10,
    backgroundColor: fbaColors.DarkGray,
    borderRadius: 15
  },
  content: {
    width: "90%",
    height: "80%",
  },
  textM: {
    fontSize: 18,
    color: fbaColors.DarkGray,
    marginTop: 15
  },
  viewButton: {
      flexDirection: "row",
      width: "90%",
      justifyContent: "space-between",
      alignItems: "center"
  },
  button: {
      width: "40%",
      backgroundColor: fbaColors.DarkGray,
      padding: 5,
      borderRadius: 15
  }
});
