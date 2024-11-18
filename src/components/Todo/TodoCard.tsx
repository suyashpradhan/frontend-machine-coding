import {ITodo} from "./Todo";

interface TodoCardProps {
    todo: ITodo
    onToggle: (todo: ITodo) => void
    onDelete: (id: string) => void
}

export const TodoCard = ({todo, onToggle, onDelete}: TodoCardProps) => {
    return (
        <div style={{display: "flex", gap: "10px", padding: "10px", border: "2px solid #dadce0", margin: "10px 0"}}>
            <input type="checkbox" checked={todo?.completed} onChange={() => onToggle(todo)}/>
            <h3 style={{textDecoration: todo?.completed ? 'line-through' : 'none'}}>{todo?.title}</h3>
            <button type="button" onClick={() => onDelete(todo?.id)}>Delete</button>
        </div>
    )
}