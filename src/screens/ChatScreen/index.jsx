import React, { useEffect, useLayoutEffect, useState } from "react";
import {
  Text,
  View,
  StyleSheet,
  ImageBackground,
  TextInput,
  TouchableOpacity,
  KeyboardAvoidingView,
  ScrollView,
} from "react-native";
import { Avatar } from "react-native-elements";
import backgroundImage from "../../../assets/TermsAndCondition/background.png";
import { Entypo, MaterialIcons } from "@expo/vector-icons";
import { Image } from "react-native";
import { useSelector } from "react-redux";
import socket from "../../utils/socket";
import MessageComponent from "../../components/widgets/MessageComponenet";
import { FlatList } from "react-native";

function ChatScreen({ navigation, route }) {
  const InitialData = useSelector((state) => state.data);
  const name = route.params.name;
  const image = route.params.image;
  const recieverId = route.params.id;
  const [chatMessages, setChatMessages] = useState([]);

  const [message, setMessage] = useState("");
  const fetchMessages = () => {
    fetch(`${process.env.EXPO_PUBLIC_SERVER_UR}api/v1/user/recieve-message`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        senderId: InitialData._id,
        recieverId: recieverId,
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.success) {
          setChatMessages(data.user);
        }
      });
  };
  useEffect(() => {
    fetchMessages();
    socket.emit("setup", recieverId + InitialData._id);
    socket.emit("setup", InitialData._id + recieverId);
    socket.on("connected", () => console.log("connected"));
  }, []);

  const sendMessage = () => {
    fetch(`${process.env.EXPO_PUBLIC_SERVER_UR}api/v1/user/send-message`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        senderId: InitialData._id,
        recieverId: recieverId,
        content: message,
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.success) {
        }
      });
    socket.emit("new message", {
      senderId: InitialData._id,
      recieverId,
      content: message,
      createdAt: new Date(),
    });
  };
  useEffect(() => {
    socket.on("message received", (newMessageRecieved) => {
      if (chatMessages) {
        if (
          newMessageRecieved?.createdAt != chatMessages[-1]?.createdAt &&
          newMessageRecieved?.content != chatMessages[-1]?.content
        ) {
          console.log(chatMessages[1]?.content);
          setChatMessages([...chatMessages, newMessageRecieved]);
          setMessage("");
        }
      }
    });
  });
  useLayoutEffect(() => {
    navigation.setOptions({
      headerTintColor: "#ffffff",
      headerStyle: { backgroundColor: "#F33F7F" },
      headerTitleAlign: "left",
      headerTitle: () => (
        <View style={styles.header}>
          <Image
            source={{ uri: image }}
            style={{ width: 40, height: 40, borderRadius: 99 }}
          />
          <Text style={styles.headerTxt}>{name}</Text>
          {/* <TouchableOpacity
            style={{
              left: 0,
              position: "absolute",
              backgroundColor: "blue",
            }}
          >
            <Entypo
              style={styles.menuBtn}
              name="dots-three-vertical"
              size={24}
              color="white"
            />
          </TouchableOpacity> */}
        </View>
      ),
    });
  }, [navigation]);
  return (
    <KeyboardAvoidingView style={styles.container}>
      <View style={styles.scrollViewContent} keyboardDismissMode="on-drag">
        <ImageBackground
          style={styles.backgroundImage}
          source={backgroundImage}
          resizeMode="covxer"
        >
          <View style={{ padding: 10, paddingBottom: 60 }}>
            {chatMessages[0] ? (
              <FlatList
                data={chatMessages}
                renderItem={({ item }) => (
                  <MessageComponent item={item} user={InitialData._id} />
                )}
                keyExtractor={(item) => item.id}
              />
            ) : (
              ""
            )}
          </View>

          <View style={styles.inputMsg}>
            <TouchableOpacity>
              <Entypo name="emoji-happy" size={24} color="black" />
            </TouchableOpacity>
            <TextInput
              style={styles.msg}
              value={message}
              onChangeText={(text) => setMessage(text)}
              placeholder="Message"
              multiline={true}
            />
          </View>
          <TouchableOpacity onPress={() => sendMessage()} style={styles.record}>
            <MaterialIcons name="keyboard-voice" size={24} color="white" />
          </TouchableOpacity>
        </ImageBackground>
      </View>
    </KeyboardAvoidingView>
  );
}

export default ChatScreen;

const styles = StyleSheet.create({
  header: {
    flexDirection: "row",
    alignItems: "center",
  },
  headerTxt: {
    marginLeft: 10,
    fontSize: 18,
    fontWeight: "bold",
    color: "#ffffff",
  },
  container: {
    flex: 1,
  },
  scrollViewContent: {
    flexGrow: 1,
  },
  backgroundImage: {
    flex: 1,
    resizeMode: "cover",
    justifyContent: "center",
    position: "relative",
  },
  inputMsg: {
    backgroundColor: "#ffffff",
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 8,
    width: "70%",
    marginHorizontal: 20,
    position: "absolute",
    bottom: 20,
    zIndex: 1,
    borderColor: "#F33F7F",
    borderWidth: 1,
    borderRadius: 50,
    paddingHorizontal: 10,
  },
  msg: {
    paddingHorizontal: 10,
    fontSize: 18,
  },
  record: {
    position: "absolute",
    alignItems: "center",
    justifyContent: "center",
    bottom: 20,
    right: 20,
    height: 50,
    width: 50,
    backgroundColor: "#F33F7F",
    borderRadius: 50,
  },
});
