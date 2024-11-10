import {TodoList} from "./TodoList";
import React, {useEffect, useState} from "react";
import {TodoService} from "./TodoService";
import {ITodo} from "./Todo";
import {AddTodoForm} from "./AddTodoForm";
import {FilteredTodos} from "./FilteredTodos";

export const TodoApp = () => {
    const [todos, setTodos] = useState<ITodo[]>([])
    const [filterTodos, setFilterTodos] = useState('ALL')
    const todoService = new TodoService()

    useEffect(() => {
        const loadTodos = () => {
            const fetchedTodos = todoService.fetchTodo()
            setTodos(fetchedTodos)
        }
        loadTodos()
    }, []);


    const addTodoHandler = (todo: ITodo) => {
        todoService.addTodo(todo)
        setTodos([...todos, todo])
    }

    const updateTodoHandler = (todo: ITodo) => {
        const updatedTodo = {...todo, completed: !todo.completed}
        todoService.updateTodo(updatedTodo)
        setTodos(todos.map((t) => t.id === todo.id ? updatedTodo : t))
    }

    const handleDeleteTodo = (id: string) => {
        todoService.deleteTodo(id);
        setTodos(todos.filter((t) => t.id !== id));
    };

    const filteredTodos = todos.filter((todo) => {
        if (filterTodos === "COMPLETED") return todo.completed
        if (filterTodos === "INCOMPLETE") return !todo.completed
        return true
    })
    
    return (
        <>
            <h1>TodoApp using SOLID Principle</h1>
            <FilteredTodos onChange={setFilterTodos}/>
            <AddTodoForm onAdd={addTodoHandler}/>
            <TodoList todos={filteredTodos} onToggle={updateTodoHandler} onDelete={handleDeleteTodo}/>
        </>
    )
}