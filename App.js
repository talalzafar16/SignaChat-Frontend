import "react-native-gesture-handler";
import { StatusBar } from "expo-status-bar";
import {
  MD3LightTheme as DefaultTheme,
  PaperProvider,
} from "react-native-paper";
import StackNavigator from "./src/navigator/stackNavigator";
import { NavigationContainer } from "@react-navigation/native";
import { Provider, useSelector } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";
import { store, persistor } from "./src/Redux/store";
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
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <PaperProvider theme={theme}>
          <NavigationContainer>
            <StackNavigator />
          </NavigationContainer>
          <StatusBar style="auto" />
        </PaperProvider>
      </PersistGate>
    </Provider>
  );
}
