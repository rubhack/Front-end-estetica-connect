import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  Image,
  Platform,
  StatusBar,
  ScrollView,
} from "react-native";
import Ionicons from "react-native-vector-icons/Ionicons";
import { Picker } from "@react-native-picker/picker";
import * as DocumentPicker from "expo-document-picker";
import * as ImagePicker from 'expo-image-picker';
import DateTimePicker from "@react-native-community/datetimepicker";

const updateperfilespe = ({ navigation }) => {
  const [fullName, setFullName] = useState("John Doe");
  const [rut, setRut] = useState("12345678-9");
  const [email, setEmail] = useState("johndoe@example.com");
  const [phone, setPhone] = useState("+1235678900");
  const [birthDate, setBirthDate] = useState(new Date());
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [sex, setSex] = useState("Masculino");
  const [address, setAddress] = useState("123 Main St, City");
  const [interests, setInterests] = useState("Lorem ipsum dolor sit amet.");
  const [isEditing, setIsEditing] = useState(false);
  const [profileImage, setProfileImage] = useState(
    "https://i.pravatar.cc/100"
  );
  const [certificate, setCertificate] = useState({
    uri: null,
    name: "certificado.pdf", // Nombre inicial
  });

  const handleDateChange = (event, selectedDate) => {
    const currentDate = selectedDate || birthDate;
    setShowDatePicker(false);
    setBirthDate(currentDate);
  };
  const handleImagePicker = async () => {
    try {
      const result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        allowsEditing: true,
        aspect: [1, 1],
        quality: 1,
      });

      if (!result.canceled) {
        setProfileImage(result.assets[0].uri);
      }
    } catch (error) {
      console.error("Error picking image: ", error);
    }
  };
  const toggleEditing = () => {
    setIsEditing(!isEditing);
  };

  const handleCertificatePicker = async () => {
    try {
      const result = await DocumentPicker.getDocumentAsync({
        type: ["image/*", "application/pdf"], // Permitir imágenes y PDFs
        copyToCacheDirectory: false,
      });

      if (result.type !== "cancel") {
        console.log("Archivo seleccionado:", result);
        setCertificate({ uri: result.uri, name: result.name || "Archivo.pdf" });
      } else {
        console.log("Selección cancelada.");
      }
    } catch (error) {
      console.error("Error seleccionando el archivo:", error);
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Ionicons name="chevron-back" size={28} color="#FF497C" />
        </TouchableOpacity>
        <Text style={styles.title}>Actualizar Perfil</Text>
        <View style={{ width: 28 }} />
      </View>

       <ScrollView contentContainerStyle={styles.content}>
         <View style={styles.profilePictureContainer}>
           <Image source={{ uri: profileImage }} style={styles.profilePicture} />
           <TouchableOpacity
             style={[styles.cameraIcon, isEditing && { backgroundColor: "#FFA07A" }]}
             onPress={isEditing ? handleImagePicker : null}
           >
             <Ionicons name="camera" size={20} color="#FFF" />
           </TouchableOpacity>
         </View>

        <TextInput
          style={[styles.input, isEditing && styles.editableInput]}
          value={fullName}
          onChangeText={setFullName}
          editable={isEditing}
          placeholder="Nombre Completo"
        />

        <TextInput
          style={[styles.input, isEditing && styles.editableInput]}
          value={rut}
          onChangeText={setRut}
          editable={isEditing}
          placeholder="RUT"
        />

        <View style={styles.pickerContainer}>
          <Picker
            selectedValue={sex}
            onValueChange={(itemValue) => setSex(itemValue)}
            enabled={isEditing}
          >
            <Picker.Item label="Masculino" value="Masculino" />
            <Picker.Item label="Femenino" value="Femenino" />
          </Picker>
        </View>

        <TouchableOpacity
          style={styles.datePickerButton}
          onPress={() => setShowDatePicker(true)}
          disabled={!isEditing}
        >
          <Text style={styles.datePickerText}>
            {birthDate.toLocaleDateString("es-ES")}
          </Text>
        </TouchableOpacity>

        {showDatePicker && (
          <DateTimePicker
            value={birthDate}
            mode="date"
            display="default"
            onChange={handleDateChange}
          />
        )}

        <TextInput
          style={[styles.input, isEditing && styles.editableInput]}
          value={email}
          onChangeText={setEmail}
          editable={isEditing}
          placeholder="Correo Electrónico"
          keyboardType="email-address"
        />

        <TextInput
          style={[styles.input, isEditing && styles.editableInput]}
          value={phone}
          onChangeText={setPhone}
          editable={isEditing}
          placeholder="Teléfono"
          keyboardType="phone-pad"
        />

        <TextInput
          style={[styles.input, styles.largeInput, isEditing && styles.editableInput]}
          value={address}
          onChangeText={setAddress}
          editable={isEditing}
          placeholder="Dirección"
        />

        <TextInput
          style={[styles.input, styles.largeInput, isEditing && styles.editableInput]}
          value={interests}
          onChangeText={setInterests}
          editable={isEditing}
          placeholder="Intereses"
          multiline
        />

        {/* Adjuntar certificado */}
        <View style={styles.certificateContainer}>
          <Text style={styles.certificateText}>
            Certificado: {certificate.name}
          </Text>
          {isEditing && (
            <TouchableOpacity
              style={styles.certificateButton}
              onPress={handleCertificatePicker}
            >
              <Text style={styles.certificateButtonText}>
                Cambiar Certificado
              </Text>
            </TouchableOpacity>
          )}
        </View>
      </ScrollView>

      <TouchableOpacity style={styles.editButton} onPress={toggleEditing}>
        <Text style={styles.editButtonText}>{isEditing ? "Guardar" : "Editar"}</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#FFF",
      },
      header: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        paddingHorizontal: 15,
        paddingVertical: 10,
        backgroundColor: "#FFF",
        paddingTop: Platform.OS === "android" ? StatusBar.currentHeight + 10 : 50,
        borderBottomWidth: 1,
        borderBottomColor: "#EEE",
      },
      title: {
        fontSize: 20,
        fontWeight: "bold",
        color: "#FF497C",
      },
      content: {
        padding: 15,
      },
      profilePictureContainer: {
        alignItems: "center",
        marginBottom: 20,
      },
      profilePicture: {
        width: 100,
        height: 100,
        borderRadius: 50,
        backgroundColor: "#EEE",
      },
      cameraIcon: {
        position: "absolute",
        bottom: 5,
        right: 5,
        backgroundColor: "#FF497C",
        width: 30,
        height: 30,
        borderRadius: 15,
        justifyContent: "center",
        alignItems: "center",
      },
      input: {
        backgroundColor: "#F5F5F5",
        borderRadius: 10,
        padding: 15,
        fontSize: 16,
        marginBottom: 15,
      },
      editableInput: {
        borderWidth: 1,
        borderColor: "#FF497C",
      },
      pickerContainer: {
        backgroundColor: "#F5F5F5",
        borderRadius: 10,
        marginBottom: 15,
      },
      datePickerButton: {
        backgroundColor: "#F5F5F5",
        borderRadius: 10,
        padding: 15,
        alignItems: "center",
        marginBottom: 15,
      },
      datePickerText: {
        fontSize: 16,
        color: "#333",
      },
      largeInput: {
        minHeight: 100,
        textAlignVertical: "top",
      },
      certificateContainer: {
        marginBottom: 20,
        padding: 15,
        backgroundColor: "#F5F5F5",
        borderRadius: 10,
      },
      certificateText: {
        fontSize: 16,
        color: "#333",
      },
      certificateButton: {
        marginTop: 10,
        padding: 10,
        backgroundColor: "#FF497C",
        borderRadius: 10,
        alignItems: "center",
      },
      certificateButtonText: {
        color: "#FFF",
        fontSize: 16,
        fontWeight: "bold",
      },
      editButton: {
        backgroundColor: "#FF497C",
        padding: 15,
        borderRadius: 10,
        alignItems: "center",
        margin: 15,
      },
      editButtonText: {
        color: "#FFF",
        fontSize: 16,
        fontWeight: "bold",
      },
});

export default updateperfilespe;
