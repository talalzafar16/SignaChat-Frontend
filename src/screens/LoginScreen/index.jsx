import React, { useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  Image,
  TextInput,
  Touchable,
  TouchableOpacity,
  KeyboardAvoidingView
} from "react-native";
import Logo from "../../../assets/logo/logo.png";
import large_red from "../../../assets/Home/large_red.png";
import small_red from "../../../assets/Home/small_red.png";
import large_pink from "../../../assets/Home/large_pink.png";
import small_pink from "../../../assets/Home/small_pink.png";
import medium_pink from "../../../assets/Home/medium_pink.png";
import { ActivityIndicator, MD2Colors, useTheme } from "react-native-paper";
import CountryPicker from 'react-native-country-picker-modal';
import { Ionicons } from '@expo/vector-icons';
export default function LoginScreen({ navigation }) {
  const theme = useTheme();
  const [phoneNumber, setPhoneNumber] = useState('');
  const [selectedCountry, setSelectedCountry] = useState(null);
  const[selectedGender, setSelectedGender] = useState(null);
  const [loading, setLoading] = useState(false);
  const[name, setName] = useState('');
  const onCountrySelect = (country) => {
    setSelectedCountry(country);
  };
  const selectedGenderOption = (option)=> {
    setSelectedGender(selectedGender === option ? null : option);
  };

  const handleNextPress = () => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false); 
      navigation.navigate('OTP');
    }, 2000); 
  };
  const styles = StyleSheet.create({
    LogoText: {
      color: theme.colors.primary,
      fontSize: 20,
      fontWeight: "700",
      marginTop: 10,
    },
    container: {
      flex: 1,
      flexDirection: 'column',
      backgroundColor: "#fff",
      alignItems: "center",
      justifyContent: "center",
      paddingHorizontal: '3%'
      
    },
    LoaderContainer: {
      position: "absolute",
      bottom: "5%",
    },
    Logo: {
      width: 300,
      height: 300,
      borderRadius: 999,
      position: "absolute",
    },
    large_red: {
      width: 270,
      position: "absolute",
      right: 0,
      objectFit: "contain",
      height: 200,
      bottom: "8%",
    },
    large_pink: {
      width: 300,
      position: "absolute",
      right: 10,
      objectFit: "contain",
      height: 140,
      top: "16%",
    },
    medium_pink: {
      width: 160,
      position: "absolute",
      left: 90,
      objectFit: "contain",
      height: 80,
      top: "26%",
    },
    small_pink: {
      width: 49,
      position: "absolute",
      left: 90,
      objectFit: "contain",
      height: 40,
      zIndex: 99999,
      bottom: "30%",
    },
    small_red: {
      width: 24,
      zIndex: 99999,
      position: "absolute",
      right: 100,
      objectFit: "contain",
      height: 30,
      top: "40%",
    },
    Input: {
      height: 40,
      margin: 12,
      width: 200,
      borderLeftWidth: 0,
      borderRightWidth: 0,
      borderTopColor: theme.colors.primary,
      borderBottomColor: theme.colors.primary,
      borderWidth: 1,
      padding: 10,
    },
    heading: {
      fontSize: 25, 
      fontWeight: '700', 
      paddingBottom: 10
    },
    text: {
      fontSize: 16,
      fontWeight: '400',
      padding: 20
    },
    countryPickerButton: {
      marginTop: 10,
      width: 280,
      justifyContent: 'center',
      alignItems: 'center',
      borderWidth: 1,
      borderBottomColor: theme.colors.primary,
      borderLeftWidth: 0,
      borderRightWidth: 0,
      borderTopColor: 0,
    },
    selectedCountry: {
      marginTop: 20,
      fontSize: 16,
    },
    selectedCountryCode: {
      height: 40,
      margin: 12,
      width: 50,
      borderLeftWidth: 0,
      borderRightWidth: 0,
      borderTopColor: theme.colors.primary,
      borderBottomColor: theme.colors.primary,
      borderWidth: 1,
      padding: 10,
    },
    display: {
      display: 'flex',
      flexDirection: 'row',
      justifyContent: 'space-between',
      marginTop: 20
    },
    activityIndicator: {
      justifyContent: 'center',
      alignItems: 'center',
    },
    loadingBackground: {
      backgroundColor: 'rgba(0, 0, 0, 0.1)', // Grey background color with 50% opacity
    },
    name: {
      flexDirection: 'row',
      width: '80%',
      height: 40,
      borderColor: theme.colors.primary,
      borderWidth: 1,
      paddingHorizontal: 10,
      borderRadius: 50
    },
    profileImage: {
      paddingTop: 40,
      paddingBottom: 20
    },
    gender:{
      marginTop: 30,
      flexDirection: 'row',
      justifyContent: 'space-evenly',
      borderColor: theme.colors.primary,
      borderWidth: 2,
      width: '80%',
      height: 50,
      borderRadius: 50
    },
    genderOption:{
      flexDirection: 'row',
      justifyContent: 'center',
      alignItems: 'center'
    },
    selectedGenderOption: {
      backgroundColor: theme.colors.primary,
      color: theme.colors.secondary,
      flex: 2,
    }

  });
  return (
    <KeyboardAvoidingView style={[styles.container, loading && styles.loadingBackground]}>
      <Text style={styles.heading}>
        Create your Profile
      </Text>
      <TouchableOpacity style={styles.profileImage}>
        <Image style={{height: 100, width: 100,}} source={require('../../../assets/profile/default.png')}/>
      </TouchableOpacity>
      <View style={styles.name}>
      <Ionicons style={{padding: 5}} name="person" size={24} color={theme.colors.primary} />
      <TextInput style={{paddingLeft: 5}} value={name} onChange={(text)=> setName(text)} placeholder="Name" />
      </View>
      <View style={styles.gender}>
        <TouchableOpacity style={[styles.genderOption, selectedGender === 'Male' && styles.selectedGenderOption, selectedGender === 'Male' && {borderTopLeftRadius: 50,borderBottomLeftRadius: 50} ]} onPress={()=> selectedGenderOption('Male')}>
          <Ionicons name="male" size={28} color={selectedGender === 'Male' ? theme.colors.secondary : theme.colors.primary}/>
          <Text style={{padding: 10, fontSize: 18, color: selectedGender === 'Male' ? theme.colors.secondary : theme.colors.primary}}>Male</Text>
        </TouchableOpacity>
        <TouchableOpacity style={[styles.genderOption, selectedGender === 'Female' && styles.selectedGenderOption,  selectedGender === 'Female' && {borderTopRightRadius: 50,borderBottomRightRadius: 50}]} onPress={()=> selectedGenderOption('Female')}>
          <Ionicons name="female" size={28} color={selectedGender === 'Female' ? theme.colors.secondary : theme.colors.primary} />
          <Text style={{padding: 10, fontSize: 18, color: selectedGender === 'Female' ? theme.colors.secondary : theme.colors.primary}}>Female</Text>
        </TouchableOpacity>
      </View>
      <Text style={styles.text}>
        SignaChat will need to verify your phone number.
        <Text style={{color: theme.colors.primary}}>  What's my number</Text>
      </Text>
       <CountryPicker
        {...{
          countryCode: selectedCountry?.cca2,
          onSelect: onCountrySelect,
          withFlag: true,
          withFilter: true,
          withCountryNameButton: true,
          withAlphaFilter: true,
          withCallingCode: true,
          withEmoji: true,
          containerButtonStyle: styles.countryPickerButton,
        }}
      />
      {selectedCountry && (
        <View style={styles.display}>
        <Text style={styles.selectedCountryCode}>
        +{selectedCountry?.callingCode[0]}
        </Text>
        <TextInput
        style={styles.Input}
        value={phoneNumber}
        onChange={(text)=> {setPhoneNumber(text)}}
        placeholder="xxx-xxxxxxx"
        keyboardType="numeric"
        keyboardAppearance="dark"
        maxLength={11}
      />
      </View>
      )}
      <Text
        style={{
          fontSize: 12,
          fontWeight: 400,
          color: theme.colors.primary,
        }}
      >
        Careeres Charges May Apply
      </Text>
      <View style={styles.LoaderContainer}>
        <TouchableOpacity
          style={{
            paddingTop: 10,
            paddingBottom: 10,
            paddingLeft: 40,
            paddingRight: 40,
            backgroundColor: theme.colors.primary,
            color: theme.colors.secondary,
          }}
          onPress={handleNextPress}
          disabled={loading}
        >
          <Text
            style={{
              color: theme.colors.secondary,
            }}
          >
            Next
          </Text>
        </TouchableOpacity>
        </View>
        <View style={styles.activityIndicator}>
        {loading && (
          <ActivityIndicator
            size={36}
            animating={true}
            color={theme.colors.primary}
          />
        )}
        {loading && <Text style={styles.LogoText}>Loading...</Text>}
        </View>
      
    </KeyboardAvoidingView>
    
  );
}
