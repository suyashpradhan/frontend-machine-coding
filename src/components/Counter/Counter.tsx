// import React, {useCallback, useEffect, useState} from "react";
//
// const IncrementButton = React.memo(({incrementHandler}: { incrementHandler: () => void }) => {
//     return (
//         <button className="bg-amber-500 border border-amber-500 p-2 rounded" onClick={incrementHandler}>Increment
//             Count</button>
//     )
// })
//
// export const Counter = () => {
//     const [count, setCount] = useState(0);
//
//     const incrementCountHandler = useCallback(() => {
//         setCount(prevCount => prevCount + 1);
//     }, [])
//
//     const decrementCountHandler = useCallback(() => {
//         setCount(prevCount => prevCount - 1);
//     }, [])
//
//     useEffect(() => {
//         console.log('counter increment', count);
//     }, [count]);
//
//     const resetCountHandler = () => {
//         setCount(0);
//     }
//
//     const incrementDoubleCountHandler = () => {
//         setCount(prevCount => prevCount + 2);
//     }
//
//     const decrementDoubleCountHandler = () => {
//         setCount(prevCount => prevCount - 2);
//     }
//
//     return (
//         <div className="max-xl m-4">
//             <hr/>
//             <h1 className="text-2xl text-gray-600">Counter</h1>
//             <h2 className="text-xl font-bold my-4">{count}</h2>
//             <div className="flex flex-wrap items-center gap-2">
//                 <IncrementButton incrementHandler={incrementCountHandler}/>
//                 <button className="bg-red-500 border border-red-500 text-white p-2 rounded"
//                         onClick={resetCountHandler}>Reset
//                     Counter
//                 </button>
//                 <button className="bg-green-500 border border-green-500 text-white p-2 rounded"
//                         onClick={incrementDoubleCountHandler}>
//                     Increment Count By 2
//                 </button>
//                 <button className="bg-pink-500 border border-pink-500 text-white p-2 rounded"
//                         onClick={decrementCountHandler}>
//                     Decrement Count
//                 </button>
//                 <button className="bg-violet-500 border border-violet-500 text-white p-2 rounded"
//                         onClick={decrementDoubleCountHandler}>
//                     Decrement Count By 2
//                 </button>
//             </div>
//         </div>
//     )
// }


import React, {useEffect, useState} from "react";

export const Counter: React.FC = () => {
    // App States

    const a = [1, 2, 3]
    const b = a
    b.push(4)
    console.log(a, b)

    const [counter, setCounter] = useState<number>(0);
    const [isRunning, setIsRunning] = useState<boolean>(false);


    // Effect for running the counter
    useEffect(() => {
        let interval: number | null = null;
        if (isRunning) {
            interval = window.setInterval(() => {
                setCounter((prevCounter) => prevCounter + 1);
            }, 1000);
        } else if (!isRunning && interval) {
            clearInterval(interval);
        }
        return () => {
            if (interval) clearInterval(interval);
        };
    }, [isRunning]);


    // Button handler for pausing the counter
    const handleStartPause = () => {
        setIsRunning((prevState) => !prevState);
    };

    // Button handler for resetting the counter
    const handleReset = () => {
        setCounter(0);
        setIsRunning(false);
    };

    return (
        <div style={{textAlign: "center", marginTop: "50px"}}>
            <h1>{counter}</h1>
            <button onClick={handleStartPause}>
                {isRunning ? "Pause" : "Start"}
            </button>
            <button onClick={handleReset} style={{marginLeft: "10px"}}>
                Reset
            </button>
        </div>
    );
};

