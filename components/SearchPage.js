import React from 'react';
import { View, Text, StyleSheet, ScrollView, Image, SafeAreaView, Pressable } from 'react-native';

const SearchPage = ({ route, navigation }) => {
  const { results, search } = route.params;

  const truncateSummary = (summary) => {
    if (!summary) return ""; 
    const words = summary.split(' ');
    if (words.length > 20) {
      return words.slice(0, 20).join(' ') + '...';
    }
    return summary;
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.searchParentFlexBox}>
        <Pressable style={styles.miarrowUp} onPress={() => navigation.navigate('Search')}>
          <Image style={styles.miarrowUpLayout} resizeMode="cover" source={require('@/assets/images/mi_arrow-up.png')} />
        </Pressable>
        <View style={styles.searchInner}>
          <Pressable onPress={() => navigation.navigate('Search')} style={styles.frame}>
            <Text style={styles.searchText}>{search}</Text>
          </Pressable>
        </View>
      </View>
      {results.length === 0 ? (
        <View style={styles.noResultsContainer}>
          <Text style={styles.noResultsText}>No Result Found</Text>
        </View>
      ) : (
        <ScrollView style={styles.resultsContainer} showsVerticalScrollIndicator={false}>
          {results.map(result => (
            <View key={result.show.id} style={styles.card}>
              <Image
                style={styles.image}
                resizeMode="cover"
                source={{ uri: result.show.image?.medium || "https://static.tvmaze.com/uploads/images/medium_portrait/248/621817.jpg" }}
              />
              <View style={styles.textContainer}>
                <Text style={styles.title}>{result.show.name}</Text>
                <Text style={styles.summary}>
                  {truncateSummary(result.show.summary?.replace(/<\/?[^>]+(>|$)/g, ""))}
                </Text>
              </View>
            </View>
          ))}
        </ScrollView>
      )}
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'black',
  },
  resultsContainer: {
    top: "2%",
    width: "90%",
    alignSelf: "center",
  },
  card: {
    flexDirection: 'row',
    marginBottom: 16,
    backgroundColor: '#333',
    borderRadius: 8,
    overflow: 'hidden',
  },
  image: {
    width: 100,
    height: 150,
  },
  textContainer: {
    flex: 1,
    padding: 10,
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    color: 'white',
  },
  summary: {
    fontSize: 14,
    color: 'white',
    marginTop: 5,
  },
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
    backgroundColor: "#000",
  },
  miarrowUpLayout: {
    height: "100%",
    width: "100%",
    tintColor: "white",
  },
  frame: {
    flex: 1,
  },
  searchText: {
    color: "white",
    fontSize: 14,
    textAlign: "left",
  },
  searchParentFlexBox: {
    top: "5%",
    flexDirection: "row",
    justifyContent: "space-evenly",
    alignItems: "center",
    marginBottom: "5%",
  },
  miarrowUp: {
    height: 24,
    width: 24,
  },
  noResultsContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  noResultsText: {
    color: 'white',
    fontSize: 18,
  },
});

export default SearchPage;
