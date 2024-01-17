import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Video } from 'react-native-video';

const VideoCard = ({ title, videoFileName }) => {

  return (
    <View style={styles.card}>
      <Video
        source={{uri:videoFileName}}
        style={styles.video}
        controls={true}
        resizeMode="cover"
      />
      <View style={styles.textContainer}>
        <Text style={styles.title}>{title}</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: 'white',
    borderRadius: 8,
    overflow: 'hidden',
    margin: 8,
  },
  video: {
    width: '100%',
    aspectRatio: 16 / 9,
  },
  textContainer: {
    padding: 16,
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
  },
});

export default VideoCard;
