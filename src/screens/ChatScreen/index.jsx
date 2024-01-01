import React, { useLayoutEffect, useState } from 'react';
import { Text, View, StyleSheet, ImageBackground, TextInput, TouchableOpacity, KeyboardAvoidingView, ScrollView } from 'react-native';
import { Avatar } from 'react-native-elements';
import backgroundImage from '../../../assets/TermsAndCondition/background.png';
import { Entypo, MaterialIcons } from '@expo/vector-icons';

function ChatScreen({navigation, route}){
    const name = route.params.name;
    const avatar = route.params.avatar;
    const[message, setMessage] = useState("");
    useLayoutEffect(()=>{
        navigation.setOptions({
            headerTintColor: '#ffffff',
            headerStyle: {backgroundColor: '#F33F7F'},
            headerTitleAlign: 'left',
            headerTitle: ()=>(
                <View style={styles.header}>
                    <Avatar size={45} rounded source={avatar}/>
                    <Text style={styles.headerTxt}>{name}</Text>
                </View>
            )
        });
    }, [navigation])
    return (
        <KeyboardAvoidingView style={styles.container}>
                <ScrollView contentContainerStyle={styles.scrollViewContent} keyboardDismissMode='on-drag'>
                    <ImageBackground style={styles.backgroundImage} source={backgroundImage} resizeMode='cover'>
                        <View style={styles.inputMsg}>
                            <TouchableOpacity>
                                <Entypo name="emoji-happy" size={24} color="black" />
                            </TouchableOpacity>
                            <TextInput style={styles.msg} value={message} onChange={(text)=> setMessage(text)} placeholder='Message' multiline={true}/>
                        </View>
                        <TouchableOpacity style={styles.record}>
                            <MaterialIcons name="keyboard-voice" size={24} color="white" />
                        </TouchableOpacity>
                    </ImageBackground>
                </ScrollView>
        </KeyboardAvoidingView>
               
      
    );
  };


export default ChatScreen;

const styles = StyleSheet.create({
  header: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  headerTxt: {
    marginLeft: 10,
    fontSize: 18,
    fontWeight: 'bold', 
    color: '#ffffff'
  },
  container: {
    flex: 1
  },
  scrollViewContent: {
    flexGrow: 1,
  },
  backgroundImage: {
    flex: 1,
    resizeMode: 'cover',
    justifyContent: 'center',
    position: 'relative'
  }, 
  inputMsg: {
    backgroundColor: '#ffffff',
    flexDirection: 'row',
    alignItems: 'center',
    height: '10%',
    width: '70%',
    marginHorizontal: 20,
    position: 'absolute',
    bottom: 20, 
    zIndex: 1,
    borderColor: '#F33F7F',
    borderWidth: 1,
    borderRadius: 50,
    paddingHorizontal: 10,
  },
  msg: {
    paddingHorizontal: 10,
    fontSize: 18
  },
  record: {
    position: 'absolute',
    alignItems: 'center',
    justifyContent: 'center',
    bottom: 20, 
    right: 20,
    height: 50,
    width: 50,
    backgroundColor: '#F33F7F',
    borderRadius: 50,
  }
})
