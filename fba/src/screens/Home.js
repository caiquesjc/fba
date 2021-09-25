import React, { useEffect, useState } from "react"
import { Text, View, StyleSheet, ScrollView, SafeAreaView, Alert, FlatList } from "react-native"

import Loading from "../components/Loading"

import ButtonCategories from "../components/ButtonCategories"
import ButtonCourse from "../components/ButtonCourse"

import api from "../services/api"



export default function Home({ navigation }) {
    const [loading, setLoading ] = useState(true)
    const [data, setData ] = useState()
    const categories = [{name: "Categoria 1"},{name: "Categoria 2"},{name: "Categoria 3"}]

    const [refresh, setRefresh] = useState(false)

    function getCourses() {
        return (
            api.get("/course/list")
                .then((res) => {
                    setData(res.data.data);
                    setLoading(false);
                    setRefresh(false)
                })
        )
    }


    function handleRefresh() {
        setData([])
        setRefresh(true)
        getCourses()
    }

    useEffect(() => {
        getCourses()
        },[])


    if(loading)
    return <Loading/>
    return ( 
        <SafeAreaView style={styles.container}>
        <View style={styles.container}>
            <View style={{height: "20%"}}>
                <Text style={{fontSize: 24, margin: 10, fontWeight: "bold", color: "#fff"}}>Categorias</Text>
               {/*} <ScrollView horizontal>
                    <ButtonCategories title="Categoria" onPress={() => Alert.alert("caique") }/>
                    <ButtonCategories title="Categoria" onPress={() => Alert.alert("caique") }/>
                    <ButtonCategories title="Categoria" onPress={() => Alert.alert("caique") }/>
                </ScrollView> */}

                <FlatList
                    horizontal
                    data={categories}
                    showsHorizontalScrollIndicator={false}
                    renderItem={({ item }) => (
                        <ButtonCategories
                            title={item.name}
                            navigation={navigation}
                        />
                    )}
                    keyExtractor={(item, index) => index.toString()}
                />

            </View>

            <View style={{height: "auto"}}>
                <Text style={{fontSize: 24, margin: 10, fontWeight: "bold", color: "#fff"}}>Cursos</Text>
                {/*<ScrollView>
                    <ButtonCourse name="teste" onPress={() => Alert.alert("caiquye")}/>
                    <ButtonCourse name="teste" onPress={() => Alert.alert("caique") }/>
                    <ButtonCourse name="teste" onPress={() => Alert.alert("caique") }/>
                    <ButtonCourse name="teste" onPress={() => Alert.alert("caique") }/>
                    <ButtonCourse name="teste" onPress={() => Alert.alert("caique") }/>
                    <ButtonCourse name="teste" onPress={() => Alert.alert("caique") }/>
                </ScrollView> */}

                <FlatList
                //contentContainerStyle={styles.flat}
                    onRefresh={() => handleRefresh()}
                    refreshing={refresh}
                    data={data}
                    extraData={data}
                    renderItem={({ item }) => (
                        <ButtonCourse
                            courseInf={item}
                            navigation={navigation}
                        />
                    )}
                    keyExtractor={(item, index) => index.toString()}
                    showsVerticalScrollIndicator={false}
                />
            </View>
        </View>
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: "center",
        justifyContent: "space-between",
        backgroundColor: "#212121",
        paddingBottom: 10
    }
})