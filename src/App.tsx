import React, {useContext} from 'react';
import {ThemeContext} from "./ThemeContext";
import {TrelloBoard} from "./components/TrelloBoard/TrelloBoard";

function App() {
    const {theme, toggleTheme} = useContext(ThemeContext)

    localStorage.setItem("theme", theme);
    return (
        <div className={`${theme === 'light' ? 'bg-white' : 'bg-black'} h-screen p-4`}>
            <TrelloBoard/>
        </div>


    )
}

export default App;
