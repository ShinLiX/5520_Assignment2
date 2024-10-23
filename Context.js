import React, { createContext, useState, useContext } from 'react'

export const Context = createContext();

export const DataProvider = ({ children }) => {
    const [activities, setActivities] = useState([]);
    const [diets, setDiets] = useState([]);

    const addActivity = (activity) => {
        setActivities(current => [...activities, activity]);
    };

    const addDiet = (diet) => {
        setDiets(current => [...diets, diet]);
    };
    return (
        <Context.Provider value={{ activities, diets, addActivity, addDiet }}>
            {children}
        </Context.Provider>
    );
};
