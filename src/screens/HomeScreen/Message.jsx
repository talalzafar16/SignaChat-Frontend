import React, { useEffect, useRef, useState } from "react";
import {
  View,
  Text,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  Image,
} from "react-native";
import { Entypo } from "@expo/vector-icons";
import { Camera, CameraType } from "expo-camera";
import * as MediaLibrary from "expo-media-library";
import { Ionicons } from "@expo/vector-icons";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { useFocusEffect } from "@react-navigation/native";

function Message() {
  // const[hasCameraPermission, ] = useState(null);
  const [image, setImage] = useState(null);
  const cameraRef = useRef(null);
  const [flash, setFlash] = useState(Camera.Constants.FlashMode.off);
  const [type, setType] = useState(CameraType.back);
  const [hasCameraPermission, setHasCameraPermission] =
    Camera.useCameraPermissions();
  function toggleCameraType() {
    setType((current) =>
      current === CameraType.back ? CameraType.front : CameraType.back
    );
  }
  useEffect(() => {
    const requestPermissions = async () => {
      const { status } = await Camera.requestCameraPermissionsAsync();
      setHasCameraPermission(status === "granted");
    };

    requestPermissions();
  }, []);

  useFocusEffect(
    React.useCallback(() => {
      // Handle any setup you need when the screen is focused
      return () => {
        // Clean up any resources when the screen is unfocused
      };
    }, [])
  );

  const takePicture = async () => {
    if (cameraRef) {
      try {
        const data = await cameraRef.current.takePictureAsync();
        console.log(data);
        setImage(data.uri);
      } catch (e) {
        console.log(e);
      }
    }
  };

  const savePicture = async () => {
    if (image) {
      try {
        await MediaLibrary.createAssetAsync(image);
        alert("Picture saved successfully");
        setImage(null);
      } catch (e) {
        console.log(e);
      }
    }
  };

  return (
    <View style={styles.container}>
      {/* {!image ? ( */}
      <Camera
        style={styles.camera}
        type={type}
        FlashMode={flash}
        ref={cameraRef}
      >
        <Text>Hellos</Text>
        <View style={styles.changeCameraBtn}>
          <Ionicons
            name="camera-reverse"
            size={30}
            color="white"
            onPress={toggleCameraType}
          />
        </View>
        <View style={styles.flashBtn}>
          <TouchableOpacity
            onPress={() => {
              setFlash(
                flash === Camera.Constants.FlashMode.off
                  ? Camera.Constants.FlashMode.on
                  : Camera.Constants.FlashMode.off
              );
            }}
          >
            <Ionicons
              name="flash"
              size={30}
              color={
                flash === Camera.Constants.FlashMode.off ? "#ffffff" : "#F33F7F"
              }
            />
          </TouchableOpacity>
        </View>
      </Camera>
      {/* ) */}
      {/*: (
        <Image source={{ uri: image }} style={styles.camera} />
      )}
      <View>
        {image ? (
          <View style={style.imageBtn}>
            <MaterialCommunityIcons
              name="camera-retake"
              size={30}
              color="white"
              onPress={() => setImage(null)}
            />
            <MaterialIcons name="save-alt" size={30} color="white" />
          </View>
        ) : (
          <TouchableOpacity style={styles.cameraBtn}>
            <Ionicons name="radio-button-on" size={80} color="white" />
          </TouchableOpacity>
        )}
      </View> */}
    </View>
  );
}

export default Message;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
  },
  camera: {
    flex: 1,
    position: "relative",
  },
  cameraBtn: {
    position: "absolute",
    bottom: 16,
    right: "37.5%",
    zIndex: 1,
  },
  imageBtn: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingHorizontal: 50,
  },
  changeCameraBtn: {
    position: "absolute",
    bottom: 40,
    right: "80%",
    zIndex: 1,
  },
  flashBtn: {
    position: "absolute",
    bottom: 40,
    left: "80%",
    zIndex: 1,
  },
});

/* backgroundColor: '#000000',
alignItems: 'center',
paddingBottom: '10%'
*/
