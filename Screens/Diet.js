import React from 'react'
import { View, Text } from 'react-native'
import ItemsList from '../Components/ItemsList'

export default function Diet() {
  return (
    <View>
      <Text>Diet</Text>
      <ItemsList type="diet" />
    </View>
  )
}
