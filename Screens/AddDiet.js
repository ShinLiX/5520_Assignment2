import React, { useState, useContext } from 'react';
import { View, TextInput, Button, Alert, Text, StyleSheet } from 'react-native';
import CalendarInput from '../Components/CalendarInput';
import { Context } from '../Context'; 
import { useTheme } from '../ThemeContext';
import { SafeAreaView } from 'react-native-safe-area-context';
import commonStyles from '../styles';


export default function AddDiet({ navigation }) {
    const { addDiet } = useContext(Context); // Access addDiet from Context
    const [description, setDescription] = useState(''); // Description input
    const [calories, setCalories] = useState(''); // Calories input
    const [date, setDate] = useState(null); // Date input 
    const { theme } = useTheme();
    const [showDatePicker, setShowDatePicker] = useState(false);

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
        <SafeAreaView style={[styles.container, {backgroundColor: theme.backgroundColor}]}>
            <Text style={[commonStyles.text, {color: theme.textColor}]}>Description *</Text>
            <TextInput
                style={[commonStyles.input, {height: 80}]}
                onChangeText={setDescription}
                value={description}
                multiline={true}
                numberOfLines={4}  
            />

            <Text style={[commonStyles.text, {color: theme.textColor}]}>Calories *</Text>
            <TextInput
                style={commonStyles.input}
                onChangeText={setCalories}
                value={calories}
                keyboardType="numeric"
            />

            <Text style={[commonStyles.text, {color: theme.textColor}]}>Date *</Text>
            <CalendarInput date={date} setDate={setDate} datePicker={showDatePicker} datePickerHandler={setShowDatePicker} />

            {!showDatePicker && <View style={commonStyles.buttonContainer}>
              <Button title="Cancel" onPress={() => navigation.goBack()} />
              <Button title="Save" onPress={handleSave} />  
            </View>}
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20,
    },
    
});