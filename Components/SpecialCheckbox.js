import React from 'react'
import { Text } from 'react-native'
import Checkbox from 'expo-checkbox';
import { useTheme } from '../ThemeContext';
import commonStyles from '../styles';

export default function SpecialCheckbox({isChecked, checkHandler}) {
    const { theme } = useTheme();
  return (
    <>
        <Text style={[commonStyles.text, {color: theme.textColor}]}>This item is marked as special. Select the checkbox if you would like to approve it.</Text>
        <Checkbox value={isChecked} onValueChange={checkHandler}/>
    </>
  )
}
