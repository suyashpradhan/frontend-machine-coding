interface FilteredTodosProps {
    onChange: (filter: string) => void,
}

export const FilteredTodos = ({onChange}: FilteredTodosProps) => {
    return (
        <>
            <button type="button" onClick={() => onChange("ALL")}>ALL</button>
            <button type="button" onClick={() => onChange("COMPLETED")}>COMPLETED</button>
            <button type="button" onClick={() => onChange("INCOMPLETE")}>INCOMPLETE</button>
        </>
    )
}