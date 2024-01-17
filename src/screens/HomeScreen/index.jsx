import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  ScrollView,
  FlatList,
  StyleSheet,
  TouchableOpacity,
  Pressable,
} from "react-native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

import Chat from "./Chat";

import { Entypo } from "@expo/vector-icons";

import AnimatedModal from "../../components/Modal/Modal";

function HomeScreen({ navigation }) {
  const [settingModal, setSettingModal] = useState(false);
  let handlesettingmodal = () => {
    setSettingModal(!settingModal);
  };
  const Stack = createNativeStackNavigator();
  const [isModalVisible, setModalVisible] = useState(false);

  const toggleModal = () => {
    setModalVisible(!isModalVisible);
  };

  return (
    <>
      <View style={styles.container}>
        <Text style={styles.title}>SignaChat</Text>
        <TouchableOpacity>
          <Entypo
            onPress={() => {
              navigation.navigate("Camera");
            }}
            style={[styles.menuBtn, { paddingRight: 10 }]}
            name="camera"
            size={24}
            color="white"
          />
        </TouchableOpacity>

        <TouchableOpacity style={{ top: 30, left: 80 }} onPress={toggleModal}>
          <Entypo name="dots-three-vertical" size={24} color="white" />
        </TouchableOpacity>
        <AnimatedModal
          navigation={navigation}
          isVisible={isModalVisible}
          onClose={toggleModal}
        />
      </View>
      <Text
        style={{
          fontSize: 25,
          paddingTop: 10,
          paddingLeft: 50,
          paddingBottom: 10,
          color: "#ffff",
          fontWeight: "900",
          backgroundColor: "#F33F7F",
        }}
      >
        Chats
      </Text>
      <Chat />
      <TouchableOpacity
        style={{
          display: "flex",
          justifyContent: "flex-end",
          alignItems: "flex-end",
          position: "absolute",
          bottom: 30,
          left: 270,
          backgroundColor: "#F33F7F",
          borderRadius: 50,
          height: 60,
          width: 60,
          alignItems: "center",
          justifyContent: "center",
        }}
        onPress={() => navigation.push("AddContact")}
      >
        <Entypo name="new-message" size={30} color="white" />
      </TouchableOpacity>
    </>
  );
}

export default HomeScreen;

const styles = StyleSheet.create({
  container: {
    flex: 0.15,
    paddingTop: 20,
    display: "flex",
    flexDirection: "row",
    justifyContent: "center",
    backgroundColor: "#F33F7F",
  },
  title: {
    fontSize: 30,
    // left: 20,
    // position: "absolute",
    textAlign: "center",
    paddingTop: 20,
    color: "#ffffff",
    fontWeight: "900",
  },

  menuBtn: {
    top: 30,
    left: 60,
  },
  modal: {
    height: 200,
    width: 200,
    backgroundColor: "black",
  },
  msgBtn: {
    height: 60,
    width: 60,
    backgroundColor: "#F33F7F",
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 50,
    position: "absolute",
    top: "150%",
    left: 270,
    zIndex: 1,
  },
});
