import React, {useContext} from 'react';
import {ThemeContext} from "./ThemeContext";
import {Link} from "react-router-dom";
import {UsersDatabase} from "./components/UsersDatabase/UsersDatabase";
import {Counter} from "./components/Counter/Counter";
import {Charts} from "./components/Charts/Charts";
import {Rendering} from "./components/UnderstandingRendering/Rendering";

function App() {
    const {theme, toggleTheme} = useContext(ThemeContext)

    localStorage.setItem("theme", theme);
    return (
        <div className={`${theme === 'light' ? 'bg-white' : 'bg-black'} h-screen p-4`}>
            <button className="bg-blue-500 text-black-500 rounded p-2" type="button"
                    onClick={toggleTheme}>Toggle Theme
            </button>

            <div className="flex flex-col items-center justify-between">
                <Link to="/products" className="bg-pink-500 text-white border-1 border-pink-500 rounded p-2">Show
                    Products</Link>
            </div>
            <UsersDatabase/>
            <Counter/>
            <Charts/>
            <Rendering/>
        </div>


    )
}

export default App;
