import React, { useState, useEffect} from "react";
import api from './services/api'
import "./styles.css";
const { uuid } = require("uuidv4");


function App() {
  const [repositories, setRepository ] = useState([]);

  useEffect(() => {
    async function loadRepository() {
        const response = await api.get("repositories");

        const { data } = response;
        setRepository(data);       
    }
    loadRepository();
}, [repositories]);

  async function handleAddRepository() {
      const response = await api.post("repositories", {
          id: uuid(),
          title: `Novo Projeto ${Date.now()}`,
          url: 'http://github.com/alexavier20',
          techs: ['javascript', 'Angular'],
          likes: 0
      });

      const repository = response.data;
      setRepository([...repositories, repository]);
  }

  async function handleRemoveRepository(id) {
    const response = api.delete(`repositories/${id}`);   
  }

  return (
    <div>
      <ul data-testid="repository-list">
        {repositories.map(repository => (
            <li key={repository.id}>
            {repository.title}  
            <button onClick={() => handleRemoveRepository(repository.id)}>
              Remover
            </button>
          </li>
        ))}       
      </ul>

      <button onClick={handleAddRepository}>Adicionar</button>
    </div>
  );
}

export default App;
