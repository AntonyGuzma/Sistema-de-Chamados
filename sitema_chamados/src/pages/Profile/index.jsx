import Header from "../../components/header";
import Title from "../../components/Title";
import { FiSettings, FiUpload } from "react-icons/fi";
import avatar from "../../assets/avatar.png" 
import { AuthContext } from "../../contexts/auth";
import { useContext, useState } from "react";
import {doc , updateDoc} from 'firebase/firestore';
import { ref , uploadBytes, getDownloadURL } from "firebase/storage";
import {toast} from 'react-toastify';

import {db , storage} from '../../services/FirebaseConnecton';
import './profile.css';

export default function Profile() {

  const { user, storageUser, setUser, logout  } = useContext(AuthContext);

  // Condição para preencher as variaveis
  const [avatarUrl, setAvatarUrl] = useState(user && user.avatarUrl)
  const [imageAvatar, setImageAvatar] = useState(null)

  const [nome, setNome] = useState(user && user.nome)
  const [email, setEmail] = useState(user && user.email)

  const handleFile = (e) => {
    console.log(e.target.files[0])
    if(e.target.files[0]){  
      const image = e.target.files[0];
      
      if (image.type === 'image/jpeg' || image.type === 'image/png'){
        setImageAvatar(image)
        setAvatarUrl(URL.createObjectURL(image))
      }else{
        alert('Envie uma imagem do tipo png ou jpeg')
        setImageAvatar(null)
        return
      }
    }
  } 

  const handleUpload = async () =>{

    const currentuid = user.uid;
    
    const uploadRef = ref(storage, `images/${currentuid}/${imageAvatar.name}`)
    const uploadTask = uploadBytes(uploadRef, imageAvatar)
    .then((snapshot) => {
      getDownloadURL(snapshot.ref).then(async (downloadURL) => {
         let urlFoto = downloadURL;

        const docRef = doc(db, "Users", currentuid)
        await updateDoc(docRef, {
          avatarUrl: urlFoto,
          nome: nome,
        })
        .then(() => {
          let data = {...user,
            nome:nome,
            avatarUrl: urlFoto,    
          }
  
          setUser(data)
          storageUser(data)
          toast.success('Atualizado com Sucesso');
        })
      })
    })

  }
  

  const handleSubmit = async (e) =>{
     e.preventDefault();
     
     if(imageAvatar === null && nome != ''){
      //Atualizar apenas o nome
      const docRef = doc(db, "Users", user.uid)
      await updateDoc(docRef, {
          nome: nome
      }).then(() => {
        let data = {...user,
          nome:nome        
        }

        setUser(data)
        storageUser(data)
        toast.success('Atualizado com Sucesso');
      })
     }else 
     if (nome !== '' && imageAvatar !== null){
      //Atualizar Nome e Foto
      handleUpload()
     }
  }

  return (
    <div>
      <Header />
      <div className="content">
        <Title name="Minha Conta">
          <FiSettings size={25}></FiSettings>
        </Title>

        <div className="container">
            <form className="form-profile" onSubmit={handleSubmit}>
                <label className="label-avatar">
                    <span>
                        <FiUpload color="#fff" size={25}/>
                    </span>
                    
                    {/* Aceitar Imagens (qualquer tipo) */}
                    <input type="file" accept="image/*" onChange={handleFile}/> <br/>
                    {avatarUrl === null ? (
                        <img src={avatar} alt="foto de perfil" width={250} height={250}></img>
                    ):(
                        <img src={avatarUrl} alt="foto de perfil" width={250} height={250}></img>
                    )}
                </label>

                <label>Nome</label>
                <input type="text" value={nome} onChange={(e) => setNome(e.target.value)}/>

                <label>Email</label>
                <input type="text" value={email} disabled={true}/>

                <button  type="submit">Salvar</button>
            </form>
        </div>

        <div className="container">
            <button className="logout-btn" onClick={() => {logout()}}>Sair</button>
        </div>
      </div>
    </div>
  );
}
