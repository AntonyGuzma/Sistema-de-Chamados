import { AuthContext } from '../../contexts/auth'
import { useContext, useEffect, useState } from 'react'
import Header from '../../components/header'
import Title from '../../components/Title'
import './dashboard.css'
import { FiPlus, FiMessageSquare, FiSearch, FiEdit2 } from 'react-icons/fi'
import { Link } from 'react-router-dom'
import { collection, getDocs, limit, orderBy, query, startAfter } from 'firebase/firestore'
import { db } from '../../services/FirebaseConnecton'

const listRef = collection(db, "chamados")

export default function Dashboard() {
  const [chamados, setChamados] = useState([])
  const [loading, setLoading] = useState(true)

  const [isEmpty, setIsEmpty] = useState(false)
  const [lastDocs, setLastDocs] = useState()
  const [loadingMore, setLoadingMore] = useState(false)
  

  useEffect(() => {
    async function loadChamados() {
      const q = query(listRef, orderBy("created", 'desc'), limit(5))
      
      const querySnapshot = await getDocs(q)
      await updateState(querySnapshot)
      setLoading(false)
    }

    loadChamados()

    return () => {}
  },[])

  async function updateState(querySnapshot) {
    const isCollectionQuery = querySnapshot.size === 0;

    if(!isCollectionQuery){
      let lista = [];

      querySnapshot.forEach((doc) => {
        lista.push({
          id: doc.id,
          cliente: doc.data().cliente,
          assunto: doc.data().assunto,
          status: doc.data().status,
          complemento: doc.data().complemento,
          cadastrado: doc.data().created
        })
      })
      const lastDocs = querySnapshot.docs[querySnapshot.docs.length - 1]
      console.log(lastDocs)
      setChamados(chamados => [...chamados, ...lista])
      setLastDocs(lastDocs)
    }else{
      setIsEmpty(true)
    }
    setLoadingMore(false)
  }

  async function handleMore(){
    setLoadingMore(true)

    const q = query(listRef, orderBy("created", 'desc'), startAfter(lastDocs),limit(5)) 
    const querySnapshot = await getDocs(q)
    await updateState(querySnapshot)
  }

  return (
    <div>
      <Header></Header>
      
      <div className="content">
        <Title name="Tickeets">
          <FiMessageSquare size={25}></FiMessageSquare>
        </Title>

        <>
        <Link className='new' to="/new">
          <FiPlus color='white' size={25}></FiPlus>
          Novo Chamado
        </Link>
          
          {chamados.length === 0 ? (
            <span>Nao Encontrei...</span>
          ):(
            <>
              <table>
                <thead>
                  <tr>
                    <th scope='col'>Cliente</th>
                    <th scope='col'>Assunto</th>
                    <th scope='col'>Status</th>
                    <th scope='col'>Cadastrado</th>
                    <th scope='col'>#</th>
                  </tr>
                </thead>
                <tbody>
                  {chamados.map((item,index) => {
                    return (
                        <tr key={index}>
                          <td data-label="Cliente">{item.cliente}</td>
                          <td data-label="Assunto">{item.assunto}</td>
                          <td data-label="Status">
                            <span className='badge' style={{backgroundColor: item.status === 'Aberto' ? '#5cb85c': '#999'}}>{item.status}</span>
                          </td>
                          <td data-label="Cadastrado">01-01-2019</td>
                          <td data-label="#">
                            <button className='action' style={{backgroundColor: '#3583f6'}}><FiSearch color='#fff' size={17}/></button>
                            <button className='action' style={{backgroundColor: '#f6a935'}}><FiEdit2 color='#fff' size={17}/></button>
                          </td>
                        </tr>
                    )
                  })}
                </tbody>
              </table>

              {loadingMore && <h3>Buscando mais chamdos...</h3>}
              {!loadingMore && !isEmpty && <button onClick={handleMore}>Buscar Mais</button>}
            </>
          )}
        </>
      </div>
      
    </div>
  )
}
