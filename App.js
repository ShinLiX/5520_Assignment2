import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Activities from './Screens/Activities';
import Diet from './Screens/Diet';
import Settings from './Screens/Settings';
import AddActivity from './Screens/AddActivity';
import AddDiet from './Screens/AddDiet';
import { StyleSheet } from 'react-native';
import { DataProvider } from './Context';
import { Button } from 'react-native';
import { ThemeProvider } from './ThemeContext';
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';
import Ionicons from '@expo/vector-icons/Ionicons';

const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

function ActivitiesStack() {
  return (
    <Stack.Navigator
      screenOptions={{ headerStyle: {backgroundColor: '#420c6e'},
                       headerTintColor: '#fff',}}
      >
      <Stack.Screen
        name="ActivitiesHome"
        component={Activities}
        options={({ navigation }) => ({
          title: 'Activities',
          headerRight: () => (
            <Button
              onPress={() => navigation.navigate('AddActivityScreen')}
              title="Add"
              color="green"
            />
          ),
        })}
      />
      <Stack.Screen
        name="AddActivityScreen"
        component={AddActivity}
        options={{ title: 'Add An Activity' }}
      />
    </Stack.Navigator>
  );
}

function DietsStack() {
  return (
    <Stack.Navigator
    screenOptions={{ headerStyle: {backgroundColor: '#420c6e'},
                     headerTintColor: '#fff',}}
    >
      <Stack.Screen
        name="DietsHome"
        component={Diet}
        options={({ navigation }) => ({
          title: 'Diets',
          headerRight: () => (
            <Button
              onPress={() => navigation.navigate('AddDietScreen')}
              title="Add"
              color="green"
            />
          ),
        })}
      />
      <Stack.Screen
        name="AddDietScreen"
        component={AddDiet}
        options={{ title: 'Add A Diet Entry' }}
      />
    </Stack.Navigator>
  );
}

function SettingsStack() {
  return (
    <Stack.Navigator
    screenOptions={{ headerStyle: {backgroundColor: '#420c6e'},
                     headerTintColor: '#fff',}}
    >
      <Stack.Screen
        name="SettingsHome"
        component={Settings}
        options={{ title: 'Settings' }}
      />
    </Stack.Navigator>
  );
}

function MyTabs() {
  return (
    <Tab.Navigator screenOptions={{ headerShown: false, tabBarActiveTintColor: 'yellow', tabBarStyle: {backgroundColor: '#420c6e'}}}>
      <Tab.Screen name="ActivitiesTab" component={ActivitiesStack} 
        options={{tabBarIcon: ({ focused }) => (
        <MaterialCommunityIcons name="run" size={24} color={focused? 'yellow':"gray"} />
      )}} />
      <Tab.Screen name="DietsTab" component={DietsStack} 
        options={{tabBarIcon: ({ focused }) => (
        <Ionicons name="fast-food" size={24} color={focused? "yellow" : "gray"} />
      )}} />  
      <Tab.Screen name="SettingsTab" component={SettingsStack} 
        options={{tabBarIcon: ({ focused }) => (
        <Ionicons name="settings" size={24} color={focused? "yellow": "gray"} />
      )}}/>
    </Tab.Navigator>
  );
}

export default function App() {
  return (
    <ThemeProvider>
    <DataProvider>
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="Home" component={MyTabs} options={{ headerShown: false }} />
      </Stack.Navigator>
    </NavigationContainer>
    </DataProvider>
    </ThemeProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    
  },
});
