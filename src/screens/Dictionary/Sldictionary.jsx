import React, { useState } from "react";
import { Asset } from "expo-asset";

import {
  View,
  Text,
  TouchableOpacity,
  FlatList,
  ScrollView,
  SafeAreaView,
} from "react-native";
import SearchBar from "./Searchbar";
import VideoCard from "../../components/Card/VCard";

const Sldictionary = () => {

  const [choice, setChoice] = useState("1");

  let handleSearch = () => {
    console.log("1");
  };

 
const Alphabets = [
  {
    id: 1,
    Letter: "A",
    src: "https://media.spreadthesign.com/video/mp4/13/alphabet-letter-591-1.mp4",
  },
  {
    id: 2,
    Letter: "B",
    src: "https://media.spreadthesign.com/video/mp4/13/alphabet-letter-592-1.mp4",
  },
  {
    id: 3,
    Letter: "C",
    src: "https://media.spreadthesign.com/video/mp4/13/alphabet-letter-593-1.mp4",
  },
  {
    id: 4,
    Letter: "D",
    src: "https://media.spreadthesign.com/video/mp4/13/alphabet-letter-594-1.mp4",
  },
  {
    id: 5,
    Letter: "E",
    src: "https://media.spreadthesign.com/video/mp4/13/alphabet-letter-595-1.mp4",
  },
  {
    id: 6,
    Letter: "F",
    src: "https://media.spreadthesign.com/video/mp4/13/alphabet-letter-596-1.mp4",
  },
  {
    id: 7,
    Letter: "G",
    src: "https://media.spreadthesign.com/video/mp4/13/alphabet-letter-597-1.mp4",
  },
  {
    id: 8,
    Letter: "H",
    src: "https://media.spreadthesign.com/video/mp4/13/alphabet-letter-598-1.mp4",
  },
  {
    id: 9,
    Letter: "I",
    src: "https://media.spreadthesign.com/video/mp4/13/alphabet-letter-599-1.mp4",
  },
  {
    id: 10,
    Letter: "J",
    src: "https://media.spreadthesign.com/video/mp4/13/alphabet-letter-600-1.mp4",
  },
  {
    id: 11,
    Letter: "K",
    src: "https://media.spreadthesign.com/video/mp4/13/alphabet-letter-601-1.mp4",
  },
  {
    id: 12,
    Letter: "L",
    src: "https://media.spreadthesign.com/video/mp4/13/alphabet-letter-602-1.mp4",
  },
  {
    id: 13,
    Letter: "M",
    src: "https://media.spreadthesign.com/video/mp4/13/alphabet-letter-603-1.mp4",
  },
  {
    id: 14,
    Letter: "N",
    src: "https://media.spreadthesign.com/video/mp4/13/alphabet-letter-604-1.mp4",
  },
  {
    id: 15,
    Letter: "O",
    src: "https://media.spreadthesign.com/video/mp4/13/alphabet-letter-605-1.mp4",
  },
  {
    id: 16,
    Letter: "P",
    src: "https://media.spreadthesign.com/video/mp4/13/alphabet-letter-606-1.mp4",
  },
  {
    id: 17,
    Letter: "Q",
    src: "https://media.spreadthesign.com/video/mp4/13/alphabet-letter-606-1.mp4",
  },
  {
    id: 18,
    Letter: "R",
    src: "https://media.spreadthesign.com/video/mp4/13/alphabet-letter-608-1.mp4",
  },
  {
    id: 19,
    Letter: "S",
    src: "https://media.spreadthesign.com/video/mp4/13/alphabet-letter-609-1.mp4",
  },
  {
    id: 20,
    Letter: "T",
    src: "https://media.spreadthesign.com/video/mp4/13/alphabet-letter-610-1.mp4",
  },
  {
    id: 21,
    Letter: "U",
    src: "https://media.spreadthesign.com/video/mp4/13/alphabet-letter-611-1.mp4",
  },
  {
    id: 22,
    Letter: "V",
    src: "https://media.spreadthesign.com/video/mp4/13/alphabet-letter-612-1.mp4",
  },
  {
    id: 23,
    Letter: "W",
    src: "https://media.spreadthesign.com/video/mp4/13/alphabet-letter-613-1.mp4",
  },
  {
    id: 24,
    Letter: "X",
    src: "https://media.spreadthesign.com/video/mp4/13/alphabet-letter-614-1.mp4",
  },
  {
    id: 25,
    Letter: "Y",
    src: "https://media.spreadthesign.com/video/mp4/13/alphabet-letter-615-1.mp4",
  },
  {
    id: 26,
    Letter: "Z",
    src: "https://media.spreadthesign.com/video/mp4/13/alphabet-letter-616-1.mp4",
  },
  ];
  const sentences = [
    {
      sentence: "What do you want?",
      src: "https://media.spreadthesign.com/video/mp4/1/300391.mp4",
    },
    {
      sentence: "What are you doing?",
      src: "https://media.spreadthesign.com/video/mp4/9/525620.mp4",
    },
    {
      sentence: "Have a nice day!",
      src: "https://media.spreadthesign.com/video/mp4/13/93398.mp4",
    },
    {
      sentence: "Good Morning!",
      src: "https://media.spreadthesign.com/video/mp4/13/456466.mp4",
    },
    {
      sentence: "Good Afternoon!",
      src: "https://media.spreadthesign.com/video/mp4/13/109898.mp4",
    },
    {
      sentence: "Good evening!",
      src: "https://media.spreadthesign.com/video/mp4/13/492928.mp4",
    },
    {
      sentence: "Goodbye!",
      src: "https://media.spreadthesign.com/video/mp4/13/63537.mp4",
    },
    {
      sentence: "drink!",
      src: "https://media.spreadthesign.com/video/mp4/13/153289.mp4",
    },
    {
      sentence: "Have you eaten?",
      src: "https://media.spreadthesign.com/video/mp4/13/93403.mp4",
    },
    {
      sentence: " I have not eaten yet.",
      src: "https://media.spreadthesign.com/video/mp4/13/93555.mp4",
    },
    {
      sentence: "I want this",
      src: "https://media.spreadthesign.com/video/mp4/1/33329.mp4",
    },
  ];

  return (
    <View style={{ backgroundColor: "#ffffff", height: "100%", width: "100%" }}>
      <View
        style={{
          paddingTop: 30,
          width: "100%",
          backgroundColor: "#ffff",
          overflow: "hidden",
        }}
      >
        <SearchBar onSearch={handleSearch} />
      </View>
      <View
        style={{
          width: "100%",
          display: "flex",
          flexDirection: "row",
          justifyContent: "space-around",
          marginTop: 20,
          marginBottom: 10,
        }}
      >
        <TouchableOpacity
          onPress={() => {
            setChoice("1");
          }}
          style={{
            borderColor: "black",
            borderRadius: 10,
            backgroundColor: "#fccfdf",
            padding: 9,
            alignContent: "center",
          }}
        >
          <Text style={{ color: "black", fontSize: 24, fontWeight: "700" }}>
            {" "}
            Alphabets
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => {
            setChoice("2");
          }}
          style={{
            borderColor: "black",
            borderRadius: 10,
            backgroundColor: "#fccfdf",
            padding: 9,
            alignContent: "center",
          }}
        >
          <Text style={{ color: "black", fontSize: 24, fontWeight: "700" }}>
            {" "}
            Sentences
          </Text>
        </TouchableOpacity>
      </View>

      {/* body */}
      <View style={{ backgroundColor: "#F33F7F" }}>
        {choice === "1" ? (
          <View style={{marginTop:10,height: "100%" }}>
            <FlatList
              data={Alphabets}
              keyExtractor={(item, index) => `${index}`}
              renderItem={({ item, index }) => (
                <VideoCard
                  key={index}
                  title={item.Letter}
                  videoFileName={item.src}
                />
              )}
            />
          </View>
        ) : choice === "2" ? (
          <SafeAreaView style={{ marginTop: 10, height: "100%" }}>
            <FlatList
              data={sentences}
              keyExtractor={(item, index) => `${index}`}
              renderItem={({ item, index }) => (
                <ScrollView>
                  <VideoCard
                    key={index}
                    title={item.sentence}
                    videoFileName={item.src}
                  />
                </ScrollView>
              )}
            />
          </SafeAreaView>
        ) : null}
      </View>
    </View>
  );
};

export default Sldictionary;
