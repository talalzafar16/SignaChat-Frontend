import React from 'react';
import { Text, View, StyleSheet } from 'react-native';

function Search(){
    return (
      <View style={styles.container}>
        <Text> Search Screen </Text>
      </View>
    );
  };

export default Search;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center'
    }, 
  });
