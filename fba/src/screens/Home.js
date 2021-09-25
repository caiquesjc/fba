import React from "react"
import { Text, View, StyleSheet, ScrollView, SafeAreaView, Alert } from "react-native"

import Loading from "../components/Loading"

import ButtonCategories from "../components/ButtonCategories"
import ButtonCourse from "../components/ButtonCourse"



export default function Home() {
    const loading = true
    if(!loading)
    return <Loading/>
    return ( 
        <SafeAreaView style={styles.container}>
        <View style={styles.container}>
            <View style={{height: "20%"}}>
                <Text style={{fontSize: 24, margin: 10, fontWeight: "bold", color: "#fff"}}>Categorias</Text>
                <ScrollView horizontal>
                    <ButtonCategories title="Categoria" onPress={() => Alert.alert("caique") }/>
                    <ButtonCategories title="Categoria" onPress={() => Alert.alert("caique") }/>
                    <ButtonCategories title="Categoria" onPress={() => Alert.alert("caique") }/>
                </ScrollView>
            </View>

            <View style={{height: "auto"}}>
                <Text style={{fontSize: 24, margin: 10, fontWeight: "bold", color: "#fff"}}>Cursos</Text>
                <ScrollView>
                    <ButtonCourse name="teste" onPress={() => Alert.alert("caique") }/>
                    <ButtonCourse name="teste" onPress={() => Alert.alert("caique") }/>
                    <ButtonCourse name="teste" onPress={() => Alert.alert("caique") }/>
                    <ButtonCourse name="teste" onPress={() => Alert.alert("caique") }/>
                    <ButtonCourse name="teste" onPress={() => Alert.alert("caique") }/>
                    <ButtonCourse name="teste" onPress={() => Alert.alert("caique") }/>
                </ScrollView>
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