import SplashScreen from "../screens/SplashScreen";
import LoginScreen from "../screens/LoginScreen";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { NavigationContainer } from "@react-navigation/native";
import TermAndCondition from "../screens/TermAndCondition";
import OTP from "../screens/OTP";
import HomeScreen from "../screens/HomeScreen";
import AddContact from "../screens/AddContact";
import Search from "../screens/SearchScreen";
import Setting from "../screens/SettingScreen";
import ChatScreen from "../screens/ChatScreen";
import CustomListItem from "../../components/CustomListItem";
import Login from "../screens/LoginScreen/Login";


export default function StackNavigator() {
  const Stack = createNativeStackNavigator();
  return (
    <Stack.Navigator
      screenOptions={{ headerShown: false }}
      initialRouteName="Login1"
    >
      <Stack.Screen name="Splash" component={SplashScreen} />
      <Stack.Screen name="Login" component={LoginScreen} />
      <Stack.Screen name="Login1" component={Login} />
      <Stack.Screen name="TermAndCondition" component={TermAndCondition} />
      <Stack.Screen name="OTP" component={OTP} options={{headerShown: true}}/>
      <Stack.Screen name="Home" component={HomeScreen} />
      <Stack.Screen name="ListItem" component={CustomListItem} />
      <Stack.Screen name="AddContact" component={AddContact} />
      <Stack.Screen name="Search" component={Search} />
      <Stack.Screen name="Setting" component={Setting} />
      <Stack.Screen name="ChatScreen" component={ChatScreen} options={{headerShown: true}}/>
    </Stack.Navigator>
  );
}
