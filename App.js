import "react-native-gesture-handler";
import { StatusBar } from "expo-status-bar";
import {
  MD3LightTheme as DefaultTheme,
  PaperProvider,
} from "react-native-paper";
import StackNavigator from "./src/navigator/stackNavigator";
import { NavigationContainer } from "@react-navigation/native";

const theme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    primary: "#F33F7F",
    secondary: "#ffffff",
    primaryLight: "#fccfdf",
  },
};

export default function App() {
  return (
    <PaperProvider theme={theme}>
      <NavigationContainer>
        <StackNavigator />
      </NavigationContainer>
      <StatusBar style="auto" />
    </PaperProvider>
  );
}
