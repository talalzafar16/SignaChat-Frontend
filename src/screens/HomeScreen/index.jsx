import React, { useState } from "react";
import {
  View,
  Text,
  ScrollView,
  FlatList,
  StyleSheet,
  TouchableOpacity,
  Pressable,
} from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { Screen } from "react-native-screens";
import Chat from "./Chat";
import Message from "./Message";
import { FontAwesome5 } from "@expo/vector-icons";
import { Entypo } from "@expo/vector-icons";
import { color } from "react-native-elements/dist/helpers";
import AddContact from "../AddContact";

function HomeScreen({ navigation }) {
  const Tab = createMaterialTopTabNavigator();
  const [settingModal, setSettingModal] = useState(false);
  let handlesettingmodal = () => {
    setSettingModal(!settingModal);
  };
  return (
    <>
      <View style={styles.container}>
        <Text style={styles.title}>SignaChat</Text>
        <Pressable
          onPress={() => {
            navigation.navigate("Search");
          }}
        >
          <FontAwesome5
            style={styles.searchBtn}
            name="search"
            size={24}
            color="white"
          />
        </Pressable>
        <TouchableOpacity onPress={handlesettingmodal}>
          <Entypo
            style={styles.menuBtn}
            name="dots-three-vertical"
            size={24}
            color="white"
          />
        </TouchableOpacity>
      </View>

      <Tab.Navigator
        screenOptions={{
          tabBarActiveTintColor: "#ffffff",
          tabBarStyle: {
            backgroundColor: "#F33F7F",
            borderBottomColor: "#ffffff",
          },
        }}
      >
        <Tab.Screen name="Chat" component={Chat} />
        <Tab.Screen
          name="Camera"
          component={Message}
          options={{
            tabBarIcon: ({ color, size }) => (
              <Entypo name="camera" size={24} color="white" />
            ),
            tabBarLabel: () => null,
          }}
        />
      </Tab.Navigator>
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
  searchBtn: {
    top: 30,
    left: 40,
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
});
