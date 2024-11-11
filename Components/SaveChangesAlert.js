import React from 'react'
import { Alert } from 'react-native'

export default function SaveChangesAlert(itemType, special, isChecked, newItem, updateDB, navigation, route) {
  return (
    Alert.alert("Important", "Are you sure you want to save these changes?", [
        {
            text: "No",
            style: "cancel"
        },
        {
            text: "Yes",
            onPress: () => {
                if (special && isChecked) {
                    newItem.special = false;
                }
                updateDB(route.params.item.id, newItem, itemType);
                navigation.goBack();
            }
        }
    ])
  )
}
