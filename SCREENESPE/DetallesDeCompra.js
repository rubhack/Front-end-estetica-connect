import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  TouchableOpacity,
  Alert,
  Platform,
  StatusBar,
  ScrollView,
} from "react-native";
import Ionicons from "react-native-vector-icons/Ionicons";

const DetallesDeCompra = ({ route, navigation }) => {
  const { total } = route.params;
  const [form, setForm] = useState({
    nombre: "",
    telefono: "",
    correo: "",
    region: "",
    comuna: "",
    direccion: "",
  });

  // Manejar cambios en los inputs
  const handleInputChange = (field, value) => {
    setForm({ ...form, [field]: value });
  };

  // Validación y confirmación de compra
  const handleConfirmPurchase = () => {
    const { nombre, telefono, correo, region, comuna, direccion } = form;
    if (!nombre || !telefono || !correo || !region || !comuna || !direccion) {
      Alert.alert("Error", "Por favor completa todos los campos.");
      return;
    }

    Alert.alert("Compra Confirmada", `El total es: $${total.toLocaleString("es-CL")}`);
    navigation.navigate("EspecialistaHomeScreen");
  };

  return (
    <ScrollView style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Ionicons name="chevron-back" size={28} color="#FF497C" />
        </TouchableOpacity>
        <Text style={styles.title}>Detalles de Compra</Text>
        <View style={{ width: 28 }} />
      </View>

      {/* Formulario de Envío */}
      <View style={styles.formContainer}>
        <Text style={styles.label}>Nombre Completo</Text>
        <TextInput
          style={styles.input}
          placeholder="Ingresa tu nombre"
          value={form.nombre}
          onChangeText={(value) => handleInputChange("nombre", value)}
        />

        <Text style={styles.label}>Teléfono</Text>
        <TextInput
          style={styles.input}
          placeholder="Ingresa tu teléfono"
          keyboardType="phone-pad"
          value={form.telefono}
          onChangeText={(value) => handleInputChange("telefono", value)}
        />

        <Text style={styles.label}>Correo Electrónico</Text>
        <TextInput
          style={styles.input}
          placeholder="Ingresa tu correo"
          keyboardType="email-address"
          value={form.correo}
          onChangeText={(value) => handleInputChange("correo", value)}
        />

        <Text style={styles.label}>Región</Text>
        <TextInput
          style={styles.input}
          placeholder="Ingresa tu región"
          value={form.region}
          onChangeText={(value) => handleInputChange("region", value)}
        />

        <Text style={styles.label}>Comuna</Text>
        <TextInput
          style={styles.input}
          placeholder="Ingresa tu comuna"
          value={form.comuna}
          onChangeText={(value) => handleInputChange("comuna", value)}
        />

        <Text style={styles.label}>Dirección Detallada</Text>
        <TextInput
          style={styles.input}
          placeholder="Ej: Calle 123, Depto 4"
          value={form.direccion}
          onChangeText={(value) => handleInputChange("direccion", value)}
        />

        {/* Total y Botón de Confirmar */}
        <Text style={styles.totalText}>Total: ${total.toLocaleString("es-CL")}</Text>
        <TouchableOpacity style={styles.confirmButton} onPress={handleConfirmPurchase}>
          <Text style={styles.confirmButtonText}>Confirmar Compra</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
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
    paddingTop: Platform.OS === "android" ? StatusBar.currentHeight + 10 : 44,
    height: Platform.OS === "android" ? 80 : 88,
    borderBottomWidth: 1,
    borderColor: "#EEE",
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#FF497C",
  },
  formContainer: {
    padding: 20,
  },
  label: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#333",
    marginBottom: 5,
  },
  input: {
    borderWidth: 1,
    borderColor: "#FF497C",
    borderRadius: 10,
    padding: 15,
    fontSize: 16,
    marginBottom: 20,
  },
  totalText: {
    fontSize: 20,
    fontWeight: "bold",
    textAlign: "center",
    marginTop: 20,
    color: "#333",
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

export default DetallesDeCompra;
