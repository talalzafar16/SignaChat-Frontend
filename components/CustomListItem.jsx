import React, { useLayoutEffect, useState } from "react";
import {
  View,
  Text,
  ScrollView,
  StyleSheet,
  RefreshControl,
  FlatList,
} from "react-native";
import { ListItem } from "react-native-elements";

import { useFocusEffect, useNavigation } from "@react-navigation/native";
import { useEffect } from "react";
import { Image } from "react-native";
import { useDispatch, useSelector } from "react-redux";
import { Colors } from "../src/config/colors";
import { updateUser } from "../src/Redux/reducres";

function CustomListItem() {
  const [chatData, setChatData] = useState([]);
  const InitialData = useSelector((state) => state.data);

  const [refresh, Setrefresh] = useState(false);
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const fetchData = async () => {
    try {
      fetch(
        `${process.env.EXPO_PUBLIC_SERVER_UR}api/v1/user/get-user-contacts/${InitialData._id}`,
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
            dispatch(updateUser({ contacts: data.user }));
          }
        });
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };
  let abc = () => {
    Setrefresh(true);
    fetchData();
    setTimeout(() => {
      Setrefresh(false);
    }, 600);
  };
  useEffect(() => {
    fetchData();
  }, [navigation]);

  const renderItem = ({ item }) => (
    <ScrollView
      refreshControl={<RefreshControl onRefresh={abc} refreshing={refresh} />}
    >
      <ListItem
        bottomDivider
        onPress={() => {
          navigateToChatScreen(item);
        }}
      >
        <Image
          source={{ uri: `data:image/jpeg;base64,${item?.data.image}` }}
          style={{ width: 60, height: 60, borderRadius: 99 }}
        />
        <ListItem.Content>
          <ListItem.Title style={{ fontWeight: 800 }}>
            {item?.data?.name}
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
            <ListItem.Subtitle
              numberOfLines={1}
              ellipsizeMode="tail"
              style={styles.date}
            >
              {new Date(item?.createdAt).getUTCHours()}:
              {new Date(item?.createdAt).getUTCMinutes()}
            </ListItem.Subtitle>
          </View>
        </ListItem.Content>
      </ListItem>
    </ScrollView>
  );

  const keyExtractor = (item) => item._id;

  const navigateToChatScreen = (item) => {
    navigation.navigate("ChatScreen", {
      name: item?.data?.name,
      image: item?.data?.image,
      id: item?.data?._id,
      number: item?.data?.number,
      gender: item?.data?.gender,
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

  date: {
    position: "absolute",
    left: "80%",
  },
});
