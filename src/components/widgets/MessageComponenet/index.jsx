import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import React from "react";
import { Ionicons } from "@expo/vector-icons";
import { Colors } from "../../../config/colors";

export default function MessageComponent({ item, user }) {
  const status = item.senderId !== user;

  return (
    <View>
      <View
        style={
          status
            ? styles.mmessageWrapper
            : [styles.mmessageWrapper, { alignItems: "flex-end" }]
        }
      >
        <TouchableOpacity
          style={{ flexDirection: "row", alignItems: "center" }}
        >
          {/* <Ionicons
            name="person-circle-outline"
            size={30}
            color="black"
            style={styles.mavatar}
          /> */}
          <View
            style={
              status
                ? styles.mmessage
                : [
                    styles.mmessage,
                    {
                      backgroundColor: Colors.primary,
                      borderBottomLeftRadius: 30,
                      borderBottomRightRadius: 0,
                    },
                  ]
            }
          >
            <Text style={{ color: "white" }}>{item.content}</Text>
            <Text
              style={{
                marginTop: 3,
                color: "#625D5D",
                textAlign: !status ? "right" : "left",
              }}
            >
              {new Date(item.createdAt).getUTCHours()}:
              {new Date(item.createdAt).getUTCMinutes()}
            </Text>
          </View>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  mmessageWrapper: {
    width: "100%",
    alignItems: "flex-start",
    marginBottom: 15,
  },
  mmessage: {
    minWidth: "40%",
    maxWidth: "76%",
    backgroundColor: "#008080",
    padding: 15,
    // borderRadius: 10,
    marginBottom: 2,
    borderBottomRightRadius: 30,
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    borderBottomLeftRadius: 0,
    // borderBottomRightRadius: 50,
  },
  mvatar: {
    marginRight: 5,
  },
});
