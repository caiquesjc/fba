import React, { useEffect } from "react";
import * as ScreenOrientation from "expo-screen-orientation";
import { View, BackHandler, Dimensions, Text, Button } from "react-native";
import YoutubePlayer from "react-native-youtube-iframe";

export default function VideoPage({ navigation, route, videoId }) {
  const { classInf } = route.params;
  ScreenOrientation.lockAsync(
    ScreenOrientation.OrientationLock.LANDSCAPE_RIGHT
  );
  const backAction = async () => {
    navigation.goBack();
    ScreenOrientation.lockAsync(ScreenOrientation.OrientationLock.DEFAULT);
  };

  useEffect(() => {
    BackHandler.addEventListener("hardwareBackPress", backAction);

    return () =>
      BackHandler.removeEventListener("hardwareBackPress", backAction);
  }, []);

  if (!classInf.cla_video) {
    return (
      <View style={{ flex: 1, alignItems: "center", justifyContent: "center", backgroundColor: "#212121" }}>
        <Text style={{fontSize: 22, color: "#aaaaaa", marginBottom: 20}}>Houve um problema ao reproduzir o vídeo!</Text>
        <Button title="Voltar" color="#aaaaaa" onPress={() => backAction()}/>
      </View>
    );
  } else {
    return (
      <View style={{ flex: 1 }}>
        <YoutubePlayer
          height={Dimensions.get("screen").height}
          videoId={classInf.cla_video}
        />
      </View>
    );
  }
}
