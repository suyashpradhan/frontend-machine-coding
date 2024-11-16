import React, {useContext} from 'react';
import {UsersDatabase} from "./components/UsersDatabase/UsersDatabase";
import {Counter} from "./components/Counter/Counter";
import {ThemeContext} from "./ThemeContext";

function App() {
    const {theme, toggleTheme} = useContext(ThemeContext)

    localStorage.setItem("theme", theme);
    return (
        <>
            <div className={`${theme === 'light' ? 'bg-white' : 'bg-black'} h-screen p-4`}>
                <button className="btn btn-primary" type="button" onClick={toggleTheme}>Toggle Theme</button>
                <UsersDatabase/>
                <Counter/>
            </div>
        </>

    )
}

export default App;
