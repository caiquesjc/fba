import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Image,
  ImageBackground,
  Alert,
} from "react-native";
import { Icon } from "react-native-elements";
import { fbaColors } from "../assets/colors";
import api from "../services/api";

export default function ButtonClassAdmin({
  classInf,
  navigation,
  finished,
  setReload,
  setVisibleEdit,
  setClassInf2
}) {
  let isFinished = finished.some((fin) => fin.fk_cla_id == classInf.cla_id);
  const [isFin, setIsFin] = useState(false);
  function addFinished() {
    const body = { fk_cou_id: classInf.fk_cou_id, fk_cla_id: classInf.cla_id };
    api.post("/class-finished/register", body).then((res) => {
      if (res.data.success) {
        setIsFin(true);
      }
    });
    setReload(true);
  }
  function deleteClass() {
    Alert.alert(
      "Deletar!",
      `Você deseja deletar a aula ${classInf.cla_name}?`,
      [
        {
          text: "Sim!",
          onPress: () => {
            api
              .delete("/class/delete", { data: { claId: classInf.cla_id } })
              .then((res) => {
                if (res.data.success) {
                  setReload(true);
                  Alert.alert("Sucesso!", "Aula deletada com sucesso!");
                }
              })
              .catch((e) => {
                Alert.alert("Erro!", "Aula não deletada!");
              });
          },
        },
        { text: "Não!", onPress: () => {} },
      ]
    );
  }
  return (
    <TouchableOpacity
      onPress={() => navigation.navigate("Class", { classInf })}
    >
      <ImageBackground
        source={{
          uri: `https://img.youtube.com/vi/${classInf.cla_video}/0.jpg`,
        }}
        style={styles.container}
        opacity={0.5}
        onPress={() => navigation.navigate("VideoPage", { classInf })}
      >
        <View style={styles.playBtn}>
          <TouchableOpacity
            onPress={() => navigation.navigate("VideoPage", { classInf })}
          >
            <Icon
              name="play-circle-filled"
              type="material"
              color="#fff"
              backgroundColor="#000"
              borderRadius={10}
              size={30}
            />
          </TouchableOpacity>
          {!isFinished && !isFin ? (
            <TouchableOpacity onPress={() => addFinished()}>
              <Icon
                name="done"
                type="material"
                color="#fff"
                backgroundColor="#000"
                borderRadius={10}
                size={30}
              />
            </TouchableOpacity>
          ) : (
            <></>
          )}
        </View>

        <View style={styles.containerInfs}>
          <TouchableOpacity
            onPress={() => navigation.navigate("Class", { classInf })}
          >
            <View
              style={{
                flexDirection: "row",
                justifyContent: "space-between",
                margin: 10,
              }}
            >
              <Text
                style={[styles.text, 1 && { fontSize: 18, fontWeight: "bold" }]}
              >
                {classInf.cla_name}
              </Text>
            </View>
            <View
              style={{
                flexDirection: "row",
                justifyContent: "space-between",
                margin: 10,
              }}
            >
              <Text
                style={[styles.text, 1 && { maxWidth: "80%" }]}
                numberOfLines={2}
              >
                {classInf.cla_description}
              </Text>
            </View>
          </TouchableOpacity>
        </View>
        <View style={styles.playBtn}>
          <TouchableOpacity
            onPress={() => {
              setClassInf2(classInf);
              setVisibleEdit(true);
            }}
          >
            <Icon
              name="edit"
              type="material"
              size={30}
              color="#fff"
              backgroundColor="#000"
              borderRadius={10}
            />
          </TouchableOpacity>
          <TouchableOpacity onPress={() => deleteClass()}>
            <Icon
              name="delete"
              type="material"
              size={30}
              color="#fff"
              backgroundColor="#000"
              borderRadius={10}
            />
          </TouchableOpacity>
        </View>
      </ImageBackground>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "space-around",
    backgroundColor: "transparent",
    padding: 10,
    borderRadius: 10,
    marginTop: 10,
    flexDirection: "row",
    borderWidth: 1,
    borderColor: "#fff",
  },
  playBtn: {
    width: "10%",
    justifyContent: "space-around",
  },
  containerInfs: {
    width: "85%",
  },
  containerFinished: {
    borderLeftWidth: 10,
  },
  text: {
    color: "#fff",
    borderColor: "#000",
    borderWidth: 1,
    backgroundColor: "#000",
    opacity: 0.9,
    borderRadius: 7,
    fontWeight: "bold",
    fontSize: 15,
  },
  textBold: {},
});
