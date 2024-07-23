import React, { useEffect } from "react";
import { StyleSheet, View, Image, ImageBackground } from "react-native";
import { useNavigation } from '@react-navigation/native';

const OnBoaring = () => {
    const navigation = useNavigation();

    useEffect(() => {
        const timer = setTimeout(() => {
            navigation.replace('Home');
        }, 2000); 
        return () => clearTimeout(timer);
    }, []);

    return (
        <ImageBackground
            style={styles.background}
            resizeMode="cover"
            source={require('@/assets/images/movie_background.jpg')}
        >
            <View style={styles.overlay} />
            <View style={styles.centeredContainer}>
                <Image
                    style={styles.centeredImage}
                    resizeMode="contain"
                    source={require('@/assets/images/image 134.png')}
                />
            </View>
        </ImageBackground>
    );
};

const styles = StyleSheet.create({
    background: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    overlay: {
        ...StyleSheet.absoluteFillObject,
        backgroundColor: 'rgba(0, 0, 0, 0.4)',
    },
    centeredContainer: {
        justifyContent: 'center',
        alignItems: 'center',
        zIndex: 1, 
    },
    centeredImage: {
        width: 200,  
        height: 200,
        tintColor: 'rgb(229, 9, 20)'
    },
});

export default OnBoaring;
