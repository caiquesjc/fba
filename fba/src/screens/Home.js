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

    function getCourses() {
        return(
            useEffect(() => {
                api.get("/courses/list")
                .then((res) => {
                    setData(res.data.data);
                    setLoading(false);
                    console.log(res.data.data)
                })
            },[])
        )
    }

    getCourses()


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
                        />
                    )}
                    keyExtractor={(item, index) => index.toString()}
                    showsVerticalScrollIndicator={false}
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
                    data={data}

                    renderItem={({ item }) => (
                        <ButtonCourse
                            name={item.cou_name}
                            description={item.cou_description}
                            time={item.cou_duration}
                            course_id={item.cou_id}
                            navi ={navigation}
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