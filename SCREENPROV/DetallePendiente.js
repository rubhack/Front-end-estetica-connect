import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  Alert,
  TextInput,
  Platform,
  StatusBar,
} from "react-native";
import Ionicons from "react-native-vector-icons/Ionicons";

const DetallePendiente = ({ route, navigation }) => {
  const { order } = route.params;
  const [isEditing, setIsEditing] = useState(false);
  const [newMinDays, setNewMinDays] = useState("");
  const [newMaxDays, setNewMaxDays] = useState("");
  const [reason, setReason] = useState("");

  // Datos estáticos para visualización
  const orderData = {
    name: "Dr. Maria Gonzalez",
    item: "Mascarilla Facial",
    quantity: 3,
    totalAmount: 45000,
    orderId: "C789",
    image: "https://via.placeholder.com/150",
  };

  const handleSaveChanges = () => {
    if (!reason.trim() || !newMinDays || !newMaxDays) {
      Alert.alert("Error", "Por favor, complete todos los campos.");
      return;
    }

    Alert.alert(
      "Fecha Actualizada",
      `Le notificaremos al cliente las razones por la cual su fecha de envío ha sido cambiada a ${newMinDays}-${newMaxDays} días.`
    );

    setIsEditing(false);
    navigation.goBack(); // Regresa a la pantalla anterior
  };

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Ionicons name="chevron-back" size={28} color="#FF497C" />
        </TouchableOpacity>
        <Text style={styles.title}>Detalle Pendiente</Text>
        <View style={{ width: 30 }} />
      </View>

      {/* Detalles del Pedido (Datos Estáticos) */}
      <View style={styles.detailContainer}>
        <Image source={{ uri: orderData.image }} style={styles.productImage} />
        <Text style={styles.productName}>{orderData.name}</Text>
        <Text style={styles.orderDetail}>Producto: {orderData.item}</Text>
        <Text style={styles.orderDetail}>Cantidad: <Text style={styles.highlight}>{orderData.quantity} unidades</Text></Text>
        <Text style={styles.orderDetail}>Monto Total: <Text style={styles.highlight}>${orderData.totalAmount.toLocaleString("es-CL")}</Text></Text>
        <Text style={styles.orderDetail}>ID del Pedido: {orderData.orderId}</Text>
        <Text style={styles.orderDetail}>Estimado de Entrega: 5 - 7 días</Text>
      </View>

      {/* Edición de Fechas y Razón */}
      {isEditing ? (
        <View style={styles.editContainer}>
          <Text style={styles.label}>Nuevo Estimado de Días:</Text>
          <View style={styles.dateInputContainer}>
            <TextInput
              style={styles.deliveryInput}
              placeholder="Mín."
              keyboardType="numeric"
              value={newMinDays}
              onChangeText={setNewMinDays}
            />
            <Text style={styles.toText}>a</Text>
            <TextInput
              style={styles.deliveryInput}
              placeholder="Máx."
              keyboardType="numeric"
              value={newMaxDays}
              onChangeText={setNewMaxDays}
            />
          </View>

          <Text style={styles.label}>Razón del Cambio:</Text>
          <TextInput
            style={styles.input}
            placeholder="Escriba la razón aquí..."
            value={reason}
            onChangeText={setReason}
            multiline
          />
          <TouchableOpacity style={styles.saveButton} onPress={handleSaveChanges}>
            <Text style={styles.saveButtonText}>Guardar Cambios</Text>
          </TouchableOpacity>
        </View>
      ) : (
        <TouchableOpacity style={styles.editButton} onPress={() => setIsEditing(true)}>
          <Text style={styles.editButtonText}>Editar Fecha de Envío</Text>
        </TouchableOpacity>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FFF",
    padding: 20,
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingTop: Platform.OS === "android" ? StatusBar.currentHeight + 10 : 50,
    paddingBottom: 10,
    borderBottomWidth: 1,
    borderColor: "#EEE",
  },
  title: {
    fontSize: 22,
    fontWeight: "bold",
    color: "#FF497C",
  },
  detailContainer: {
    alignItems: "center",
    marginTop: 20,
  },
  productImage: {
    width: 150,
    height: 150,
    borderRadius: 20,
    marginBottom: 20,
  },
  productName: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#333",
  },
  orderDetail: {
    fontSize: 18,
    color: "#666",
    marginTop: 10,
  },
  highlight: {
    fontWeight: "bold",
    color: "#FF497C",
  },
  editButton: {
    marginTop: 30,
    backgroundColor: "#FF497C",
    padding: 15,
    borderRadius: 20,
    alignItems: "center",
  },
  editButtonText: {
    color: "#FFF",
    fontSize: 18,
    fontWeight: "bold",
  },
  editContainer: {
    marginTop: 30,
    padding: 20,
    borderRadius: 15,
    backgroundColor: "#F8F8F8",
  },
  label: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 10,
    color: "#333",
  },
  dateInputContainer: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 20,
  },
  deliveryInput: {
    borderWidth: 1,
    borderColor: "#FF497C",
    borderRadius: 10,
    padding: 10,
    width: 80,
    textAlign: "center",
  },
  toText: {
    marginHorizontal: 10,
    fontSize: 18,
    color: "#333",
  },
  input: {
    borderWidth: 1,
    borderColor: "#FF497C",
    borderRadius: 10,
    padding: 15,
    marginBottom: 20,
  },
  saveButton: {
    backgroundColor: "#FF497C",
    padding: 15,
    borderRadius: 20,
    alignItems: "center",
  },
  saveButtonText: {
    color: "#FFF",
    fontSize: 18,
    fontWeight: "bold",
  },
});

export default DetallePendiente;
