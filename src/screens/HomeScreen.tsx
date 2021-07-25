import React, { useContext, useEffect } from 'react';
import { Dimensions, View, ScrollView } from 'react-native'
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import Carousel from 'react-native-snap-carousel';


import { useMovies } from '../hooks/useMovies';
import IndicadorActividad from '../components/IndicadorActividad';
import { styles } from '../styles/Styles';
import MoviePoster from '../components/MoviePoster';
import HorizontalSlider from '../components/HorizontalSlider';
import GradientBackground from '../components/GradientBackground';
import { getImageColors } from '../helpers/getColores';
import { GradientContext } from '../context/GradientContext';


export default function HomeScreen() {

    const { nowPlaying, popular, topRated, upcoming, isLoading } = useMovies();
    const { top } = useSafeAreaInsets();

    const { setMainColors } = useContext(GradientContext);

    const { width: windowWidth } = Dimensions.get('window');

    const getPosterColors = async (index: number) => {
        const uri = `https://image.tmdb.org/t/p/w500${nowPlaying[index].poster_path}`;
        const [primary='green', secondary='orange'] = await getImageColors(uri);
        setMainColors({ primary, secondary});
    }

    useEffect(() => {
        if (nowPlaying.length > 0){
            getPosterColors(0);
        }
    }, [nowPlaying])

    if (isLoading){
        return(
            <View style={styles.ContainerActivityIndicator}>
                <IndicadorActividad/>
            </View>
        )
    }

    return (
        <GradientBackground>
            <ScrollView>
                <View style={{marginTop: top + 20}}>
                    <View style={{height: 440,}}>
                        <Carousel
                            data={nowPlaying}
                            renderItem={({item}:any)=> <MoviePoster movie={ item }/>}
                            sliderWidth={windowWidth}
                            itemWidth={300}
                            onSnapToItem={ index => getPosterColors(index) }
                        />                
                    </View>
                    <HorizontalSlider title="En Cines" movies={popular}/>
                    <HorizontalSlider title="Calificadas" movies={topRated}/>
                    <HorizontalSlider title="Próximamente" movies={upcoming}/>
                </View>
            </ScrollView>            
        </GradientBackground>

    )
}
