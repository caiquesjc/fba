import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  Dimensions,
  SafeAreaView,
} from "react-native";
import * as ScreenOrientation from "expo-screen-orientation";

import Loading from "../components/Loading";
import Video from "../components/Video";

import api from "../services/api";

import ButtonClass from "../components/ButtonClass";
import { fbaColors } from "../assets/colors";
export default function CoursePresentation({ route, navigation }) {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [finished, setFinished] = useState([]);
  const [reload, setReload] = useState(false);
  const { courseInf } = route.params;

  function getClass() {
    api.get(`/class/class-by-course/${courseInf.cou_id}`).then((res) => {
      setData(res.data.data);
      setLoading(false);
    });
  }

  function getClassFinished() {
    const body = { fk_cou_id: courseInf.cou_id };
    api.post("/class-finished/get", body).then((res) => {
      //setPercent((res.data.data.length * 100) / data.length)
      setFinished(res.data.data);
    });
    setReload(false)
  }
  useEffect(() => {
    getClass();
    getClassFinished();
  }, []);
  if (reload) {
    getClass();
    getClassFinished();
  }
  if (loading) return <Loading />;
  return (
    <SafeAreaView style={styles.container}>
      <ScrollView
        style={{ backgroundColor: "#212121", width: "100%" }}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.container}>
          <Text style={{ fontSize: 24, padding: 10, color: "#fff" }}>
            {courseInf.cou_name}
          </Text>
          <View
            style={{ height: "auto", backgroundColor: "#212121", width: "90%" }}
          >
            <Text
              style={{
                textAlign: "justify",
                fontSize: 16,
                padding: 5,
                marginBottom: 10,
                color: "#fff",
              }}
            >
              {courseInf.cou_description}
            </Text>
          </View>
          {finished.length ? (
            <View style={{ width: "90%", borderColor: fbaColors.DarkGray}}>
              <Text
                style={{ fontSize: 24, color: "#fff", padding: 10, textAlign: "center" }}
              >
                Voc?? concluiu {Math.ceil((finished.length * 100) / data.length)}
                % deste curso
              </Text>
              <View
                style={{
                  backgroundColor: fbaColors.DeepSkyBlue,
                  width: `${Math.ceil((finished.length * 100) / data.length)}%`,
                  height: 10
                }}
              ></View>
            </View>
          ) : (
            <></>
          )}
          <Text style={{ fontSize: 24, padding: 10, color: "#fff" }}>
            Aulas
          </Text>

          {data.length > 0 ? (
            data.map(function (item, index) {
              return (
                <View style={{ width: "90%" }} key={index}>
                  <ButtonClass
                    classInf={item}
                    navigation={navigation}
                    finished={finished}
                    setReload={setReload}
                  />
                </View>
              );
            })
          ) : (
            <View
              style={{
                width: "90%",
                alignItems: "center",
                justifyContent: "center",
                flex: 1,
              }}
            >
              <Text style={{ fontSize: 24, color: "#fff" }}>
                Este curso n??o possui aulas
              </Text>
            </View>
          )}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "space-between",
    alignItems: "center",
    paddingBottom: 10,
    backgroundColor: "#212121",
    width: "100%",
  },
  video: {
    width: Dimensions.get("window").width,
    height: 250,
    margin: 10,
  },
  backgroundVideo: {
    height: "auto",
  },
});
