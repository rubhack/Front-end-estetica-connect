import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  Alert,
  Platform,
  StatusBar,
  Image,
} from "react-native";
import Ionicons from "react-native-vector-icons/Ionicons";

const Citaforpacien = ({ route, navigation }) => {
  const { patientData } = route.params; // Obtener los datos del paciente desde los parámetros
  const [comment, setComment] = useState("");

  // Validación para asegurarse de que `patientData` existe
  if (!patientData) {
    return (
      <View style={styles.container}>
        <Text style={styles.errorText}>
          No se han proporcionado datos del paciente.
        </Text>
        <TouchableOpacity
          onPress={() => navigation.goBack()}
          style={styles.goBackButton}
        >
          <Text style={styles.goBackButtonText}>Volver</Text>
        </TouchableOpacity>
      </View>
    );
  }

  const handleCancel = () => {
    Alert.alert("Cita Cancelada", "La cita ha sido cancelada con éxito.", [
      { text: "OK", onPress: () => navigation.goBack() },
    ]);
  };

  const handleComplete = () => {
    Alert.alert("Cita Completada", "La cita se ha completado con éxito.", [
      { text: "OK", onPress: () => navigation.goBack() },
    ]);
  };

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Ionicons name="chevron-back" size={28} color="#FF497C" />
        </TouchableOpacity>
        <Text style={styles.title}>Detalles de la Cita</Text>
        <View style={{ width: 28 }} />
      </View>

      <View style={styles.content}>
        {/* Imagen del paciente */}
        <View style={styles.imageContainer}>
          <Image source={{ uri: patientData.image }} style={styles.patientImage} />
        </View>

        {/* Detalles de la cita */}
        <View style={styles.detailsContainer}>
          <Text style={styles.detailText}>
            Número de Registro: {patientData.id}
          </Text>
          <Text style={styles.detailText}>Nombre: {patientData.name}</Text>
          <Text style={styles.detailText}>Edad: {patientData.age}</Text>
          <Text style={styles.detailText}>
            Condición: {patientData.condition}
          </Text>
          <Text style={styles.detailText}>Hora: {patientData.time}</Text>
        </View>

        {/* Comentarios */}
        <View style={styles.commentContainer}>
          <Text style={styles.commentTitle}>Comentarios del Especialista</Text>
          <TextInput
            style={styles.commentInput}
            placeholder="Escribe un comentario..."
            placeholderTextColor="#AAA"
            value={comment}
            onChangeText={setComment}
            multiline
          />
        </View>

        {/* Botones */}
        <View style={styles.buttonContainer}>
          <TouchableOpacity style={styles.cancelButton} onPress={handleCancel}>
            <Text style={styles.buttonText}>Cancelar</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.completeButton}
            onPress={handleComplete}
          >
            <Text style={styles.buttonText}>Completar</Text>
          </TouchableOpacity>
        </View>
      </View>
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
    flex: 1,
    padding: 15,
  },
  imageContainer: {
    alignItems: "center",
    marginBottom: 20,
  },
  patientImage: {
    width: 120,
    height: 120,
    borderRadius: 60,
    backgroundColor: "#EEE",
  },
  detailsContainer: {
    backgroundColor: "#F5F5F5",
    borderRadius: 10,
    padding: 15,
    marginBottom: 20,
  },
  detailText: {
    fontSize: 16,
    color: "#333",
    marginBottom: 10,
  },
  commentContainer: {
    marginBottom: 20,
  },
  commentTitle: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#333",
    marginBottom: 10,
  },
  commentInput: {
    backgroundColor: "#F5F5F5",
    borderRadius: 10,
    padding: 15,
    fontSize: 16,
    minHeight: 100,
    textAlignVertical: "top",
  },
  buttonContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  cancelButton: {
    flex: 1,
    backgroundColor: "#FF6666",
    padding: 15,
    borderRadius: 10,
    alignItems: "center",
    marginRight: 10,
  },
  completeButton: {
    flex: 1,
    backgroundColor: "#66CDAA",
    padding: 15,
    borderRadius: 10,
    alignItems: "center",
  },
  buttonText: {
    color: "#FFF",
    fontSize: 16,
    fontWeight: "bold",
  },
});

export default Citaforpacien;
