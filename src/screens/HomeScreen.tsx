import React from 'react';
import { Dimensions, View, ScrollView } from 'react-native'
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import Carousel from 'react-native-snap-carousel';


import { useMovies } from '../hooks/useMovies';
import IndicadorActividad from '../components/IndicadorActividad';
import { styles } from '../styles/Styles';
import MoviePoster from '../components/MoviePoster';
import HorizontalSlider from '../components/HorizontalSlider';


export default function HomeScreen() {

    const { nowPlaying, popular, topRated, upcoming, isLoading } = useMovies();
    const { top } = useSafeAreaInsets();

    const { width: windowWidth } = Dimensions.get('window');

    if (isLoading){
        return(
            <View style={styles.ContainerActivityIndicator}>
                <IndicadorActividad/>
            </View>
        )
    }

    return (
        <ScrollView>
            <View style={{marginTop: top + 20}}>
                <View style={{height: 440,}}>
                    <Carousel
                        data={nowPlaying}
                        renderItem={({item}:any)=> <MoviePoster movie={ item }/>}
                        sliderWidth={windowWidth}
                        itemWidth={300}
                    />                
                </View>
                <HorizontalSlider title="En Cines" movies={popular}/>
                <HorizontalSlider title="Calificadas" movies={topRated}/>
                <HorizontalSlider title="Próximamente" movies={upcoming}/>
            </View>
        </ScrollView>
    )
}
