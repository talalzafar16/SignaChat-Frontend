import React, { useEffect, useRef, useState } from "react";
import {
  View,
  Text,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  Image,
} from "react-native";
// import { Video } from "expo";
import { Camera, CameraType } from "expo-camera";
import * as MediaLibrary from "expo-media-library";
import { Ionicons } from "@expo/vector-icons";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import * as tf from "@tensorflow/tfjs";
import { Video, ResizeMode } from "expo-av";

const MODEL_URL =
  "https://tensorflowjsrealtimemodel.s3.au-syd.cloud-object-storage.appdomain.cloud/model.json";

function Message({ navigation }) {
  const [image, setImage] = useState(null);
  const cameraRef = useRef(null);
  const [isRecording, setIsRecording] = useState(false);
  const [videoUri, setVideoUri] = useState(null);
  const [flash, setFlash] = useState(Camera.Constants.FlashMode.off);
  const [type, setType] = useState(CameraType.back);
  const [hasCameraPermission, setHasCameraPermission] = useState(null);
  const [hasMicPermission, setHasMicPermission] = useState(null);

  const loadModel = async () => {
    console.log("loading model ");
    const model = await tf.loadGraphModel(MODEL_URL);
    g("connected");

    return model;
  };
  const makePrediction = async (imageData) => {
    const model = await loadModel();
    const imageTensor = tf.browser.fromPixels(imageData);
    const prediction = model.predict(imageTensor);
    console.log("prediction: ", prediction);
  };

  // if (hasCameraPermission == undefined || hasMicPermission == undefined) {
  //   return <Text>No access To camer</Text>;
  // }
  function toggleCameraType() {
    setType((current) =>
      current === CameraType.back ? CameraType.front : CameraType.back
    );
  }
  const startRecording = async () => {
    if (cameraRef) {
      try {
        setIsRecording(true);
        const videoRecordPromise = cameraRef.current
          .recordAsync()
          .then((data) => {
            setVideoUri(data.uri);
            setIsRecording(false);
          });
        // const data = await videoRecordPromise;
        // console.log("Video recording complete:", data);
      } catch (error) {
        console.error("Error recording video:", error);
      }
    }
  };
  const stopRecording = () => {
    if (cameraRef) {
      cameraRef.current.stopRecording();
      setIsRecording(false);
    }
  };
  useEffect(() => {
    (async () => {
      MediaLibrary.requestPermissionsAsync();

      const camerPerm = await Camera.getCameraPermissionsAsync();
      const micPerm = await Camera.getMicrophonePermissionsAsync();
      setHasCameraPermission(camerPerm.status === "granted");
      setHasMicPermission(camerPerm.status === "granted");
    })();
  }, []);

  const takePicture = async () => {
    if (cameraRef) {
      try {
        const data = await cameraRef.recordAsync();
        console.log(data);
        // setImage(data.uri);
        // makePrediction(data);
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
      {!videoUri ? (
        <Camera
          style={styles.camera}
          type={type}
          FlashMode={flash}
          ref={cameraRef}
        >
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
                  flash === Camera.Constants.FlashMode.off
                    ? "#ffffff"
                    : "#F33F7F"
                }
              />
            </TouchableOpacity>
          </View>
        </Camera>
      ) : (
        <Video
          source={{ uri: videoUri }}
          style={styles.camera}
          looping
          resizeMode={ResizeMode.CONTAIN}
          useNativeControls
        />
      )}
      <View>
        {videoUri ? (
          <View style={styles.imageBtn}>
            <MaterialCommunityIcons
              name="camera-retake"
              size={30}
              color="white"
              onPress={() => setVideoUri(null)}
            />
            <Ionicons name="send" size={24} color="white" />
          </View>
        ) : isRecording ? (
          <TouchableOpacity onPress={stopRecording} style={styles.cameraBtn}>
            <Ionicons name="radio-button-on" size={80} color="red" />
          </TouchableOpacity>
        ) : (
          <TouchableOpacity onPress={startRecording} style={styles.cameraBtn}>
            <Ionicons name="radio-button-on" size={80} color="white" />
          </TouchableOpacity>
        )}
      </View>
    </View>
  );
}

export default Message;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    backgroundColor: "black",
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
    paddingVertical: 26,
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
