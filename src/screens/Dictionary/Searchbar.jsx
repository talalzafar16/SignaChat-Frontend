import React, { useState } from "react";
import { View, TextInput, StyleSheet } from "react-native";
import { Entypo, Ionicons } from "@expo/vector-icons";

const SearchBar = ({ onSearch }) => {
  const [searchText, setSearchText] = useState("");

  const handleSearch = () => {
    onSearch(searchText);
  };

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.input}
        placeholder="Search..."
        placeholderTextColor="#a9a9a9"
        value={searchText}
        onChangeText={(text) => setSearchText(text)}
        onSubmitEditing={handleSearch}
        onFocus={() => setSearchText("")}
      />

      <Ionicons
        name="search"
        size={24}
        color="#333"
        onPress={handleSearch}
        style={styles.icon}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#f0f0f0",
    borderRadius: 10,
    margin: 10,
    padding: 5,
  },
  input: {
    flex: 1,
    padding: 10,
    color: "#333",
  },
  icon: {
    padding: 10,
  },
});

export default SearchBar;
