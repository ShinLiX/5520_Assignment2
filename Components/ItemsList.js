import React from 'react'
import { View, Text,FlatList} from 'react-native'
import { useData } from '../Context';

export default function ItemsList({ type }) {
  const data = useData();
  const items = type === 'activities' ? data.activities : data.diets;  
  return (
    <View>
        <FlatList
            data={items}
            renderItem={({ item }) => (
                <Text>{item.name}</Text>
            )}
            keyExtractor={item => item.id}
        />

    </View>
  )
}
