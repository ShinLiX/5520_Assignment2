import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Activities from './Screens/Activities';
import Diet from './Screens/Diet';
import Settings from './Screens/Settings';
import AddActivity from './Screens/AddActivity';
import AddDiet from './Screens/AddDiet';
import { StyleSheet, View, Alert} from 'react-native';
import { DataProvider } from './Context';
import { Button } from 'react-native';
import { ThemeProvider } from './ThemeContext';
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';
import Ionicons from '@expo/vector-icons/Ionicons';
import PressableButton from './Components/PressableButton';
import commonStyles from './styles';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import EditActivity from './Screens/EditActivity';
import EditDiet from './Screens/EditDiet';
import { deleteFromDB } from './Firebase/firebaseHelper';
import HandleDeleteItem from './Components/HandleDeleteItem';

// Create the Stack and Tab navigators
const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

// Create the Stacks for the Activities, Diets, and Settings screens
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
            <PressableButton
              pressedFunction={() => navigation.navigate('AddActivityScreen')}
              componentStyle={{backgroundColor: '#420c6e'}}
              pressedStyle={commonStyles.pressedIcon}
            >
              <View style={commonStyles.iconContainer}>
              <Ionicons name="add-outline" size={24} color="white" />
              <MaterialCommunityIcons name="run" size={24} color="white" />
              </View>
            </PressableButton>
          ),
        })}
      />
      <Stack.Screen
        name="AddActivityScreen"
        component={AddActivity}
        options={{ title: 'Add An Activity' }}
      />
      <Stack.Screen
        name="EditActivityScreen"
        component={EditActivity}
        options={({route, navigation}) => ({
           title: 'Edit',
           headerRight: () => (
             <PressableButton
                pressedFunction={() => HandleDeleteItem(route, navigation, 'activities')}
                componentStyle={{backgroundColor: '#420c6e'}}
                pressedStyle={commonStyles.pressedIcon}
              >
              <MaterialIcons name="delete" size={24} color="white" />
              </PressableButton>
           ),
        })}
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
            <PressableButton
              pressedFunction={() => navigation.navigate('AddDietScreen')}
              componentStyle={{backgroundColor: '#420c6e'}}
              pressedStyle={commonStyles.pressedIcon}
            >
              <View style={commonStyles.iconContainer}>
              <Ionicons name="add-outline" size={24} color="white" />
              <Ionicons name="fast-food" size={23} color="white" />
              </View>
            </PressableButton>
          ),
        })}
      />
      <Stack.Screen
        name="AddDietScreen"
        component={AddDiet}
        options={{ title: 'Add A Diet Entry' }}
      />
      <Stack.Screen
        name="EditDietScreen"
        component={EditDiet}
        options={({route, navigation}) => ({
           title: 'Edit',
           headerRight: () => (
             <PressableButton
                pressedFunction={() => HandleDeleteItem(route, navigation, 'diets')}
                componentStyle={{backgroundColor: '#420c6e'}}
                pressedStyle={commonStyles.pressedIcon}
              >
              <MaterialIcons name="delete" size={24} color="white" />
              </PressableButton>
           ),
        })}
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

// Create function that will navigate between the Activities, Diets, and Settings screens
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

// Create the App component
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
