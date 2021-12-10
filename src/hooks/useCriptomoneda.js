import React, {Fragment, useState} from 'react'
import styled from '@emotion/styled'

const Label = styled.label`
    font-family: 'Bebas Neue', cursive;
    color: #FFF;
    text-transform: uppercase;
    font-weight: bold;
    font-size: 2.4rem;
    margin-top:2rem;
    display:block
`;

const Select = styled.select`
    width:100%;
    display:block;
    padding: 1rem;
    -webkit-appearance: 10px;
    border-radius: 10px;
    border:none;
    font-size: 1rem
`;


//Creamo nuestro HOOK a medida. Es importante ya que esta personalizado para lograr lo que necesitamos y luego solo lo introducimos en el componente principal

const useCriptomoneda = (label, stateInicial, opciones) => {

    //state del custom hook

    const [state, actualizarState] = useState(stateInicial)

    console.log(opciones)

    const SelectCripto = () => (
        <Fragment>
            <Label>{label}</Label>
            <Select
                onChange={e => actualizarState(e.target.value)} value={state}
            >
                <option value="">- Seleccione -</option>
                {opciones.map(opcion =>(
                <option value={opcion.CoinInfo.Name} key={opcion.CoinInfo.Id}>{opcion.CoinInfo.FullName}</option>

                ))}
            </Select>
        </Fragment>
    )

    //Retornar state, interfaz y fn que modifica el state

    return [state, SelectCripto, actualizarState]
}

export default useCriptomoneda