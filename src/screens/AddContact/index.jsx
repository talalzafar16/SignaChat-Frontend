import React, { useEffect, useLayoutEffect, useState } from "react";
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
import { Entypo, Ionicons } from "@expo/vector-icons";
import { Button, Input } from "react-native-elements";
import ComponentContact from "../../../components/ComponentContact";
import { useFocusEffect } from "@react-navigation/native";

function AddContact({ navigation }) {
  const [searchContact, setSearchContact] = useState();
  const [showField, setShowField] = useState(false);
  const [refetch, setRefetch] = useState(false);
  const [chatData, setChatData] = useState([]);

  const handle = () => {
    setShowField(!showField);
  };

  const fetchAPIData = async () => {
    try {
      fetch(`${process.env.EXPO_PUBLIC_SERVER_UR}api/v1/user/get-all-users`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ value: searchContact }),
      })
        .then((res) => res.json())
        .then((data) => {
          setChatData(data.user);
        })
        .catch((err) => {
          throw new Error(err);
        });
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    console.log("running useeffect");
    fetchAPIData();
  }, []);
  const fetcher = React.useCallback(() => {
    fetchAPIData();
  }, [navigation]);

  useEffect(() => {
    fetchAPIData();
  }, [searchContact, refetch, navigation]);
  const handleNameInput = (text) => {
    setSearchContact(text);
  };

  return (
    <View style={styles.container} behavior="padding">
      <ScrollView>
        <Text
          style={{
            textAlign: "center",
            fontWeight: "bold",
            color: "#F33F7F",
            fontSize: 30,
            paddingTop: 40,
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
        <TouchableOpacity style={styles.btn} onPress={handle}>
          <View style={styles.btnIcon}>
            <Ionicons name="person-add" size={30} color="#ffffff" />
          </View>
          <View style={styles.btnTextContainer}>
            <Text style={styles.btnText}>Search Contact</Text>
          </View>
        </TouchableOpacity>

        {showField && (
          <View style={styles.inputs}>
            <View style={styles.inputsContainer}>
              <Text style={styles.inputsTxt}>Phone Number:</Text>
              <TextInput
                style={styles.Input}
                value={searchContact}
                onChangeText={handleNameInput}
                placeholder="xxx-xxxxxxx"
                keyboardType="phone-pad"
                keyboardAppearance="dark"
                maxLength={11}
              />
            </View>
          </View>
        )}

        <View style={styles.display}>
          <Text style={styles.displayTxt}> People on SignaChat </Text>
        </View>
        <FlatList
          data={chatData}
          keyExtractor={(item) => item._id}
          renderItem={({ item }) => (
            <ComponentContact
              refetch={refetch}
              setRefetch={setRefetch}
              item={item}
            />
          )}
        />
      </ScrollView>
    </View>
  );
}
export default AddContact;

const styles = StyleSheet.create({
  container: {
    flex: 1,
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
