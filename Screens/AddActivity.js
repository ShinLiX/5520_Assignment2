import React, { useState, useContext } from 'react';
import { View, TextInput, Button, Alert, Text, StyleSheet } from 'react-native';
import DropdownPicker from 'react-native-dropdown-picker';
import DateTimePicker from '@react-native-community/datetimepicker';
import { Context } from '../Context'; // Import the context
import { format } from 'date-fns';
import CalendarInput from '../Components/CalendarInput';

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
        <View style={styles.container}>
            <Text>Activity *</Text>
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
            />
            <Text>Duration (min) *</Text>
            <TextInput
                style={styles.input}
                onChangeText={setDuration}
                value={duration}
                keyboardType="numeric"
            />
            <Text>Date *</Text>
            <CalendarInput date={date} setDate={setDate} />
            
            <View>
              <Button title="Cancel" onPress={() => navigation.goBack()} />
              <Button title="Save" onPress={handleSave} />
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20,
        justifyContent: 'center',
        alignItems: 'stretch',
    },
    input: {
        borderWidth: 1,
        borderColor: 'gray',
        padding: 10,
        marginBottom: 20,
    }
});