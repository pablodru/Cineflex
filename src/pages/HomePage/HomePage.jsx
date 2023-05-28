import { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import Loading from "../../components/Loading";
import { PageContainer, ListContainer, MovieContainer} from './HomePageStyles';

export default function HomePage() {

    const URL = 'https://mock-api.driven.com.br/api/v8/cineflex/movies';

    let [movies, setMovies] = useState([])

    useEffect(()=>{
        const promise = axios.get(URL);

        promise.then(response => setMovies(response.data));
        promise.catch(() => alert('Houve um problema no servidor. Tente novamente mais tarde.'))

    }, []);

    if(movies.length===0){
        return(
            <Loading />
        )
    }

    return (
        <PageContainer>
            Selecione o filme

            <ListContainer>
                {movies.map(movie =>    
                                    <Link to={`/sessoes/${movie.id}`} key={movie.id}>
                                        <MovieContainer data-test='movie'>
                                            <img src={movie.posterURL} alt="poster" />
                                        </MovieContainer>
                                    </Link>)}
            </ListContainer>

        </PageContainer>
    )
}