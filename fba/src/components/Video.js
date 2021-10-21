import React from "react";
import { View } from "react-native";
import YoutubePlayer from "react-native-youtube-iframe";

export default function Video({ videoId }) {

  return (
    <View style={{flex: 1}}>
      <YoutubePlayer
        height={300}
        videoId={videoId ? videoId : "iee2TATGMyI"}
      />
    </View>
  );
}