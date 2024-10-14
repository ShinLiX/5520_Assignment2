import React, { useState, useContext } from 'react';
import { View, TextInput, Button, Alert, Text, StyleSheet } from 'react-native';
import CalendarInput from '../Components/CalendarInput';
import { Context } from '../Context'; 


export default function AddDiet({ navigation }) {
    const { addDiet } = useContext(Context); // Access addDiet from Context
    const [description, setDescription] = useState(''); // Description input
    const [calories, setCalories] = useState(''); // Calories input
    const [date, setDate] = useState(null); // Date input (initially null)

    // Handle Save button press
    const handleSave = () => {
        const caloriesNum = parseInt(calories);

        // Validate form input
        if (!description || caloriesNum <= 0 || isNaN(caloriesNum) || !date) {
            Alert.alert("Invalid Input", "Please enter a valid description, calories, and date.");
            return;
        }

        // Create new diet entry
        const newDiet = {
            description,
            calories: caloriesNum,
            date,
            special: caloriesNum > 800 // Mark as special if calories > 800
        };

        // Add diet to context
        addDiet(newDiet);

        // Navigate back to the previous screen
        navigation.goBack();
    };

    return (
        <View style={styles.container}>
            <Text>Description *</Text>
            <TextInput
                style={styles.input}
                onChangeText={setDescription}
                value={description}
                placeholder="Enter meal description"
            />

            <Text>Calories *</Text>
            <TextInput
                style={styles.input}
                onChangeText={setCalories}
                value={calories}
                keyboardType="numeric"
                placeholder="Enter calories"
            />

            <Text>Date *</Text>
            <CalendarInput date={date} setDate={setDate} />

            <View style={styles.buttonContainer}>
                <Button title="Save" onPress={handleSave} />
                <Button title="Cancel" onPress={() => navigation.goBack()} />
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20,
        justifyContent: 'center',
    },
    input: {
        borderWidth: 1,
        borderColor: 'gray',
        padding: 10,
        marginBottom: 20,
    },
    buttonContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
    }
});