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
                marginHorizontal: 5,
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
        borderRadius: 18,
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 1,
        },
        shadowOpacity: 0.18,
        shadowRadius: 1.00,

        elevation: 1,
    },
    imageMovie: {
        flex:1,
        borderRadius: 18,
    },
});