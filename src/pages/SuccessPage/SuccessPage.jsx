import { useLocation, useNavigate } from "react-router-dom";
import Back from '../../components/Back';
import { PageContainer, TextContainer} from './SuccessPageStyles'

export default function SuccessPage() {

    const navigate= useNavigate();
    const location = useLocation().state;
    console.log(location)

    const {idSuccess, name, cpf, title, hour, date} = location;

    return (
        <PageContainer>
            <h1>Pedido feito <br /> com sucesso!</h1>

            <TextContainer data-test='movie-info' >
                <strong><p>Filme e sessão</p></strong>
                <p>{ title }</p>
                <p>{ date } - { hour }</p>
            </TextContainer>

            <TextContainer data-test='seats-info' >
                <strong><p>Ingressos</p></strong>
                {idSuccess.map(id => {
                    return (
                        <p key={id}> Assento {id} </p>
                    )
                })}
            </TextContainer>

            <TextContainer data-test='client-info' >
                <strong><p>Comprador</p></strong>
                <p>Nome: { name }</p>
                <p>CPF: { cpf }</p>
            </TextContainer>

            <button onClick={() => navigate('/')} data-test='go-home-btn' >Voltar para Home</button>

            <Back />
        </PageContainer>
    )
}