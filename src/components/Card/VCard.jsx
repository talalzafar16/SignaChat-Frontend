import React, { useRef, useState } from "react";
import { View, Text, StyleSheet } from "react-native";
import { Video, ResizeMode } from "expo-av";

const VideoCard = ({ title, videoFileName }) => {
  const videoRef = useRef(null);
  const [isPlaying, setIsPlaying] = useState(true);

  const onPlaybackStatusUpdate = (status) => {
    if (status.didJustFinish) {
      // Video has finished playing, restart it
      videoRef.current.replayAsync();
    }
  };

  return (
    <View style={styles.card}>
      <Video
        ref={videoRef}
        source={{
          uri: videoFileName,
        }}
        style={styles.video}
        resizeMode={ResizeMode.CONTAIN}
        shouldPlay={isPlaying}
        onPlaybackStatusUpdate={onPlaybackStatusUpdate}
        
      />
      <View style={styles.textContainer}>
        <Text style={styles.title}>{title}</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: "white",
    borderRadius: 8,
    overflow: "hidden",
    margin: 8,
    height:190,
  },
  video: {
    width: "100%",
    aspectRatio: 15 / 7,
  },
  textContainer: {
    padding: 1,
  },
  title: {
    fontSize: 18,
    fontWeight: "bold",
    textAlign: "center",
  },
});

export default VideoCard;
