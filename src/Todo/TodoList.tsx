import {useEffect, useState} from "react";
import {ITodo} from "./Todo";
import {TodoService} from "./TodoService";
import {TodoCard} from "./TodoCard";

export const TodoList = () => {
    const [todos, setTodos] = useState<ITodo[]>([])
    const todoService = new TodoService()

    useEffect(() => {
        const loadTodos = async () => {
            const fetchedTodos = await todoService.fetchTodo()
            setTodos(fetchedTodos)
        }
        loadTodos()
    }, []);

    return (
        <>
            {todos?.map((todo: ITodo) => <TodoCard key={todo?.id} todo={todo}/>)}
        </>
    )
}