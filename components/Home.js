import React, { useEffect, useState } from "react";
import { Text, View, StyleSheet, ScrollView, Image, StatusBar, Pressable } from "react-native";
import { useNavigation } from '@react-navigation/native';
import Card from '@/components/card';

const Home = () => {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const navigation = useNavigation();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('https://api.tvmaze.com/search/shows?q=all');
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        const data = await response.json();
        const sortedData = data.map(item => item.show).sort((a, b) => (b.rating.average || 0) - (a.rating.average || 0));
        setPosts(sortedData); 
        setLoading(false);
      } catch (error) {
        setError(error.message);
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  if (loading) return <Text style={styles.loadingText}>Loading...</Text>;
  if (error) return <Text style={styles.errorText}>Error: {error}</Text>;

  return (
    <View style={styles.container}>
      <StatusBar barStyle="light-content" backgroundColor="#000000" />
      <View style={styles.header}>
        <Image style={styles.logo} resizeMode="cover" source={require('@/assets/images/image 134.png')} />
        <Pressable onPress={() => navigation.navigate('Search')}>
          <Image style={styles.searchIcon} resizeMode="cover" source={require('@/assets/images/majesticons_search-line.png')} />
        </Pressable>
      </View>
      <Text style={styles.heading}>Trending</Text>
      <ScrollView horizontal={true} showsHorizontalScrollIndicator={false}>
        {posts.map(item => (
          <Card key={item.id} item={item} />
        ))}
      </ScrollView>
      <View style={styles.footer}>
        <Pressable style={styles.button} onPress={() => navigation.navigate('Home')}>
          <Text style={[styles.buttonText, { color: 'white' }]}>Home</Text>
        </Pressable>
        <Pressable style={styles.button} onPress={() => navigation.navigate('Search')}>
          <Text style={[styles.buttonText, { color: 'white' }]}>Search</Text>
        </Pressable>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: 'black',
  },
  loadingText: {
    color: 'white',
    textAlign: 'center',
    marginTop: 20,
  },
  errorText: {
    color: 'red',
    textAlign: 'center',
    marginTop: 20,
  },
  heading: {
    fontSize: 24,
    fontWeight: 'bold',
    color: "white",
    marginVertical: 15
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
    padding: 10,
  },
  buttonText: {
    color: 'white',
    fontSize: 16,
  },
  header: {
    marginBottom: 25,
    flexDirection: "row",
    alignItems: 'center',
    justifyContent: "space-between"
  },
  logo: {
    tintColor: 'rgb(229, 9, 20)',
  },
  searchIcon: {
    tintColor: 'white',
    marginRight: "1%",
  }
});

export default Home;
