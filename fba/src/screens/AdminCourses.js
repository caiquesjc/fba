import React, { useEffect, useState } from "react";
import {
  Text,
  View,
  StyleSheet,
  SafeAreaView,
  FlatList,
  TouchableOpacity,
  Modal
} from "react-native";
import { Icon } from "react-native-elements";

import Loading from "../components/Loading";
import ButtonCourseAdmin from "../components/ButtonCourseAdmin";
import NewCourse from "../screens/NewCourse"

import api from "../services/api";

export default function AdminCourses({ navigation }) {
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState();
  const [categorySelected, setCategorySelected] = useState();
  const [visible, setVisible] = useState(false)
  const [refresh, setRefresh] = useState(false);

  function getCourses() {
    return api.get("/course/list").then((res) => {
      setData(res.data.data);
      setLoading(false);
      setRefresh(false);
    });
  }

  function handleRefresh() {
    setData([]);
    setRefresh(true);
    getCourses();
  }

  useEffect(() => {
    getCourses();
  }, []);
  if (refresh) getCourses();
  if (loading) return <Loading />;
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.container}>
        <Modal visible={visible}>
          <NewCourse setRefresh={setRefresh} setVisible={setVisible}/>
        </Modal>
        <View style={{ height: "auto" }}>
          <Text
            style={{
              fontSize: 24,
              margin: 10,
              fontWeight: "bold",
              color: "#fff",
            }}
          >
            Cursos
          </Text>
          <TouchableOpacity
            style={styles.button}
            onPress={() => setVisible(true)}
          >
            <Icon name="add" type="material" color="#fff" style={styles.icon} />
            <Text style={styles.text}>Novo Curso</Text>
          </TouchableOpacity>
          <FlatList
            onRefresh={() => handleRefresh()}
            refreshing={refresh}
            data={data}
            extraData={data}
            renderItem={({ item }) => (
              <ButtonCourseAdmin
                courseInf={item}
                navigation={navigation}
                setReload={setRefresh}
              />
            )}
            keyExtractor={(item, index) => index.toString()}
            showsVerticalScrollIndicator={false}
          />
        </View>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "space-between",
    backgroundColor: "#212121",
    paddingBottom: 10,
  },
  button: {
    flexDirection: "row",
    justifyContent: "flex-start",
    alignItems: "center",
    padding: 10,
    borderWidth: 2,
    borderColor: "#fff",
    borderRadius: 20,
    marginTop: 15,
    width: "90%",
  },
  text: {
    fontSize: 18,
    color: "#fff",
    fontWeight: "bold",
  },
});
