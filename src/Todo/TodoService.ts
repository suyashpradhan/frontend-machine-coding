import {ITodoService} from "./ITodoService";
import {ITodo} from "./Todo";

export class TodoService implements ITodoService {
    private url = 'https://jsonplaceholder.typicode.com/todos'

    async fetchTodo(): Promise<ITodo[]> {
        const response = await fetch(this.url)
        return response.json()
    }

    async addTodo(todo: ITodo): Promise<void> {
        await fetch(this.url, {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify(todo)
        })
    }

    async updateTodo(todo: ITodo): Promise<void> {
        await fetch(this.url, {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify(todo)
        })
    }

    async deleteTodo(todo: ITodo): Promise<void> {
        await fetch(this.url, {
            method: 'DELETE',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify(todo)
        })
    }
}