import React, {createContext, ReactNode, useState} from "react";

interface ThemeContextType {
    theme: string;
    toggleTheme: () => void;
}

export const ThemeContext = createContext<ThemeContextType>({
    theme: '',
    toggleTheme: () => {
    }
})

export const ThemeProvider = (({children}: { children: ReactNode }) => {
    const [theme, setTheme] = useState(localStorage.getItem("theme") || '');

    const toggleTheme = () => {
        setTheme(prevTheme => prevTheme === 'light' ? 'dark' : 'light')
    }

    return (
        <ThemeContext.Provider value={{theme, toggleTheme}}>
            {children}
        </ThemeContext.Provider>
    )
})