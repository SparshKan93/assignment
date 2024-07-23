import React from "react";
import { Image, StyleSheet, Text, View, Pressable, ScrollView, Dimensions } from "react-native";
import { useNavigation } from '@react-navigation/native';
import { SafeAreaView } from 'react-native-safe-area-context';

const { width } = Dimensions.get('window');

const Detail = ({ route }) => {
    const navigation = useNavigation();
    const { item } = route.params || {};

    return (
        <SafeAreaView style={styles.detail}>
            <ScrollView showsVerticalScrollIndicator={false}>
                <View style={styles.imageContainer}>
                    <Image
                        style={styles.image}
                        resizeMode="cover"
                        source={{ uri: item?.image?.original }}
                    />
                </View>
                <View style={styles.infoContainer}>
                    <Text style={styles.title}>{item?.name}</Text>
                    <Text style={styles.genre}>
                        {item?.genres ? item.genres.join(', ') : 'Genre not available'}
                    </Text>
                    <Text style={styles.description}>{item?.summary?.replace(/<\/?[^>]+(>|$)/g, "")}</Text>
                </View>
                <View style={styles.buttonContainer}>
                    
                    <Pressable style={styles.bookButton} onPress={() => navigation.navigate('Order', { url: item?.url })}>
                        <Text style={styles.buttonText}>Book for Rent</Text>
                    </Pressable>
                </View>
            </ScrollView>
        </SafeAreaView>
    //     <Pressable style={styles.backButton} onPress={() => navigation.goBack()}>
    //     <Text style={styles.buttonText}>Go Back</Text>
    // </Pressable>
    );
};

const styles = StyleSheet.create({
    detail: {
        flex: 1,
        backgroundColor: "black",
    },
    imageContainer: {
        width: '100%',
        height: 500,
    },
    image: {
        width: '100%',
        height: '100%',
    },
    infoContainer: {
        padding: 20,
        backgroundColor: 'black',
        borderTopLeftRadius: 35,
        borderTopRightRadius: 35,
        marginTop: -10,
    },
    title: {
        fontSize: 24,
        color: "#fff",
        marginBottom: 10,
    },
    genre: {
        fontSize: 18,
        color: "#bbb",
        marginBottom: 10,
    },
    description: {
        fontSize: 16,
        color: "#ddd",
    },
    buttonContainer: {
        flexDirection: "row",
        justifyContent: "space-around",
        padding: 20,
        backgroundColor: 'black',
    },
    backButton: {
        paddingHorizontal: 20,
        paddingVertical: 10,
        backgroundColor: "#333",
        borderRadius: 10,
    },
    bookButton: {
        paddingHorizontal: 20,
        paddingVertical: 10,
        backgroundColor: "#0a74f0",
        borderRadius: 10,
        width: "70%"
    },
    buttonText: {
        color: "#fff"
    }
});

export default Detail;
