import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, StyleSheet } from 'react-native';
import { format } from 'date-fns';
import AntDesign from '@expo/vector-icons/AntDesign';
import commonStyles from '../styles';
import PressableButton from '../Components/PressableButton';
import { readAllFromDBWithListener } from '../Firebase/firebaseHelper';

export default function ItemsList({ type, navigation }) {
    const [items, setItems] = useState([]);

    function itemHandler(items) {
        setItems(items);
    }
    useEffect(() => {
        const collectionName = type === 'diets' ? 'diets' : 'activities';
        const unsubscribe = readAllFromDBWithListener(collectionName, itemHandler);

        return () => unsubscribe(); // Cleanup on unmount
    }, [type]);

    return (
        <FlatList
            data={items}
            contentContainerStyle={{ paddingBottom: 20, paddingTop: 20 }}
            renderItem={({ item }) => (
                <PressableButton
                    pressedFunction={() => {
                        const screen = type === 'diets' ? 'EditDietScreen' : 'EditActivityScreen';
                        navigation.navigate(screen, { item });
                    }}
                    componentStyle={{ backgroundColor: 'transparent' }}
                >
                    <View style={commonStyles.itemContainer}>
                        <Text style={commonStyles.textItem}>{item.description || item.type}</Text>
                        {item.special ? <AntDesign name="warning" size={24} color="red" style={{ paddingHorizontal: 8 }} /> : null}
                        <View style={commonStyles.textContainer}>
                            <Text style={{ fontWeight: 'bold' }}>{format(new Date(item.date), 'EEE MMM dd yyyy')}</Text>
                        </View>
                        <View style={commonStyles.textContainer}>
                            <Text style={{ fontWeight: 'bold' }}>{item.calories || item.duration + ' min'}</Text>
                        </View>
                    </View>
                </PressableButton>
            )}
        />
    );
}