import SplashScreen from "../screens/SplashScreen";
import LoginScreen from "../screens/LoginScreen/Login";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { NavigationContainer } from "@react-navigation/native";
import TermAndCondition from "../screens/TermAndCondition";
import OTP from "../screens/OTP";
import HomeScreen from "../screens/HomeScreen";
import Profile from "../screens/ProfileScreen";
import AddContact from "../screens/AddContact";
import Search from "../screens/SearchScreen";
import Setting from "../screens/SettingScreen";
import ChatScreen from "../screens/ChatScreen";
import CustomListItem from "../../components/CustomListItem";
import RegisterScreen from "../screens/RegitserScreen";
import Chat from "../screens/HomeScreen/Chat";
import Message from "../screens/HomeScreen/Message";
import { useSelector } from "react-redux";
export default function StackNavigator() {
  const Stack = createNativeStackNavigator();
  const InitialData = useSelector((state) => state.data);
  return (
    <Stack.Navigator
      screenOptions={{ headerShown: false }}
      initialRouteName={InitialData.name ? "Home" : "Login"}
    >
      <Stack.Screen name="Splash" component={SplashScreen} />
      <Stack.Screen name="Login" component={LoginScreen} />
      <Stack.Screen name="Register" component={RegisterScreen} />
      <Stack.Screen name="TermAndCondition" component={TermAndCondition} />
      <Stack.Screen
        name="OTP"
        component={OTP}
        options={{ headerShown: true }}
      />
      <Stack.Screen name="Home" component={HomeScreen} />
      <Stack.Screen name="ListItem" component={CustomListItem} />
      <Stack.Screen name="Search" component={Search} />
      <Stack.Screen name="Setting" component={Setting} />
      <Stack.Screen name="AddContact" component={AddContact} />
      <Stack.Screen
        name="Profile"
        component={Profile}
        options={{ headerShown: true }}
      />
      <Stack.Screen
        name="ChatScreen"
        component={ChatScreen}
        options={{ headerShown: true }}
      />
      <Stack.Screen name="Chat" component={Chat} />
      <Stack.Screen
        name="Camera"
        component={Message}
        options={{
          tabBarIcon: ({ color, size }) => (
            <Entypo name="camera" size={24} color="white" />
          ),
          tabBarLabel: () => null,
        }}
      />
    </Stack.Navigator>
  );
}
