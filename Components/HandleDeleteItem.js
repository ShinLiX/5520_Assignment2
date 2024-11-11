import React from 'react'
import { Alert } from 'react-native'
import { deleteFromDB } from '../Firebase/firebaseHelper'

export default function HandleDeleteItem(route, navigation, itemType) {
  return (
    Alert.alert('Delete', 'Are you sure you want to delete this item?', [
        {text: 'No', style: 'cancel'},
        {text: 'Yes', onPress: () => {
          deleteFromDB(route.params.item.id, itemType)
          .then(() => navigation.goBack())
          .catch((error) => console.log('Error deleting document: ', error))}
        }
      ])
  )
}
