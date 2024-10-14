import React, { useContext } from 'react';
import { View, Text, FlatList, StyleSheet } from 'react-native';
import { Context } from '../Context';
import { format } from 'date-fns';
import AntDesign from '@expo/vector-icons/AntDesign';
import commonStyles from '../styles';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function ItemsList({ type }) {
  // Use the DataContext to access the shared state
  const { diets, activities } = useContext(Context);
  const items = type === 'diets' ? diets : activities;
  console.log({ items });

  return (
    <SafeAreaView>
      <FlatList
        data={items}
        contentContainerStyle={{ paddingBottom: 20 }}
        renderItem={({ item }) => (
          <View style={styles.itemContainer}>
            {type === 'diets' ? (
              <>
                <Text style={styles.textItem}>{item.description}</Text>
                {item.special ? <AntDesign style={{paddingHorizontal: 8}} name="warning" size={24} color="red"/>: <Text>            </Text>}
                <View style={styles.textContainer}>
                  <Text style={{fontWeight: 'bold'}}>{format(new Date(item.date), 'EEE MMM dd yyyy')}</Text>
                </View>
                <View style={styles.textContainer}>
                  <Text style={{fontWeight: 'bold'}}>{item.calories}</Text>
                </View>
              </>
            ) : (
              <>
                <Text style={styles.textItem}>{item.type}</Text>
                {item.special ? <AntDesign style={{paddingHorizontal: 8}} name="warning" size={24} color="red"/>: <Text>            </Text>}
                <View style={styles.textContainer}>
                  <Text style={{fontWeight: 'bold'}}>{format(new Date(item.date), 'EEE MMM dd yyyy')}</Text>
                </View>
                <View style={styles.textContainer}>
                  <Text style={{fontWeight: 'bold'}}>{item.duration} min</Text>
                </View>
              </>
            )}
          </View>
        )}
      />
    </SafeAreaView>
  );
}
const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     justifyContent: 'center',
//     alignItems: 'center',
//   },
  itemContainer: {
    flexDirection: 'row',
    backgroundColor: '#420c6e',
    padding: 8,
    paddingHorizontal: 10,
    justifyContent: 'space-between',
    margin: 8,
    borderRadius: 5,
    alignItems: 'center',
  },
  textItem: {
    fontSize: 15,
    fontWeight: 'bold',
    color: '#fff',
    paddingEnd: 10,
  },
  textContainer: {
    backgroundColor: '#fff',
    color:'black',
    margin: 2,
    padding: 6,
    paddingHorizontal: 10,
  },
  

});