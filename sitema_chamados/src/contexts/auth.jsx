import { useState, createContext, useEffect } from "react";
import { auth, db } from "../services/FirebaseConnecton";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
} from "firebase/auth";
import { doc, getDoc, setDoc } from "firebase/firestore";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

export const AuthContext = createContext({});

function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loandingAuth, setloandingAuth] = useState(false);

  const navigate = useNavigate();

  async function signIn(email, password) {
    setloandingAuth(true);

    await signInWithEmailAndPassword(auth, email, password)
    .then( async (value) => {
        let uid = value.user.uid;
        // Referenciando o Banco do Firebase
        const docRef = doc(db, "Users", uid);
        const docSnap = await getDoc(docRef);

        let data = {
          uid: uid,
          nome: docSnap.data().nome,
          email: value.user.email,
          avatarUrl: docSnap.data().avatarUrl,
        };

        setUser(data)
        storageUser(data)
        setloandingAuth(false)
        toast.success("Seja bem Vindo de Volta!");
      navigate("/dashboard")
    })
    .catch((e) => {
        console.log(e)
        setloandingAuth(false)
        toast.error("Algo deu errado!")
    })
  }

  //cadastrar user
  async function signUp(email, password, name) {
    setloandingAuth(true);

    await createUserWithEmailAndPassword(auth, email, password)
      .then(async (value) => {
        let uid = value.user.uid;

        await setDoc(doc(db, "Users", uid), {
          nome: name,
          avatarUrl: null,
        }).then(() => {
          alert("Sucesso");
          let data = {
            uid: uid,
            nome: name,
            email: value.user.email,
            avatarUrl: null,
          };

          setUser(data);
          storageUser(data);
          setloandingAuth(false);
          toast.success("Seja bem Vindo ao Sistema!");
          navigate("/dashboard");
        });
      })
      .catch((e) => {
        console.log(e);
        setloandingAuth(false);
      });
  }

  const storageUser = (data) => {
    localStorage.setItem("@ticktes", JSON.stringify(data));
  };

  return (
    <AuthContext.Provider
      value={{
        // duas interrogacçoes converte para booleam
        signed: !!user,
        user,
        signIn,
        signUp,
        loandingAuth,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}
export default AuthProvider;
