import styled from "styled-components";

export default function Seats({session, ids, setIds, idSuccess, setIdSuccess}){

    function chooseSeat(id, isAvailable, name){
        if(!ids.includes(id) && isAvailable){
            setIds([...ids, id]);
            setIdSuccess([...idSuccess, name])
        } else {
            setIds(ids.filter(i => {
                if(i === id) return false
                else return true
            }))
        }
    }

    return (
        <SeatsContainer>
            {session.seats.map(seat => {
                return (
                    <SeatItem data-test='seat' key={seat.id} isAvailable={seat.isAvailable} id={seat.id} ids={ids} onClick={() => chooseSeat(seat.id, seat.isAvailable, seat.name)} > {seat.name} </SeatItem>
                )
            })}
        </SeatsContainer>
    )
}

const SeatsContainer = styled.div`
    width: 330px;
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
    align-items: center;
    justify-content: center;
    margin-top: 20px;
`

const SeatItem = styled.div`
    border: 1px solid ${props => !props.isAvailable ? '#F7C52B' : (!props.ids.includes(props.id)) ? '#7B8B99' : '#0E7D71'};
    background-color: ${props => !props.isAvailable ? '#FBE192' : (!props.ids.includes(props.id)) ? '#C3CFD9' : '#1AAE9E'};
    height: 25px;
    width: 25px;
    border-radius: 25px;
    font-family: 'Roboto';
    font-size: 11px;
    display: flex;
    align-items: center;
    justify-content: center;
    margin: 5px 3px;
`