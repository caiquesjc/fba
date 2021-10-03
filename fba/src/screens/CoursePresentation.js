import React, { useState, useEffect } from "react"
import { View, Text, StyleSheet, TouchableOpacity, ScrollView, FlatList, Dimensions, SafeAreaView } from "react-native"

import VideoCustom from "../components/Video"
import Loading from "../components/Loading"

import api from "../services/api"


import ButtonClass from "../components/ButtonClass"
export default function CoursePresentation({ route, navigation }) {
    const [sizeDescription, setSizeDescription] = useState(80)
    const [txtBtnDesc, setTxtBtnDesc] = useState("Ver mais")
    const [data, setData] = useState([])
    const [loading, setLoading] = useState(true)

    const {courseInf } = route.params


    function getClass() {
        return(
            useEffect(() => {
                api.get(`/class/class-by-course/${courseInf.cou_id}`)
                .then((res) => {
                    setData(res.data.data);
                    setLoading(false);
                })
            },[])
        )
    }

    getClass()

    if(loading)
    return <Loading/>
    return (
        <SafeAreaView style={styles.container}>
        <View style={styles.container}>
            <View style={styles.video}> 
                <VideoCustom/>
            </View>

            <ScrollView style={{backgroundColor: "#212121", width: "90%"}}>
            <Text style={{fontSize: 24, padding: 10, color: "#aaa"}}>{courseInf.cou_name}</Text>
            <View style={{height: sizeDescription,backgroundColor: "#212121"}}>
                <Text style={{textAlign: "justify", fontSize: 16, padding: 5, marginBottom: 10, color: "#aaa"}}>
                    {courseInf.cou_description}
                </Text>
            </View>
            
            <View style={{justifyContent: "flex-end", flexDirection: "row", alignItems: "flex-end", backgroundColor: "#212121"}}>
            
            <TouchableOpacity 
                onPress={() => {
                sizeDescription == 80 ? setSizeDescription("auto") : setSizeDescription(80)
                txtBtnDesc == "Ver mais" ? setTxtBtnDesc("Ver menos") : setTxtBtnDesc("Ver mais")
                
                }}>
                <Text style={{color: "#aaa", marginTop: 5}}>{txtBtnDesc}</Text>
            </TouchableOpacity>
            </View>
            </ScrollView>
            
                <Text style={{fontSize: 24, padding: 10, color: "#aaa"}}>Aulas</Text>

                {data.length > 0 ? 
                <FlatList
                style={{backgroundColor: "#212121", width: "90%"}}
                data={data}
                renderItem={({ item }) => (
                    <ButtonClass
                        classInf={item}
                        navigation={navigation}
                    />
                )}
                keyExtractor={(item, index) => index.toString()}
                showsVerticalScrollIndicator={false}
            /> : <View style={{width: "90%", alignItems: "center", justifyContent: "center", flex: 1}}><Text style={{fontSize: 24,color: "#aaa"}}>Este curso não possui aulas</Text></View>}
            
        </View>
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: "space-between",
        alignItems: "center",
        paddingBottom: 10,
        backgroundColor: "#212121",
        width: "100%"
    },
    video: {
        width: Dimensions.get("window").width,
        height: 250,
        margin: 10,
    },
    backgroundVideo: {
        height: "auto"
      },
})