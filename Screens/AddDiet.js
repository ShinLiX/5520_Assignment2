import React, { useState, useContext, useEffect } from 'react';
import { View, TextInput, Button, Alert, Text, StyleSheet } from 'react-native';
import CalendarInput from '../Components/CalendarInput';
import { Context } from '../Context'; 
import { useTheme } from '../ThemeContext';
import { SafeAreaView } from 'react-native-safe-area-context';
import commonStyles from '../styles';
import PressableButton from '../Components/PressableButton';
import { writeToDB, readAllFromDB, updateDB } from '../Firebase/firebaseHelper';
import SaveChangesAlert from '../Components/SaveChangesAlert';

export default function AddDiet({ navigation, route }) {
    //const [diet, setDiet] = useState({description: '', calories: '', date: null});
    const { addDiet } = useContext(Context); // Access addDiet from Context
    const [description, setDescription] = useState(''); // Description input
    const [calories, setCalories] = useState(''); // Calories input
    const [date, setDate] = useState(new Date()); // Date input 
    const { theme } = useTheme();
    const [showDatePicker, setShowDatePicker] = useState(false);
    const [isEditMode, setIsEditMode] = useState(false);
    const [special, setSpecial] = useState(false);
    const [isChecked, setChecked] = useState(false);

    useEffect(() => {
        if (route.params && route.params.item) {
            const {description, calories, date, special} = route.params.item;
            setDescription(description);
            setCalories(calories.toString());
            setDate(date);
            setSpecial(special);
            setIsEditMode(true);
        }
    }, [route.params?.item]);

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
        if (isEditMode) {
            SaveChangesAlert(special, isChecked, newDiet, updateDB, navigation, route)
        }
        // Add diet to context
        writeToDB(newDiet, 'diets');
        

        addDiet(newDiet);

        // Navigate back to the previous screen
        navigation.goBack();
    };

    return (
        <View style={[styles.container, {backgroundColor: theme.backgroundColor}]}>
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
            <PressableButton 
                pressedFunction={()=>navigation.goBack()}
                componentStyle={commonStyles.buttonStyle}
                pressedStyle={commonStyles.pressedStyle}
              >
                <Text style={commonStyles.buttonText}>Cancel</Text>
              </PressableButton>
              <PressableButton
                pressedFunction={handleSave}
                componentStyle={commonStyles.buttonStyle}
                pressedStyle={commonStyles.pressedStyle}
              >
                <Text style={commonStyles.buttonText}>Save</Text>
                </PressableButton>
            </View>}
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20,
    },
    
});
