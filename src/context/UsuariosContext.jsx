import { createContext, useEffect, useState } from "react";

export const UsuariosContext = createContext()

export const UsuariosContextProvider = ({children}) => {
  const [usuarios, setUsuarios] = useState([])
  
  useEffect(() => {
    lerUsuarios()
  }, [])

  function lerUsuarios(){
    fetch("http://localhost:3000/usuarios") // GET
    .then(response => response.json())
    .then(dados => setUsuarios(dados))
    .catch(erro => console.log(erro))
  }

  async function procurarUsuario(email, senha){
    try {
      let listaUsuarios = await fetch("http://localhost:3000/usuarios")

      let usuarioExiste = false

      listaUsuarios.map(usuario => {
        if(usuario.email == email){
          usuarioExiste = true
        }
        if(usuario.senha == senha){
          // salvo id no localStorage
          // salvo que ele está autenticado localStorage
          // redireciona para o dashboard
        }
      })
    } catch {

    }
  }

  async function lerUsuariosPorId(id){
    debugger
    try {
      let resultado = await fetch("http://localhost:3000/usuarios/" + id) // GET
      return resultado.json()
    } catch {

    }

  }

  function cadastrarUsuario(novoUsuario){
    fetch("http://localhost:3000/usuarios", {
      method: "POST", // cadastrar
      body: JSON.stringify(novoUsuario),
      headers: {
        'Content-Type': 'application/json',
      },
    })
    .then(() => {
      alert("Usuario adicionado com sucesso!")
      lerUsuarios()
    })
    .catch(() => alert("Erro ao adicionar o usuário!"))
  }

  function editarUsuario(dadosUsuario, id){
    fetch("http://localhost:3000/usuarios/" + id, {
      method: "PUT", // editar
      body: JSON.stringify(dadosUsuario),
      headers: {
        'Content-Type': 'application/json',
      },
    })
    .then(() => {
      alert("Usuario atualizado com sucesso!")
      lerUsuarios()
    })
    .catch(() => alert("Erro ao atualizar o usuário!"))
  }

  function removerUsuario(id){
    fetch("http://localhost:3000/usuarios/" + id, {
      method: "DELETE", // deletar
    })
    .then(() => {
      alert("Usuario removido com sucesso!")
      lerUsuarios()
    })
    .catch(() => alert("Erro ao remover o usuário!"))
  }


  return (
    <UsuariosContext.Provider value={{usuarios, cadastrarUsuario, editarUsuario, removerUsuario, lerUsuariosPorId}}>
      {children}
    </UsuariosContext.Provider>
  )
}