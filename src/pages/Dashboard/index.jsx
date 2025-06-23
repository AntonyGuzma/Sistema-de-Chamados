import React from 'react'
import { AuthContext } from '../../contexts/auth'
import { useContext } from 'react'
import Header from '../../components/header'
import Title from '../../components/Title'
import './dashboard.css'
import { FiPlus, FiMessageSquare, FiSearch, FiEdit2 } from 'react-icons/fi'
import { Link } from 'react-router-dom'

export default function Dashboard() {

  const { logout } = useContext(AuthContext)

  async function handleLogout(){
    await logout();
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
              <tr>
                <td data-label="Cliente">Mercado Esquina</td>
                <td data-label="Assunto">Suport</td>
                <td data-label="Status">
                  <span className='badge' style={{backgroundColor: '#999'}}>Aberto</span>
                </td>
                <td data-label="Cadastrado">01-01-2019</td>
                <td data-label="#">
                  <button className='action' style={{backgroundColor: '#3583f6'}}><FiSearch color='#fff' size={17}/></button>
                  <button className='action' style={{backgroundColor: '#f6a935'}}><FiEdit2 color='#fff' size={17}/></button>
                </td>
              </tr>

              <tr>
                <td data-label="Cliente">Mercado Esquina</td>
                <td data-label="Assunto">Suport</td>
                <td data-label="Status">
                  <span className='badge' style={{backgroundColor: '#999'}}>Aberto</span>
                </td>
                <td data-label="Cadastrado">01-01-2019</td>
                <td data-label="#">
                  <button className='action' style={{backgroundColor: '#3583f6'}}><FiSearch color='#fff' size={17}/></button>
                  <button className='action' style={{backgroundColor: '#f6a935'}}><FiEdit2 color='#fff' size={17}/></button>
                </td>
              </tr> 
            </tbody>
          </table>
        </>
      </div>
      
    </div>
  )
}
