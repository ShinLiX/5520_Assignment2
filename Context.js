import React, { createContext, useState, useContext } from 'react'

const Context = createContext();

export const DataProvider = ({ children }) => {
    const [activities, setActivities] = useState([]);
    const [diets, setDiets] = useState([]);

    const addActivity = (activity) => {
        setActivities([...activities, activity]);
    };

    const addDiet = (diet) => {
        setDiets([...diets, diet]);
    };
    return (
        <Context.Provider value={{ activities, diets, addActivity, addDiet }}>
            {children}
        </Context.Provider>
    );
};
export const useData = () => useContext(Context);
