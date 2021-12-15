import React, { useState } from 'react';
import {NavBar} from '../NavBar';
import '../styles/App.css';

export default function T2(){
    const [classValue, setClassValue] = useState(null);
    
    function ocorrencias(text){
        let indices = [];
        let open = [];
        let close = [];

        for (let i = 0; i < text.length; i++) {
            if(text[i] === '('){
                open.push(i)
            }
            if(text[i] === ')'){
                close.push(i)
            }
            
        }
        let menor = open[0]
        for(let i = 0; i < close.length; i++) {
            for(let j = 0; j < open.length; j++) {
                if(close[i] - open[j] < close[i] - menor && close[i] - open[j] >= 0){
                    menor = j
                }   
            }
            indices.push(open[menor]);
            indices.push(close[i]);
            text = text.replace(text.substring(open[menor], close[i]+1),'');
            open.splice(menor,1);
            menor = open[0]
        }
        return indices;
    }

    function verificar(){
        const formula = String(document.getElementById('logica').value.replace(/\s/g, ''));
        const resultado = document.getElementById('resultado');
        const indices = ocorrencias(formula);
    
        for(let i = 0; i < indices.length; i += 2){
            let teste = formula.substring(indices[i], indices[i+1]) 
            if(teste.indexOf(">")!=-1){
                teste[teste.indexOf(">")] = "#"
                teste = '(' + '-' + teste.substring(indices[i+1])
                console.log(teste);
            }
        }
    }
    return(
        <>
        <NavBar/>
            <h1>Verificador de preposições</h1>
            <div className='inputArea'>
                <h2>Operadores</h2>
                <ul style={{border: '1px dotted',borderRadius: '10px', textAlign:'initial'}}>
                    <li>Negação: -</li>
                    <li>Conjução: &</li>
                    <li>Disjunção: #</li>
                    <li>Implicação: {'>'}</li>
                    <li>Auxiliares: (  )</li>
                </ul>
                <div style={{margin:10}}>
                    Digite a preposição: <input id='logica' className='input'></input>
                    <button className="BtnVerificar" onClick={()=>verificar()}>Verificar</button>
                </div>
                <div>
                    <p className={classValue} id='resultado'></p> 
                </div>
            </div>
        </>
    )
}

