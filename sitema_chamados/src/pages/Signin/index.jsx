import React from 'react'
import { useState } from 'react'

import logo from '../../assets/logo.png'
import { Link } from 'react-router-dom';
import  './signin.css'

export default function Signin() {

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('')

  return (
    <div className='container-center'>
      <div className="login">
        <div className="login-area">
          <img src={logo} alt="Logo do Sistema de Chamado" />
        </div>

        <form action="">
          <h1>Entrar</h1>
          <input type="text" placeholder='email@email.com' value={email} onChange={e => setEmail(e.target.value)}/>
          <input type="text" placeholder='**********' value={password} onChange={e => setPassword(e.target.value)}/>
        
          <button type='submit'>Acessar</button>
        </form>

        <Link to='/register'>Criar uma Conta</Link>
      </div>
    </div>
  )
}
