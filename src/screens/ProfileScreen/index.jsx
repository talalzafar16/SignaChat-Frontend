import React, { Component, useState } from 'react'
import { Text, StyleSheet, View, ScrollView, TouchableOpacity, Image, ImageBackground } from 'react-native'
import { FontAwesome, FontAwesome5 } from '@expo/vector-icons';

 function Profile(){
    const[Name, setName] = useState("Ismail");
    const[Phone, setPhone] = useState("+92 3242639048");
    const[Gender, setGender] = useState("Male");
    const[Photo, setPhoto] = useState("../../../assets/profile/default.png");
    return (
        <ImageBackground style={{
            flex: 1,
            alignItems: "center",
            justifyContent: "center",
          }}
          resizeMode="repeat"
          source={require("../../../assets/TermsAndCondition/background.png")}
          >
        <TouchableOpacity >
            <Image style={styles.image} source={require('../../../assets/profile/default.png')} resizeMode='contain'/>
        </TouchableOpacity>
        <View style={styles.nameContainer}>
            <FontAwesome style={{paddingLeft: 20}} name="user" size={30} color="black" />
            <Text style={styles.nameTxt}>Name</Text>
        </View>
        <View style={styles.txtContainer}>
            <Text style={styles.txt}>{Name}</Text>
        </View>
        <View style={styles.phoneContainer}>
            <FontAwesome style={{paddingLeft: 20}} name="phone" size={30} color="black" />
            <Text style={styles.phoneTxt}>Phone</Text>
        </View>
        <View style={styles.txtContainer}>
            <Text style={styles.txt}>{Phone}</Text>
        </View>
        <View style={styles.phoneContainer}>
            <FontAwesome5 style={{paddingLeft: 20}} name="transgender" size={30} color="black" />
            <Text style={styles.phoneTxt}>Gender</Text>
        </View>
        <View style={styles.txtContainer}>
            <Text style={styles.txt}>{Gender}</Text>
        </View>
        </ImageBackground>
      
    );
  };

export default Profile;

const styles = StyleSheet.create({
    body: {
        flex: 1
    },
    container: {
        flex: 1,
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#ffffff'
    },
    image:{
        height: 150,
        width: 200,
        justifyContent: 'center'
    },
    nameContainer: {
        flexDirection: 'row',
        justifyContent: 'flex-start',
        marginTop: 30,
        backgroundColor: '#ffffff',
        width: '80%',
        height: '8%',
        alignItems: 'center',
        borderColor: '#F33F7F',
        borderTopLeftRadius: 50,
        borderTopRightRadius: 50,
        borderTopWidth: 2,
        borderLeftWidth: 2,
        borderRightWidth: 2,
        padding: 12
    },
    nameTxt: {
        fontSize: 18,
        fontWeight: 'bold',
        paddingLeft: '5%'
    },
    phoneContainer: {
        flexDirection: 'row',
        justifyContent: 'flex-start',
        marginTop: 30,
        backgroundColor: '#ffffff',
        width: '80%',
        height: '8%',
        alignItems: 'center',
        borderColor: '#F33F7F',
        borderTopLeftRadius: 50,
        borderTopRightRadius: 50,
        borderTopWidth: 2,
        borderLeftWidth: 2,
        borderRightWidth: 2,
        padding: 12
    },
    phoneTxt: {
        fontSize: 18,
        fontWeight: 'bold',
        paddingLeft: '5%'
    },
    txt: {
        fontSize: 18,
        paddingLeft: 20,
    },
    txtContainer: {
        width: '80%',
        justifyContent: 'flex-start', 
        paddingLeft: '15%',
        backgroundColor: '#ffffff',
        borderColor: '#F33F7F',
        borderBottomLeftRadius: 50,
        borderBottomRightRadius: 50,
        borderBottomWidth: 2,
        borderLeftWidth: 2,
        borderRightWidth: 2,
        padding: 8,
    }
})
