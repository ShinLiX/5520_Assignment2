import React, { createContext, useState, useContext } from 'react';
import { View, Text } from 'react-native';


const lightTheme = {
    backgroundColor: '#b49fbf',
    textColor: '#521b6e',
};

const darkTheme = {
    backgroundColor: '#4c3657',
    textColor: '#fff',
};
// Create the Theme Context
export const ThemeContext = createContext();

// Theme provider component
export const ThemeProvider = ({ children }) => {
    const [isDarkTheme, setIsDarkTheme] = useState(false); // Track if dark theme is active

    // Function to toggle the theme
    const toggleTheme = () => {
        setIsDarkTheme((prevTheme) => !prevTheme);
    };

    const theme = isDarkTheme ? darkTheme : lightTheme;
    return (
        <ThemeContext.Provider value={{ theme, toggleTheme }}>
            {children}
        </ThemeContext.Provider>
    );
};

export const useTheme = () => useContext(ThemeContext);