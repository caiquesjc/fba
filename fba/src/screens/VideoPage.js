import * as ScreenOrientation from "expo-screen-orientation";
import { Dimensions, BackHandler, View } from "react-native";
import { Video } from "expo-av";
import React, { useEffect, useRef } from "react";
import VideoPlayer from "expo-video-player";

export default function VideoPage({ videoUrl, navigation }) {
  const refVideo = useRef(null);

  ScreenOrientation.lockAsync(ScreenOrientation.OrientationLock.LANDSCAPE_RIGHT);

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
    <View style={{flex: 1, backgroundCOlor: "blue"}}>
    <VideoPlayer
      videoProps={{
        shouldPlay: false,
        resizeMode: Video.RESIZE_MODE_CONTAIN,
        source: {
          uri: "http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4",
        },
        ref: refVideo,
      }}
      style={{
        videoBackgroundColor: "black",
        height: Dimensions.get("screen").width,
        width: Dimensions.get("screen").height,
        flex: 1,
      }}
      fullscreen={{
        inFullscreen: true,
        exitFullscreen: async () => {
          navigation.goBack();
          await ScreenOrientation.lockAsync(
            ScreenOrientation.OrientationLock.DEFAULT
          );
        },
      }}
    />
    </View>
  );
}
