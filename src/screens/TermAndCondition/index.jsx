import React from "react";
import { View, Text, StyleSheet, ScrollView, Pressable, Image } from "react-native";
import backgroundImage from "../../../assets/TermsAndCondition/background.png";

function TermAndCondition({navigation}){
    return(
        <ScrollView style={styles.container}>
            <Text style={styles.heading}>Welcome to SignaChat</Text>
            <Image style={styles.image} resizeMode='contain' source={backgroundImage} accessible={true} accessibilityLabel="SignaChat"/>
            <Text style={styles.text}>Read our <Text style={styles.links}>Privacy Policy</Text>. Tap "Agree and Continue" to accept the <Text style={styles.links}>Terms of Service</Text>.</Text>
            <Pressable style={styles.btn}>
                <Text style={styles.btnTxt}>AGREE AND CONTINUE</Text>
            </Pressable>
        </ScrollView>
    );
};
export default TermAndCondition;

const styles = StyleSheet.create({
    container: {
        textAlign: 'center',
        padding: 30,
        display: 'flex',
        flexDirection:'column',
        alignContent: 'space-between',
    }, 
    image: {
        height: 350,
        width: 300,
        borderRadius: 100
    },
    heading: {
        fontSize: 28,
        fontWeight: '800',
        textAlign: 'center',
        marginTop: 70,
        marginBottom: 30
    },
    text:{
        fontSize: 14,
        marginVertical: 40,
        paddingHorizontal: 10,
        textAlign: 'center'
    },
    links:{
        color: '#F33F7F'
    }, 
    btn: {
        backgroundColor: '#F33F7F',
        width: 300, 
        height: 35,
        borderRadius: 20
    },
    btnTxt: {
        color: '#ffffff',
        textAlign: 'center',
        padding: 6,
    }
});