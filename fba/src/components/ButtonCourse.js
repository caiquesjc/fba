import React from "react"
import { View, Text, StyleSheet, TouchableOpacity, Dimensions } from "react-native"

export default function ButtonCourse({onPress, name, time, description, nivel}) {

    return (
        <View style={styles.container}>
            <TouchableOpacity onPress={onPress}>
                <View style={{flexDirection: "row", justifyContent: "space-between", margin: 10}}>
                    <Text style={{fontSize: 18, fontWeight: "bold"}}>Nome do Curso</Text>
                    <Text>Tempo do Curso: 1hr</Text>
                </View>
                <View style={{flexDirection: "row", justifyContent: "space-between", margin: 10}}>
                    <Text>Alguma info que nao sei ainda</Text>
                    <Text style={{fontWeight: "bold"}}>Básico</Text>
                </View>
            </TouchableOpacity>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        //alignItems: "center",
        justifyContent: "center",
        backgroundColor: "#aaa",
        width: Dimensions.get("window").width * 0.95,
        padding: 10,
        borderRadius: 10,
        margin: 10
    }
})