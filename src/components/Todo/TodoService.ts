import {ITodoService} from "./ITodoService";
import {ITodo} from "./Todo";

export class TodoService implements ITodoService {
    private todos: ITodo[] = [
        {
            userId: "1",
            id: "1",
            title: "One",
            completed: false,
        },
        {
            userId: "2",
            id: "2",
            title: "Two",
            completed: false,
        },
        {
            userId: "3",
            id: "3",
            title: "Three",
            completed: true,
        }
    ]

    fetchTodo(): ITodo[] {
        return this.todos
    }

    addTodo(todo: ITodo): void {
        this.todos.push(todo)
    }

    updateTodo(todo: ITodo): void {
        this.todos.map((t) => t.id === todo.id ? todo : t)
    }

    deleteTodo(id: string): ITodo[] {
        return this.todos.filter((t) => t.id !== id)
    }
}