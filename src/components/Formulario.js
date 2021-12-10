import React, {useEffect, useState} from 'react'
import styled from '@emotion/styled'

import Error from './Error'
import useMoneda from '../hooks/useMoneda'
import useCriptomoneda from '../hooks/useCriptomoneda'
import axios from 'axios'

const Boton = styled.input`
    margin-top: 20px;
    font-weight: bold;
    font-size: 20px;
    padding: 10px;
    background-color: #66a2fe;
    border: none;
    width: 100%;
    border-radius: 10px;
    color: #fff;

    &:hover {
        background-color: #346Ac0;
        cursor: pointer
    }
`

const Formulario = ({guardarMoneda, guardarCriptomoneda}) => {

    //state listado de criptos
    const [listacripto, guardarCriptomonedas] = useState([])
    const [error, guardarError] = useState(false)

    const MONEDAS = [
        {codigo: 'USD', nombre: 'Dolar de Estados Unidos'},
        {codigo: 'ARS', nombre: 'Peso Argentino'},
        {codigo: 'MXN', nombre: 'Peso Mexicano'}
    ]
 
    //Utilizar nuestro custom hook, useMoneda
    const [moneda, SelectMoneda ] = useMoneda('Elige tu moneda','', MONEDAS)

    //utilizar nuevo hook useCriptomoneda
    const [criptomoneda, SelectCripto] = useCriptomoneda('Elige tu Criptomoneda', '', listacripto)

    //Ejecuytar llamado a la API
    useEffect(() => {
        const consultarAPI = async () => {
            const url = 'https://min-api.cryptocompare.com/data/top/mktcapfull?limit=15&tsym=USD'
            const resultado = await axios.get(url)

            guardarCriptomonedas(resultado.data.Data)
        }
        consultarAPI()
    }, [])

    //cuando el usuario hace submit
    const cotizarMoneda = e => {
        e.preventDefault()

        //validar si ambos campos estan llenos
        if(moneda.trim() === '' || criptomoneda.trim() === ''){
            guardarError(true)
            return
        }

        //caso contrario pasar los datos al componente principal
        guardarError(false)
        //estos valores vienen de nuestro custom hook
        guardarMoneda(moneda)
        guardarCriptomoneda(criptomoneda)
    }

    return (
        <form
            onSubmit={cotizarMoneda}
        >
            {error ? <Error mensaje="Todos los campos son obligatorios"></Error> : null}

            <SelectMoneda/>
            <Boton type="submit" value="Calcular" />
            <SelectCripto/>
            
        </form>
    )
}

export default Formulario
