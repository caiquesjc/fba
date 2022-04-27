import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Image,
  ImageBackground,
} from "react-native";
import { Icon } from "react-native-elements";
import { fbaColors } from "../assets/colors";
import api from "../services/api";

export default function ButtonClass({ classInf, navigation, finished, setReload }) {
  let isFinished = finished.some((fin) => fin.fk_cla_id == classInf.cla_id);
  const [isFin, setIsFin] = useState(false);
  function addFinished() {
    const body = { fk_cou_id: classInf.fk_cou_id, fk_cla_id: classInf.cla_id };
    api.post("/class-finished/register", body).then((res) => {
      if (res.data.success) {
        setIsFin(true);
      }
    });
    setReload(true)
  }
  return (
    // <View style={styles.container}>
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
              <Icon name="play-circle-filled" type="material" color="#fff" backgroundColor="#000" borderRadius={15}/>
            </TouchableOpacity>
            {!isFinished && !isFin ? (
              <TouchableOpacity onPress={() => addFinished()}>
                <Icon name="done" type="material" color="#fff" backgroundColor="#000" borderRadius={15} />
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
                <Text style={[styles.text, 1 && {fontSize: 18, fontWeight: "bold"}]}>{classInf.cla_name}</Text>
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
              {/* {!isFinished && !isFin ? (
                <></>
              ) : (
                <View
                  style={{
                    backgroundColor: fbaColors.Nero,
                    height: "0%",
                    width: "100%",
                  }}
                ></View>
              )} */}
            </TouchableOpacity>
          </View>
      </ImageBackground>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "space-between",
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
    width: "90%",
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
    fontSize: 15
    
  },
  textBold: {},
});
