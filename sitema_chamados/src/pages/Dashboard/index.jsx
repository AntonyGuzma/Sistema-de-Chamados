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
      <h1>Página Dash</h1>
      <button onClick={handleLogout}>Sair</button>
    </div>
  )
}
