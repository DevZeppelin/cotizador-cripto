import React from 'react'
import styled from '@emotion/styled'

const ResultadoDiv = styled.div`
    color: #fff;
    font-family: Arial, Helvetica, cursive;
`;

const Info = styled.p`
    font-size: 18px;

    span {
        font-weight:bold
    }
`;
const Precio = styled.p`
    font-size: 30px
`;

const Cotizacion = ({resultado}) => {
    
    console.log(resultado)
    if(Object.keys(resultado).length === 0)return null 

    return (
        <ResultadoDiv>
            <Precio>El precio es: <span>{resultado.PRICE}</span></Precio>
            <Info>El precio mas alto del día fue: <span>{resultado.HIGHDAY}</span></Info>
            <Info>El precio mas bajo del día fue: <span>{resultado.LOWDAY}</span></Info>
            <Info>Variación del precio en las ultimas 24HS: <span>{resultado.CHANGEPCT24HOUR} %</span></Info>
       
        </ResultadoDiv>
    )
}

export default Cotizacion
