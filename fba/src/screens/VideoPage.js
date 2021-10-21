import React, {useEffect} from "react";
import * as ScreenOrientation from "expo-screen-orientation";
import { View, BackHandler, Dimensions } from "react-native";
import YoutubePlayer from "react-native-youtube-iframe";

export default function VideoPage({ navigation, route, videoId }) {
  const { classInf } = route.params;
  console.log(classInf)
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


  return (
    <View style={{ flex: 1 }}>
      <YoutubePlayer
        height={Dimensions.get("screen").height}
        videoId={classInf.cla_video}
      />
    </View>
  );
}

