import { useNavigate } from "react-router-dom"

export default function Back(){

    const navigate = useNavigate();

    return (
        <button data-test='go-home-header-btn' onClick={() => navigate(-1)}><ion-icon name="arrow-back-outline" style={{width:'30px', height:'30px', color:'#000000', position:'fixed', top:'23px', left:'10px'}} ></ion-icon></button>
    ) 
}