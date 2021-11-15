import React, { useState } from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import { Icon } from "react-native-elements";
import { fbaColors } from "../assets/colors";
import api from "../services/api";

export default function ButtonClass({ classInf, navigation, finished }) {
  let isFinished = finished.some((fin) => fin.fk_cla_id == classInf.cla_id);
  const [isFin, setIsFin] = useState(false)
  function addFinished() {
    const body = { fk_cou_id: classInf.fk_cou_id, fk_cla_id: classInf.cla_id };
    api.post("/class-finished/register", body).then((res) => {
      if (res.data.success) {setIsFin(true)}
    });
  }
  return (
    <View style={styles.container}>
      <View style={styles.playBtn}>
        <TouchableOpacity
          onPress={() => navigation.navigate("VideoPage", { classInf })}
        >
          <Icon name="play-circle-filled" type="material" />
        </TouchableOpacity>
        {!isFinished && !isFin ? (
          <TouchableOpacity onPress={() => addFinished()}>
            <Icon name="done" type="material" />
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
            <Text style={{ fontSize: 18, fontWeight: "bold" }}>
              {classInf.cla_name}
            </Text>
            <Text>Tempo da Aula: {classInf.cla_duration}hr</Text>
          </View>
          <View
            style={{
              flexDirection: "row",
              justifyContent: "space-between",
              margin: 10,
            }}
          >
            <Text style={{ maxWidth: "80%" }} numberOfLines={2}>
              {classInf.cla_description}
            </Text>
            <Text style={{ fontWeight: "bold" }}>Básico</Text>
          </View>
          {!isFinished && !isFin ? (
            <></>
          ): (
            <View
              style={{
                backgroundColor: fbaColors.Nero,
                height: "5%",
                width: "100%",
              }}
            ></View>
          )}
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "space-between",
    backgroundColor: fbaColors.DarkGray,
    padding: 10,
    borderRadius: 10,
    marginTop: 10,
    flexDirection: "row",
  },
  playBtn: {
    width: "10%",
    justifyContent: "space-around",
  },
  containerInfs: {
    width: "90%",
  },
  containerFinished: {
    borderLeftWidth: 10,
  },
});
