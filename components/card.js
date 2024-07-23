import React from 'react';
import { Text, StyleSheet, View, Image, Pressable } from 'react-native';
import { useNavigation } from '@react-navigation/native';

const Card = ({ item }) => {
    const navigation = useNavigation();
    const { image, name, summary } = item;

    const truncateSummary = (text) => {
      if (!text) return '';
      const words = text.split(' ');
      if (words.length > 10) {
        return words.slice(0, 10).join(' ') + '...';
      }
      return text;
    };
  
    return (
      <Pressable onPress={() => navigation.navigate('Detail', { item })} style={styles.frameParent}>
        <Image
    style={styles.frameChild}
    resizeMode="cover"
    source={{ uri: image?.medium || "https://static.tvmaze.com/uploads/images/medium_portrait/248/621817.jpg" }}
/>

        <View style={styles.frameGroup}>
          <View>
            <Text style={styles.acForRent}>{name}</Text>
            <Text style={styles.descriptionText}>
              {truncateSummary(summary?.replace(/<\/?[^>]+(>|$)/g, ""))}
            </Text>
          </View>
        </View>
      </Pressable>
    );
};

const styles = StyleSheet.create({
  frameParent: {
    alignItems: "center",
    paddingBottom: "10%",
    marginHorizontal: 15,
    marginTop: 5,
    width: 180,
    height:"60%"
  },
  frameChild: {
    width: 190,
    height: 280
  },
  frameGroup: {
    marginTop: 12
  },
  acForRent: {
    fontSize: 18,
    fontWeight: 'bold',
    color: "white",
    textAlign: "left"
  },
  descriptionText: {
    marginTop: 4,
    color: "#979797",
    textAlign: "left",
  }
});

export default Card;
