import { useContext, useEffect, useState } from 'react'
import './App.css'
import {UsuariosContext} from "./context/UsuariosContext"

function App() {
  
  const {usuarios, cadastrarUsuario, lerUsuariosPorId, editarUsuario, removerUsuario} = useContext(UsuariosContext)

  const [novoUsuario, setNovoUsuario] = useState({
    nome: "",
    email: "",
    senha: ""
  })
  
  const [usuarioEdicao, setUsuarioEdicao] = useState({
    nome: "",
    email: "",
    senha: ""
  })

  async function editar(id){
    debugger
    let dadosAtual = await lerUsuariosPorId(id)
    setUsuarioEdicao(dadosAtual)
  }

  return (
    <>
      <h1>App</h1>
      {!!usuarios && usuarios.map(usuario => (
        <div key={usuario.id}>
          <h3 >{usuario.nome}</h3>
          <button onClick={() => removerUsuario(usuario.id)}>remover</button>
          <button onClick={() => editar(usuario.id)}>editar</button>
        </div>
      ))}
      <hr />
      <h2>Cadastrar</h2>
      <input 
        type="text"
        placeholder="Digite o nome do usuário"
        value={novoUsuario.nome}
        onChange={(evento) => setNovoUsuario({...novoUsuario, nome: evento.target.value})}
      />
      <input 
        type="email"
        placeholder="Digite o email do usuário"
        value={novoUsuario.email}
        onChange={(evento) => setNovoUsuario({...novoUsuario, email: evento.target.value})}
      />
      <input 
        type="password"
        placeholder="Digite a senha do usuário"
        value={novoUsuario.senha}
        onChange={(evento) => setNovoUsuario({...novoUsuario, senha: evento.target.value})}
      />
      <button onClick={() => editarUsuario(novoUsuario, 5)}>Cadastrar</button>
      <hr />





      <h2>Editar</h2>
      <input 
        type="text"
        placeholder="Digite o nome do usuário"
        value={usuarioEdicao.nome}
        onChange={(evento) => setUsuarioEdicao({...usuarioEdicao, nome: evento.target.value})}
      />
      <input 
        type="email"
        placeholder="Digite o email do usuário"
        value={usuarioEdicao.email}
        onChange={(evento) => setUsuarioEdicao({...usuarioEdicao, email: evento.target.value})}
      />
      <input 
        type="password"
        placeholder="Digite a senha do usuário"
        value={usuarioEdicao.senha}
        onChange={(evento) => setUsuarioEdicao({...usuarioEdicao, senha: evento.target.value})}
      />
      <button onClick={() => editarUsuario(usuarioEdicao, usuarioEdicao.id)}>Cadastrar</button>
    </>
  )
}

export default App
