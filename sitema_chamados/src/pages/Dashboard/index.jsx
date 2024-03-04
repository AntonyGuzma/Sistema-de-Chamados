import React from 'react'
import { AuthContext } from '../../contexts/auth'
import { useContext } from 'react'
import Header from '../../components/header'

export default function Dashboard() {

  const { logout } = useContext(AuthContext)

  async function handleLogout(){
    await logout();
  }

  return (
    <div>
      <Header></Header>
      
      <button onClick={handleLogout}>Sair</button>
    </div>
  )
}
