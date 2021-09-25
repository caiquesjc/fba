import React from "react"
import { View, Text, StyleSheet, TouchableOpacity, Dimensions } from "react-native"

export default function ButtonClass({classInf, navigation}) {

    return (
        <View style={styles.container}>
            <TouchableOpacity
                onPress={() => navigation.navigate("Class", {classInf})}
                //onPress={() => console.log(classInf.cla_name)}
            >
                <View style={{flexDirection: "row", justifyContent: "space-between", margin: 10}}>
                    <Text style={{fontSize: 18, fontWeight: "bold"}}>{classInf.cla_name}</Text>
                    <Text>Tempo da Aula: {classInf.cla_duration}hr</Text>
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
        //width: Dimensions.get("window").width * 0.95,
        padding: 10,
        borderRadius: 10,
        marginTop: 10
    }
})