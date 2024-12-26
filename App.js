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
import settingpatient from './SCREENS/settingpatient';
import Notificationpatient from './SCREENS/Notificationpatient';
import PatientProfileScreen from './SCREENS/PatientProfileScreen';
import Updateprofile from './SCREENS/Updateprofile';
import Reseñasespecialista from './SCREENS/Reseñasespecialista';
import Previsualizacionagendaespe from './SCREENS/Previsualizacionagendaespe';
import agendarcitapac from './SCREENS/agendarcitapac';
import Detallecita from './SCREENS/Detallecita';
import Historialcita from './SCREENS/Historialcita';
import Cancelarcita from './SCREENS/Cancelarcita';
import Citacompletada from './SCREENS/Citacompletada';
import EspecialistaHomeScreen from './SCREENS/EspecialistaHomeScreen';
import ProveedorHomeScreen from './SCREENS/ProveedorHomeScreen';
const Stack = createNativeStackNavigator();

export default function App() {
  return(
    <NavigationContainer>
      <StatusBar style="auto" />
      <Stack.Navigator 
        initialRouteName="Roleselectionscreen"
        screenOptions={{
          headerShown: false,
          contentStyle: { backgroundColor: '#fff' }
        }}
      >
        <Stack.Screen 
          name="Roleselectionscreen" 
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
          name="PatientProfileScreen" 
          component={PatientProfileScreen} 
        />
         <Stack.Screen 
          name="Previsualizacionagendaespe" 
          component={Previsualizacionagendaespe} 
        />
         <Stack.Screen 
          name="Reseñasespecialista" 
          component={Reseñasespecialista} 
        />
            <Stack.Screen 
          name="Updateprofile" 
          component={Updateprofile} 
        />
         <Stack.Screen 
          name="agendarcitapac" 
          component={agendarcitapac} 
        />
          <Stack.Screen 
          name="Detallecita" 
          component={Detallecita} 
        />
          <Stack.Screen 
          name="Historialcita" 
          component={Historialcita} 
        />
          <Stack.Screen 
          name="Cancelarcita" 
          component={Cancelarcita} 
        />
         <Stack.Screen 
          name="Citacompletada" 
          component={Citacompletada} 
        />
          <Stack.Screen 
          name="settingpatient" 
          component={settingpatient} 
          
        />
          <Stack.Screen 
          name="Notificationpatient" 
          component={Notificationpatient} 
          
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
