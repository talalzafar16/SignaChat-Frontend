import React, { useLayoutEffect, useState } from "react";
import {
  Text,
  View,
  StyleSheet,
  TextInput,
  ScrollView,
  KeyboardAvoidingView,
  TouchableOpacity,
  FlatList,
} from "react-native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { Entypo, Ionicons } from "@expo/vector-icons";
import { Button, Input } from "react-native-elements";
import CustomListItem from "../../../components/CustomListItem";
import Ali from "../../../assets/avatars/ali.png";
import Khabib from "../../../assets/avatars/Khabib.png";
import Khamzat from "../../../assets/avatars/khamzat.png";
import { Colors } from "../../config/colors";

function AddContact({ navigation, route }) {
  const Stack = createNativeStackNavigator();
  const [newContact, setNewContact] = useState("");
  const [showField, setShowField] = useState(false);
  const [phoneNumber, setPhoneNumber] = useState("");
  const [filteredList, setFilteredList] = useState(chatData);
  const chatData = [
    { id: "1", name: "Bajwa", avatar: Ali },
    { id: "2", name: "Khabib", avatar: Khabib },
    { id: "3", name: "Khamzat", avatar: Khamzat },
    // Add more chat items as needed
  ];

  const handle = () => {
    setShowField(!showField);
  };

  const renderChatItem = ({ item }) => <CustomListItem data={item} />;

  const handleNameInput = (text) => {
    setNewContact(text);

    const filteredData =
      typeof text === "string"
        ? chatData.filter((item) =>
            item.name.toLowerCase().startsWith(text.toLowerCase())
          )
        : chatData;

    setFilteredList(filteredData);
  };

  return (
    <KeyboardAvoidingView style={styles.container} behavior="padding">
      <Text
        style={{
          textAlign: "center",
          fontWeight: "bold",
          color: Colors.primary,
          fontSize: 30,
        }}
      >
        Search New People
      </Text>
      <Text
        style={{
          textAlign: "center",
          fontWeight: "bold",
          color: "black",
          marginTop: 6,
          fontSize: 26,
        }}
      >
        Make New Friends
      </Text>
      <>
        <TouchableOpacity style={styles.btn} onPress={handle}>
          <View style={styles.btnIcon}>
            <Ionicons name="person-add" size={30} color="#ffffff" />
          </View>
          <View style={styles.btnTextContainer}>
            <Text style={styles.btnText}>New Contact</Text>
          </View>
        </TouchableOpacity>

        {showField && (
          <View style={styles.inputs}>
            <View style={styles.inputsContainer}>
              <Text style={styles.inputsTxt}>Phone Number:</Text>
              <TextInput
                style={styles.Input}
                value={newContact}
                onChangeText={handleNameInput}
                placeholder="xxx-xxxxxxx"
                keyboardType="number"
                keyboardAppearance="dark"
                maxLength={11}
                onSubmitEditing={() => {}}
              />
            </View>
          </View>
        )}

        <View style={styles.display}>
          <Text style={styles.displayTxt}> Contacts on SignaChat </Text>
        </View>
      </>
      <FlatList
        data={newContact ? filteredList : chatData}
        keyExtractor={(item) => item.id}
        renderItem={renderChatItem}
        onEndReached={() => {}}
        // ListHeaderComponent={() => (

        // )}
      />
    </KeyboardAvoidingView>
  );
}
export default AddContact;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 60,
    backgroundColor: "#fff",
  },
  btn: {
    flexDirection: "row",
    padding: "5%",
    textAlign: "center",
  },
  inputs: {
    flex: 1,
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: "3%",
  },
  btnIcon: {
    backgroundColor: "#F33F7F",
    height: 50,
    width: 50,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 50,
  },
  btnTextContainer: {
    flex: 1,
    justifyContent: "center",
    paddingLeft: "5%",
  },
  btnText: {
    fontSize: 20,
    fontWeight: "bold",
  },
  Input: {
    height: 40,
    margin: 12,
    width: 300,
    borderColor: "#F33F7F",
    borderWidth: 1,
    padding: 10,
    borderRadius: 50,
  },
  inputsContainer: {
    display: "flex",
    marginTop: 20,
  },
  inputsTxt: {
    fontSize: 18,
    fontWeight: "bold",
    paddingLeft: "5%",
  },
  display: {
    marginTop: 20,
    paddingVertical: 8,
    paddingLeft: "5%",
    width: "100%",
    backgroundColor: "#F33F7F",
  },
  displayTxt: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#ffffff",
  },
});

/*onPress={createChat} <Input value={newContact} onChange={setNewContact} placeholder='Enter a chat name' leftIcon={<Entypo name="chat" size={24} color="black" />}/><Button  title={'Creates'}/>
<TextInput value={newContact} onChange={(text)=> setNewContact(text)} placeholder='Enter Phone Number' keyboardType='phone-pad' /> */
