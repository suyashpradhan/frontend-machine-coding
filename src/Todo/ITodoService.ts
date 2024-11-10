import {ITodo} from "./Todo";

export interface ITodoService {
    fetchTodo(): ITodo[]

    addTodo(todo: ITodo): void

    updateTodo(todo: ITodo): void

    deleteTodo(id: string): ITodo[]
}