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

import api from "../services/api";
export default function EditCourse({ navigation, route }) {
  const { courseInf } = route.params;
  const [cou_name, setCou_name] = useState(courseInf.cou_name);
  const [cou_duration, setCou_duration] = useState(courseInf.cou_duration);
  const [cou_description, setCou_description] = useState(
    courseInf.cou_description
  );
  const [cou_video, setCou_video] = useState(courseInf.cou_video);
  const [cou_level, setCou_level] = useState(courseInf.cou_level);

  function createCourse() {
    if (
      !cou_name ||
      !cou_duration ||
      !cou_description ||
      !cou_video ||
      !cou_level
    ) {
      Alert.alert("Erro!", "Preencha os campos vazios!");
    } else {
      api
        .put("course/update", {
          cou_id: courseInf.cou_id,
          cou_name,
          cou_duration,
          cou_description,
          cou_video,
          cou_level,
        })
        .then((res) => {
          if (!res.data.success) Alert.alert("Erro!", `Erro ao editar o curso!`);
          Alert.alert("Sucesso!", `Curso ${cou_name} editado com sucesso!`);
        })
        .catch((error) => Alert.alert("Erro!", `Erro ao editar o curso!`));
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
              value={cou_name}
              onChangeText={(e) => setCou_name(e)}
            />
          </View>
          <View style={styles.viewInput}>
            <Text style={styles.text}>Descri????o</Text>
            <TextInput
              style={styles.input}
              multiline
              value={cou_description}
              onChangeText={(e) => setCou_description(e)}
            />
          </View>

          <View style={styles.viewHorizontal}>
            <View style={[styles.viewInput, { width: "40%" }]}>
              <Text style={styles.text}>Tempo (hr)</Text>
              <TextInput
                style={styles.input}
                keyboardType="decimal-pad"
                value={cou_duration}
                onChangeText={(e) => setCou_duration(e)}
              />
            </View>

            <View style={[styles.viewInput, { width: "40%" }]}>
              <Text style={styles.text}>N??vel</Text>
              <View style={[styles.input, { padding: 0 }]}>
                <Picker
                  selectedValue={cou_level}
                  onValueChange={(itemValue, itemIndex) => {
                    setCou_level(itemValue);
                  }}
                  on
                  mode="dialog"
                  // style={[styles.input]}
                >
                  <Picker.Item label="B??sico" value="B??sico" />
                  <Picker.Item label="Intermedi??rio" value="Intermedi??rio" />
                  <Picker.Item label="Avan??ado" value="Avan??ado" />
                </Picker>
              </View>
            </View>
          </View>

          <View style={[styles.viewHorizontal, { justifyContent: "center" }]}>
            <TouchableOpacity
              style={styles.button}
              activeOpacity={0.5}
              onPress={() => navigation.goBack()}
            >
              <Text style={styles.textButton}>Cancelar</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.button}
              activeOpacity={0.5}
              onPress={() => createCourse()}
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
