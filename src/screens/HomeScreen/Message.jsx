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
import * as tf from "@tensorflow/tfjs";
import { ContactSupportOutlined } from "@mui/icons-material";

const MODEL_URL =
  "https://tensorflowjsrealtimemodel.s3.au-syd.cloud-object-storage.appdomain.cloud/model.json";

function Message({ navigation }) {
  const [image, setImage] = useState(null);
  const cameraRef = useRef(null);
  const [flash, setFlash] = useState(Camera.Constants.FlashMode.off);
  const [type, setType] = useState(CameraType.back);
  const [hasCameraPermission, setHasCameraPermission] = useState(null);

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

  if (hasCameraPermission == false) {
    return <Text>No access To camer</Text>;
  }
  function toggleCameraType() {
    setType((current) =>
      current === CameraType.back ? CameraType.front : CameraType.back
    );
  }

  useEffect(() => {
    (async () => {
      MediaLibrary.requestPermissionsAsync();

      const { status } = await Camera.requestPermissionsAsync();
      setHasPermission(status === "granted");
    })();
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
        makePrediction(data);
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
      {!image ? (
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
                  flash === Camera.Constants.FlashMode.off
                    ? "#ffffff"
                    : "#F33F7F"
                }
              />
            </TouchableOpacity>
          </View>
        </Camera>
      ) : (
        <Image source={{ uri: image }} style={styles.camera} />
      )}
      <View>
        {image ? (
          <View style={styles.imageBtn}>
            <MaterialCommunityIcons
              name="camera-retake"
              size={30}
              color="white"
              onPress={() => setImage(null)}
            />
            <MaterialCommunityIcons name="save-alt" size={30} color="white" />
          </View>
        ) : (
          <TouchableOpacity onPress={takePicture} style={styles.cameraBtn}>
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

// /* backgroundColor: '#000000',
//   alignItems: 'center',
//   paddingBottom: '10%'
//   */

// App.js
// import React, { useRef, useEffect } from "react";
// import { StyleSheet, Text, View, Dimensions } from "react-native";
// import { Camera } from "expo-camera";
// import * as tf from "@tensorflow/tfjs";
// import "@tensorflow/tfjs-react-native";
// import * as Expo from "expo";
// import * as ImageManipulator from "expo-image-manipulator";
// import { Image } from "react-native";

// // import { drawRect } from "./utilities";

// const { width, height } = Dimensions.get("window");

// const App = () => {
//   const cameraRef = useRef(null);

//   useEffect(() => {
//     runObjectDetection();
//   }, []);

//   const runObjectDetection = async () => {
//     await tf.ready();
//     const model = await tf.loadGraphModel(
//       "https://tensorflowjsrealtimemodel.s3.au-syd.cloud-object-storage.appdomain.cloud/model.json"
//     );
//     console.log("loaded");
//     const loop = async () => {
//       if (cameraRef.current) {
//         const photo = await cameraRef.current.takePictureAsync({
//           quality: 0.5,
//         });
//         console.log(photo);
//         const resizedPhoto = await ImageManipulator.manipulateAsync(
//           photo.uri,
//           [{ resize: { width: 640, height: 480 } }],
//           { compress: 0.5, format: ImageManipulator.SaveFormat.JPEG }
//         );
//         const imageElement = new Image();
//         imageElement.src = resizedPhoto.uri;
//         imageElement.onload = () => {
//           const tfImage = tf.browser.fromPixels(imageElement);
//           console.log(tfImage);

//           const expanded = tfImage.expandDims(0);
//           const obj = model.predict(expanded);

//           // Rest of your code...

//           tf.dispose(tfImage);
//           tf.dispose(expanded);
//           tf.dispose(obj);
//         };
//         // const tfImage = tf.browser.fromPixels({
//         //   data: new Uint32Array(resizedPhoto.width * resizedPhoto.height),
//         //   width: resizedPhoto.width,
//         //   height: resizedPhoto.height,
//         // });

//         // const predictResult = await model.predict(tf.browser.fromPixels(photo));
//         // const img = tf.browser.fromPixels(photo);

//         // const expanded = tfImage.expandDims(0);
//         // const obj = await model.executeAsync(expanded);
//         // console.log(obj, "object");
//         // const boxes = await obj[1].array();
//         //  /     const classes = await obj[2].array();
//         // const scores = await obj[4].array();
//         //
//         // const ctx = cameraRef.current._cameraRef._canvasContext; // Accessing internal canvas context

//         // ctx.clearRect(0, 0, width, height);

//         // drawRect(boxes[0], classes[0], scores[0], 0.8, ctx);

//         // tf.dispose(photo);
//         // tf.dispose(img);
//         // tf.dispose(expanded);
//         // tf.dispose(obj);
//       }

//       // requestAnimationFrame(loop);
//     };

//     loop();
//   };

//   return (
//     <View style={styles.container}>
//       <Camera
//         style={styles.camera}
//         ref={cameraRef}
//         type={Camera.Constants.Type.back}
//       />
//     </View>
//   );
// };

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     flexDirection: "column",
//   },
//   camera: {
//     flex: 1,
//   },
// });

// export default App;
