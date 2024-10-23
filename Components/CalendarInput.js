import React, {useState} from 'react'
import { View, TextInput, StyleSheet } from 'react-native'
import DateTimePicker from '@react-native-community/datetimepicker';
import { format } from 'date-fns';
import { useTheme } from '../ThemeContext';
import commonStyles from '../styles';

// CalendarInput component
export default function CalendarInput({date, setDate, datePicker, datePickerHandler}) {
  // Use the useTheme hook to access the theme
  const {theme} = useTheme();
  // Format the date to display in the
  const displayDate = date ? format(date, 'EEE, MMM dd, yyyy'):'';

  // Return the JSX to display the input field and the date picker
  return (
    <View>
      <TextInput
        style={commonStyles.input}
        value={displayDate}
        onFocus={() => {
          console.log('onFocus'); // Correct place for console.log
          datePickerHandler(true);
        }}
        />
        {datePicker && (
          <DateTimePicker
            testID="dateTimePicker"
            value={date || new Date()} 
            mode="date"
            display="inline"
            onChange={(event, selectedDate) => {
              console.log('Date picked:', selectedDate); 
              datePickerHandler(false);
              if (selectedDate) {
                setDate(selectedDate);
              }
            }}
          />
        )}
    </View>
  )
}