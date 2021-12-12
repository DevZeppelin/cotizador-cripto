import React, {useState} from "react";
import styled from "@emotion/styled";

import { useEffect } from "react/cjs/react.development";
import axios from "axios";
import Formulario from "./components/Formulario";
import Cotizacion from "./components/Cotizacion";
import Spinner from "./components/Spinner"

const Contenedor = styled.div`
  max-width: 900px;
  margin: 0 auto;
  
  @media (min-width: 992px) {
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    column-gap: 2rem;
  }
`;

const Imagen = styled.img`
  max-width: 100%;
  margin-top: 5rem;     
`;

const Heading = styled.h1`
  font-family: 'Bebas Neue', cursive;
  color: #FFF;
  text-align: left;
  font-weight: 700;
  font-size: 50px;
  margin-bottom: 50px;
  margin-top: 80px;
  

  &::after {
    content: '';
    width: 100px;
    height: 6px;
    background-color: #66a2fe;
    display: block;   
  }
`;


function App() {

  const [moneda,guardarMoneda] = useState('') 
  const [criptomoneda,guardarCriptomoneda] = useState('') 
  const [resultado, guardarResultado] = useState({})
  const [cargando, guardarCargando] = useState(false)

  useEffect(() => {

    const cotizarCriptomoneda = async () => {

    //evitar la ejecucion la primera vez
    //el proyecto pasado lo hicimos creando una funcion
    if(moneda === '') return
  
    //consultar API para obtener cotizacion, copiamos el endpoint que trae el price
    const url = `https://min-api.cryptocompare.com/data/pricemultifull?fsyms=${criptomoneda}&tsyms=${moneda}`

    const resultado = await axios.get(url)    
    
    //mostrar el spinner
    guardarCargando(true)

    //ocultar Spinner y mostrar resultado
    setTimeout(()=>{

      //cambiar el estado de cargando
      guardarCargando(false)
      
      //guardar Cotizacion
      guardarResultado(resultado.data.DISPLAY[criptomoneda][moneda])
    }, 2000)

  }
  cotizarCriptomoneda()
}, [moneda, criptomoneda])
//estos dos valores significa que cuando cambie alguno de estos dos se ejecutara neuvamente el useEffect
   
  //mostrar spinner o resultado
  const componente = (cargando) ? <Spinner/> :  <Cotizacion resultado={resultado} />

  return (
    <Contenedor>
      <div>
        <Imagen src="/cryptomonedas.png" alt="imagen cripto" />
      </div>
      <div>
        <Heading>Cotiza criptomonedas al Instante</Heading>
        <Formulario
          guardarCriptomoneda={guardarCriptomoneda}
          guardarMoneda={guardarMoneda}
        />

        {componente}
       
      </div>
    </Contenedor>
  );
}

export default App;
