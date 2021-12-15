import React, { useState } from 'react';
import {NavBar} from '../NavBar';
import '../styles/App.css';

export default function T1(){
    let operadores = '';
    const [classValue, setClassValue] = useState(null);
    
    function validarOperadores(text){
        let contOp = 0;
        let contOpen = text.split('(').length-1;
        let contClose = text.split(')').length-1;
        operadores = '';

        if(text[text.length-1] !== ')' || (text[0] !== '-' && text[0] !== '('))
            return 'Erro';
        if(contOpen !== contClose)
            return 'Erro';

        text = text.replace(/([()])/g, '');
        
        if(text.indexOf('&') !== -1){
            operadores += '&';
            contOp += text.split('&').length-1;
        }     
        if(text.indexOf('#') !== -1){
            operadores += '#';
            contOp += text.split('#').length-1;
        }
        if(text.indexOf('>') !== -1){
            operadores += '>';
            contOp += text.split('>').length-1;
        } 

        if(operadores === '')
            return 'Erro';
        if((contOpen + contClose)/contOp !== 2)
            return 'Erro';

        for (let i = 0; i < text.length; i++){
            if(operadores.indexOf(text[i]) !== -1){
                if(!text[i+1] || (operadores.indexOf(text[i-1]) !== -1 || operadores.indexOf(text[i+1]) !== -1)) 
                    return 'Incompleta!';
            }else{
                if(text[i] >= '0' && text[i] <= '9')
                    return 'Erro'
                if(text[i] === '-'){
                    if(i === 0 && !text[i+1])
                        return 'Preposição está incompleta';
                    
                    if(!text[i+1])
                        return 'Preposição está incompleta';
                    
                }else if(text[i+1] && operadores.indexOf(text[i+1]) === -1 ) 
                    return 'Erro';
            }
        }
        return '';
    }

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

        if(0 < formula.length && formula.length < 3){
            if(((formula[0] === '-' && formula[1]) || !(formula[0] && formula[1]))){
                setClassValue('responseTrue');
                resultado.innerHTML = 'É uma preposição';
            }else{
                setClassValue('responseFalse');
                resultado.innerHTML = 'Não é uma preposição';
            }
        }else{
            const validar = validarOperadores(formula);
            if(validar === ''){
                setClassValue('responseTrue');
                resultado.innerHTML = 'É uma preposição';
            }else{
                setClassValue('responseFalse');
                resultado.innerHTML = 'Não é uma preposição - ' + validar;
            }
        }  
    }
    return(
        <>
            <h1>Verificador de preposições</h1>
            <div className='inputArea'>
                <h2>Verificador</h2>
                <ul style={{border: '1px dotted', textAlign:'initial', position: 'absolute', right: 15, top: 15}}>
                    <li>Negação: -</li>
                    <li>Conjução: &</li>
                    <li>Disjunção: #</li>
                    <li>Implicação: {'>'}</li>
                    <li>Auxiliares: (  )</li>
                </ul>
                <div style={{margin:10}}>
                    Preposição: <input id='logica' className='input'></input>
                    <button className="BtnVerificar" onClick={()=>verificar()}>Verificar</button>
                </div>
                <div>
                    <p className={classValue} id='resultado'></p> 
                </div>
            </div>
        </>
    )
}
