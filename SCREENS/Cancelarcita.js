import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  TextInput,
  Platform,
  StatusBar,
  Dimensions,
} from "react-native";
import Ionicons from "react-native-vector-icons/Ionicons";

const { width } = Dimensions.get("window");

const Cancelarcita = ({ navigation }) => {
  const [selectedReason, setSelectedReason] = useState(null);
  const [additionalReason, setAdditionalReason] = useState("");

  const reasons = [
    "Reprogramación",
    "Condiciones Climáticas",
    "Trabajo Inesperado",
    "Otros",
  ];

  const handleConfirmCancel = () => {
    // BACKEND: Enviar razón de cancelación y datos de la cita al servidor.
    console.log("Razón seleccionada:", selectedReason);
    console.log("Razón adicional:", additionalReason);
    alert("Cita cancelada exitosamente.");
    navigation.goBack();
  };

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Ionicons name="chevron-back" size={28} color="#FF497C" />
        </TouchableOpacity>
        <Text style={styles.title}>Cancelar Cita</Text>
        <View style={{ width: 28 }} />
      </View>

      <View style={styles.content}>
        <Text style={styles.description}>
          Por favor, selecciona la razón para cancelar tu cita.
        </Text>

        {/* Opciones de Razón */}
        {reasons.map((reason, index) => (
          <TouchableOpacity
            key={index}
            style={[
              styles.reasonOption,
              selectedReason === reason && styles.selectedReasonOption,
            ]}
            onPress={() => setSelectedReason(reason)}
          >
            <View
              style={[
                styles.radioCircle,
                selectedReason === reason && styles.selectedRadioCircle,
              ]}
            />
            <Text style={styles.reasonText}>{reason}</Text>
          </TouchableOpacity>
        ))}

        <Text style={styles.additionalInfo}>Explícanos un poco más:</Text>

        {/* Campo de Razón Adicional */}
        <TextInput
          style={styles.textArea}
          placeholder="Escribe tu razón aquí..."
          placeholderTextColor="#AAA"
          multiline
          value={additionalReason}
          onChangeText={setAdditionalReason}
        />

        {/* Botón Cancelar Cita */}
        <TouchableOpacity
          style={styles.cancelButton}
          onPress={handleConfirmCancel}
        >
          <Text style={styles.cancelButtonText}>Cancelar Cita</Text>
        </TouchableOpacity>
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
    paddingHorizontal: 20,
    paddingTop: 20,
  },
  description: {
    fontSize: 16,
    color: "#333",
    marginBottom: 20,
  },
  reasonOption: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#F5F5F5",
    padding: 15,
    borderRadius: 10,
    marginBottom: 10,
  },
  selectedReasonOption: {
    backgroundColor: "#FF497C",
  },
  radioCircle: {
    width: 20,
    height: 20,
    borderRadius: 10,
    borderWidth: 2,
    borderColor: "#FF497C",
    marginRight: 10,
  },
  selectedRadioCircle: {
    backgroundColor: "#FFF",
  },
  reasonText: {
    fontSize: 16,
    color: "#333",
  },
  additionalInfo: {
    fontSize: 14,
    color: "#666",
    marginVertical: 10,
  },
  textArea: {
    backgroundColor: "#F5F5F5",
    borderRadius: 10,
    padding: 15,
    fontSize: 16,
    minHeight: 100,
    textAlignVertical: "top",
  },
  cancelButton: {
    backgroundColor: "#FF497C",
    padding: 15,
    borderRadius: 10,
    alignItems: "center",
    marginTop: 20,
  },
  cancelButtonText: {
    color: "#FFF",
    fontSize: 16,
    fontWeight: "bold",
  },
});

export default Cancelarcita;
