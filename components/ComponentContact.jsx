import React, { useEffect, useState } from "react";
import { Text, Image, TouchableOpacity, StyleSheet } from "react-native";
import { ListItem, Avatar } from "react-native-elements";
import { useNavigation } from "@react-navigation/native";
import { useSelector } from "react-redux";
import { FontAwesome } from "@expo/vector-icons";

import {
  ALERT_TYPE,
  Dialog,
  AlertNotificationRoot,
  Toast,
} from "react-native-alert-notification";
import { DialogCustomColors } from "../src/config/colors";

function ComponentContact({ item, refetch, setRefetch }) {
  const InitialData = useSelector((state) => state.data);
  // console.log(InitialData);
  const [flag, setFlag] = useState(false);
  const AddContact = (id) => {
    fetch(
      `${process.env.EXPO_PUBLIC_SERVER_UR}api/v1/user/create-user-contact`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          userId: InitialData._id,
          contactId: id,
        }),
      }
    )
      .then((res) => res.json())
      .then((data) => {
        if (data.success) {
          Dialog.show({
            type: ALERT_TYPE.SUCCESS,
            title: "Added contact",
            textBody: "Happy Talking",
            button: "close",
          });
          setRefetch(!refetch);
          setFlag(true);
        }
      })
      .catch((error) => {
        console.error("Error:", error);
        Dialog.show({
          type: ALERT_TYPE.DANGER,
          title: "SERVER ERROR",
          textBody: error.message,
          button: "close",
        });
      });
    setRefetch(!refetch);
  };
  useEffect(() => {
    if (InitialData?.contacts) {
      InitialData?.contacts?.map((em) => {
        if (em.data._id == item._id) {
          setFlag(true);
        }
      });
    }
  });
  return (
    <ListItem bottomDivider>
      <Image
        source={{ uri: `data:image/jpeg;base64,${item.image}` }}
        style={{ width: 60, height: 60, borderRadius: 99 }}
      />
      <ListItem.Content>
        <ListItem.Title style={styles.listTitle}>{item?.name}</ListItem.Title>
        <ListItem.Subtitle>{item?.number}</ListItem.Subtitle>
      </ListItem.Content>
      {flag ? (
        <TouchableOpacity style={styles.btn}>
          <FontAwesome name="check" size={24} color="#ffffff" />
          <Text style={styles.btnTxt}>Added</Text>
        </TouchableOpacity>
      ) : (
        <TouchableOpacity
          onPress={() => AddContact(item._id)}
          style={styles.btn}
        >
          <Text style={styles.btnTxt}>Add to Contact</Text>
        </TouchableOpacity>
      )}
      <AlertNotificationRoot colors={[DialogCustomColors]} />
    </ListItem>
  );
}
export default ComponentContact;

const styles = StyleSheet.create({
  listTitle: {
    fontWeight: 900,
    paddingVertical: 10,
  },
  btn: {
    flexDirection: "row",
    height: 50,
    width: 120,
    backgroundColor: "#F33F7F",
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 50,
    position: "absolute",
    right: "6%",
  },
  btnTxt: {
    color: "#ffffff",
    fontSize: 15,
    fontWeight: "bold",
    paddingLeft: "5%",
  },
});
