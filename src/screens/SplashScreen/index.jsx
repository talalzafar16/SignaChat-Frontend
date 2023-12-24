import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View, Image, SafeAreaView } from "react-native";
import Logo from "../../../assets/logo/logo.png";
import large_red from "../../../assets/Home/large_red.png";
import small_red from "../../../assets/Home/small_red.png";
import large_pink from "../../../assets/Home/large_pink.png";
import small_pink from "../../../assets/Home/small_pink.png";
import medium_pink from "../../../assets/Home/medium_pink.png";
import { ActivityIndicator, MD2Colors, useTheme } from "react-native-paper";
import { useEffect } from "react";
import { useNavigation } from "@react-navigation/native";
export default function SplashScreen() {
  const theme = useTheme();
  const navigation = useNavigation();
  const styles = StyleSheet.create({
    LogoText: {
      color: theme.colors.primary,
      fontSize: 20,
      fontWeight: "700",
      marginTop: 10,
    },
    container: {
      flex: 1,
      backgroundColor: "rgba(0, 0, 0, 0.5)",
      zIndex: 100,
      backgroundColor: "#fff",
      alignItems: "center",
      justifyContent: "center",
    },
    LoaderContainer: {
      position: "absolute",
      bottom: "8%",
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
  });
  useEffect(() => {
    console.log("objejkct");
    const timeout = setTimeout(() => {
      navigation.navigate("Login");
    }, 3000);
    console.log("object");
    return () => clearTimeout(timeout);
  }, [navigation]);
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.container}>
        <Image style={styles.large_red} source={large_red} />
        <Image style={styles.large_pink} source={large_pink} />
        <Image style={styles.small_pink} source={small_pink} />
        <Image style={styles.small_red} source={small_red} />
        <Image style={styles.medium_pink} source={medium_pink} />
        <Image style={styles.Logo} source={Logo} />
        <View style={styles.LoaderContainer}>
          <ActivityIndicator
            size={36}
            animating={true}
            color={theme.colors.primary}
          />
          <Text style={styles.LogoText}>Loading...</Text>
        </View>
      </View>
    </SafeAreaView>
  );
}
