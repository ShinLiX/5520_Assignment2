import React from 'react'
import { View, Text } from 'react-native'
import ItemsList from '../Components/ItemsList'

export default function Activities() {
  return (
    <View>
      <Text>Activities</Text>
      <ItemsList type="activities" />
      
    </View>
  )
}
