import React from 'react'
import { View, Text, Button, StyleSheet } from 'react-native'
import { useTheme } from '../ThemeContext';
import { SafeAreaView } from 'react-native-safe-area-context';
import commonStyles from '../styles';
import PressableButton from '../Components/PressableButton';

export default function Settings() {
  const {theme, toggleTheme} = useTheme();
  return (
    <SafeAreaView style={[styles.container, {backgroundColor: theme.backgroundColor}]}>
      <PressableButton
        pressedFunction={toggleTheme}
        componentStyle={commonStyles.buttonStyle}
        pressedStyle={commonStyles.buttonPressedStyle}>
         <Text style={commonStyles.buttonText}>Toggle Theme</Text>
      </PressableButton>
      {/* <Button
        title="Toggle Theme"
        onPress={toggleTheme} /> */}
    </SafeAreaView>
  )
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
