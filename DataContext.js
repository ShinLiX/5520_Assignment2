import React, { createContext, useState, useContext } from 'react'

const DataContext = createContext();

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
        <DataContext.Provider value={{ activities, diets, addActivity, addDiet }}>
            {children}
        </DataContext.Provider>
    );
};
export const useData = () => useContext(DataContext);
