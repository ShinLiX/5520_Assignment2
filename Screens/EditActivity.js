import React from 'react'
import AddActivity from './AddActivity'
import { Text } from 'react-native'


export default function EditActivity({navigation, route}) {
  return (
    <AddActivity navigation={navigation} route={route} />
  )
}
