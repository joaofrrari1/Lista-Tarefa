import React, { useCallback, useReducer, useState } from 'react';
import './App.css';

const taskReducer = (state, action) => {
  switch (action.type) {
    case 'ADD_TAREFA':
      return [...state, action.payload];
    case 'CONCLUIDO':
      const atualizarTarefa = [...state];
      atualizarTarefa[action.payload].completed = true;
      return atualizarTarefa;
    case 'EXCLUIR_TAREFA':
      return state.filter((_, index) => index !== action.payload);
    default:
      return state;
  }
};

function App() {
  const [tarefa, setTarefa] = useState('');
  const [tarefaAtual, dispatch] = useReducer(taskReducer, []);

  const addTarefa = useCallback(() => {
    if (tarefa.trim() !== '') {
      dispatch({ type: 'ADD_TAREFA', payload: { text: tarefa, completed: false } });
      setTarefa('');
    }
  }, [tarefa]);

  const concluirTarefa = useCallback((index) => {
    dispatch({ type: 'CONCLUIDO', payload: index });
  }, []);

  const excluirTarefa = useCallback((index) => {
    dispatch({ type: 'EXCLUIR_TAREFA', payload: index });
  }, []);

  return (
    <div className="container">
      <h1 >Lista de Tarefas</h1>
      <div className="input">
        <input
          type="text"
          placeholder="Nova tarefa"
          value={tarefa}
          onChange={(e) => setTarefa(e.target.value)}
        />
        <button onClick={addTarefa}>Adicionar</button>
      </div>
      <ul>
        {tarefaAtual.map((tarefa, index) => (
          <li key={index}>
            <span className={tarefa.completed ? 'completed' : ''}>{tarefa.text}</span>
            {!tarefa.completed && (
              <>
                <button className="concluir" onClick={() => concluirTarefa(index)}><svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#FFFFFF"><path d="M382-240 154-468l57-57 171 171 367-367 57 57-424 424Z"/></svg></button>
              </>
            )}
            <button className="excluir" onClick={() => excluirTarefa(index)}><svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#FFFFFF"><path d="M280-120q-33 0-56.5-23.5T200-200v-520h-40v-80h200v-40h240v40h200v80h-40v520q0 33-23.5 56.5T680-120H280Zm400-600H280v520h400v-520ZM360-280h80v-360h-80v360Zm160 0h80v-360h-80v360ZM280-720v520-520Z"/></svg></button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;
