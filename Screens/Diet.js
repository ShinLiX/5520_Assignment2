import React from 'react'
import { View, Text, StyleSheet } from 'react-native'
import ItemsList from '../Components/ItemsList'
import { SafeAreaView } from 'react-native-safe-area-context';
import { useTheme } from '../ThemeContext';

export default function Diet() {
  const { theme } = useTheme();
  return (
    <SafeAreaView style={[styles.container, {backgroundColor: theme.backgroundColor}]}>
      <ItemsList type="diets" />
    </SafeAreaView>
  )
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
  },
});
