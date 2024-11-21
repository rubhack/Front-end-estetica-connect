import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Roleselectionscreen from './SCREENS/Roleselectionscreen';
import PatientLoginScreen from './SCREENS/PatientLoginScreen';
import EspecialistaLogScreen from './SCREENS/EspecialistaLogScreen';
import ProveedorLogScreen from './SCREENS/ProveedorLogScreen';
import PatientRegisterScreen from './SCREENS/PatientRegisterScreen';
import EspecialistaRegisterScreen from './SCREENS/EspecialistaRegisterScreen';
import ProveedorRegisterScreen from './SCREENS/ProveedorRegisterScreen';
import PatientHomeScreen from './SCREENS/PatientHomeScreen';
import EspecialistaHomeScreen from './SCREENS/EspecialistaHomeScreen';
import ProveedorHomeScreen from './SCREENS/ProveedorHomeScreen';
const Stack = createNativeStackNavigator();

export default function App() {
  return(
    <NavigationContainer>
      <StatusBar style="auto" />
      <Stack.Navigator 
        initialRouteName="RoleSelection"
        screenOptions={{
          headerShown: false,
          contentStyle: { backgroundColor: '#fff' }
        }}
      >
        <Stack.Screen 
          name="RoleSelection" 
          component={Roleselectionscreen}
        />
        <Stack.Screen 
          name="PatientLoginScreen" 
          component={PatientLoginScreen}
        />
                <Stack.Screen 
          name="EspecialistaLogScreen" 
          component={EspecialistaLogScreen}
        />
         <Stack.Screen 
          name="ProveedorLogScreen" 
          component={ProveedorLogScreen}
        />
        <Stack.Screen 
          name="PatientRegisterScreen" 
          component={PatientRegisterScreen} // Pantalla de registro del paciente
        />
         <Stack.Screen 
          name="EspecialistaRegisterScreen" 
          component={EspecialistaRegisterScreen} // Pantalla de registro del especialista
        />
         <Stack.Screen 
          name="ProveedorRegisterScreen" 
          component={ProveedorRegisterScreen} // Pantalla de registro del proveedor
        />
          <Stack.Screen 
          name="PatientHomeScreen" 
          component={PatientHomeScreen} 
        />
          <Stack.Screen 
          name="EspecialistaHomeScreen" 
          component={EspecialistaHomeScreen} 
        />
          <Stack.Screen 
          name="ProveedorHomeScreen" 
          component={ProveedorHomeScreen} // Pantalla de registro del proveedor
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
