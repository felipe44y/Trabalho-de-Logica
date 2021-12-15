import React from 'react';
import { useHistory } from 'react-router';

export function NavBar(){
    const history = useHistory();
    return(
        <div className="navbar">
            <button onClick={()=>history.push("/")}>1º - Questão</button>
            <button onClick={()=>history.push("/Q2")}>2º - Questão</button>
            <button onClick={()=>history.push("/EXTRA")}>Questão - Extra</button>
        </div>
    )
}