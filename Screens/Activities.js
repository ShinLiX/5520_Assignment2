import React from 'react'
import { View, Text, StyleSheet } from 'react-native'
import ItemsList from '../Components/ItemsList'
import { useTheme } from '../ThemeContext';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function Activities() {
  const { theme } = useTheme();

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