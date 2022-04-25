import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  Dimensions,
  SafeAreaView,
  TouchableOpacity,
  Alert,
  Modal,
} from "react-native";

import { Icon } from "react-native-elements";

import Loading from "../components/Loading";
import NewClass from "../screens/NewClass";
import EditClass from "./EditClass";

import api from "../services/api";

import ButtonClassAdmin from "../components/ButtonClassAdmin";
import { fbaColors } from "../assets/colors";
export default function CourseAdmin({ route, navigation }) {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [finished, setFinished] = useState([]);
  const [reload, setReload] = useState(false);
  const [visible, setVisible] = useState(false);
  const [visibleEdit, setVisibleEdit] = useState(false);
  const [classInf2, setClassInf2] = useState({});
  const { courseInf } = route.params;

  function getClass() {
    api.get(`/class/class-by-course/${courseInf.cou_id}`).then((res) => {
      setData(res.data.data);
      setLoading(false);
      setReload(false);
    });
  }

  function getClassFinished() {
    const body = { fk_cou_id: courseInf.cou_id };
    api.post("/class-finished/get", body).then((res) => {
      setFinished(res.data.data);
    });
    setReload(false);
  }

  function deleteCourse() {
    Alert.alert(
      "Deletar!",
      `Você deseja deletar o curso ${courseInf.cou_name}?`,
      [
        {
          text: "Sim!",
          onPress: () => {
            api
              .delete("/course/delete", { data: { cou_id: courseInf.cou_id } })
              .then((res) => {
                Alert.alert("Sucesso!");
                //navigation.goBack();
                navigation.navigate("AdminCourses");
              })
              .catch((e) => {
                Alert.alert("Erro!");
              });
          },
        },
        { text: "Não!", onPress: () => {} },
      ]
    );
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
        <Modal
          visible={visible}
          style={{ flex: 1, minHeight: "100%", minWidth: "100%" }}
        >
          <NewClass
            courseInf={courseInf}
            setVisible={setVisible}
            setReload={setReload}
          />
        </Modal>
        <Modal
          visible={visibleEdit}
          style={{ flex: 1, minHeight: "100%", minWidth: "100%" }}
        >
          <EditClass
            classInf={classInf2}
            setVisibleEdit={setVisibleEdit}
            setReload={setReload}
          />
        </Modal>
        <View style={styles.container}>
          <Text style={{ fontSize: 24, padding: 10, color: "#fff" }}>
            {courseInf.cou_name}
          </Text>
          <View
            style={{
              flexDirection: "row",
              width: "90%",
              justifyContent: "space-between",
            }}
          >
            <TouchableOpacity
              style={styles.button}
              onPress={() => navigation.navigate("EditCourse", { courseInf })}
            >
              <Icon name="edit" type="material" size={30} />
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.button}
              onPress={() => {
                deleteCourse();
              }}
            >
              <Icon name="delete" type="material" size={30} />
            </TouchableOpacity>
          </View>

          <View style={styles.content}>
            <Text style={styles.textDesc}>{courseInf.cou_description}</Text>
          </View>
          {finished.length ? (
            <View style={{ width: "90%", borderColor: fbaColors.DarkGray }}>
              <Text style={styles.text} onPress={() => console.log("sdgsh")}>
                Você concluiu {Math.ceil((finished.length * 100) / data.length)}
                % deste curso
              </Text>
              <View
                style={{
                  backgroundColor: fbaColors.DeepSkyBlue,
                  width: `${Math.ceil((finished.length * 100) / data.length)}%`,
                  height: 10,
                }}
              ></View>
            </View>
          ) : (
            <></>
          )}
          <View
            style={{
              flexDirection: "row",
              justifyContent: "space-between",
              width: "90%",
            }}
          >
            <Text style={styles.text}>Aulas</Text>
            <TouchableOpacity
              style={styles.buttonAdd}
              onPress={() => setVisible(true)}
            >
              <Icon type="material" name="add" size={30} />
            </TouchableOpacity>
          </View>

          {data.length > 0 ? (
            data.map(function (item, index) {
              return (
                <View style={{ width: "90%" }} key={index}>
                  <ButtonClassAdmin
                    classInf={item}
                    navigation={navigation}
                    finished={finished}
                    setReload={setReload}
                    setVisibleEdit={setVisibleEdit}
                    setClassInf2={setClassInf2}
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
  button: {
    width: "40%",
    backgroundColor: fbaColors.DarkGray,
    padding: 5,
    borderRadius: 10,
  },
  text: {
    fontSize: 24,
    color: "#fff",
    padding: 10,
    textAlign: "center",
  },
  buttonAdd: {
    padding: 5,
    backgroundColor: fbaColors.DarkGray,
    borderRadius: 15,
    flexDirection: "row",
    width: "30%",
    alignItems: "center",
    justifyContent: "center",
    height: "70%",
    marginTop: 10,
  },
  content: { height: "auto", backgroundColor: "#212121", width: "90%" },
  textDesc: {
    textAlign: "justify",
    fontSize: 16,
    padding: 5,
    marginBottom: 10,
    color: "#fff",
  },
});
