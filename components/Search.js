import React, { useState } from 'react';
import { Text, StyleSheet, View, Image, Pressable, TextInput } from "react-native";
import { useNavigation } from '@react-navigation/native';
import { SafeAreaView } from 'react-native-safe-area-context';

const Search = () => {
  const [search, setSearch] = useState("");
  const navigation = useNavigation();

  const handleChangeSearch = (string) => {
    setSearch(string);
  };

  const handleSearchSubmit = async () => {
    try {
      const response = await fetch(`https://api.tvmaze.com/search/shows?q=${search}`);
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      const data = await response.json();
      navigation.navigate('SearchPage', { results: data, search });
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <SafeAreaView style={styles.search}>
      <View style={styles.searchParentFlexBox}>
        <Pressable style={styles.miarrowUp} onPress={() => navigation.navigate('Home')}>
          <Image style={styles.miarrowUpLayout} resizeMode="cover" source={require('@/assets/images/mi_arrow-up.png')} />
        </Pressable>
        <View style={styles.searchInner}>
          <TextInput
            style={styles.frame}
            placeholder='Search Here..'
            onChangeText={handleChangeSearch}
            value={search}
            keyboardType="default"
            onSubmitEditing={handleSearchSubmit}
            placeholderTextColor='white' // Set placeholder text color to white
          />
          {search && (
            <Pressable style={styles.frameChild} onPress={() => setSearch("")}>
              <Image style={{ tintColor: "white" }} resizeMode="cover" source={require('@/assets/images/basil_cross-outline.png')} />
            </Pressable>
          )}
        </View>
      </View>
      <View style={styles.footer}>
        <Pressable style={[styles.button, styles.homeButton]} onPress={() => navigation.navigate('Home')}>
          <Text style={[styles.buttonText, { color: 'white' }]}>Home</Text>
        </Pressable>
        <Pressable style={[styles.button, styles.searchButton]} onPress={() => navigation.navigate('Search')}>
          <Text style={[styles.buttonText, { color: 'white' }]}>Search</Text>
        </Pressable>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  searchInner: {
    borderColor: "white",
    borderWidth: 1,
    width: "80%",
    height: 50,
    paddingHorizontal: 14,
    paddingVertical: 11,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    borderRadius: 12,
    backgroundColor: "#000" 
  },
  miarrowUpLayout: {
    height: "100%",
    width: "100%",
    tintColor: "white"
  },
  frame: {
    color: "white",
    fontSize: 14,
    textAlign: "left",
    width: "80%",
    paddingEnd: "5%",
  },
  frameChild: {
    paddingHorizontal: 2,
  },
  searchParentFlexBox: {
    top: "5%",
    flexDirection: "row",
    justifyContent: "space-evenly",
    alignItems: "center"
  },
  miarrowUp: {
    height: 24,
    width: 24
  },
  search: {
    backgroundColor: "#000000",
    flex: 1,
    width: "100%"
  },
  footer: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    flexDirection: 'row',
    justifyContent: 'space-around',
    backgroundColor: '#333',
    paddingVertical: 10,
  },
  button: {
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 8,
    backgroundColor: '#333',
  },
  buttonText: {
    color: 'white',
    fontSize: 16,
  },
});

export default Search;
