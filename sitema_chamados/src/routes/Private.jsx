import { useContext } from "react";
import { Navigate } from "react-router-dom";
import { AuthContext } from "../contexts/auth";

import React from 'react'

// Controle de sessao

function Private({ children }) {
    
    const { signed, loading } = useContext(AuthContext)

    //se tiver true
    if(loading){
        return(
            <div></div>
        )
    }

    if(!signed){
        return <Navigate to={"/"}/>
    }

    return children
}   

export default Private
