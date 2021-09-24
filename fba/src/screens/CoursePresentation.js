import React, { useState } from "react"
import { View, Text, StyleSheet, TouchableOpacity, Dimensions, ScrollView, Alert, Button } from "react-native"

import VideoCustom from "../components/Video"


import ButtonClass from "../components/ButtonClass"
export default function CoursePresentation({ navigation }) {
    let [sizeDescription, setSizeDescription] = useState(80)
    let [txtBtnDesc, setTxtBtnDesc] = useState("Ver mais")
    return (
        <View style={styles.container}>
            <View style={styles.video}> 
                <VideoCustom/>
            </View>

            <ScrollView style={{backgroundColor: "pink", width: "90%"}}>
            <Text style={{fontSize: 24, padding: 10}}>Título</Text>
            <View style={{height: sizeDescription,backgroundColor: "pink"}}>
                <Text style={{textAlign: "justify", fontSize: 16, padding: 5, marginBottom: 10}}>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Morbi non arcu nunc. Maecenas cursus enim sit amet ex consectetur imperdiet. In sit amet urna auctor, auctor leo sit amet, venenatis diam. Suspendisse placerat eros nibh. Quisque tempus, lectus in rhoncus rutrum, arcu libero suscipit dolor, non molestie enim erat in felis. Curabitur ullamcorper mattis placerat. Ut dapibus, leo ut cursus facilisis, neque augue mollis nibh, at euismod nulla eros vitae nibh. Proin a tortor a nulla lacinia mattis at eu eros. Pellentesque non sem eget magna elementum hendrerit eget eget ex. Nulla sit amet velit molestie, tristique tortor viverra, laoreet massa. Quisque cursus, mauris id finibus volutpat, est mauris auctor velit, a tempus dolor massa ac urna. Quisque non venenatis purus. In ornare purus faucibus dapibus fermentum. Vivamus dolor quam, consequat non viverra ac, venenatis sit amet libero.</Text>
            </View>
            <View style={{justifyContent: "flex-end", flexDirection: "row", alignItems: "flex-end", backgroundColor: "#fff"}}>
            
            <TouchableOpacity onPress={() => {
                //bug tem que clicar no ver mais duas vezes
                sizeDescription == 80 ? setSizeDescription("auto") : setSizeDescription(80)
                txtBtnDesc == "Ver mais" ? setTxtBtnDesc("Ver menos") : setTxtBtnDesc("Ver mais")
                
                }}>
                <Text>{txtBtnDesc}</Text>
            </TouchableOpacity>
            </View>
            </ScrollView>
            

            <ScrollView style={{backgroundColor: "pink", width: "90%"}}>
                <Text>Aulas</Text>
            <View>
              <ButtonClass onPress={() => Alert.alert("caique")}/> 
              <ButtonClass/> 
              <ButtonClass/> 
              <ButtonClass/> 
            </View>
            </ScrollView>
            
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: "space-between",
        alignItems: "center"
    },
    video: {
        width: Dimensions.get("window").width * 0.9,
        height: Dimensions.get("window").height * 0.3,
        margin: 10,
        backgroundColor: "cyan"
    },
    backgroundVideo: {
        height: "auto"
      },
})