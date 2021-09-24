import React, { useState, useRef } from 'react';

import * as ScreenOrientation from 'expo-screen-orientation';


import { StyleSheet, Dimensions } from 'react-native';
import { Video } from 'expo-av'
import VideoPlayer from 'expo-video-player'
import { setStatusBarHidden } from 'expo-status-bar'


export default function TestVideo() {
    const [inFullscreen, setInFullsreen] = useState(false)
    const [inFullscreen2, setInFullsreen2] = useState(false)
    const refVideo = useRef(null)
    const refVideo2 = useRef(null)
    const [widthVideo, setWidthVideo] = useState(400)
    const [heightVideo, setHeightVideo] = useState(250)
    return (
        <VideoPlayer
        defaultControlsVisible="true"
        timeVisible={true}
        slider={true}
        shouldPlay={true}
        style={{width: widthVideo, height: heightVideo, }}
        fullscreen={{
            inFullscreen: inFullscreen2,
            enterFullscreen: async () => {
              setStatusBarHidden(true, 'fade')
              setInFullsreen2(!inFullscreen2)
              setHeightVideo(Dimensions.get("screen").height)
              setWidthVideo(Dimensions.get("screen").width)
              await ScreenOrientation.lockAsync(ScreenOrientation.OrientationLock.LANDSCAPE_LEFT)
              refVideo2.current.setStatusAsync({
                shouldPlay: true,
              })
            },
            exitFullscreen: async () => {
              setStatusBarHidden(false, 'fade')
              setInFullsreen2(!inFullscreen2)
              await ScreenOrientation.lockAsync(ScreenOrientation.OrientationLock.DEFAULT)
            },
          }}
        videoProps={{
        shouldPlay: true,
        resizeMode: Video.RESIZE_MODE_CONTAIN,
        // ❗ source is required https://docs.expo.io/versions/latest/sdk/video/#props
        source: {
        uri: 'http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4',
        },

  }}
/>
    
    )
}


       var styles = StyleSheet.create({
        backgroundVideo: {
          position: 'absolute',
          top: 0,
          left: 0,
          bottom: 0,
          right: 0,
        },
      });