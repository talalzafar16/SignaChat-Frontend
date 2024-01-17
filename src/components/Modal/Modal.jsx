import React, { useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  Modal,
  Animated,
  StyleSheet,
} from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";

import { Colors, DialogCustomColors } from "../../config/colors";

import {
  ALERT_TYPE,
  Dialog,
  AlertNotificationRoot,
  Toast,
} from "react-native-alert-notification";
import { persistor } from "../../Redux/store";
import { useDispatch } from "react-redux";
import { logoutUser } from "../../Redux/reducres";
const AnimatedModal = ({ isVisible, onClose, navigation }) => {
  const [animatedHeight] = useState(new Animated.Value(0));
  const dispatch = useDispatch();
  const openModal = () => {
    Animated.timing(animatedHeight, {
      toValue: 200,
      duration: 300,
      useNativeDriver: false,
    }).start();
  };

  const closeModal = () => {
    Animated.timing(animatedHeight, {
      toValue: 0,
      duration: 300,
      useNativeDriver: false,
    }).start(() => onClose());
  };
  const Logout = async () => {
    try {
      dispatch(logoutUser());
      // await AsyncStorage.clear();
      // await AsyncStorage.removeItem("persist:root");
      // await persistor.purge();
      console.log("AsyncStorage cleared successfully!");

      Dialog.show({
        type: ALERT_TYPE.SUCCESS,
        title: "Successfull Logged out",
        textBody: "See You Soonn!",
        button: "close",
        onPressButton: () => {
          console.log("Close button pressed!");
          navigation.navigate("Login");
        },
      });
    } catch (error) {
      console.error("Error clearing AsyncStorage:", error);
    }
  };

  return (
    <Modal
      transparent
      visible={isVisible}
      animationType="slide"
      onRequestClose={closeModal}
    >
      <TouchableOpacity
        style={styles.modalOverlay}
        activeOpacity={1}
        onPress={closeModal}
      >
        <Animated.View
          style={[
            styles.modalContainer,
            { backgroundColor: "white", padding: 40, height: animatedHeight },
          ]}
        >
          {/* Content of your modal goes here */}
          <TouchableOpacity
            onPress={() => navigation.navigate("Profile")}
            style={{
              position: "absolute",
              width: "100%",
            }}
          >
            <Text
              style={{
                color: Colors.primary,
                backgroundColor: "white",
                textAlign: "center",
                width: "100%",
                paddingTop: 14,
                fontWeight: "500",
                fontSize: 19,
              }}
            >
              Looking For More Features
              {/* <br /> */}
            </Text>
            <Text
              style={{
                color: Colors.primary,
                backgroundColor: "white",
                textAlign: "center",
                width: "100%",
                paddingTop: 6,
                fontWeight: "500",
                fontSize: 19,
              }}
            >
              Here you goo!
            </Text>
          </TouchableOpacity>
        </Animated.View>
        <Animated.View
          style={[styles.modalContainer, { height: animatedHeight }]}
        >
          {/* Content of your modal goes here */}
          <TouchableOpacity
            onPress={() => navigation.navigate("Profile")}
            style={{
              position: "absolute",
              width: "100%",
            }}
          >
            <Text
              style={{
                color: "white",
                textAlign: "center",
                paddingTop: 14,
                fontWeight: "500",
                fontSize: 19,
              }}
            >
              Profile
            </Text>
          </TouchableOpacity>
        </Animated.View>
        <Animated.View
          style={[styles.modalContainer, { height: animatedHeight }]}
        >
          {/* Content of your modal goes here */}
          <TouchableOpacity style={{ position: "absolute", width: "100%" }}>
            <Text
              style={{
                color: "white",
                textAlign: "center",
                fontWeight: "500",
                fontSize: 19,
                paddingTop: 7,
              }}
            >
              Sign language Dictionary
            </Text>
          </TouchableOpacity>
        </Animated.View>
        <Animated.View
          style={[
            styles.modalContainer,
            {
              backgroundColor: "red",

              height: animatedHeight,
            },
          ]}
        >
          {/* Content of your modal goes here */}
          <TouchableOpacity
            onPress={Logout}
            style={{
              position: "absolute",
              width: "100%",
            }}
          >
            <Text
              style={{
                color: "white",
                backgroundColor: "red",
                textAlign: "center",
                fontWeight: "500",
                paddingTop: 7,
                fontSize: 19,
              }}
            >
              Logout
            </Text>
          </TouchableOpacity>
          <AlertNotificationRoot colors={[DialogCustomColors]} />
        </Animated.View>
      </TouchableOpacity>
    </Modal>
  );
};

const styles = StyleSheet.create({
  modalOverlay: {
    flex: 1,
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    justifyContent: "center",
    alignItems: "center",
  },
  modalContainer: {
    backgroundColor: Colors.primary,
    width: "80%",
    padding: 23,
    display: "flex",
    // justifyContent: "center",
    alignItems: "center",
  },
});

export default AnimatedModal;
