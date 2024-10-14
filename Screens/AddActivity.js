import React, { useState, useContext } from 'react';
import { View, TextInput, Button, Alert, Text, StyleSheet } from 'react-native';
import DropdownPicker from 'react-native-dropdown-picker';
import DateTimePicker from '@react-native-community/datetimepicker';
import { Context } from '../Context'; // Import the context
import { format } from 'date-fns';
import CalendarInput from '../Components/CalendarInput';
import { useTheme } from '../ThemeContext';
import commonStyles from '../styles';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function AddActivity({ navigation }) {
    const { addActivity } = useContext(Context); // Use useContext to access addActivity
    const [type, setType] = useState(null);
    const [open, setOpen] = useState(false);
    const [items, setItems] = useState([
        { label: 'Walking', value: 'Walking' },
        { label: 'Running', value: 'Running' },
        { label: 'Swimming', value: 'Swimming' },
        { label: 'Weights', value: 'Weights' },
        { label: 'Yoga', value: 'Yoga' },
    ]);
    const [date, setDate] = useState(null);
    const [duration, setDuration] = useState('');
    const { theme } = useTheme();
    const [showDatePicker, setShowDatePicker] = useState(false);

    const handleSave = () => {
        const durationNum = parseInt(duration);
        if (!type || durationNum <= 0 || isNaN(durationNum)) {
            Alert.alert("Invalid Input", "Please enter a valid type and duration.");
            return;
        }
        const newActivity = {
            type,
            duration: durationNum,
            date,
            special: (type === 'Running' || type === 'Weights') && durationNum > 60
        };
        addActivity(newActivity);
        navigation.goBack();
    };
    

    return (
        <SafeAreaView style={[styles.container, {backgroundColor:theme.backgroundColor}]}>
            <Text style={[commonStyles.text, {color: theme.textColor}]}>Activity *</Text>
            <DropdownPicker
                open={open}
                value={type}
                items={items}
                setOpen={setOpen}
                setValue={setType}
                setItems={setItems}
                placeholder="Select an activity type"
                zIndex={3000}
                zIndexInverse={1000}
                style={{backgroundColor: '#bcb8bf'}}
            />
            <Text style={[commonStyles.text, {color: theme.textColor}]}>Duration (min) *</Text>
            <TextInput
                style={commonStyles.input}
                onChangeText={setDuration}
                value={duration}
                keyboardType="numeric"
            />
            <Text style={[commonStyles.text, {color: theme.textColor}]}>Date *</Text>
            <CalendarInput date={date} setDate={setDate} datePicker={showDatePicker} datePickerHandler={setShowDatePicker}/>
            
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