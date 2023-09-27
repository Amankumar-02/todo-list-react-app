import {useContext, createContext} from 'react'
export const TodoContext = createContext({
    mainTodos:[
        {
            id:1,
            todo:'my todo',
            completed:false,
        },
    ],
    addTodo:(todo)=>{},
    updateTodo:(id, todo)=>{},
    deleteTodo:(id)=>{},
    toggleComplete:(id)=>{},
})

export const TodoContextProvider = TodoContext.Provider

export function useTodo(){
    return useContext(TodoContext)
}