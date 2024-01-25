import { useState, createContext, useEffect } from "react";
import { auth, db } from "../services/FirebaseConnecton"
import { createUserWithEmailAndPassword } from "firebase/auth";
import {  doc, getDoc, setDoc } from "firebase/firestore";
import { useNavigate } from "react-router-dom";
import { toast } from 'react-toastify'

export const AuthContext = createContext({})

function AuthProvider({ children }){

    const [user, setUser] = useState(null)
    const [loandingAuth, setloandingAuth] = useState(false)

    const navigate = useNavigate()

    function signIn(email, password){
        console.log(email, password)
        alert("Logado");
    }

    //cadastrar user
    async function signUp(email, password, name){
        setloandingAuth(true)

        await createUserWithEmailAndPassword(auth, email, password)
        .then( async(value) => { 
            let uid = value.user.uid

            await setDoc(doc(db, "Users", uid),{
                nome: name,
                avatarUrl: null,

            })
            .then(() => {
                alert("Sucesso")
                let data = {
                    uid: uid,
                    nome: name,
                    email: value.user.email,
                    avatarUrl: null
                }
                
                setUser(data)
                storageUser(data)
                setloandingAuth(false)
                toast.success('Seja bem Vindo ao Sistema!')
                navigate("/dashboard")
            })

        })
        .catch((e) => {
            console.log(e);
            setloandingAuth(false)
        })
    }

    const storageUser = (data) => {
        localStorage.setItem('@ticktes', JSON.stringify(data))
    }

    return(
        <AuthContext.Provider value={ {
            // duas interrogacçoes converte para booleam
            signed: !!user, 
            user,
            signIn,
            signUp,
            loandingAuth
        } }>
            {children}
        </AuthContext.Provider>
    )
}
export default AuthProvider;