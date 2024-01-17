import React, { useState } from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { Colors } from "../../../config/colors";
import Modal from "react-native-modal";
import ModalDropdown from "react-native-modal-dropdown";

export default function MessageComponent({ item, user }) {
  const status = item.senderId !== user;
  const [isModalVisible, setModalVisible] = useState(false);
  const [selectedLanguage, setSelectedLanguage] = useState("English");
const [availableLanguages, setAvailableLanguages] = useState([
  "English",
  "Urdu",
  "Arabic",
]);
  const [translatedMessage, setTranslatedMessage] = useState("");

  const handleLanguageChange = (index, value) => {
    setSelectedLanguage(value);
  };

  const translateMessage = async () => {
    const sourceLang = "en";
     const targetLang = langcode(selectedLanguage);
    const sourceText = item.content;
    const url = `https://translate.googleapis.com/translate_a/single?client=gtx&sl=${sourceLang}&tl=${targetLang}&dt=t&q=${encodeURIComponent(
      sourceText
    )}`;

    try {
      const response = await fetch(url);
      const data = await response.json();
      console.log(data)
      const translatedText = data[0][0][0];
      setTranslatedMessage(translatedText);
    } catch(error) {
      console.error("Translation error:", error);
    }
      setModalVisible(false);
  };
    const langcode = (language) => {
    
    switch (language) {
      case "English":
        return "en";
      case "Urdu":
        return "ur";
      case "Arabic":
        return "ar";
      default:
        return "en"; 
    }
  };


  return (
    <View>
      <View
        style={
          status
            ? styles.messageWrapper
            : [styles.messageWrapper, { alignItems: "flex-end" }]
        }
      >
        <TouchableOpacity
          style={{ flexDirection: "row", alignItems: "center" }}
          onLongPress={() => setModalVisible(true)}
        >
          <View
            style={
              status
                ? styles.message
                : [
                    styles.message,
                    {
                      backgroundColor: Colors.primary,
                      borderBottomLeftRadius: 30,
                      borderBottomRightRadius: 0,
                    },
                  ]
            }
          >
            <Text style={{ color: "white" }}>{ translatedMessage || item.content}</Text>
            <Text
              style={{
                marginTop: 3,
                color: "#625D5D",
                textAlign: !status ? "right" : "left",
              }}
            >
              {new Date(item.createdAt).getUTCHours()}:
              {new Date(item.createdAt).getUTCMinutes()}
            </Text>
          </View>
        </TouchableOpacity>
      </View>

      <Modal
        isVisible={isModalVisible}
        onBackdropPress={() => setModalVisible(false)}
      >
        <View style={styles.modalContainer}>
          <Text>Translate Message</Text>
          <ModalDropdown
            options={availableLanguages}
            onSelect={handleLanguageChange}
            style={styles.dropdown}
            textStyle={styles.dropdownText}
            dropdownTextStyle={styles.dropdownText}
            dropdownStyle={styles.dropdownStyle}
          >
            <Text style={styles.languageText}>{selectedLanguage}</Text>
          </ModalDropdown>

          <TouchableOpacity
            onPress={translateMessage}
            style={styles.translateButton}
          >
            <Text style={{ color: "white" }}>Translate</Text>
          </TouchableOpacity>
        </View>
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  messageWrapper: {
    width: "100%",
    alignItems: "flex-start",
    marginBottom: 15,
  },
  message: {
    minWidth: "40%",
    maxWidth: "76%",
    backgroundColor: "#008080",
    padding: 15,
    marginBottom: 2,
    borderBottomRightRadius: 30,
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    borderBottomLeftRadius: 0,
  },
  avatar: {
    marginRight: 5,
  },
  modalContainer: {
    backgroundColor: "white",
    padding: 20,
    borderRadius: 10,
  },
  dropdown: {
    borderWidth: 1,
    borderColor: "#ccc",
    padding: 10,
    borderRadius: 5,
    marginTop: 10,
  },
  dropdownText: {
    fontSize: 16,
    width: 240,
    color: "#F33F7F",
  },
  dropdownStyle: {
    borderRadius: 5,
  },
  languageText: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#F33F7F",
  },
  translateButton: {
    backgroundColor: "#F33F7F",
    padding: 10,
    borderRadius: 5,
    marginTop: 10,
    alignItems: "center",
    
  },
});
