import React, { useLayoutEffect, useState } from "react";
import { View, Text, ScrollView, StyleSheet, FlatList } from "react-native";
import { ListItem } from "react-native-elements";

import { useNavigation } from "@react-navigation/native";
import { useEffect } from "react";
import { Image } from "react-native";
import { useSelector } from "react-redux";
import { Colors } from "../src/config/colors";

function CustomListItem() {
  const [chatData, setChatData] = useState([]);
  const InitialData = useSelector((state) => state.data);
  const navigation = useNavigation();

  useEffect(() => {
    fetch(
      `http://192.168.43.7:8000/api/v1/user/get-user-contacts/${InitialData._id}`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      }
    )
      .then((res) => res.json())
      .then((data) => {
        if (data.success) {
          setChatData(data.user);
        }
      });
  }, [navigation]);
  //   const chatData = [
  //     {
  //       id: "1",
  //       name: "Bajwa",
  //       message: "I'm gonna smash your boy ",
  //       avatar: Ali,
  //     },
  //     {
  //       id: "2",
  //       name: "Khabib",
  //       message: "If you wanna find me, Send me location.",
  //       avatar: Khabib,
  //     },
  //     {
  //       id: "3",
  //       name: "Khamzat",
  //       message: "I'm coming for everybody, kill everybody",
  //       avatar: Khamzat,
  //     },
  //     // Add more chat items as needed
  //   ];

  const renderItem = ({ item }) => (
    <ListItem
      bottomDivider
      onPress={() => {
        navigateToChatScreen(item);
      }}
    >
      <Image
        source={{ uri: item.data.image }}
        style={{ width: 60, height: 60, borderRadius: 99 }}
      />
      <ListItem.Content>
        <ListItem.Title style={{ fontWeight: 800 }}>
          {item.data.name}
        </ListItem.Title>
        <View
          style={{
            display: "flex",
            flexDirection: "row",
            justifyContent: "space-between",
          }}
        >
          <ListItem.Subtitle numberOfLines={1} ellipsizeMode="tail">
            {item.content}
          </ListItem.Subtitle>
          <ListItem.Subtitle numberOfLines={1} ellipsizeMode="tail">
            {new Date(item.createdAt).getUTCHours()}:
            {new Date(item.createdAt).getUTCMinutes()}
          </ListItem.Subtitle>
        </View>
      </ListItem.Content>
    </ListItem>
  );

  const keyExtractor = (item) => item._id;

  const navigateToChatScreen = (item) => {
    navigation.navigate("ChatScreen", {
      name: item.data.name,
      image: item.data.image,
      id: item.data._id,
    });
  };

  return (
    <>
      {chatData.length > 0 ? (
        <FlatList
          data={chatData}
          renderItem={renderItem}
          keyExtractor={keyExtractor}
        />
      ) : (
        <Text
          style={{
            color: Colors.primary,
            fontSize: 27,
            textAlign: "center",
            fontWeight: "bold",
            paddingTop: 80,
          }}
        >
          No Chats
        </Text>
      )}
    </>
  );
}
export default CustomListItem;

const styles = StyleSheet.create({
  container: {},
});
