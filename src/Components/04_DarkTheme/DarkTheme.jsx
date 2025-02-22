import React from 'react'
import useLocalStorage from './CustomHook';
import './style.css'

const DarkTheme = () => {
    const [theme, setTheme] = useLocalStorage("theme", "light");


    const handleToggleTheme = () => {
        setTheme(theme === 'light' ? 'dark' : 'light');
    }
    console.log(theme);


    return (
        <div className="light-dark-mode" data-theme={theme}>
            <div className='container'>
                <h1>Hello World</h1>
                <button onClick={handleToggleTheme}>
                    Change Theme
                </button> 
            </div>

        </div>
    )

}

export default DarkTheme