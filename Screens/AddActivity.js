import React, { useState, useContext, useEffect } from 'react';
import { View, TextInput, Button, Alert, Text, StyleSheet } from 'react-native';
import DropdownPicker from 'react-native-dropdown-picker';
import DateTimePicker from '@react-native-community/datetimepicker';
import { Context } from '../Context'; // Import the context
import { format, set } from 'date-fns';
import CalendarInput from '../Components/CalendarInput';
import { useTheme } from '../ThemeContext';
import commonStyles from '../styles';
import { SafeAreaView } from 'react-native-safe-area-context';
import PressableButton from '../Components/PressableButton';
import { writeToDB, updateDB } from '../Firebase/firebaseHelper';
import { ro } from 'date-fns/locale';
import Checkbox from 'expo-checkbox';
import SaveChangesAlert from '../Components/SaveChangesAlert';
import SpecialCheckbox from '../Components/SpecialCheckbox';

// AddActivity component
export default function AddActivity({ navigation, route }) {
    //const { addActivity } = useContext(Context); // Use useContext to access addActivity
    const [type, setType] = useState(null); // Track the type of activity
    const [open, setOpen] = useState(false); // Track if the dropdown is open
    const [sportTypes, setSportTypes] = useState([ // List of activity types
        { label: 'Walking', value: 'Walking' },
        { label: 'Running', value: 'Running' },
        { label: 'Swimming', value: 'Swimming' },
        { label: 'Weights', value: 'Weights' },
        { label: 'Yoga', value: 'Yoga' },
    ]);

    const [date, setDate] = useState(null); // Track the date
    const [duration, setDuration] = useState(''); // Track the duration
    const { theme } = useTheme(); // Use the useTheme hook to access the theme
    const [showDatePicker, setShowDatePicker] = useState(false); // Track if the date picker is open
    const [isEditMode, setIsEditMode] = useState(false); // Track if the screen is in edit mode
    const [special, setSpecial] = useState(false); // Track if the activity is special
    const [isChecked, setChecked] = useState(false); // Track if the checkbox is checked

    function handleCheck() {
        setChecked(!isChecked);
    }
    useEffect(() => {
        if (route.params && route.params.item) {
            const {type, duration, date, special} = route.params.item;
            setType(type);
            setDuration(duration.toString());
            setDate(new Date(date));
            setSpecial(special);
            setIsEditMode(true);
        }
    }, [route.params?.item]);

    // Function to handle saving the activity
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
        if (isEditMode) {
            SaveChangesAlert('activities', special, isChecked, newActivity, updateDB, navigation, route);
        } else {
        writeToDB(newActivity, 'activities');
        navigation.goBack();
        }
        
    };
    

    return (
        <View style={[styles.container, {backgroundColor:theme.backgroundColor}]}>
            <Text style={[commonStyles.text, {color: theme.textColor}]}>Activity *</Text>
            <DropdownPicker
                open={open}
                value={type}
                items={sportTypes}
                setOpen={setOpen}
                setValue={setType}
                setItems={setSportTypes}
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
            
            {!showDatePicker && isEditMode && special && <View style={commonStyles.checkbox}>
                <SpecialCheckbox isChecked={isChecked} checkHandler={handleCheck} />
            </View>}

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