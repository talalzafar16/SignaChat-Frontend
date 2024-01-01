import React, { useLayoutEffect } from "react";
import { View, Text, ScrollView, StyleSheet, FlatList } from "react-native";
import { ListItem } from "react-native-elements";
import { Avatar } from "react-native-elements/dist/avatar/Avatar";
import Ali from "../assets/avatars/ali.png";
import Khabib from "../assets/avatars/Khabib.png";
import Khamzat from "../assets/avatars/khamzat.png";
import { useNavigation } from "@react-navigation/native";

function CustomListItem(){

    const navigation = useNavigation();
    const chatData = [
        { id: '1', name: 'Bajwa', message: "I'm gonna smash your boy ", avatar: Ali },
        { id: '2', name: 'Khabib', message: 'If you wanna find me, Send me location.', avatar: Khabib },
        { id: '3', name: 'Khamzat', message: "I'm coming for everybody, kill everybody", avatar: Khamzat },
        // Add more chat items as needed
      ];

    const renderItem = ({item})=>(
        <ListItem bottomDivider onPress={()=> {navigateToChatScreen(item)}}>
            <Avatar
            rounded
            source={item.avatar}
            />
            <ListItem.Content>
                <ListItem.Title style={{fontWeight: 800}}>
                    {item.name}
                </ListItem.Title>
                <ListItem.Subtitle numberOfLines={1} ellipsizeMode="tail">
                    {item.message}
                </ListItem.Subtitle>
            </ListItem.Content>
        </ListItem>
    );

    const keyExtractor = (item)=> item.id; 

    const navigateToChatScreen = (item)=>{
        navigation.navigate('ChatScreen', {name: item.name, avatar: item.avatar});
    };

    return(
        <FlatList data={chatData} renderItem={renderItem} keyExtractor={keyExtractor}/>
    );
};
export default CustomListItem;

const styles = StyleSheet.create({
    container: {

    }
});

/*
<ListItem onPress={()=> enterChat(id, chatName)} key={id} bottomDivider>
            <Avatar
            rounded
            source={{
                uri:'https://s3.amazonaws.com/uifaces/faces/twitter/ladylexy/128.jpg',
            }}
            />
            <ListItem.Content>
                <ListItem.Title style={{fontWeight: 800}}>
                    Bajwa
                </ListItem.Title>
                <ListItem.Subtitle numberOfLines={1} ellipsizeMode="tail">
                    I'm gonna smash your boy 
                </ListItem.Subtitle>
            </ListItem.Content>
        </ListItem>

        const navigateToChatScreen = (item)=>{
        navigation.navigate('ChatScreen', {name: item.name, avatar: item.avatar});
    };

*/