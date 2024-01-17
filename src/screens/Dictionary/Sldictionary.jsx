import {
  SafeAreaView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  FlatList,
  ScrollView,
} from "react-native";
import React, { useState } from 'react'
import SearchBar from "./Searchbar";
import VideoCard from "../../components/Card/VCard";
const Sldictionary = () => {
  const letterA = require("../../../assets/Data/A.mp4");
    const letterB = require("../../../assets/Data/A.mp4");
//     const letterC = require("../../../assets/Data/C.mp4");
//     const letterD = require("../../../assets/Data/D.mp4");


    const [choice, setChoice] = useState("1");

    let handleSearch = () => {
        console.log("1");
  }
  
  const Alphabets = [
    {
      id: 1,
      Letter: "A",
      src: "https://media.spreadthesign.com/video/mp4/13/alphabet-letter-592-1.mp4",
    },
    {
      id: 2,
      Letter: "B",
      src: "https://media.spreadthesign.com/video/mp4/13/alphabet-letter-592-1.mp4",
    },
    {
      id: 3,
      Letter: "C",
      src: "https://media.spreadthesign.com/video/mp4/13/alphabet-letter-592-1.mp4",
    },
    {
      id: 3,
      Letter: "D",
      src: "https://media.spreadthesign.com/video/mp4/13/alphabet-letter-592-1.mp4",
    },
    {
      id: 3,
      Letter: "D",
      src: "https://media.spreadthesign.com/video/mp4/13/alphabet-letter-592-1.mp4",
    },
  ];
  return (
    <View style={{ backgroundColor: "#ffffff", height: "100%", width: "100%" }}>
      <View
        style={{
          paddingTop: 30,
          width: "100%",
          backgroundColor: "#F33F7F",
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
      <View style={{ backgroundColor: "black" }}>
        {choice === "1" ? (
          <SafeAreaView>
            <ScrollView>
              {Alphabets.map((x, i) => (
                <VideoCard key={i} title={x.Letter} videoFileName={x.src} />
              ))}
            </ScrollView>
          </SafeAreaView>
        ) : choice === "2" ? (
          <View>
            <Text style={{ backgroundColor: "red" }}>2</Text>
          </View>
        ) : null}
      </View>
    </View>
  );
}

export default Sldictionary

const styles = StyleSheet.create({

})

            // <ScrollView style={{ marginTop: 10 }}>
            //   {Alphabets.map((x, i) => (
            //     <Card key={i} title={x.Letter} videoFileName={x.src} />
            //   ))}
            //   {/* <Card>
            //           <VideoPlayer
            //             video={{ uri: item.src }}
            //             autoplay={false}
            //             defaultMuted={true}
            //             videoWidth={1000}
            //             videoHeight={1000}
            //             thumbnail={require("../../../assets/logo/logo.png")}
            //           />
            //         </Card> */}
// </ScrollView>
            


// <FlatList
//               data={Alphabets}
//               keyExtractor={(item, index) => `${index}`}
//                           renderItem={({ item, index }) => {
//                             console.log(VCard); // Add this line to log the VCard component

//                             return (
//                               <ScrollView style={{ marginTop: 10 }}>
//                                 <VCard
//                                   title={item.Letter}
//                                   videoFileName={item.src}
//                                 />

//                                 {/* <Card>
//                       <VideoPlayer
//                         video={{ uri: item.src }}
//                         autoplay={false}
//                         defaultMuted={true}
//                         videoWidth={1000}
//                         videoHeight={1000}
//                         thumbnail={require("../../../assets/logo/logo.png")}
//                       />
//                     </Card> */}
//                               </ScrollView>
//                             );
//                           }}
//             />