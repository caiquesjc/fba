import * as ScreenOrientation from "expo-screen-orientation";
import { Dimensions, BackHandler } from "react-native";
import { Video } from "expo-av";
import React, { useEffect, useRef } from "react";
import VideoPlayer from "expo-video-player";

export default function VideoPage({ videoUrl, navigation }) {
  const refVideo = useRef(null);

  ScreenOrientation.lockAsync(ScreenOrientation.OrientationLock.LANDSCAPE_LEFT);

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
        height: Dimensions.get("window").width,
        width: Dimensions.get("window").height,
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
  );
}
