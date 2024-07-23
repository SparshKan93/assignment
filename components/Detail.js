import React from "react";
import { Image, StyleSheet, Text, View, Pressable, ScrollView, Dimensions, Linking } from "react-native";
import { useNavigation } from '@react-navigation/native';
import { SafeAreaView } from 'react-native-safe-area-context';

const { width } = Dimensions.get('window');

const Detail = ({ route }) => {
    const navigation = useNavigation();
    const { item } = route.params || {};

    const handleGoToSite = () => {
        if (item?.url) {
            Linking.openURL(item.url).catch(err => console.error("Failed to open URL", err));
        } else {
            console.error("No URL provided");
        }
    };

    return (
        <SafeAreaView style={styles.detail}>
            <ScrollView showsVerticalScrollIndicator={false}>
                <View style={styles.imageContainer}>
                    <Pressable style={styles.miarrowUp} onPress={() => navigation.navigate('Home')}>
                        <Image style={styles.miarrowUpLayout} resizeMode="cover" source={require('@/assets/images/mi_arrow-up.png')} />
                    </Pressable>
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
                    <Pressable style={styles.bookButton} onPress={handleGoToSite}>
                        <Text style={styles.buttonText}>Go To Site</Text>
                    </Pressable>
                </View>
            </ScrollView>
        </SafeAreaView>
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
        position: 'relative', 
    },
    image: {
        width: '100%',
        height: '100%',
        opacity: 0.7, 
    },
    miarrowUp: {
        position: 'absolute',
        top: 10,
        left: 10,
        height: 24,
        width: 24,
        zIndex: 1, 
        opacity: 1, 
    },
    miarrowUpLayout: {
        height: "100%",
        width: "100%",
        tintColor: "black", 
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
    bookButton: {
        paddingVertical: 20,
        backgroundColor: "#0a74f0",
        borderRadius: 10,
        width: "70%",
    },
    buttonText: {
        color: "#fff",
        alignSelf: "center",
    },
});

export default Detail;
