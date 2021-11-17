import React, { useEffect, useState } from "react";
import { Text, View, StyleSheet, SafeAreaView, FlatList } from "react-native";

import Loading from "../components/Loading";

import ButtonCategories from "../components/ButtonCategories";
import ButtonCourse from "../components/ButtonCourse";

import api from "../services/api";
import { useAuth } from "../contexts/auth";

export default function Home({ navigation }) {
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState();
  const [categorySelected, setCategorySelected] = useState();
  const categories = [
    { name: "Categoria 1" },
    { name: "Categoria 2" },
    { name: "Categoria 3" },
  ];

  const [refresh, setRefresh] = useState(false);

  function handleSelectCategory(category) {
    setCategorySelected(category);
  }

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
        {/* <View style={{ height: "20%" }}>
          <Text
            style={{
              fontSize: 24,
              margin: 10,
              fontWeight: "bold",
              color: "#fff",
            }}
          >
            Categorias
          </Text>
          <FlatList
            horizontal
            data={categories}
            showsHorizontalScrollIndicator={false}
            renderItem={({ item }) => (
              <ButtonCategories
                title={item.name}
                navigation={navigation}
                onPress={() => handleSelectCategory(item.name)}
                active={categorySelected === item.name}
              />
            )}
            keyExtractor={(item, index) => index.toString()}
          />
        </View> */}

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