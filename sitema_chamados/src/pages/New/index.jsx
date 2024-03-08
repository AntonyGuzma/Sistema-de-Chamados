import {React, useState, useEffect, useContext} from "react";
import Title from "../../components/Title";
import Header from "../../components/header";
import { FiPlusCircle } from "react-icons/fi";
import { AuthContext } from "../../contexts/auth";
import "./new.css";
import { db } from "../../services/FirebaseConnecton";
import { collection, getDocs, getDoc, doc} from "firebase/firestore";

export default function New() {

  const { user } = useContext(AuthContext)

  const [custormes, setCustormes] = useState([]);
  const [loadCustomers, setLoadCustomer] = useState(true) 
  const [custormeSelected, setCustormeSelected] = useState(0)

  const [complemento, setComplemento] = useState('');
  const [assunto, setAssunto] = useState('Suporte');
  const [status, setStatus] = useState('Aberto');

  const listRef = collection(db, 'customers');

  // Como o array de dependencia está vazio ele irá fazer uma verificação assim que a pagina carregar
  useEffect(() => {
      async function loadCustomers(){
        const querySnapShot = await getDocs(listRef)
        .then((snapshot) =>{
          let lista = []

          snapshot.forEach((documento) =>{
            lista.push({
              id: documento.id,
               nomeFantasia: documento.data().nomeFantasia
            })
          })
         
          if(snapshot.docs.size === 0){
            console.log('nenhuma empresa encontrada')
            setCustormes([{id: 1, nomeFantasia: 'Fantasia'}])
            setLoadCustomer(false)
            return
          }

          setCustormes(lista)
          setLoadCustomer(false)
        })
        .catch((e) => {
          console.log("ERROR AO BUSCAR OS CLIENTES")
          setLoadCustomer(false); 
          setCustormes([{id: '1', nomeFantasia: 'Fantasia'}])
        })
      }

      loadCustomers()
  }, [])

  function handleOptionChange(e){
    setStatus(e.target.value)
  }

  const handleChangeSelect = (e) => {
    setAssunto(e.target.value)
  }

  function handleCustomerChange(e){
    setCustormeSelected(e.target.value)
  }

  return (
    <div>
      <Header />

      <div className="content">
        <Title name="Novo Chamado">
          <FiPlusCircle size={25}></FiPlusCircle>
        </Title>

        <div className="container">
          <form className="form-profile">
            <label>Clientes</label>
            
            {
              loadCustomers ? (
                <input type="text" disabled={true} value="Carregando..."></input>
              ) : (
                <select value={custormeSelected} onChange={handleCustomerChange}>
                    {custormes.map((item, index) => {
                      return (
                        <option key={index} value={index}>
                          {item.nomeFantasia}
                        </option>
                      )
                    })}
                </select>
              )
            }

            <label>Assuntos</label>
            <select value={assunto} onChange={handleChangeSelect}>
              <option key={1} value="Suporte">
                Suporte
              </option>
              <option key={2} value="Visita Técnica">
                Visita Técnica
              </option> 
              <option key={2} value="Financeiro">
                Financeiro
              </option>
            </select>

            <label>Status</label>
            <div className="status">
              <input type="radio" name="radio" value="Aberto" onChange={handleOptionChange} checked={status === 'Aberto'}/>
              <span>Em Aberto</span>
              <input type="radio" name="radio" value="Progresso" onChange={handleOptionChange} checked={status === 'Progresso'}/>
              <span>Progresso</span>
              <input type="radio" name="radio" value="Atendido" onChange={handleOptionChange} checked={status === 'Atendido'}/>
              <span>Atendido</span>
            </div>

            <label>Complemento</label>
            <textarea type='text' placeholder="Descreva Seu Problema(Opcional)" value={complemento} onChange={(e) => setComplemento(e.target.value)} cols="30" rows="10"></textarea>

            <button type="submit">Registrar</button>
          </form>
        </div>
      </div>
    </div>
  );
}
