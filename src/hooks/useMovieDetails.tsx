import { useEffect } from "react";
import { useState } from "react";
import movieDB from "../api/movieDB";
import { MovieFull } from '../interfaces/MovieInterface';
import { CreditsResponse, Cast } from '../interfaces/CreditsInterface';

interface MovieDetails {
    isLoading: boolean;
    cast: Cast[];
    movieFull?: MovieFull;
}


export const useMovieDetails = ( moivieId: number) => {

    const [state, setstate] = useState<MovieDetails>({
        isLoading: true,
        cast: [],
        movieFull: undefined,
    });

    const getDetails = async() => {

        const movieDetailsPromise = await movieDB.get<MovieFull>(`/${ moivieId }`);
        const castPromise = await movieDB.get<CreditsResponse>(`/${ moivieId }/credits`);

        const [moviDetailResp, castPromiseResp] = await Promise.all([movieDetailsPromise, castPromise])
        setstate({
            isLoading: false,
            cast: castPromiseResp.data.cast,
            movieFull: moviDetailResp.data,
        });
    }

    useEffect(() => {
        getDetails();
    }, []);

    return {
        ...state
    }

}
