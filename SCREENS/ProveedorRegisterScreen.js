import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  SafeAreaView,
  Platform,
  StatusBar,
  Image,
  ScrollView,
  KeyboardAvoidingView,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { Picker } from '@react-native-picker/picker';
import * as ImagePicker from 'expo-image-picker';
import * as DocumentPicker from 'expo-document-picker';

export default function ProveedorRegisterScreen({ navigation }) {
  const [name, setName] = useState('');
  const [rut, setRut] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [phone, setPhone] = useState('');
  const [address, setAddress] = useState('');
  const [Categoria, setCategoria] = useState('');
  const [profileImage, setProfileImage] = useState(null);
  const [SII, setSII] = useState(null);

  const handleImagePicker = async () => {
    const permissionResult = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (!permissionResult.granted) {
      alert('Se necesitan permisos para acceder a la galería.');
      return;
    }
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [1, 1],
      quality: 1,
    });
    if (!result.canceled) {
      setProfileImage(result.assets[0].uri);
    }
  };

  // Manejo de selección de documento
const handleDocumentPicker = async () => {
  try {
    const result = await DocumentPicker.getDocumentAsync({
      type: '*/*', // Permitir cualquier tipo de archivo
      copyToCacheDirectory: true, // Asegurarnos de que el archivo esté accesible
    });

    console.log("Resultado del picker:", result);

    if (result.canceled === false && result.assets && result.assets.length > 0) {
      const selectedFile = result.assets[0]; // Tomamos el primer archivo
      console.log("Archivo seleccionado con éxito:", selectedFile);
      setSII(selectedFile); // Guardamos el archivo seleccionado
    } else {
      console.log("El usuario canceló la selección o no hay archivo válido.");
      setSII(null);
    }
  } catch (error) {
    console.error("Error al seleccionar el archivo:", error);
    alert("Hubo un problema al seleccionar el archivo. Inténtalo de nuevo.");
  }
};

  return (
    <SafeAreaView style={styles.safeArea}>
      <KeyboardAvoidingView
        style={{ flex: 1 }}
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}
        keyboardVerticalOffset={Platform.OS === 'ios' ? 40 : 0}
      >
        <ScrollView contentContainerStyle={styles.scrollContent} keyboardShouldPersistTaps="handled">
          {/* Header */}
          <View style={styles.header}>
            <TouchableOpacity
              onPress={() => navigation.goBack()}
              hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}
              style={styles.backButton}
            >
              <Ionicons name="chevron-back" size={28} color="#FF6666" />
            </TouchableOpacity>
            <Text style={styles.headerTitle}>Nueva Cuenta</Text>
          </View>

          {/* Contenido */}
          <View style={styles.content}>
            {/* Foto de perfil */}
            <View style={styles.profilePictureContainer}>
              <TouchableOpacity onPress={handleImagePicker}>
                {profileImage ? (
                  <Image source={{ uri: profileImage }} style={styles.profilePicture} />
                ) : (
                  <Image source={require('../assets/anonimo.png')} style={styles.profilePicture} />
                )}
                <View style={styles.editIcon}>
                  <Ionicons name="camera" size={20} color="#fff" />
                </View>
              </TouchableOpacity>
              <Text style={styles.profilePictureText}>Foto de perfil</Text>
            </View>

            {/* Campos de entrada */}
            <TextInput
              style={styles.input}
              placeholder="Nombre Empresa"
              placeholderTextColor="#999"
              value={name}
              onChangeText={setName}
            />
            <TextInput
              style={styles.input}
              placeholder="RUT Empresarial"
              placeholderTextColor="#999"
              value={rut}
              onChangeText={setRut}
            />
            <View style={styles.Categoria}>
              <View style={styles.CategoriaContainer}>
                <Picker
                  selectedValue={Categoria}
                  onValueChange={(itemValue) => setCategoria(itemValue)}
                  style={styles.picker}
                >
                  <Picker.Item label="Categoria Estetica" value="" />
                  <Picker.Item label="Uñas" value="uñas" />
                  <Picker.Item label="Dermatologia" value="dermatologia" />
                </Picker>
              </View>
      
            </View>
            <TextInput
              style={styles.input}
              placeholder="Email"
              placeholderTextColor="#999"
              value={email}
              onChangeText={setEmail}
              keyboardType="email-address"
            />
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
                name={showPassword ? "eye-off" : "eye"} 
                size={24} 
                color="#999"
              />
            </TouchableOpacity>
          </View>
            <TextInput
              style={styles.input}
              placeholder="Teléfono"
              placeholderTextColor="#999"
              value={phone}
              onChangeText={setPhone}
              keyboardType="phone-pad"
            />
            <TextInput
              style={styles.input}
              placeholder="Dirección"
              placeholderTextColor="#999"
              value={address}
              onChangeText={setAddress}
            />
            {/* Botón de adjuntar certificado */}
<TouchableOpacity style={styles.uploadButton} onPress={handleDocumentPicker}>
    <Text style={styles.uploadButtonText}>
        {SII ? "Cambiar Certificado SII" : "Adjuntar Certificado SII"}
    </Text>
</TouchableOpacity>

{/* Validación visual del archivo adjunto */}
{SII ? (
  <View style={styles.successContainer}>
    <Ionicons name="checkmark-circle" size={20} color="green" />
    <Text style={styles.successText}>
      Archivo adjuntado: {SII.name || "Certificado"}
    </Text>
  </View>
) : (
  <Text style={styles.errorText}>Ningún archivo adjuntado.</Text>
)}


            {/* Botón de registro */}
            <TouchableOpacity style={styles.registerButton}>
              <Text style={styles.registerButtonText}>Registrar</Text>
            </TouchableOpacity>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#fff',
    paddingTop: Platform.OS === 'android' ? StatusBar.currentHeight : 0,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 8,
    height: 60,
    borderBottomWidth: 1,
    borderBottomColor: '#f0f0f0',
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
    paddingHorizontal: 24,
    marginTop: 20, // Ajuste dinámico
  },
  profilePictureContainer: {
    alignItems: 'center',
    marginBottom: 20,
  },
  profilePicture: {
    width: 100,
    height: 100,
    borderRadius: 50,
    backgroundColor: '#FFE5E5',
  },
  editIcon: {
    position: 'absolute',
    bottom: 10,
    right: 10,
    backgroundColor: '#FF6666',
    width: 30,
    height: 30,
    borderRadius: 15,
    justifyContent: 'center',
    alignItems: 'center',
  },
  profilePictureText: {
    marginTop: 10,
    fontSize: 14,
    color: '#999',
  },
  input: {
    backgroundColor: '#FFE5E5',
    borderRadius: 8,
    padding: 16,
    fontSize: 16,
    marginBottom: 12,
  },
  Categoria: {
    backgroundColor: '#FFE5E5',
    borderRadius: 8,
    padding: 16,
    fontSize: 16,
    marginBottom: 12,
  },
  CategoriaContainer: {
    flex: 1,
    marginRight: 8,
  },
  eyeIcon: {
    position: 'absolute',
    right: 16,
    top: 16,
  },
  picker: {
    backgroundColor: '#FFE5E5',
    borderRadius: 8,
    height: 50,
    justifyContent: 'center',
  },
  uploadButton: {
    backgroundColor: '#FFE5E5',
    borderRadius: 8,
    padding: 12,
    alignItems: 'center',
    marginBottom: 10,
  },
  uploadButtonText: {
    color: '#FF6666',
    fontSize: 14,
    fontWeight: 'bold',
  },
  successContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 10,
    backgroundColor: '#E8F5E9', // Fondo verde claro
    borderRadius: 8,
    padding: 10,
  },
  successText: {
    marginLeft: 8,
    color: '#388E3C', // Texto verde oscuro
    fontSize: 14,
  },
  errorText: {
    marginTop: 10,
    color: '#D32F2F', // Rojo para errores
    fontSize: 14,
  },
  registerButton: {
    backgroundColor: '#FF6666',
    borderRadius: 8,
    padding: 16,
    alignItems: 'center',
    marginTop: 20,
  },
  registerButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  attachButton: {
    backgroundColor: '#FF6666',
    borderRadius: 8,
    padding: 16,
    alignItems: 'center',
    marginVertical: 12,
  },
  attachButtonText: {
    color: '#fff',
    fontSize: 16,
  },
});