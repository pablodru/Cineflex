import axios from "axios";
import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom"
import Back from '../../components/Back';
import Loading from "../../components/Loading";
import { PageContainer, SessionContainer, ButtonsContainer, FooterContainer } from './SessionsPageStyles';

export default function SessionsPage() {
    
    const { idFilme } = useParams();
    const URL = `https://mock-api.driven.com.br/api/v8/cineflex/movies/${idFilme}/showtimes`;
    let [movie, setMovie] = useState([]);

    useEffect(() => {
        const promise = axios.get(URL);

        promise.then(response => setMovie(response.data));
        promise.catch(erro => console.log(erro.response.data));
    },[])

    if(movie.length ===0){
        return( 
            <Loading />
        )
    }
    

    return (
        <PageContainer>
            Selecione o horário
            <div>
                {movie.days.map(day => {
                    return (
                    <SessionContainer key={day.id} data-test='movie-day'>
                        {day.weekday} - {day.date}
                        <ButtonsContainer>
                            {day.showtimes.map(hour => 
                                {return (
                                    <Link to={`/assentos/${hour.id}`} key={hour.id}>
                                        <button data-test='showtime'>{hour.name}</button>
                                    </Link>
                                )})}
                        </ButtonsContainer>
                    </SessionContainer>)
                })}

            </div>

            <FooterContainer data-test='footer'>
                <div>
                    <img src={movie.posterURL} alt="poster" />
                </div>
                <div>
                    <p> { movie.title } </p>
                </div>
            </FooterContainer>

            <Back />

        </PageContainer>
    )
}