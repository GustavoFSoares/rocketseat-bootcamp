import React, { useState, useEffect } from "react";

import "./styles.css";
import { Project } from './services/api'

export default () => {
  const [repositories, setRepositories] = useState([])
  useEffect(() => {
    Project.list().then(res => {
      setRepositories(res.data)
    })
    
  }, [])

  async function handleAddRepository() {
    let d = new Date()
    let data = {
      title: `Projeto ${d.getDate()}/${d.getDay()}/${d.getFullYear()}${d.getHours()}:${d.getMinutes()}:${d.getSeconds()}`,
      url: "https://github.com/Rocketseat/bootcamp-gostack-desafios/tree/master/desafio-conceitos-reactjs",
      techs: ['ReactJS', 'Node']
    }
    Project.add(data).then(res => {
      setRepositories([...repositories, res.data])
    })
  }

  async function handleRemoveRepository(id, index) {
    let yesno = window.confirm("Tem certeza que deseja excluir")
    if (yesno) {
      console.log(id, index);
      
      Project.delete(id).then(() => {
        repositories.splice(index, 1)
        setRepositories([...repositories])
      }).catch(err => {
        window.alert('Erro ao excluir')
        console.warn(err);
      })
    }
  }

  return (
    <div>
      <ul data-testid="repository-list">
        { repositories && repositories.length === 0 && <h3>Sem dados a exibir</h3> }
        {repositories.map((repository, index) => (
          <li key={repository.id}>
            {repository.title}
            <button onClick={() => handleRemoveRepository(repository.id, index)}> Remover </button>
          </li>
        ))}
      </ul>

      <button onClick={handleAddRepository}>Adicionar</button>
    </div>
  );
}