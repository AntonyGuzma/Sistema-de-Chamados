import Header from "../../components/header";
import Title from "../../components/Title";
import { FiSettings, FiUpload } from "react-icons/fi";
import avatar from "../../assets/avatar.png" 
import { AuthContext } from "../../contexts/auth";
import { useContext, useState } from "react";

import './profile.css';

export default function Profile() {

  const { user } = useContext(AuthContext);

  const [avatarUrl, setAvatarUrl] = useState(user && user.avatarUrl)

  return (
    <div>
      <Header />
      <div className="content">
        <Title name="Minha Conta">
          <FiSettings size={25}></FiSettings>
        </Title>

        <div className="container">
            <form className="form-profile">
                <label className="label-avatar">
                    <span>
                        <FiUpload color="#fff" size={25}/>
                    </span>
                    
                    {/* Aceitar Imagens (qualquer tipo) */}
                    <input type="file" accept="image/*"/> <br/>
                    {avatarUrl === null ? (
                        <img src={avatar} alt="foto de perfil" width={250} height={250}></img>
                    ):(
                        <img src={avatarUrl} alt="foto de perfil" width={250} height={250}></img>
                    )}
                </label>

                <label>Nome</label>
                <input type="text" placeholder="Seu Nome"/>

                <label>Email</label>
                <input type="text" placeholder="teste@teste.com" disabled={true}/>

                <button type="submit">Salvar</button>
            </form>
        </div>

        <div className="container">
            <button className="logout-btn">Sair</button>
        </div>
      </div>
    </div>
  );
}