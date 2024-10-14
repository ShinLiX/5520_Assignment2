import React, {useState} from 'react'
import { View, TextInput, StyleSheet } from 'react-native'
import DateTimePicker from '@react-native-community/datetimepicker';
import { format } from 'date-fns';


export default function CalendarInput({date, setDate}) {

  const [showDatePicker, setShowDatePicker] = useState(false);

  const displayDate = date ? format(date, 'EEE, MMM dd, yyyy'):'';

  return (
    <View>
      <TextInput
        style={styles.input}
        value={displayDate}
        onFocus={() => {
          console.log('onFocus'); // Correct place for console.log
          setShowDatePicker(true);
        }}
        />
        {showDatePicker && (
          <DateTimePicker
            testID="dateTimePicker"
            value={date || new Date()} 
            mode="date"
            display="inline"
            onChange={(event, selectedDate) => {
              console.log('Date picked:', selectedDate); 
              setShowDatePicker(false);
              if (selectedDate) {
                setDate(selectedDate);
              }
            }}
          />
        )}
    </View>
  )
}

const styles = StyleSheet.create({
  input: {
    borderWidth: 1,
    borderColor: 'gray',
    padding: 10,
    marginBottom: 20,
  },
});