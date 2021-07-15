import { useNavigation } from '@react-navigation/native';
import React from 'react'
import { TouchableOpacity } from 'react-native';
import { View, Text, Image, StyleSheet } from 'react-native'
import { Movie } from '../interfaces/MovieInterface';

interface Props {
    movie: Movie;
    height?: number;
    width?: number;
}

export default function MoviePoster({ movie, height = 420, width = 300 }: Props) {

    const uri = `https://image.tmdb.org/t/p/w500${movie.poster_path}`
    const navigation = useNavigation();

    return (
        <TouchableOpacity 
            onPress={() => navigation.navigate('DetailScreen', movie)}
            style={{
                height,
                width,
                marginHorizontal: 2,
                paddingBottom: 20,
                paddingHorizontal: 6,
            }}
        >
            <View style={styles.imageMoviCont}>
                <Image
                    source={{ uri }}
                    style={styles.imageMovie}
                />
            </View>
        </TouchableOpacity>
    )
}

const styles = StyleSheet.create({
    imageMoviCont: {
        flex: 1,
        borderRadius: 20,
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 10,
        },
        shadowOpacity: 0.24,
        shadowRadius: 7,

        elevation: 9,
        paddingRight:5,
        paddingBottom:5,
    },
    imageMovie: {
        flex:1,
        borderRadius: 18,
    },
});