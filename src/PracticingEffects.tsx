import {useEffect, useState} from "react";

export const PracticingEffects = () => {
    const [count, setCount] = useState(0);
    
    useEffect(() => {
        console.log(count)
        document.title = `You clicked ${count} times`
    }, [count]);

    return (
        <>
            <button onClick={() => setCount(count + 1)}>Click {count}</button>
        </>
    )
}