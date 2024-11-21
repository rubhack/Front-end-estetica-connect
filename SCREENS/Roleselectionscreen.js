import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image } from 'react-native';

export default function Roleselectionscreen({ navigation }) {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Ingresar Como:</Text>
      <TouchableOpacity style={styles.option}
        onPress={() => navigation.navigate('PatientLoginScreen')}
      >
        <Image source={require('../assets/paciente.png')} style={styles.icon} />
        <Text style={styles.optionText}>Paciente</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.option}
      onPress={() => navigation.navigate('EspecialistaLogScreen')}
      >
        <Image source={require('../assets/especialista.png')} style={styles.icon} />
        <Text style={styles.optionText}>Especialista</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.option}
      onPress={() => navigation.navigate('ProveedorLogScreen')}
      >
        <Image source={require('../assets/proveedor.png')} style={styles.icon} />
        <Text style={styles.optionText}>Proveedor</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#FF6666',
    marginBottom: 20,
  },
  option: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 10,
    marginBottom: 20,
    width: '80%',
    borderWidth: 1,
    borderColor: '#FF6666',
    borderRadius: 10,
  },
  icon: {
    width: 50,
    height: 50,
    marginRight: 20,
  },
  optionText: {
    fontSize: 18,
    color: '#FF6666',
  },
});
