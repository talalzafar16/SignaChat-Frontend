import React, { useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  Modal,
  Animated,
  StyleSheet,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { Colors } from "../../config/colors";
const AnimatedModal = ({ isVisible, onClose, navigation }) => {
  const [animatedHeight] = useState(new Animated.Value(0));

  const openModal = () => {
    Animated.timing(animatedHeight, {
      toValue: 200, // Adjust the desired height of the modal
      duration: 300, // Adjust the duration of the animation
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
                paddingTop: 10,
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
                paddingTop: 3,
              }}
            >
              Setting
            </Text>
          </TouchableOpacity>
        </Animated.View>
        <Animated.View
          style={[styles.modalContainer, { height: animatedHeight }]}
        >
          {/* Content of your modal goes here */}
          <TouchableOpacity
            style={{
              position: "absolute",
              width: "100%",
            }}
          >
            <Text
              style={{
                color: "white",
                textAlign: "center",
                fontWeight: "500",
                fontSize: 19,
              }}
            >
              Logout
            </Text>
          </TouchableOpacity>
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
  },
});

export default AnimatedModal;
