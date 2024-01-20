import { useState, createContext, useEffect } from "react";

export const AuthContext = createContext({})

function AuthProvider({ children }){

    const [user, setUser] = useState(null)

    function signIn(email, password){
        console.log(email, password)
        alert("Logado");
    }

    return(
        <AuthContext.Provider value={ {
            // duas interrogacçoes converte para booleam
            signed: !!user, 
            user,
            signIn
        } }>
            {children}
        </AuthContext.Provider>
    )
}
export default AuthProvider;