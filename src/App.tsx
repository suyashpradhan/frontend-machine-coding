import React from 'react';
import {Select} from "./Select";

function App() {

    const [counter, setCounter] = React.useState(12);

    return (
        <div className="App">
            <h1>hello world!</h1>
            <button onClick={() => {
                setCounter((prev) => prev + 1)
                console.log(counter)
            }}>Click {counter}
            </button>

            <Select/>
        </div>
    );
}

export default App;
