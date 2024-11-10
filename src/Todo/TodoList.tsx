import {ITodo} from "./Todo";
import {TodoCard} from "./TodoCard";

interface TodoListProps {
    todos: ITodo[]
    onToggle: (todo: ITodo) => void
    onDelete: (id: string) => void
}

export const TodoList = ({todos, onToggle, onDelete}: TodoListProps) => {
    return (
        <>
            {todos?.map((todo: ITodo) => <TodoCard key={todo?.id} todo={todo} onDelete={onDelete}
                                                   onToggle={onToggle}/>)}
        </>
    )
}