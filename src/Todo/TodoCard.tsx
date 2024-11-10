import {ITodo} from "./Todo";

export const TodoCard = ({todo}: { todo: ITodo }) => {
    return (
        <div>
            <h3 style={{textDecoration: todo?.completed ? 'line-through' : 'none'}}>{todo?.title}</h3>
        </div>
    )
}