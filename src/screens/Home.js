import React, { useEffect, useState } from "react";
import { Text, View, StyleSheet, SafeAreaView, FlatList } from "react-native";

import Loading from "../components/Loading";
import ButtonCourse from "../components/ButtonCourse";

import api from "../services/api";

export default function Home({ navigation }) {
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState();

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
  if (loading) return <Loading />;
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.container}>

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
          <FlatList
            onRefresh={() => handleRefresh()}
            refreshing={refresh}
            data={data}
            extraData={data}
            renderItem={({ item }) => (
              <ButtonCourse courseInf={item} navigation={navigation} />
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
});
