import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom"
import styled from "styled-components"
import Seats from '../../components/Seats.jsx';
import Back from '../../components/Back';

export default function SeatsPage() {

    const { idSessao } = useParams();
    const navigate = useNavigate();

    const URL = `https://mock-api.driven.com.br/api/v8/cineflex/showtimes/${idSessao}/seats`;
    let [session, setSession] = useState([]);
    let [name, setName] = useState('');
    let [cpf, setCpf] = useState('');
    let [ids, setIds] = useState([]);
    let [idSuccess, setIdSuccess] = useState([]);
    
    useEffect(()=>{
        const promise = axios.get(URL);

        promise.then(response => setSession(response.data));
        promise.catch(erro => console.log(erro.response.data));
    },[])

    function buySeats(e){
        e.preventDefault();

        const URLPOST = 'https://mock-api.driven.com.br/api/v8/cineflex/seats/book-many';
        const objBuy = {ids, name, cpf};

        const objSuccess = { idSuccess, name, cpf, title:session.movie.title, hour: session.name, date: session.day.date};

        const promisePost = axios.post(URLPOST, objBuy);

        promisePost.then(response => navigate('/sucesso', {state: objSuccess}));
        promisePost.catch(erro => console.log(erro.response.data))
    }

    


    if( session.length === 0 ){
        return (
            <div style ={{marginTop:'80px', fontSize:'36px'}}>
                Carregando...
            </div>
        )
    }

    return (
        <PageContainer>
            Selecione o(s) assento(s)

            <Seats session={session} ids={ids} setIds={setIds} idSuccess={idSuccess} setIdSuccess={setIdSuccess} />

            <CaptionContainer>
                <CaptionItem>
                    <CaptionCircle style={{backgroundColor:'#1AAE9E', border:'1px solid #0E7D71'}}/>
                    Selecionado
                </CaptionItem>
                <CaptionItem>
                    <CaptionCircle style={{backgroundColor:'#C3CFD9', border:'1px solid #7B8B99'}}/>
                    Disponível
                </CaptionItem>
                <CaptionItem>
                    <CaptionCircle style={{backgroundColor:'#FBE192', border:'1px solid #F7C52B'}}/>
                    Indisponível
                </CaptionItem>
            </CaptionContainer>

            <FormContainer onSubmit={buySeats}>
                <label>Nome do Comprador:</label>
                <input type='text' placeholder="Digite seu nome..." required value={name} onChange={(e) => setName(e.target.value)} data-test='client-name'/>

                <label>CPF do Comprador:</label>
                <input type='text' placeholder="Digite seu CPF..." required value={cpf} onChange={(e) => setCpf(e.target.value)} data-test='client-cpf' />

                <button type="submit" data-test='book-seat-btn' >Reservar Assento(s)</button>
            </FormContainer>

            <FooterContainer data-test='footer' >
                <div>
                    <img src={session.movie.posterURL} alt="poster" />
                </div>
                <div>
                    <p>{session.movie.title}</p>
                    <p>{session.day.weekday} - {session.name}</p>
                </div>
            </FooterContainer>

            <Back />
        </PageContainer>
    )
}

const PageContainer = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    font-family: 'Roboto';
    font-size: 24px;
    text-align: center;
    color: #293845;
    margin-top: 30px;
    padding-bottom: 120px;
    padding-top: 70px;
`

const FormContainer = styled.form`
    width: calc(100vw - 40px); 
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    margin: 20px 0;
    font-size: 18px;
    button {
        align-self: center;
    }
    input {
        width: calc(100vw - 60px);
    }
`
const CaptionContainer = styled.div`
    display: flex;
    flex-direction: row;
    width: 300px;
    justify-content: space-between;
    margin: 20px;
`
const CaptionCircle = styled.div`
    border: 1px solid blue;         // Essa cor deve mudar
    background-color: lightblue;    // Essa cor deve mudar
    height: 25px;
    width: 25px;
    border-radius: 25px;
    display: flex;
    align-items: center;
    justify-content: center;
    margin: 5px 3px;
`
const CaptionItem = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    font-size: 12px;
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