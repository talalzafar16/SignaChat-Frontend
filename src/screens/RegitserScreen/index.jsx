import React, { useState } from "react";
// import FileSystem from "fs";
import * as FileSystem from "expo-file-system";
import {
  StyleSheet,
  Text,
  View,
  Image,
  TextInput,
  Touchable,
  TouchableOpacity,
  KeyboardAvoidingView,
} from "react-native";
import { ActivityIndicator, MD2Colors, useTheme } from "react-native-paper";
import { Ionicons } from "@expo/vector-icons";
import {
  ALERT_TYPE,
  Dialog,
  AlertNotificationRoot,
  Toast,
} from "react-native-alert-notification";

import { Colors, DialogCustomColors } from "../../config/colors";
import * as ImagePicker from "expo-image-picker";
import { updateUser } from "../../Redux/reducres";
import { useDispatch, useSelector } from "react-redux";
export default function LoginScreen({ navigation, route }) {
  const { number } = route.params;
  // number = 879809807;
  const dispatch = useDispatch();
  const theme = useTheme();
  const [selectedGender, setSelectedGender] = useState(null);
  const [loading, setLoading] = useState(false);
  const [name, setName] = useState("");
  const [image, setImage] = useState(null);
  const selectedGenderOption = (option) => {
    setSelectedGender(selectedGender === option ? null : option);
  };
  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });
    console.log(result);

    if (!result.canceled) {
      console.log(result.assets[0].uri);

      setImage(result.assets[0].uri);
    }
  };
  const handleNextPress = async ({}) => {
    setLoading(true);
    if (!selectedGender || !name || !image) {
      Dialog.show({
        type: ALERT_TYPE.DANGER,
        title: "Empty Fields",
        textBody: "Please fill all fields",
        button: "close",
      });
      setLoading(false);
    } else {
      const base64 = await FileSystem.readAsStringAsync(image, {
        encoding: "base64",
      });
      fetch(`${process.env.EXPO_PUBLIC_SERVER_UR}api/v1/auth/register`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          number: number,
          name,
          image: base64,
          gender: selectedGender,
        }),
      })
        .then((res) => res.json())
        .then((data) => {
          if (data.success) {
            dispatch(updateUser(data.user));

            Dialog.show({
              type: ALERT_TYPE.SUCCESS,
              title: "Welocome",
              textBody: "Successfully Registered",
              button: "Move in",
            });
            navigation.navigate("Home");
          } else {
            Dialog.show({
              type: ALERT_TYPE.DANGER,
              title: "INVALID",
              textBody: "Invalid Detailsr",
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
      setLoading(false);
    }
  };
  const styles = StyleSheet.create({
    LogoText: {
      color: theme.colors.primary,
      fontSize: 20,
      fontWeight: "700",
      marginTop: 10,
    },
    container: {
      flex: 1,
      flexDirection: "column",
      backgroundColor: "#fff",
      alignItems: "center",
      justifyContent: "center",
    },
    LoaderContainer: {
      position: "absolute",
      bottom: "10%",
    },
    Logo: {
      width: 300,
      height: 300,
      borderRadius: 999,
      position: "absolute",
    },
    large_red: {
      width: 270,
      position: "absolute",
      right: 0,
      objectFit: "contain",
      height: 200,
      bottom: "8%",
    },
    large_pink: {
      width: 300,
      position: "absolute",
      right: 10,
      objectFit: "contain",
      height: 140,
      top: "16%",
    },
    medium_pink: {
      width: 160,
      position: "absolute",
      left: 90,
      objectFit: "contain",
      height: 80,
      top: "26%",
    },
    small_pink: {
      width: 49,
      position: "absolute",
      left: 90,
      objectFit: "contain",
      height: 40,
      zIndex: 99999,
      bottom: "30%",
    },
    small_red: {
      width: 24,
      zIndex: 99999,
      position: "absolute",
      right: 100,
      objectFit: "contain",
      height: 30,
      top: "40%",
    },
    Input: {
      height: 40,
      margin: 12,
      width: 200,
      borderLeftWidth: 0,
      borderRightWidth: 0,
      borderTopColor: theme.colors.primary,
      borderBottomColor: theme.colors.primary,
      borderWidth: 1,
      padding: 10,
    },
    heading: {
      fontSize: 32,
      fontStyle: "italic",
      color: Colors.primary,
      fontWeight: "700",
      paddingBottom: 10,
    },
    text: {
      fontSize: 16,
      fontWeight: "400",
      padding: 20,
      textAlign: "center",
    },
    countryPickerButton: {
      marginTop: 10,
      width: 280,
      justifyContent: "center",
      alignItems: "center",
      borderWidth: 1,
      borderBottomColor: theme.colors.primary,
      borderLeftWidth: 0,
      borderRightWidth: 0,
      borderTopColor: 0,
    },
    selectedCountry: {
      marginTop: 20,
      fontSize: 16,
    },
    selectedCountryCode: {
      height: 40,
      margin: 12,
      width: 50,
      borderLeftWidth: 0,
      borderRightWidth: 0,
      borderTopColor: theme.colors.primary,
      borderBottomColor: theme.colors.primary,
      borderWidth: 1,
      padding: 10,
    },
    display: {
      display: "flex",
      flexDirection: "row",
      justifyContent: "space-between",
      marginTop: 20,
    },
    activityIndicator: {
      justifyContent: "center",
      alignItems: "center",
    },
    loadingBackground: {
      backgroundColor: "rgba(0, 0, 0, 0.1)", // Grey background color with 50% opacity
    },
    name: {
      flexDirection: "row",
      width: "80%",
      height: 40,
      borderColor: theme.colors.primary,
      borderWidth: 1,
      paddingHorizontal: 10,
      borderRadius: 50,
    },
    profileImage: {
      paddingTop: 40,
      paddingBottom: 20,
    },
    gender: {
      marginTop: 30,
      flexDirection: "row",
      justifyContent: "space-evenly",
      borderColor: theme.colors.primary,
      borderWidth: 2,
      width: "80%",
      height: 50,
      borderRadius: 50,
    },
    genderOption: {
      flexDirection: "row",
      justifyContent: "center",
      alignItems: "center",
    },
    selectedGenderOption: {
      backgroundColor: theme.colors.primary,
      color: theme.colors.secondary,
      flex: 2,
    },
  });
  return (
    <KeyboardAvoidingView
      style={[styles.container, loading && styles.loadingBackground]}
    >
      <Text style={styles.heading}>New Here ??</Text>
      <Text style={{ color: "black", fontSize: 23 }}>
        Lets create your profile{" "}
      </Text>

      <TouchableOpacity style={styles.profileImage} onPress={pickImage}>
        {image ? (
          <Image
            source={{ uri: image }}
            style={{ width: 140, height: 140, borderRadius: 99 }}
          />
        ) : (
          <Image
            style={{ height: 100, width: 100 }}
            source={require("../../../assets/profile/default.png")}
          />
        )}
      </TouchableOpacity>
      <View style={styles.name}>
        <Ionicons
          style={{ padding: 5 }}
          name="person"
          size={24}
          color={theme.colors.primary}
        />
        <TextInput
          style={{ paddingLeft: 5 }}
          value={name}
          onChangeText={(text) => setName(text)}
          placeholder="Name"
        />
      </View>
      <View style={styles.gender}>
        <TouchableOpacity
          style={[
            styles.genderOption,
            selectedGender === "Male" && styles.selectedGenderOption,
            selectedGender === "Male" && {
              borderTopLeftRadius: 50,
              borderBottomLeftRadius: 50,
            },
          ]}
          onPress={() => selectedGenderOption("Male")}
        >
          <Ionicons
            name="male"
            size={28}
            color={
              selectedGender === "Male"
                ? theme.colors.secondary
                : theme.colors.primary
            }
          />
          <Text
            style={{
              padding: 10,
              fontSize: 18,
              color:
                selectedGender === "Male"
                  ? theme.colors.secondary
                  : theme.colors.primary,
            }}
          >
            Male
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[
            styles.genderOption,
            selectedGender === "Female" && styles.selectedGenderOption,
            selectedGender === "Female" && {
              borderTopRightRadius: 50,
              borderBottomRightRadius: 50,
            },
          ]}
          onPress={() => selectedGenderOption("Female")}
        >
          <Ionicons
            name="female"
            size={28}
            color={
              selectedGender === "Female" ? Colors.secondary : Colors.primary
            }
          />
          <Text
            style={{
              padding: 10,
              fontSize: 18,
              color:
                selectedGender === "Female" ? Colors.secondary : Colors.primary,
            }}
          >
            Female
          </Text>
        </TouchableOpacity>
      </View>
      <Text style={styles.text}>
        <Text
          style={{
            color: Colors.primary,
            textAlign: "center",
          }}
        >
          {" "}
          Dont Worry!...
        </Text>
        We've got your information covered. Your privacy is our priority.
      </Text>
      {/* <CountryPicker
        {...{
          countryCode: selectedCountry?.cca2,
          onSelect: onCountrySelect,
          withFlag: true,
          withFilter: true,
          withCountryNameButton: true,
          withAlphaFilter: true,
          withCallingCode: true,
          withEmoji: true,
          containerButtonStyle: styles.countryPickerButton,
        }}
      />
      {selectedCountry && (
        <View style={styles.display}>
          <Text style={styles.selectedCountryCode}>
            +{selectedCountry?.callingCode[0]}
          </Text>
          <TextInput
            style={styles.Input}
            value={phoneNumber}
            onChange={(text) => {
              setPhoneNumber(text);
            }}
            placeholder="xxx-xxxxxxx"
            keyboardType="numeric"
            keyboardAppearance="dark"
            maxLength={11}
          />
        </View>
      )} */}
      {/* <Text
        style={{
          fontSize: 12,
          fontWeight: 400,
          color: theme.colors.primary,
        }}
      >
        Careeres Charges May Apply
      </Text> */}
      <View style={styles.LoaderContainer}>
        <TouchableOpacity
          style={{
            paddingTop: 10,
            paddingBottom: 10,
            paddingLeft: 40,
            paddingRight: 40,

            backgroundColor: Colors.primary,
            color: Colors.secondary,
          }}
          onPress={handleNextPress}
          disabled={loading}
        >
          <Text
            style={{
              color: theme.colors.secondary,
            }}
          >
            Next
          </Text>
        </TouchableOpacity>
        <AlertNotificationRoot colors={[DialogCustomColors]} />
      </View>

      <View style={styles.activityIndicator}>
        {loading && (
          <ActivityIndicator
            size={36}
            animating={true}
            color={theme.colors.primary}
          />
        )}
        {loading && <Text style={styles.LogoText}>Loading...</Text>}
      </View>
    </KeyboardAvoidingView>
  );
}
