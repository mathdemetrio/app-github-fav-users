import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import React from 'react';

import Main from './pages/Main';
import User from './pages/User';
import Webview from './pages/Webview';

const Stack = createStackNavigator();

function RootStack() {
  return (
    <Stack.Navigator
      initialRouteName="Home"
      screenOptions={{
        gestureEnabled: false,
        headerBackTitleVisible: false,
        headerTitleAlign: 'center',
        headerStyle: {
          backgroundColor: '#7159c1',
        },
        headerTintColor: '#ffffff',
      }}
    >
      <Stack.Screen
        name="Main"
        component={Main}
        options={{ title: 'Usuários' }}
      />
      <Stack.Screen
        name="User"
        component={User}
        options={User.navigationOptions}
      />
      <Stack.Screen
        name="Webview"
        component={Webview}
        options={Webview.navigationOptions}
      />
    </Stack.Navigator>
  );
}

export default function Routes() {
  return <NavigationContainer>{RootStack()}</NavigationContainer>;
}
