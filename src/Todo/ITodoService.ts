import {ITodo} from "./Todo";

export interface ITodoService {
    fetchTodo(): Promise<ITodo[]>

    addTodo(todo: ITodo): Promise<void>

    updateTodo(todo: ITodo): Promise<void>

    deleteTodo(todo: ITodo): Promise<void>
}