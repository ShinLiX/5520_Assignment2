import React from 'react'
import { View, Text, StyleSheet } from 'react-native'
import ItemsList from '../Components/ItemsList'
import { SafeAreaView } from 'react-native-safe-area-context';
import { useTheme } from '../ThemeContext';

// Diet component
export default function Diet() {
  const { theme } = useTheme();
  // import ItemsList component and pass in the type as 'diets' to display the list of diets
  return (
    <View style={[styles.container, {backgroundColor: theme.backgroundColor}]}>
      <ItemsList type="diets" />
    </View>
  )
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
  },
});
