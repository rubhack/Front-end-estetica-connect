import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Roleselectionscreen from './SCREENS/Roleselectionscreen';
import PatientLoginScreen from './SCREENS/PatientLoginScreen';
import EspecialistaLogScreen from './SCREENESPE/EspecialistaLogScreen';
import ProveedorLogScreen from './SCREENPROV/ProveedorLogScreen';
import PatientRegisterScreen from './SCREENS/PatientRegisterScreen';
import EspecialistaRegisterScreen from './SCREENESPE/EspecialistaRegisterScreen';
import ProveedorRegisterScreen from './SCREENPROV/ProveedorRegisterScreen';
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
import EspecialistaHomeScreen from './SCREENESPE/EspecialistaHomeScreen';
import ajusteespecialista from './SCREENESPE/ajusteespecialista';
import updateperfilespe from './SCREENESPE/updateperfilespe';
import settingespe from './SCREENESPE/settingespe';
import notificacionespe from './SCREENESPE/notificacionespe';
import Citaforpacien from './SCREENESPE/Citaforpacien';
import Calendarespe from './SCREENESPE/Calendarespe';
import ModificarAgenda from './SCREENESPE/ModificarAgenda';
import CitaDelDia from './SCREENESPE/CitaDelDia';
import AgendarCitaEspe from './SCREENESPE/AgendarCitaEspe';
import ComprobanteEspe from './SCREENESPE/ComprobanteEspe';
import Proveedor from './SCREENESPE/Proveedor';
import Compraespe from './SCREENESPE/Compraespe';
import Historial from './SCREENESPE/Historial';
import InfoCompany from './SCREENESPE/InfoCompany';
import MasDetalle from './SCREENESPE/MasDetalle';
import CarritoDeCompra from './SCREENESPE/CarritoDeCompra';
import DetallesDeCompra from './SCREENESPE/DetallesDeCompra';
import FormularioSatisfaccion from './SCREENESPE/FormularioSatisfaccion';
import Estadisticaespe from './SCREENESPE/Estadisticaespe';
import ProveedorHomeScreen from './SCREENPROV/ProveedorHomeScreen';
import ajustesprove from './SCREENPROV/ajustesprove';
import settingprove from './SCREENPROV/settingprove';
import updateperfilprove from './SCREENPROV/updateperfilprove';
import AgendarPedido from './SCREENPROV/AgendarPedido';
import Pedidos from './SCREENPROV/Pedidos';
import DetallePendiente from './SCREENPROV/DetallePendiente';
import Entregado from './SCREENPROV/Entregado';
import NoEntregado from './SCREENPROV/NoEntregado';
import AddProduct from './SCREENPROV/AddProduct';
import Inventory from './SCREENPROV/Inventory';
import EditProduct from './SCREENPROV/EditProduct';
import NotificacionProve from './SCREENPROV/NotificacionProve';
import EstadisticaProve from './SCREENPROV/EstadisticaProve';

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
          name="ajusteespecialista" 
          component={ajusteespecialista} 
        />
          <Stack.Screen 
          name="updateperfilespe" 
          component={updateperfilespe} 
        />
         <Stack.Screen 
          name="settingespe" 
          component={settingespe} 
        />
         <Stack.Screen 
          name="notificacionespe" 
          component={notificacionespe} 
        />
          <Stack.Screen 
          name="Citaforpacien" 
          component={Citaforpacien} 
        />
          <Stack.Screen 
          name="Calendarespe" 
          component={Calendarespe} 
        />
         <Stack.Screen 
          name="ModificarAgenda" 
          component={ModificarAgenda} 
        />
        <Stack.Screen 
          name="CitaDelDia" 
          component={CitaDelDia} 
        />
         <Stack.Screen 
          name="AgendarCitaEspe" 
          component={AgendarCitaEspe} 
        />
         <Stack.Screen 
          name="ComprobanteEspe" 
          component={ComprobanteEspe} 
        />
        <Stack.Screen 
          name="Proveedor" 
          component={Proveedor} 
        />
        <Stack.Screen 
          name="Compraespe" 
          component={Compraespe} 
        />
        <Stack.Screen 
          name="Historial" 
          component={Historial} 
        />
        <Stack.Screen 
          name="InfoCompany" 
          component={InfoCompany} 
        />
         <Stack.Screen 
          name="MasDetalle" 
          component={MasDetalle} 
        />
         <Stack.Screen 
          name="CarritoDeCompra" 
          component={CarritoDeCompra} 
        />
         <Stack.Screen 
          name="DetallesDeCompra" 
          component={DetallesDeCompra} 
        />
          <Stack.Screen 
          name="FormularioSatisfaccion" 
          component={FormularioSatisfaccion} 
        />
         <Stack.Screen 
          name="Estadisticaespe" 
          component={Estadisticaespe} 
        />
          <Stack.Screen 
          name="ProveedorHomeScreen" 
          component={ProveedorHomeScreen} // Pantalla de registro del proveedor
        />
         <Stack.Screen 
          name="ajustesprove" 
          component={ajustesprove} 
        />
        <Stack.Screen 
          name="settingprove" 
          component={settingprove} 
        />
          <Stack.Screen 
          name="updateperfilprove" 
          component={updateperfilprove} 
        />
        <Stack.Screen 
          name="AgendarPedido" 
          component={AgendarPedido} 
        />
        <Stack.Screen 
          name="Pedidos" 
          component={Pedidos} 
        />
         <Stack.Screen 
          name="DetallePendiente" 
          component={DetallePendiente} 
        />
          <Stack.Screen 
          name="Entregado" 
          component={Entregado} 
        />
        <Stack.Screen 
          name="NoEntregado" 
          component={NoEntregado} 
        />
         <Stack.Screen 
          name="AddProduct" 
          component={AddProduct} 
        />
         <Stack.Screen 
          name="Inventory" 
          component={Inventory} 
        />
         <Stack.Screen 
          name="EditProduct" 
          component={EditProduct} 
        />
        <Stack.Screen 
          name="NotificacionProve" 
          component={NotificacionProve} 
        />
         <Stack.Screen 
          name="EstadisticaProve" 
          component={EstadisticaProve} 
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
