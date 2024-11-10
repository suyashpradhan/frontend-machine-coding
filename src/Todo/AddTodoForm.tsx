import React from "react";
import {ITodo} from "./Todo";

interface AddTodoFormProps {
    onAdd: (todo: ITodo) => void
}

export const AddTodoForm = ({onAdd}: AddTodoFormProps) => {
    const [title, setTitle] = React.useState<string>('');

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        const newTodo: ITodo = {
            userId: "4",
            id: "4",
            title,
            completed: false,
        };
        onAdd(newTodo);
        setTitle('');
    };

    return (
        <>
            <form onSubmit={handleSubmit}>
                <input type="text" placeholder="Title" onChange={(e) => setTitle(e.target.value)}/>
                <button type="submit">Add Todo</button>
            </form>
        </>
    )
}