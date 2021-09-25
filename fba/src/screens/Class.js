import React, { useState } from "react"
import { View, Text, StyleSheet, TouchableOpacity, Dimensions, ScrollView, Alert, Button } from "react-native"

import VideoCustom from "../components/Video"


import ButtonClass from "../components/ButtonClass"


export default function Class({ route, navigation }) {
    let [sizeDescription, setSizeDescription] = useState(80)
    let [txtBtnDesc, setTxtBtnDesc] = useState("Ver mais")

    const { classInf } = route.params
    return (
        <View style={styles.container}>
            <View style={styles.video}> 
                <VideoCustom/>
            </View>

            <ScrollView style={{backgroundColor: "#212121", width: "90%"}}>
            <Text style={{fontSize: 24, padding: 10, color: "#aaa"}}>{classInf.cla_name}</Text>
            <View style={{height: sizeDescription,backgroundColor: "#212121"}}>
                <Text style={{textAlign: "justify", fontSize: 16, padding: 5, marginBottom: 10, color: "#aaa"}}>
                    {classInf.cla_description}
                </Text>
            </View>
            <View style={{justifyContent: "flex-end", flexDirection: "row", alignItems: "flex-end", backgroundColor: "#212121"}}>
            
            <TouchableOpacity onPress={() => {
                //bug tem que clicar no ver mais duas vezes
                sizeDescription == 80 ? setSizeDescription("auto") : setSizeDescription(80)
                txtBtnDesc == "Ver mais" ? setTxtBtnDesc("Ver menos") : setTxtBtnDesc("Ver mais")
                
                }}>
                <Text style={{color: "#aaa", marginTop: 5}}>{txtBtnDesc}</Text>
            </TouchableOpacity>
            </View>
            </ScrollView>

            


            <View style={{backgroundColor: "#212121", width: "90%", height: 90, paddingBottom: 10}}>
                <ButtonClass classInf={classInf}/>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: "space-between",
        alignItems: "center",
        backgroundColor: "#212121"
    },
    video: {
        width: 400,
        height: 250
    },
    backgroundVideo: {
        height: "auto"
      },
})