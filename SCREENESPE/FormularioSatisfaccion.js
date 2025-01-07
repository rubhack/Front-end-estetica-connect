import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  TextInput,
  Alert,
} from "react-native";
import Ionicons from "react-native-vector-icons/Ionicons";

const FormularioSatisfaccion = ({ route, navigation }) => {
  const { orderId } = route.params;
  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState("");
  const [received, setReceived] = useState(true);

  const handleStarPress = (index) => {
    setRating(index + 1);
  };

  const handleSubmit = () => {
    if (rating === 0) {
      Alert.alert("Por favor, califica con estrellas antes de finalizar.");
      return;
    }
    Alert.alert("¡Gracias!", "Tu evaluación ha sido enviada exitosamente.");
    navigation.navigate("notificacionespe");
  };

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Ionicons name="chevron-back" size={28} color="#FF497C" />
        </TouchableOpacity>
        <Text style={styles.title}>Evaluación del Pedido</Text>
        <View style={{ width: 28 }} />
      </View>

      {/* Star Rating */}
      <Text style={styles.sectionTitle}>Califica al proveedor:</Text>
      <View style={styles.starContainer}>
        {[...Array(5)].map((_, index) => (
          <TouchableOpacity key={index} onPress={() => handleStarPress(index)}>
            <Ionicons
              name={index < rating ? "star" : "star-outline"}
              size={40}
              color={index < rating ? "#FF497C" : "#CCC"}
            />
          </TouchableOpacity>
        ))}
      </View>

      {/* Comment Input */}
      <Text style={styles.sectionTitle}>Deja un comentario:</Text>
      <TextInput
        style={styles.commentInput}
        multiline
        placeholder="Escribe tu experiencia aquí..."
        placeholderTextColor="#AAA"
        value={comment}
        onChangeText={setComment}
      />

      {/* Received Confirmation */}
      <Text style={styles.sectionTitle}>¿Recibiste tu pedido?</Text>
      <View style={styles.receivedContainer}>
        <TouchableOpacity
          style={[
            styles.receivedButton,
            received ? styles.selectedButton : styles.unselectedButton,
          ]}
          onPress={() => setReceived(true)}
        >
          <Text style={styles.receivedText}>Sí, recibido</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[
            styles.receivedButton,
            !received ? styles.selectedButton : styles.unselectedButton,
          ]}
          onPress={() => setReceived(false)}
        >
          <Text style={styles.receivedText}>No recibido</Text>
        </TouchableOpacity>
      </View>

      {!received && (
        <Text style={styles.warningText}>
          En caso de no haber recibido el paquete, notificaremos al proveedor para
          que se comunique contigo y solucione el problema.
        </Text>
      )}

      {/* Submit Button */}
      <TouchableOpacity style={styles.finishButton} onPress={handleSubmit}>
        <Text style={styles.finishButtonText}>Finalizar Evaluación</Text>
      </TouchableOpacity>
    </View>
  );
};

// Styling
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FFF",
    paddingHorizontal: 20,
    paddingTop: 50,
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingBottom: 20,
    borderBottomWidth: 1,
    borderColor: "#EEE",
  },
  title: {
    fontSize: 22,
    fontWeight: "bold",
    color: "#FF497C",
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: "bold",
    marginTop: 20,
    color: "#333",
  },
  starContainer: {
    flexDirection: "row",
    justifyContent: "center",
    marginVertical: 20,
  },
  commentInput: {
    borderWidth: 1,
    borderColor: "#FF497C",
    borderRadius: 10,
    padding: 15,
    textAlignVertical: "top",
    fontSize: 16,
    height: 120,
    marginTop: 10,
  },
  receivedContainer: {
    flexDirection: "row",
    justifyContent: "space-around",
    marginTop: 20,
  },
  receivedButton: {
    padding: 15,
    borderRadius: 15,
    width: "45%",
    alignItems: "center",
  },
  selectedButton: {
    backgroundColor: "#FF497C",
  },
  unselectedButton: {
    backgroundColor: "#F0F0F0",
  },
  receivedText: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#FFF",
  },
  warningText: {
    color: "#FF497C",
    fontSize: 14,
    marginTop: 20,
    textAlign: "center",
  },
  finishButton: {
    marginTop: 30,
    paddingVertical: 15,
    borderRadius: 15,
    backgroundColor: "#FF497C",
    alignItems: "center",
  },
  finishButtonText: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#FFF",
  },
});

export default FormularioSatisfaccion;
