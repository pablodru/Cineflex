import axios from "axios";
import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom"
import styled from "styled-components";
import Back from '../../components/Back';

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
        return( <div style={{marginTop:'80px', fontSize:'30px'}}>
                    Carregando...
                </div>
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

const PageContainer = styled.div`
    display: flex;
    flex-direction: column;
    font-family: 'Roboto';
    font-size: 24px;
    text-align: center;
    color: #293845;
    margin-top: 30px;
    padding-bottom: 120px;
    padding-top: 70px;
    div {
        margin-top: 20px;
    }
`
const SessionContainer = styled.div`
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    font-family: 'Roboto';
    font-size: 20px;
    color: #293845;
    padding: 0 20px;
`
const ButtonsContainer = styled.div`
    display: flex;
    flex-direction: row;
    margin: 20px 0;
    button {
        margin-right: 20px;
    }
    a {
        text-decoration: none;
    }
`
const FooterContainer = styled.div`
    width: 100%;
    height: 120px;
    background-color: #C3CFD9;
    display: flex;
    flex-direction: row;
    align-items: center;
    font-size: 20px;
    position: fixed;
    bottom: 0;

    div:nth-child(1) {
        box-shadow: 0px 2px 4px 2px #0000001A;
        border-radius: 3px;
        display: flex;
        align-items: center;
        justify-content: center;
        background-color: white;
        margin: 12px;
        img {
            width: 50px;
            height: 70px;
            padding: 8px;
        }
    }

    div:nth-child(2) {
        display: flex;
        flex-direction: column;
        align-items: flex-start;
        p {
            text-align: left;
            &:nth-child(2) {
                margin-top: 10px;
            }
        }
    }
`