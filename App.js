import * as React from 'react';
import { Text, View, StyleSheet, Platform, StatusBar } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createStore, applyMiddleware } from 'redux'
import { Provider } from 'react-redux'
import thunk from 'redux-thunk'
import reducer from './reducer'
 
import Constants from 'expo-constants';
import { purple, white } from './utils/colors'
import DeckListView from './components/DeckListView';
import DeckView from './components/DeckView';
import NewDeckForm from './components/NewDeckForm';
import QuizView from './components/QuizView';
import NewCard from './components/NewCard';


// or any pure javascript modules available in npm
import { Card } from 'react-native-paper';


// Tab navigation
const Tab = createBottomTabNavigator();
function Tabs() {
  return (
    <Tab.Navigator>
      <Tab.Screen name="Home" component={DeckListView} />
      <Tab.Screen name="New Deck" component={NewDeckForm} />
    </Tab.Navigator>
  );
}

// Stack navigation
const Stack = createNativeStackNavigator();

export default function App() {

  return (
    <Provider store={createStore(reducer, applyMiddleware(thunk,))}>
      <NavigationContainer>
        <Stack.Navigator initialRouteName="Home">
          <Stack.Screen name="Home" component={Tabs} />
          <Stack.Screen name="DeckView" component={DeckView} />
          <Stack.Screen name="QuizView" component={QuizView} />
          <Stack.Screen name="NewCard" component={NewCard} />
        </Stack.Navigator>
      </NavigationContainer>
    </Provider>
  );
}

