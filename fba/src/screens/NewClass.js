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

import api from "../services/api";
export default function NewClass({ navigation, route, courseInf, setVisible, setReload }) {
  const [cla_name, setCla_name] = useState("");
  const [cla_duration, setCla_duration] = useState("");
  const [cla_description, setCla_description] = useState("");
  const [cla_video, setCla_video] = useState("");
  // const { courseInf } = route.params;

  function createClass() {
    if (!cla_name || !cla_duration || !cla_description || !cla_video) {
      Alert.alert("Preencha os campos vazios!");
    } else {
      api
        .post("class/register", {
          cla_name,
          cla_duration,
          cla_description,
          cla_video,
          fk_cou_id: courseInf.cou_id,
        })
        .then((res) => {
          if (!res.data.success) {
            Alert.alert(`Aula ${cla_name} não criada!`);
          }
          Alert.alert(`Aula ${cla_name} criada com sucesso!`);
          setReload(true)
          setVisible(false)
          
        })
        .catch((error) => Alert.alert(`Erro ao criar a aula!`));
    }
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
              value={cla_name}
              onChangeText={(e) => setCla_name(e)}
            />
          </View>
          <View style={styles.viewInput}>
            <Text style={styles.text}>Descrição</Text>
            <TextInput
              style={styles.input}
              multiline
              value={cla_description}
              onChangeText={(e) => setCla_description(e)}
            />
          </View>

          <View style={styles.viewHorizontal}>
            <View style={[styles.viewInput, { width: "30%" }]}>
              <Text style={styles.text}>Tempo (hr)</Text>
              <TextInput
                style={styles.input}
                keyboardType="decimal-pad"
                value={cla_duration}
                onChangeText={(e) => setCla_duration(e)}
              />
            </View>

            <View style={[styles.viewInput, { width: "65%" }]}>
              <Text style={styles.text}>Vídeo</Text>
              <TextInput
                style={styles.input}
                value={cla_video}
                onChangeText={(e) => setCla_video(e)}
              />
            </View>
          </View>

          <View style={[styles.viewHorizontal, { justifyContent: "center" }]}>
            <TouchableOpacity
              style={styles.button}
              activeOpacity={0.5}
              // onPress={() => navigation.goBack()}
              onPress={() => setVisible(false)}
            >
              <Text style={styles.textButton}>Cancelar</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.button}
              activeOpacity={0.5}
              onPress={() => createClass()}
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
});
