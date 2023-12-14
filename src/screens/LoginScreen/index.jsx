import {
  StyleSheet,
  Text,
  View,
  Image,
  TextInput,
  Touchable,
  TouchableOpacity,
} from "react-native";
import Logo from "../../../assets/logo/logo.png";
import large_red from "../../../assets/Home/large_red.png";
import small_red from "../../../assets/Home/small_red.png";
import large_pink from "../../../assets/Home/large_pink.png";
import small_pink from "../../../assets/Home/small_pink.png";
import medium_pink from "../../../assets/Home/medium_pink.png";
import { ActivityIndicator, MD2Colors, useTheme } from "react-native-paper";
export default function LoginScreen({ navigation }) {
  const theme = useTheme();
  const styles = StyleSheet.create({
    LogoText: {
      color: theme.colors.primary,
      fontSize: 20,
      fontWeight: "700",
      marginTop: 10,
    },
    container: {
      flex: 1,
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
  });
  return (
    <View style={styles.container}>
      <Text style={{ fontSize: 20, fontWeight: 700 }}>
        Enter Your Phone Number
      </Text>
      <Text style={{ fontSize: 12, fontWeight: 400 }}>
        SignaChat will need to verify your phone number
      </Text>
      <TextInput
        style={styles.Input}
        placholder="xxx-xxxxxxx"
        keyboardType="numeric"
        keyboardAppearance="dark"
        maxLength={11}
      />
      <Text
        style={{
          fontSize: 12,
          fontWeight: 400,
          color: theme.colors.primary,
        }}
      >
        Careeres Charges May Apply
      </Text>
      <View style={styles.LoaderContainer}>
        <TouchableOpacity
          style={{
            paddingTop: 10,
            paddingBottom: 10,
            paddingLeft: 40,
            paddingRight: 40,
            backgroundColor: theme.colors.primary,
            color: theme.colors.secondary,
          }}
          onPress={() => navigation.navigate("Splash")}
        >
          <Text
            style={{
              color: theme.colors.secondary,
            }}
          >
            Next
          </Text>
        </TouchableOpacity>
        {/* <ActivityIndicator
          size={36}
          animating={true}
          color={theme.colors.primary}
        /> */}
        {/* <Text style={styles.LogoText}>Loading...</Text> */}
      </View>
    </View>
  );
}
