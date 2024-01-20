import React from 'react'
import { Link } from 'react-router-dom';
import logo from '../../assets/logo.png'
import { useState } from 'react';

export default function SignUp() {

  const [name, setName] = useState('')
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('')


  function handleSubmit(e){
    // evitar que a pag. atualize
    e.preventDefault()

    if(name != '' && email != '' && password != ''){
      
    }
  }

  return (
    <div className='container-center'>
      <div className="login">
        <div className="login-area">
          <img src={logo} alt="Logo do Sistema de Chamado" />
        </div>

        <form onSubmit={handleSubmit}>
          <h1>Cadastrar Nova Conta</h1>
          <input type="text" placeholder='Seu nome' value={name} onChange={e => setName(e.target.value)}/>
          <input type="text" placeholder='email@email.com' value={email} onChange={e => setEmail(e.target.value)}/>
          <input type="text" placeholder='**********' value={password} onChange={e => setPassword(e.target.value)}/>
        
          <button type='submit'>Acessar</button>
        </form>

        <Link to='/'>Já Possui uma Conta? Faça Login</Link>
      </div>
    </div>
  )
}