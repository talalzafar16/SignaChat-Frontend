import React, { useLayoutEffect, useState } from 'react';
import { Text, View, StyleSheet, TextInput } from 'react-native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { Entypo } from '@expo/vector-icons';
import { Button, Input } from 'react-native-elements';

function AddContact({navigation}){
  const Stack = createNativeStackNavigator();
  const[newContact, setNewContact] = useState("");
  
    return (
      <>
      <View style={styles.container}>
        <Text> textInComponent now too</Text>
        <Input value={newContact} onChange={setNewContact} placeholder='Enter a chat name' leftIcon={<Entypo name="chat" size={24} color="black" />}/>
        <Button  title={'Create'}/>
      </View>
      
      </>
    );
};
export default AddContact;

const styles = StyleSheet.create({
  container: {
      flex: 1,
      alignItems: 'center',
      justifyContent: 'center'
  }, 
});

//onPress={createChat}