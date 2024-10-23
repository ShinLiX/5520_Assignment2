import React, { useContext } from 'react';
import { View, Text, FlatList, StyleSheet } from 'react-native';
import { Context } from '../Context';
import { format } from 'date-fns';
import AntDesign from '@expo/vector-icons/AntDesign';
import commonStyles from '../styles';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function ItemsList({ type }) {
  // Use the Context to access the shared state
  const { diets, activities } = useContext(Context);
  const items = type === 'diets' ? diets : activities;

  return (
    
      <FlatList
        data={items}
        contentContainerStyle={{ paddingBottom: 20 }}
        renderItem={({ item }) => (
          <View style={commonStyles.itemContainer}>
            {type === 'diets' ? (
              <>
                <Text style={commonStyles.textItem}>{item.description}</Text>
                {item.special ? <AntDesign style={{paddingHorizontal: 8}} name="warning" size={24} color="red"/>: <Text>            </Text>}
                <View style={commonStyles.textContainer}>
                  <Text style={{fontWeight: 'bold'}}>{format(new Date(item.date), 'EEE MMM dd yyyy')}</Text>
                </View>
                <View style={commonStyles.textContainer}>
                  <Text style={{fontWeight: 'bold'}}>{item.calories}</Text>
                </View>
              </>
            ) : (
              <>
                <Text style={commonStyles.textItem}>{item.type}</Text>
                {item.special ? <AntDesign style={{paddingHorizontal: 8}} name="warning" size={24} color="red"/>: <Text>            </Text>}
                <View style={commonStyles.dataContainer}>
                <View style={commonStyles.textContainer}>
                  <Text style={{fontWeight: 'bold'}}>{format(new Date(item.date), 'EEE MMM dd yyyy')}</Text>
                </View>
                <View style={commonStyles.textContainer}>
                  <Text style={{fontWeight: 'bold'}}>{item.duration} min</Text>
                </View>
                </View>
              </>
            )}
          </View>
        )}
      />
    
  );
}
