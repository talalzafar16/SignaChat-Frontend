import React from "react";
import { View, Text, ScrollView, StyleSheet, Pressable, TouchableOpacity } from "react-native";
import CustomListItem from "../../../components/CustomListItem";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { Entypo } from '@expo/vector-icons';
import AddContact from "../AddContact";
import ChatScreen from "../ChatScreen";

function Chat({navigation}){
    const Stack = createNativeStackNavigator();
    return(
        <>
        <View >
            <CustomListItem navigation={navigation}/>
                <TouchableOpacity style={styles.msgBtn} onPress={()=>navigation.navigate("AddContact")}>
                    <Entypo name="new-message" size={30} color="#ffffff" />
                </TouchableOpacity>
                <Stack.Navigator screenOptions={{headerStyle: {backgroundColor: '#F33F7F'}, headerTintColor: '#ffffff'}}>
                    <Stack.Screen name="AddContact" component={AddContact}/>
                    <Stack.Screen name="ChatScreen" component={ChatScreen} />
                </Stack.Navigator>
        </View>
        
        </>
    );
};

export default Chat;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        position: 'relative'
    }, 
    msgBtn: {
        height: 60,
        width: 60,
        backgroundColor: '#F33F7F',
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 50,
        position: 'absolute',
        top: '150%',
        left: 270,
        zIndex: 1
    }
});