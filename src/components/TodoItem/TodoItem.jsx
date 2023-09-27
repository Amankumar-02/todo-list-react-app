import React, { useState } from "react";
import {useTodo} from '../../contexts/TodoContext'

function TodoItem({ appTodo }) {
    const [isTodoEditable, setIsTodoEditable] = useState(false)
    const [todoMsg, setTodoMsg] = useState(appTodo.todo)

    const {updateTodo, deleteTodo, toggleComplete} = useTodo()

    const editTodoFinal = ()=>{
        updateTodo(appTodo.id, {...appTodo, todo: todoMsg})
        setIsTodoEditable(false)
    }
    const toggleCompletedFinal = ()=>{
        toggleComplete(appTodo.id)
    }

    return (
        <div
            className={`flex border border-black/10 rounded-lg px-3 py-1.5 gap-x-3 shadow-sm shadow-white/50 duration-300  text-black ${
                appTodo.completed ? "bg-[#c6e9a7]" : "bg-[#ccbed7]"
            }`}
        >
            <input
                type="checkbox"
                className="cursor-pointer"
                checked={appTodo.completed}
                onChange={toggleCompletedFinal}
            />
            <input
                type="text"
                className={`border outline-none w-full bg-transparent rounded-lg ${
                    isTodoEditable ? "border-black/10 px-2" : "border-transparent"
                } ${appTodo.completed ? "line-through" : ""}`}
                value={todoMsg}
                onChange={(e)=>setTodoMsg(e.target.value)}
                readOnly={!isTodoEditable}
            />
            {/* Edit, Save Button */}
            <button
                className="inline-flex w-8 h-8 rounded-lg text-sm border border-black/10 justify-center items-center bg-gray-50 hover:bg-gray-100 shrink-0 disabled:opacity-50"
                onClick={()=>{
                    if(isTodoEditable){
                        editTodoFinal()
                    }
                    else setIsTodoEditable((prev)=> !prev)
                }}
                disabled={appTodo.completed}
            >
                {isTodoEditable ? "📁" : "✏️"}
            </button>
            {/* Delete Todo Button */}
            <button
                className="inline-flex w-8 h-8 rounded-lg text-sm border border-black/10 justify-center items-center bg-gray-50 hover:bg-gray-100 shrink-0"
                onClick={()=>{deleteTodo(appTodo.id)}}
            >
                ❌
            </button>
        </div>
    );
}

export default TodoItem;