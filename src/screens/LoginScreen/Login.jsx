import React, { useState } from "react";
import { View, Text, StyleSheet, Image, ImageBackground, TextInput, ScrollView, TouchableOpacity } from "react-native";
import { Ionicons, MaterialIcons } from '@expo/vector-icons';

function Login({navigation}) {
    const[phoneNumber, setPhoneNumber] = useState('');
    return (
        <ScrollView contentContainerStyle={styles.container} keyboardDismissMode="on-drag" >
            <ImageBackground style={{flex: 1, alignItems: 'center', justifyContent: 'space-between'}} resizeMode='repeat' source={require('../../../assets/TermsAndCondition/background.png')}>
                <Text style={styles.heading}>Welcome to <Text style={styles.link}>SignaChat</Text> </Text>
                <Image  style={styles.image} source={require('../../../assets/logo/Login.png')} resizeMode="contain" />
                <View style={styles.login}>
                    <Text style={styles.loginHeading}>Login</Text>
                    <View style={styles.loginInput}>
                        <Ionicons name="keypad" size={24} color="#F33F7F" />
                        <TextInput style={styles.loginPhone} value={phoneNumber} onChange={(text)=> setPhoneNumber(text)} keyboardType='phone-pad' placeholder="Enter Phone Number" />
                    </View>
                    <View style={styles.text}>
                        <Text style={styles.txt}>Don't have an account?</Text>
                        <TouchableOpacity onPress={()=> navigation.navigate('Login')}>
                        <Text style={styles.txt1}>Create Profile</Text>
                        </TouchableOpacity>
                    </View>
                    <TouchableOpacity style={styles.btn} onPress={()=> navigation.navigate('Home')}>
                        <MaterialIcons name="navigate-next" size={42} color="#F33F7F" />
                    </TouchableOpacity>
                </View>
            </ImageBackground>
        </ScrollView>
    );
};

export default Login;

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    image: {
        height: 380,
        width: 420,
        padding: 0
    },
    heading: {
        fontSize: 36,
        fontWeight: 'bold',
        textAlign: 'center',
        marginTop: 30
    },
    link: {
        color: '#F33F7F'
    },
    login: {
        backgroundColor: '#F33F7F',
        height: 240,
        width: 300,
        marginBottom: 100,
        borderRadius: 30
    },
    loginHeading: {
        fontSize: 30,
        color: '#ffffff',
        padding: 20,
        fontWeight: 'bold'
    },
    loginInput: {
        flexDirection: 'row',
        paddingHorizontal: 10,
        backgroundColor: '#ffffff', 
        width: '80%',
        height: 40,
        marginLeft: 20,
        alignItems: 'center',
        borderRadius: 30
    },
    loginPhone: {
        paddingLeft: 10
    },
    btn: {
        height: 55,
        width: 55,
        backgroundColor: '#ffffff',
        borderRadius: 50,
        alignItems: 'center',
        justifyContent: 'center',
        position: 'absolute',
        bottom: 10,
        right: 20
    },
    text:{
        alignItems: 'center',
        justifyContent: 'center',
        padding: 10
    },
    txt: {
        paddingBottom: 10,
        color: '#ffffff'
    },
    txt1: {
        textAlign: 'center',
        height: 30,
        width: 120,
        backgroundColor: '#ffffff',
        fontSize: 16,
        borderRadius: 50,
        paddingTop: 3,
        color: '#F33F7F',
        fontWeight: 'bold'
    }
});


