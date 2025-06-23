import React, { useContext } from 'react'
import { Link } from 'react-router-dom';
import logo from '../../assets/logo.png'
import { useState } from 'react';
import { AuthContext } from '../../contexts/auth';

export default function SignUp() {

  const [name, setName] = useState('')
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('')

  const {signUp, loandingAuth} = useContext(AuthContext)

  async function handleSubmit(e){
    // evitar que a pag. atualize
    e.preventDefault()

    if(name != '' && email != '' && password != ''){
      signUp(email, password, name)
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
        
        {/* Condição ternaria */}
          <button type='submit'>{loandingAuth? 'Carregando':'Cadastrar'}</button>
        </form>

        <Link to='/'>Já Possui uma Conta? Faça Login</Link>
      </div>
    </div>
  )
}