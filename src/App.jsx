import './App.css'
import { TodoContextProvider } from './contexts/TodoContext'
import TodoForm from './components/TodoForm/TodoForm'
import TodoItem from './components/TodoItem/TodoItem'
import { useEffect, useState } from 'react'

function App() {
  const [mainTodos, setMainTodos] = useState([])

  const addTodo = (todo)=>{
    setMainTodos((prev)=>[{id:Date.now(), todo: todo, completed:false}, ...prev]) 
  }

  const updateTodo = (id, todo)=>{
    setMainTodos((prev)=>prev.map((prevTodo)=>(prevTodo.id === id ? todo : prevTodo)))
  }

  const deleteTodo = (id)=>{
    setMainTodos((prev)=>prev.filter((prevTodo)=>prevTodo.id !== id))
  }

  const toggleComplete = (id)=>{
    setMainTodos((prev)=>prev.map((prevTodo)=>prevTodo.id === id ? {...prevTodo, completed: !prevTodo.completed} : prevTodo))
  }

  useEffect(()=>{
    const getTodos = JSON.parse(localStorage.getItem('todos'))
    if(getTodos && getTodos.length > 0){
      setMainTodos(getTodos)
    }
  }, [])

  useEffect(()=>{
    localStorage.setItem('todos', JSON.stringify(mainTodos))
  }, [mainTodos])

  return (
    <TodoContextProvider value={{mainTodos, addTodo, updateTodo, deleteTodo, toggleComplete}}>
    <h1 className='bg-green-700 text-white text-3xl py-5'>Todo List App</h1>
    <div className="bg-[#172842] min-h-screen py-8">
        <div className="w-full max-w-2xl mx-auto shadow-md rounded-lg px-4 py-3 text-white">
            <h1 className="text-2xl font-bold text-center mb-8 mt-2">Manage Your Todos</h1>
            <div className="mb-4">
                {/* Todo form goes here */}
                <TodoForm />
            </div>
            <div className="flex flex-wrap gap-y-3">
                {/*Loop and Add TodoItem here */}
                {mainTodos.map((mainTodosKeys)=>(
                    <div key={mainTodosKeys.id}
                    className='w-full'>
                      <TodoItem appTodo={mainTodosKeys}/>
                    </div>
                ))}
            </div>
        </div>
    </div>
    </TodoContextProvider>
  )
}

export default App