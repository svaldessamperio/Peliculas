import { StackScreenProps } from '@react-navigation/stack';
import React from 'react';
import { View, Text, Image, StyleSheet, Dimensions, ScrollView, ActivityIndicator, TouchableOpacity } from 'react-native';
import { RootStackParams } from '../navigation/Navigation';
import { useMovieDetails } from '../hooks/useMovieDetails';
import CurrencyFormatter from 'currency-formatter'
import CastItem from '../components/CastItem';
import { FlatList } from 'react-native-gesture-handler';
import Icon from 'react-native-vector-icons/Ionicons';

const screenHeight = Dimensions.get('screen').height

interface Props extends StackScreenProps<RootStackParams, 'DetailScreen'>{};

export default function DetailScreen({ route, navigation }:Props) {
    
    const movie = route.params;
    const uri = `https://image.tmdb.org/t/p/w500${movie.poster_path}`
    
    const {isLoading, movieFull, cast} = useMovieDetails(movie.id);
    console.log(movieFull?.budget);
    
    return (
        <ScrollView> 
             <View style={styles.imageMoviCont}>
                <Image
                    source={{ uri }}
                    style={styles.imageMovie}
                />
            </View>       
            <View style = {styles.marginContainer}>
                <Text style = {styles.original_title}>{movie.original_title}</Text>
                <Text style = {styles.title}>{movie.title}</Text>            
            </View>    
            <View style={styles.marginContainer}>
                <Text style = {{fontSize: 20, fontWeight: 'bold'}}>Presupuesto</Text>
                {
                    isLoading ?
                    <ActivityIndicator size={ 30 } color='red' style={{ marginTop: 20 }}/>
                    :
                        (movieFull?.budget
                        ? <Text>{ CurrencyFormatter.format(movieFull.budget, {code:'USD'}) }</Text>
                        : <Text style={{fontSize: 15}}>Budgett { CurrencyFormatter.format(0.00, {code:'USD'}) }</Text>
                        )
                }
            </View>
            <View style={[styles.marginContainer, {marginBottom: 100,}]}>
                <Text style = {{fontSize: 20, fontWeight: 'bold', }}>Actores</Text>
                <FlatList
                    data = {cast}
                    keyExtractor = { (item) => item.id.toString() }
                    renderItem = { ({ item } ) => <CastItem cast = { item }/>}
                    horizontal={true}
                    showsHorizontalScrollIndicator={ false }
                    style={{ marginTop:10, height: 90}}
                />
            </View>
            <View style = {styles.backButton}> 
                <TouchableOpacity
                    onPress={() => navigation.pop()}
                >
                    <Icon
                        name='arrow-back'
                        size={50}
                        color='white'
                    />                      
                </TouchableOpacity>
            </View>

        </ScrollView>

    )
}


const styles = StyleSheet.create({
    imageMoviCont: {
        width: '100%',
        height: screenHeight * 0.7,
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 1,
        },
        shadowOpacity: 0.18,
        shadowRadius: 1.00,
        elevation: 1,
        borderBottomEndRadius: 10,
    },
    imageMovie: {
        flex:1,
    },
    marginContainer:{
        marginTop: 20,
        marginHorizontal: 20,
    },
    original_title: {
        fontSize: 16,
        opacity: 0.8,
        color: 'black',
        
    },
    title: {
        fontSize: 20,
        fontWeight: 'bold',
    },
    backButton: {
        position: 'absolute',
        left: 20,
        top: 30,
        zIndex: 999,
        elevation:9,
    },
});