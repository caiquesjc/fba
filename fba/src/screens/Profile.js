import React from "react";

import { View, Text, StyleSheet, Image, Dimensions, TouchableOpacity } from "react-native"

const minhaFoto = "https://avatars.githubusercontent.com/u/54915913?v=4"

export default function Profile() {
    return (
        <View style={styles.conatiner}>
            <View style={styles.containerImage}>
                <Image source={{uri: minhaFoto}} style={styles.image}/>
            </View>

            <View style={styles.containerInf}> 
                <Text style={styles.text}>Nome: Caique Nascimento</Text>
                <Text style={styles.text}>Idade: 20</Text>
                <Text style={styles.text}>Email: caiquemiguelde@gmail.com</Text>
                <Text style={styles.text}>Senha: ******</Text>
                <Text style={styles.text}>Outra Info</Text>
            </View>

            <View style={styles.containerLogout}>
                <TouchableOpacity style={styles.buttonLogout}>
                    <Text style={{color: "#212121", fontSize: 24}}>Sair</Text>
                </TouchableOpacity>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    conatiner: {
        flex: 1,
        alignItems: "center",
        justifyContent: "space-around",
        backgroundColor: "#212121"
    },
    containerImage: {
        width: "20%",
        height: "20%",
        alignItems: "center",
        marginTop: 20
    },
    image: {
        width: Dimensions.get("screen").width * 0.5,
        height: Dimensions.get("screen").width * 0.5,
        borderRadius: 100,
        borderWidth: 5,
        borderColor: "#aaa",
    },
    containerInf: {
        height: "auto",
        width: "90%",
        marginTop: 20,
        justifyContent: "flex-start"
    },
    text: {
        fontSize: 20,
        color: "#aaa",
        padding: 10,
    },
    containerLogout: {
        alignItems: "flex-end",
         width: "90%"
    },
    buttonLogout: {
        width: "30%",
        backgroundColor: "#aaa",
        alignItems: "center",
        borderRadius: 10,
        padding: 5,
        marginBottom: 10
    }
})