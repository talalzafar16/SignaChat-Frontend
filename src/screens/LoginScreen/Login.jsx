import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  Image,
  ImageBackground,
  TextInput,
  ScrollView,
  TouchableOpacity,
} from "react-native";
import {
  ALERT_TYPE,
  Dialog,
  AlertNotificationRoot,
  Toast,
} from "react-native-alert-notification";

import { Feather, Ionicons, MaterialIcons } from "@expo/vector-icons";
import { Colors, DialogCustomColors } from "../../config/colors";

function Login({ navigation }) {
  const [phoneNumber, setPhoneNumber] = useState("");
  const handleSubmit = () => {
    if (phoneNumber.length == 11) {
      console.log(process.env.EXPO_PUBLIC_SERVER_UR);
      fetch(`http://192.168.43.7:8000/api/v1/auth/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ number: phoneNumber }),
      })
        .then((res) => res.json())
        .then((data) => {
          if (data.success) {
            console.log(data.existingUser, "inn data");
            navigation.navigate("OTP", {
              number: phoneNumber,
              // existingUser: data.existingUser,
              existingUser: false,
            });
          } else {
            Dialog.show({
              type: ALERT_TYPE.DANGER,
              title: "INVALID",
              textBody: "Invalid phone number",
              button: "close",
            });
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
    } else {
      Dialog.show({
        type: ALERT_TYPE.DANGER,
        title: "INVALID",
        textBody: "Please enter a valid phone number",
        button: "close",
      });
    }
  };

  return (
    <ScrollView
      contentContainerStyle={styles.container}
      keyboardDismissMode="on-drag"
    >
      <ImageBackground
        style={{
          flex: 1,
          alignItems: "center",
          justifyContent: "start",
        }}
        resizeMode="repeat"
        source={require("../../../assets/TermsAndCondition/background.png")}
      >
        <Text style={styles.heading}>
          Welcome to <Text style={styles.link}>SignaChat</Text>{" "}
        </Text>
        <Image
          style={styles.image}
          source={require("../../../assets/logo/Login.png")}
          resizeMode="contain"
        />
        <View style={styles.login}>
          <Text style={styles.text2}>Enter phone number to continue..</Text>
          <View style={styles.loginInput}>
            <Feather name="phone" size={24} color="#F33F7F" />
            <TextInput
              maxLength={11}
              style={styles.loginPhone}
              value={phoneNumber}
              onChangeText={(text) => setPhoneNumber(text)}
              keyboardType="phone-pad"
              placeholder="xxxxxxxxxxx"
            />
          </View>
          <TouchableOpacity style={styles.btn} onPress={handleSubmit}>
            <Text style={styles.txt}>
              Next{" "}
              <MaterialIcons name="navigate-next" size={20} color="#F33F7F" />
            </Text>
          </TouchableOpacity>
          <AlertNotificationRoot colors={[DialogCustomColors]} />
        </View>
      </ImageBackground>
    </ScrollView>
  );
}

export default Login;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  image: {
    marginTop: 10,
    marginBottom: 10,
    height: 320,
    width: 420,
    padding: 0,
  },
  heading: {
    fontSize: 36,
    fontWeight: "bold",
    textAlign: "center",
    marginTop: 70,
  },
  link: {
    color: "#F33F7F",
  },
  login: {
    backgroundColor: Colors.primary,
    display: "flex",
    flexDirection: "column",
    paddingTop: 30,
    paddingBottom: 30,

    justifyContent: "center",
    alignItems: "center",
    width: 300,
    borderTopLeftRadius: 30,
    borderBottomRightRadius: 30,
  },
  loginHeading: {
    fontSize: 30,
    color: "#ffffff",
    padding: 20,
    fontWeight: "bold",
  },
  loginInput: {
    flexDirection: "row",
    paddingHorizontal: 10,
    backgroundColor: "#ffffff",
    width: "80%",
    fontSize: 22,
    padding: 10,
    alignItems: "center",
    // borderRadius: 20,
  },
  loginPhone: {
    paddingLeft: 16,
    fontSize: 20,
  },
  btn: {
    padding: 6,
    marginTop: 24,
    width: 140,
    backgroundColor: "#ffffff",
    borderRadius: 10,
  },
  text: {
    alignItems: "center",
    justifyContent: "center",
    padding: 10,
  },
  text2: {
    // alignItems: "center",
    // justifyContent: "center",
    padding: 4,
    color: "white",
    textAlign: "center",
    marginBottom: 17,
    fontSize: 18,
  },
  txt: {
    fontSize: 22,
    textAlign: "center",
    display: "flex",

    alignItems: "center",
    justifyContent: "center",
    color: Colors.primary,
  },
});
