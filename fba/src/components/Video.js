import * as ScreenOrientation from 'expo-screen-orientation'
import { Dimensions, ScrollView, StyleSheet, Text, View } from 'react-native'
import { Video } from 'expo-av'
import { setStatusBarHidden } from 'expo-status-bar'
import React, { useRef, useState } from 'react'
import VideoPlayer from 'expo-video-player'

export default function VideoCustom() {
  const [inFullscreen, setInFullsreen] = useState(false)
  const [inFullscreen2, setInFullsreen2] = useState(false)
  const refVideo = useRef(null)
  const refVideo2 = useRef(null)
  const refScrollView = useRef(null)

  return (
  
        <VideoPlayer
        
        videoProps={{
          style: {
            videoBackgroundColor: 'black',
            height: inFullscreen2 ? Dimensions.get('screen').width : 250,
            width: inFullscreen2 ? Dimensions.get('screen').height : 400,
            flex: 1
          },
          shouldPlay: false,
          resizeMode: Video.RESIZE_MODE_CONTAIN,
          source: {
            uri: 'http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4',
          },
          ref: refVideo2,
        }}
        fullscreen={{
          inFullscreen: inFullscreen2,
          enterFullscreen: async () => {
            setStatusBarHidden(true, 'fade')
            setInFullsreen2(!inFullscreen2)
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
        style={{
          videoBackgroundColor: 'black',
          height: inFullscreen2 ? Dimensions.get('screen').width : 250,
          width: inFullscreen2 ? Dimensions.get('screen').height : 400,
          flex: 1
        }}
      />

  )
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'blue',
    flex: 1
  },
  contentContainer: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  text: {
    marginTop: 36,
    marginBottom: 12,
  },
})


