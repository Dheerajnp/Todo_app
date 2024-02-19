import React, { useState } from 'react';
import './App.css';
function ToDoList() {
    const savedTodos = JSON.parse(localStorage.getItem('todos')) || [];
    const [toDos, setTodos] = useState(savedTodos);
    const [toDo, setTodo] = useState('');
    const [editingId, setEditingId] = useState(null);
    const [editText, setEditText] = useState('');
    const [error,setError]=useState('');

    const addToDo = () => {
        const trimmedValue = toDo.trim();
        if (trimmedValue && isNaN(Number(trimmedValue))) {
        const newTodo =  {id: Date.now(), text: toDo, status: false}
        setTodos([...toDos,newTodo]);
        setTodo('');
        localStorage.setItem('todos', JSON.stringify([...savedTodos,newTodo]));
        }else{
            setError("Enter valid task")
        }
    };

    const removeToDo = (id) => {
        const updatedTodos = toDos.filter(toDo => toDo.id !== id);
        setTodos(updatedTodos);
        localStorage.setItem('todos', JSON.stringify(updatedTodos));
    };
    const startEdit = (id, text) => {
        setEditingId(id);
        setEditText(text);
    };
    const cancelEdit = () => {
        setEditingId(null);
        setEditText('');
    };
    const saveEdit = (id) => {
      const trimmedValue = editText.trim();
      if (trimmedValue && isNaN(Number(trimmedValue))) {
          setTodos(toDos.map(toDo => {
              if (toDo.id === id) {
                  return { ...toDo, text: editText };
              }
              return toDo;
          }));
          setError("");
          cancelEdit();
      } else {
          setError("Enter valid task");
      }
    };
    return (
        <div className="app">
            <h1>ToDo List...</h1>
            <div className="input">
                <input  value={toDo} onChange={(e) =>{setTodo(e.target.value)
                setError('')} } type="text" placeholder="🖊 Add item..." />
                <button onClick={addToDo}>Submit</button>
            </div>
            <p className='error'>{error}</p>
            <div className="todos">
                {toDos.map((obj) => (
                    <div className="todo" key={obj.id}>
                        <div className="left">
                            {editingId === obj.id ? (
                                <input value={editText} onChange={(e) => setEditText(e.target.value)} type="text" />
                            ) : (
                                <>
                                    <input onChange={(e) => {
                                        setTodos(toDos.map(obj2 => {
                                            if (obj2.id === obj.id) {
                                                obj2.status = e.target.checked;
                                            }
                                            return obj2;
                                        }));
                                    }} checked={obj.status} type="checkbox" />
                                    <p>{obj.text}</p>
                                </>
                            )}
                        </div>
                        <div className="right">
                            {editingId === obj.id ? (
                                <>
                                    <button onClick={() => saveEdit(obj.id)}>Save</button>
                                    <button onClick={cancelEdit}>Cancel</button>
                                </>
                            ) : (
                                <>
                                    <button onClick={() => startEdit(obj.id, obj.text)}>Edit</button>
                                    <button onClick={() => removeToDo(obj.id)}>Remove</button>
                                </>
                            )}
                        </div>
                    </div>
                ))}
                        {
                        toDos.map((obj)=>{
                            if(obj.status){
                                return (<h1>{obj.text}</h1>)
                            }
                            return null
                        })
                        }

            </div>
        </div>
    );
}

export default ToDoList;