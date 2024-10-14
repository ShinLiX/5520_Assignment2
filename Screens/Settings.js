import React from 'react'
import { View, Text, Button, StyleSheet } from 'react-native'
import { useTheme } from '../ThemeContext';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function Settings() {
  const {theme, toggleTheme} = useTheme();
  return (
    <SafeAreaView style={[styles.container, {backgroundColor: theme.backgroundColor}]}>
      <Button
        title="Toggle Theme"
        onPress={toggleTheme} />
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
