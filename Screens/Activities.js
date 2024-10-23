import React from 'react'
import { View, Text, StyleSheet } from 'react-native'
import ItemsList from '../Components/ItemsList'
import { useTheme } from '../ThemeContext';
import { SafeAreaView } from 'react-native-safe-area-context';

// Activities component
export default function Activities() {
  const { theme } = useTheme();
  // import ItemsList component and pass in the type as 'activities' to display the list of activities
  return (
    <SafeAreaView style={[styles.container, {backgroundColor: theme.backgroundColor}]}>
      <ItemsList type="activities" />
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    marginTop: 0,
  },
});