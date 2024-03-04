import {React, useState }from "react";
import Title from "../../components/Title";
import Header from "../../components/header";
import { FiUser } from "react-icons/fi";
import { db } from "../../services/FirebaseConnecton"
import { addDoc, collection } from "firebase/firestore";
import { toast } from "react-toastify";

export default function Customers() {

    const [nome, setNome] = useState("")
    const [cnpj, setCnpj] = useState("")
    const [endereco, setEndereco] = useState("")

    async function handleRegister(e){
        e.preventDefault();

        if(nome !== '' && cnpj !== '' && endereco !== ''){
            await addDoc(collection(db, "customers"), {
                nomeFantasia: nome,
                cnpj: cnpj,
                endereco: endereco
            })
            .then(() => {
                setNome('');
            setCnpj('');
            setEndereco('');
            toast.success("Empresa Registrada")
            })
            .catch((error)=> {
                console.error(error);
                toast.error('error ao cadastrar')
            })
        }else{
            toast.error("Prencha todos os campos")
        }
        
    }

  return (
    <div>
      <Header />

      <div className="content">
        <Title name="Clientes">
          <FiUser size={25}></FiUser>
        </Title>

        <div className="container">
            <form className="form-profile" onSubmit={handleRegister}>
                <label>Nome Fantasia</label>
                <input type="text" placeholder="Nome da Empresa" value={nome} onChange={(e) => {setNome(e.target.value)}}/>

                <label>CNPJ</label>
                <input type="text" placeholder="Digite o CNPJ" value={cnpj} onChange={(e) => {setCnpj(e.target.value)}}/>

                <label>Endereço</label>
                <input type="text" placeholder="Endereço da Empresa" value={endereco} onChange={(e) => {setEndereco(e.target.value)}}/>

                <button type="submit">Salvar</button>
            </form>
        </div>
      </div>
    </div>
  );
}
