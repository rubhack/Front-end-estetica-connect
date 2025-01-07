import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  TextInput,
  SafeAreaView,
  Platform,
  StatusBar,
  Image,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';

export default function EspecialistaLogScreen({ navigation }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);

  const handleLogin = () => {
    // Simulación de autenticación
    if (email === 'rubendejes@gmail.com' && password === '123456') {
      navigation.navigate('EspecialistaHomeScreen'); // Navegar a Home si las credenciales son correctas
    } else {
      alert('Credenciales incorrectas. Intenta nuevamente.');
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.safeArea}>
        {/* Header */}
        <View style={styles.header}>
          <TouchableOpacity
            onPress={() => navigation.navigate('Roleselectionscreen')}
            hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}
            style={styles.backButton}
          >
            <Ionicons name="chevron-back" size={28} color="#FF6666" />
          </TouchableOpacity>
          <Text style={styles.headerTitle}>Hola Especialista</Text>
        </View>

        <View style={styles.content}>
          {/* Patient Image */}
          <View style={styles.imageContainer}>
            <Image
              source={require('../assets/especialista.png')}
              style={styles.patientImage}
              resizeMode="contain"
            />
          </View>

          {/* Welcome Text */}
          <Text style={styles.welcomeText}>Welcome</Text>

          {/* Input Fields */}
          <View style={styles.inputContainer}>
            <TextInput
              style={styles.input}
              placeholder="Email"
              placeholderTextColor="#999"
              value={email}
              onChangeText={setEmail}
              keyboardType="email-address"
              autoCapitalize="none"
            />
          </View>

          <View style={styles.inputContainer}>
            <TextInput
              style={styles.input}
              placeholder="Contraseña"
              placeholderTextColor="#999"
              value={password}
              onChangeText={setPassword}
              secureTextEntry={!showPassword}
            />
            <TouchableOpacity
              style={styles.eyeIcon}
              onPress={() => setShowPassword(!showPassword)}
            >
              <Ionicons
                name={showPassword ? 'eye-off' : 'eye'}
                size={24}
                color="#999"
              />
            </TouchableOpacity>
          </View>

          {/* Forgot Password */}
          <TouchableOpacity style={styles.forgotPassword}>
            <Text style={styles.forgotPasswordText}>¿Olvidaste tu contraseña?</Text>
          </TouchableOpacity>

          {/* Login Button */}
          <TouchableOpacity onPress={handleLogin} style={styles.loginButton}>
            <Text style={styles.loginButtonText}>Iniciar Sesión</Text>
          </TouchableOpacity>

          {/* Sign Up Link */}
          <View style={styles.signUpContainer}>
            <Text style={styles.signUpText}>¿No tienes cuenta? </Text>
            <TouchableOpacity onPress={() => navigation.navigate('EspecialistaRegisterScreen')}>
              <Text style={styles.signUpLink}>Regístrate aquí</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  safeArea: {
    flex: 1,
    paddingTop: Platform.OS === 'android' ? StatusBar.currentHeight : 0,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 15,
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#f0f0f0',
    backgroundColor: '#fff',
  },
  backButton: {
    padding: 8,
    marginLeft: 4,
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#FF6666',
    marginLeft: 8,
  },
  content: {
    flex: 1,
    paddingHorizontal: 24,
    paddingTop: '10%',
  },
  imageContainer: {
    alignItems: 'center',
    marginBottom: 20,
  },
  patientImage: {
    width: 120,
    height: 120,
  },
  welcomeText: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 32,
    textAlign: 'center',
  },
  inputContainer: {
    marginBottom: 16,
    position: 'relative',
  },
  input: {
    backgroundColor: '#FFE5E5',
    borderRadius: 8,
    padding: 16,
    fontSize: 16,
  },
  eyeIcon: {
    position: 'absolute',
    right: 16,
    top: 16,
  },
  forgotPassword: {
    alignSelf: 'flex-end',
    marginBottom: 24,
  },
  forgotPasswordText: {
    color: '#FF6666',
    fontSize: 14,
  },
  loginButton: {
    backgroundColor: '#FF6666',
    borderRadius: 8,
    padding: 16,
    alignItems: 'center',
    marginBottom: 24,
  },
  loginButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  signUpContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: 12,
  },
  signUpText: {
    color: '#666',
  },
  signUpLink: {
    color: '#FF6666',
    fontWeight: 'bold',
  },
});

