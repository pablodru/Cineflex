import styled from "styled-components";
import { createGlobalStyle } from "styled-components";

export default function Loading(){
    return (
        <>
            <GlobalStyle />
            <SCloading src='https://www.audihearing.com.au/wp-content/uploads/2021/03/loading-gif-orange-8.gif' alt='Carregando' />
        </>
    )
}

const SCloading = styled.img`
    width: 60%;
    height:60%;
    margin: 250px auto;

    display:flex;
`

const GlobalStyle = createGlobalStyle`
    body{
        background-color:#FFE4B5;
    }
`