import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom"
import Seats from '../../components/Seats.jsx';
import Back from '../../components/Back';
import Loading from "../../components/Loading.jsx";
import { PageContainer, FormContainer, CaptionContainer, CaptionCircle, CaptionItem, FooterContainer} from './SeatsPageStyles.js';

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

        const objSuccess = { idSuccess, name, cpf:formateCPF(cpf), title:session.movie.title, hour: session.name, date: session.day.date };

        const promisePost = axios.post(URLPOST, objBuy);

        promisePost.then(response => navigate('/sucesso', {state: objSuccess}));
        promisePost.catch(erro => console.log(erro.response.data))
    }

    function formateCPF(cpf){
        cpf = cpf.replace(/\D/g, '');

        cpf = cpf.replace(/(\d{3})(\d)/, '$1.$2');
        cpf = cpf.replace(/(\d{3})(\d)/, '$1.$2');
        cpf = cpf.replace(/(\d{3})(\d{2})$/, '$1-$2');

        return cpf;
    }

    


    if( session.length === 0 ){
        return (
            <Loading />
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
                <input type='text' maxLength='14' placeholder="Digite seu CPF..." required value={formateCPF(cpf)} onChange={(e) => setCpf(e.target.value)} data-test='client-cpf' />

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