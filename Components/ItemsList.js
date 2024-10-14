import React, { useContext } from 'react';
import { View, Text, FlatList } from 'react-native';
import { Context } from '../Context';
import { format } from 'date-fns';
import AntDesign from '@expo/vector-icons/AntDesign';

export default function ItemsList({ type }) {
  // Use the DataContext to access the shared state
  const { diets, activities } = useContext(Context);
  const items = type === 'diets' ? diets : activities;
  console.log({ items });

  return (
    <View>
      <FlatList
        data={items}
        renderItem={({ item }) => (
          <View>
            {type === 'diets' ? (
              <>
                <Text>{item.description}</Text>
                {item.special && <AntDesign name="warning" size={24} color="black" />}
                <Text>{format(new Date(item.date), 'EEE MMM dd yyyy')}</Text>
                <Text>{item.calories}</Text>
              </>
            ) : (
              <>
                <Text>{item.type}</Text>
                {item.special && <AntDesign name="warning" size={24} color="black" />}
                <Text>{format(new Date(item.date), 'EEE MMM dd yyyy')}</Text>
                <Text>{item.duration}</Text>
              </>
            )}
          </View>
        )}
      />
    </View>
  );
}