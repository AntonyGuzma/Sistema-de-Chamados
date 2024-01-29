import React from 'react'
import { useState, useContext } from 'react'

import logo from '../../assets/logo.png'
import { Link } from 'react-router-dom';
import  './signin.css'
import { AuthContext } from '../../contexts/auth';

export default function Signin() {

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('')

  //Usando o Contexto Importado
  const { signIn, loandingAuth } = useContext(AuthContext)

  function handleSignIn(e){
    // evitar que a pag. atualize
    e.preventDefault();

    if(email != '' && password != ''){
      signIn(email, password);
    };
  }

  return (
    <div className='container-center'>
      <div className="login">
        <div className="login-area">
          <img src={logo} alt="Logo do Sistema de Chamado" />
        </div>

        <form onSubmit={handleSignIn}>
          <h1>Entrar</h1>
          <input type="text" placeholder='email@email.com' value={email} onChange={e => setEmail(e.target.value)}/>
          <input type="text" placeholder='**********' value={password} onChange={e => setPassword(e.target.value)}/>
        
          <button type='submit'>{loandingAuth? 'Carregando':'Acessar'}</button>
        </form>

        <Link to='/register'>Criar uma Conta</Link>
      </div>
    </div>
  )
}
