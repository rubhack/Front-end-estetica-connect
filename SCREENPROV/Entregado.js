import React from "react";
import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  Platform,
  StatusBar,
} from "react-native";
import Ionicons from "react-native-vector-icons/Ionicons";

const Entregado = ({ route, navigation }) => {
  const { specialist = {} } = route.params || {};

  return (
    <View style={styles.container}>
      {/* Header con botón de volver */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Ionicons name="chevron-back" size={28} color="#FF497C" />
        </TouchableOpacity>
        <Text style={styles.title}>Pedido Entregado</Text>
        <View style={{ width: 28 }} />
      </View>

      {/* Imagen del especialista */}
      <View style={styles.imageContainer}>
        <Image
          source={{ uri: specialist.image || "https://via.placeholder.com/150" }}
          style={styles.specialistImage}
        />
      </View>

      {/* Información del especialista y pedido */}
      <Text style={styles.specialistName}>{specialist.name || "Nombre no disponible"}</Text>
      <Text style={styles.conditionText}>Pedido: {specialist.condition || "Sin información"}</Text>

      {/* Detalles del pedido */}
      <View style={styles.infoContainer}>
        <Text style={styles.infoText}>Número de Teléfono: {specialist.phoneNumber || "N/A"}</Text>
        <Text style={styles.infoText}>Dirección: {specialist.address || "N/A"}</Text>
        <Text style={styles.infoText}>Número de Pedido: {specialist.orderNumber || "N/A"}</Text>
        <Text style={styles.infoText}>Cantidad Comprada: {specialist.quantity || "3 unidades"}</Text>
        <Text style={styles.infoText}>Monto Total: {specialist.totalAmount || "$45.000 CLP"}</Text>
      </View>

      {/* Comentario del Cliente */}
      <View style={styles.commentContainer}>
        <Text style={styles.commentTitle}>Comentario del Cliente:</Text>
        <Text style={styles.commentText}>
          {specialist.comment || "El cliente no dejó comentarios."}
        </Text>
      </View>

      {/* Botón para regresar */}
      <TouchableOpacity style={styles.confirmButton} onPress={() => navigation.goBack()}>
        <Text style={styles.confirmButtonText}>Listo</Text>
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
  commentContainer: {
    marginTop: 20,
    padding: 15,
    borderRadius: 10,
    backgroundColor: "#FFF3F6",
    borderWidth: 1,
    borderColor: "#FF497C",
  },
  commentTitle: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#FF497C",
    marginBottom: 10,
  },
  commentText: {
    fontSize: 16,
    color: "#333",
    fontStyle: "italic",
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

export default Entregado;
