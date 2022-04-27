import React, { useEffect, useState } from "react";
import { View, StyleSheet, Text, FlatList, Alert } from "react-native";
import ButtonCourse from "../components/ButtonCourse";
import api from "../services/api";
import Loading from "../components/Loading";
import { fbaColors } from "../assets/colors";

export default function MyCourses({ navigation }) {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [refresh, setRefresh] = useState(false);
  const [infClass, setInfClass] = useState([]);
  const [data2, setData2] = useState([]);
  const [Tfin, setTfin] = useState([]);
  const [listCou, setListCou] = useState([]);

  function getCourses() {
    setLoading(true);
    api.get("/course/my-courses-quantity").then((res) => {
      if (res.data.success) {
        setTfin(res.data.data.length);
        res.data.data.forEach(function (item) {
          listCou.push(item.fk_cou_id);
        });
        let strReq = "(".concat(listCou).concat(")");
        api.post("/course/my-courses", { id_courses: strReq }).then((res2) => {
          if (res.data.success) {
            setData(res2.data.data);
            setLoading(false);
            setRefresh(false);
          }
        });
      } else {
        Alert.alert("Sem cursos!", "Você não iniciou nenhum curso!");
      }
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
  return (
    <View style={styles.container}>
      {!data ? (
        <View>
          <Text style={{ color: "#fff", fontSize: 15 }}>
            Você não iniciou nenhum curso!
          </Text>
        </View>
      ) : (
        <View>
          <Text>Meus Cursos</Text>
          <Text style={{ color: "#fff" }}>Seus cursos: {Tfin}</Text>
          <FlatList
            onRefresh={() => handleRefresh()}
            refreshing={refresh}
            extraData={data}
            data={data}
            renderItem={({ item }) => (
              <ButtonCourse courseInf={item} navigation={navigation} />
            )}
            keyExtractor={(item, index) => index.toString()}
            showsVerticalScrollIndicator={false}
          />
        </View>
      )}
    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: fbaColors.Nero,
  },
});
