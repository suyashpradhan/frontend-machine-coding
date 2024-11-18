import React from "react";

export const Rendering = () => {
    console.log("Rendering");
    return (
        <>
            <h1>Understanding Rendering</h1>
            <CounterExample/>
        </>
    )
}

const CounterExample = () => {
    console.log("CounterExample");
    const [counter, setCounter] = React.useState(0);

    const incrementCounter = () => {
        setCounter(counter + 1);
        setCounter(counter + 1);
        setCounter(counter + 1);
    }

    return (
        <>
            <h2>Counter Example</h2>
            <CounterCount count={counter}/>
            <button onClick={incrementCounter}>Increment Counter</button>
        </>
    )
}

const CounterCount = ({count}: { count: number }) => {
    console.log("CounterCount");
    return (
        <>
            <h3>Count: {count}</h3>
            <Footer/>
        </>
    )
}

const Footer = React.memo(() => {
    console.log("Footer");
    return <h3>I'm a footer</h3>
})


