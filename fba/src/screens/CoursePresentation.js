import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  FlatList,
  Dimensions,
  SafeAreaView,
} from "react-native";

import Loading from "../components/Loading";
import Video from "../components/Video";

import api from "../services/api";

import ButtonClass from "../components/ButtonClass";
export default function CoursePresentation({ route, navigation }) {
  const [sizeDescription, setSizeDescription] = useState(80);
  const [txtBtnDesc, setTxtBtnDesc] = useState("Ver mais");
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);

  const { courseInf } = route.params;

  function getClass() {
    return useEffect(() => {
      api.get(`/class/class-by-course/${courseInf.cou_id}`).then((res) => {
        setData(res.data.data);
        setLoading(false);
      });
    }, []);
  }

  getClass();

  if (loading) return <Loading />;
  return (
    <SafeAreaView style={styles.container}>
      <ScrollView
        style={{ backgroundColor: "#212121", width: "100%" }}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.container}>
          <View style={styles.video}>
            <Video videoId={courseInf.cou_video} />
          </View>
          <Text style={{ fontSize: 24, padding: 10, color: "#aaa" }}>
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
                color: "#aaa",
              }}
            >
              {courseInf.cou_description}
            </Text>
          </View>

          <Text style={{ fontSize: 24, padding: 10, color: "#aaa" }}>
            Aulas
          </Text>

          {data.length > 0 ? (
            data.map(function (item, index) {
              return (
                <View style={{ width: "90%" }} key={index}>
                  <ButtonClass classInf={item} navigation={navigation} />
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
              <Text style={{ fontSize: 24, color: "#aaa" }}>
                Este curso não possui aulas
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
