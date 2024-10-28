import React, { useState, useEffect } from 'react';
import { View, TextInput, Button, Alert, Text, StyleSheet } from 'react-native';
import CalendarInput from '../Components/CalendarInput';
import { useTheme } from '../ThemeContext';
import commonStyles from '../styles';
import PressableButton from '../Components/PressableButton';
import { writeToDB, updateDB } from '../Firebase/firebaseHelper';
import Checkbox from 'expo-checkbox';

export default function AddDiet({ navigation, route }) {
    const [description, setDescription] = useState('');
    const [calories, setCalories] = useState('');
    const [date, setDate] = useState(new Date());
    const [special, setSpecial] = useState(false);
    const [isEditMode, setIsEditMode] = useState(false);
    const { theme } = useTheme();

    useEffect(() => {
        if (route.params?.item) {
            const { description, calories, date, special } = route.params.item;
            setDescription(description);
            setCalories(calories.toString());
            setDate(new Date(date));
            setSpecial(special);
            setIsEditMode(true);
        }
    }, [route.params?.item]);

    const handleSave = () => {
        const caloriesNum = parseInt(calories);
        if (!description || caloriesNum <= 0 || isNaN(caloriesNum)) {
            Alert.alert("Invalid Input", "Please enter a valid description and calories.");
            return;
        }

        const newDiet = {
            description,
            calories: caloriesNum,
            date,
            special
        };

        if (isEditMode) {
            Alert.alert("Confirm", "Save changes to this diet entry?", [
                { text: "Cancel", style: "cancel" },
                { text: "Save", onPress: () => {
                    if (special) {
                        newDiet.special = false; // Optionally unset the special flag
                    }
                    updateDB(route.params.item.id, newDiet, 'diets');
                    navigation.goBack();
                }}
            ]);
        } else {
            writeToDB(newDiet, 'diets');
            navigation.goBack();
        }
    };

    return (
        <View style={[styles.container, {backgroundColor: theme.backgroundColor}]}>
            <Text style={[commonStyles.text, {color: theme.textColor}]}>Description *</Text>
            <TextInput
                style={commonStyles.input}
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
            <CalendarInput date={date} setDate={setDate} />

            {isEditMode && <View style={commonStyles.row}>
                <Checkbox value={special} onValueChange={setSpecial} />
                <Text style={[commonStyles.text, {color: theme.textColor}]}>Mark as special?</Text>
            </View>}

            {!isEditMode && <View style={commonStyles.buttonContainer}>
                <PressableButton 
                    pressedFunction={() => navigation.goBack()}
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