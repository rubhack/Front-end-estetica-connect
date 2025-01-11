import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  Image,
  TextInput,
  TouchableOpacity,
  Alert,
  Platform,
  StatusBar,
} from "react-native";
import Ionicons from "react-native-vector-icons/Ionicons";

const AgendarPedido = ({ route, navigation }) => {
  // Validación: Si no existe specialist, se usa un objeto vacío con valores por defecto
  const { specialist = {}, onConfirm } = route.params || {};
  const [deliveryDays, setDeliveryDays] = useState({ min: "", max: "" });

  const handleConfirmOrder = () => {
    if (deliveryDays.min && deliveryDays.max) {
      if (onConfirm) {
        onConfirm(specialist.id);
      }
      Alert.alert("Pedido Confirmado", "El pedido ha sido actualizado con éxito.");
      navigation.goBack();
    } else {
      Alert.alert("Error", "Por favor complete los días de entrega.");
    }
  };

  return (
    <View style={styles.container}>
      {/* Header con botón de volver */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Ionicons name="chevron-back" size={28} color="#FF497C" />
        </TouchableOpacity>
        <Text style={styles.title}>Agendar Pedido</Text>
        <View style={{ width: 28 }} />
      </View>

      {/* Imagen del especialista con validación */}
      <View style={styles.imageContainer}>
        <Image
          source={{ uri: specialist.image || "https://via.placeholder.com/150" }}
          style={styles.specialistImage}
        />
      </View>

      {/* Información del especialista con valores predeterminados */}
      <Text style={styles.specialistName}>{specialist.name || "Nombre no disponible"}</Text>
      <Text style={styles.conditionText}>Pedido: {specialist.condition || "Sin información"}</Text>

      {/* Información Predefinida del Pedido */}
      <View style={styles.infoContainer}>
        <Text style={styles.infoText}>Número de Teléfono: {specialist.phoneNumber || "N/A"}</Text>
        <Text style={styles.infoText}>Dirección: {specialist.address || "N/A"}</Text>
        <Text style={styles.infoText}>Número de Pedido: {specialist.orderNumber || "N/A"}</Text>
        {/* Nueva sección con cantidad y monto */}
        <Text style={styles.infoText}>Cantidad Comprada: {specialist.quantity || "3 unidades"}</Text>
        <Text style={styles.infoText}>Monto Total: {specialist.totalAmount || "$45.000 CLP"}</Text>
      </View>

      {/* Estimación de días de entrega */}
      <View style={styles.deliveryContainer}>
        <Text style={styles.deliveryLabel}>Estimación de Entrega:</Text>
        <TextInput
          style={styles.deliveryInput}
          placeholder="Mín."
          keyboardType="numeric"
          value={deliveryDays.min}
          onChangeText={(text) => setDeliveryDays({ ...deliveryDays, min: text })}
        />
        <Text style={styles.deliveryLabel}>-</Text>
        <TextInput
          style={styles.deliveryInput}
          placeholder="Máx."
          keyboardType="numeric"
          value={deliveryDays.max}
          onChangeText={(text) => setDeliveryDays({ ...deliveryDays, max: text })}
        />
        <Text style={styles.deliveryLabel}>Días</Text>
      </View>

      {/* Botón de Confirmar Pedido */}
      <TouchableOpacity style={styles.confirmButton} onPress={handleConfirmOrder}>
        <Text style={styles.confirmButtonText}>Confirmar Pedido</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FFF",
    paddingHorizontal: 20,
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 15,
    paddingTop: Platform.OS === "android" ? StatusBar.currentHeight + 20 : 60,
    paddingBottom: 10,
    borderBottomWidth: 1,
    borderColor: "#EEE",
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#FF497C",
  },
  imageContainer: {
    alignItems: "center",
    marginVertical: 20,
  },
  specialistImage: {
    width: 120,
    height: 120,
    borderRadius: 60,
    borderWidth: 2,
    borderColor: "#FF497C",
  },
  specialistName: {
    fontSize: 24,
    fontWeight: "bold",
    textAlign: "center",
    color: "#333",
  },
  conditionText: {
    fontSize: 16,
    textAlign: "center",
    color: "#777",
    marginBottom: 20,
  },
  infoContainer: {
    marginVertical: 20,
    padding: 15,
    borderRadius: 10,
    backgroundColor: "#F8F8F8",
    borderWidth: 1,
    borderColor: "#EEE",
  },
  infoText: {
    fontSize: 16,
    color: "#333",
    marginBottom: 10,
  },
  deliveryContainer: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 20,
  },
  deliveryLabel: {
    fontSize: 16,
    color: "#333",
    marginHorizontal: 5,
  },
  deliveryInput: {
    borderWidth: 1,
    borderColor: "#FF497C",
    borderRadius: 10,
    padding: 10,
    width: 70,
    textAlign: "center",
  },
  confirmButton: {
    backgroundColor: "#FF497C",
    paddingVertical: 15,
    borderRadius: 20,
    alignItems: "center",
    marginTop: 20,
  },
  confirmButtonText: {
    color: "#FFF",
    fontSize: 18,
    fontWeight: "bold",
  },
});

export default AgendarPedido;
