import React, { useEffect, useState } from 'react'
import movieDB from '../api/movieDB';
import { MovieDBMoviesResponse, Movie } from '../interfaces/MovieInterface';

interface MovieState {
    nowPlaying: Movie[];
    popular: Movie[];
    topRated: Movie[];
    upcoming: Movie[];
}

export const useMovies = () => {

    const [movieState, setMovieState] = useState<MovieState>({
        nowPlaying: [],
        popular:    [],
        topRated:   [],
        upcoming:   [],
    });
    const [isLoading, setIsLoading] = useState(true);

    const getNowPlaying = async () => {
        const nowPlayingPromise = movieDB.get<MovieDBMoviesResponse>('/now_playing');
        const popularPromise    = movieDB.get<MovieDBMoviesResponse>('/popular');
        const topRatedPromise   = movieDB.get<MovieDBMoviesResponse>('/top_rated');
        const upcomingPromise   = movieDB.get<MovieDBMoviesResponse>('/upcoming');
        const resp = await Promise.all([
            nowPlayingPromise,
            popularPromise,
            topRatedPromise,
            upcomingPromise
        ]);

        setMovieState({
            nowPlaying: resp[0].data.results,
            popular: resp[1].data.results,
            topRated: resp[2].data.results,
            upcoming: resp[3].data.results,
        });

        setIsLoading(false);
    }

    useEffect(() => {
        getNowPlaying();
    }, [])

    return {
        ...movieState,
        isLoading
    }
}
