import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  TouchableOpacity,
  Alert,
} from "react-native";
import Ionicons from "react-native-vector-icons/Ionicons";

// Datos de ejemplo con estimado de entrega e iconos para todas las notificaciones
const sampleNotifications = [
  {
    id: 1,
    title: "Producto Enviado",
    description: "Tu pedido 'Crema Anti-edad' ha sido enviado.",
    estimatedDays: "2-4 días",
    icon: "cube-outline",
    read: false,
    status: "Enviado",
  },
  {
    id: 2,
    title: "Producto Enviado",
    description: "Tu pedido 'Aceite Corporal' ha sido enviado.",
    estimatedDays: "3-5 días",
    icon: "cube-outline",
    read: false,
    status: "Enviado",
  },
  {
    id: 3,
    title: "Cita Confirmada",
    description: "Tu cita con el especialista ha sido confirmada.",
    icon: "calendar-outline",
    estimatedDays: null,
    read: false,
    status: "Confirmada",
  },
  {
    id: 4,
    title: "Actualización del Historial Médico",
    description: "Se han actualizado tus notas médicas.",
    icon: "document-text-outline",
    estimatedDays: null,
    read: false,
    status: "Actualizado",
  },
];

const notificacionespe = ({ navigation }) => {
  const [notifications, setNotifications] = useState(sampleNotifications);

  // Marcar todas como leídas
  const markAllAsRead = () => {
    const updatedNotifications = notifications.map((notification) => ({
      ...notification,
      read: true,
    }));
    setNotifications(updatedNotifications);
    Alert.alert("¡Todas las notificaciones han sido marcadas como leídas!");
  };

  // Navegar a FormularioSatisfaccion al marcar recibido
  const handleReceived = (id) => {
    const updatedNotifications = notifications.map((notification) =>
      notification.id === id
        ? { ...notification, status: "Finalizada", read: true }
        : notification
    );
    setNotifications(updatedNotifications);
    navigation.navigate("FormularioSatisfaccion", { orderId: id });
  };

  // Navegar a FormularioSatisfaccion al marcar no recibido
  const handleNotReceived = (id) => {
    const updatedNotifications = notifications.map((notification) =>
      notification.id === id
        ? { ...notification, status: "Reclamo enviado", read: true }
        : notification
    );
    setNotifications(updatedNotifications);
    navigation.navigate("FormularioSatisfaccion", { orderId: id });
  };

  // Renderizar cada notificación
  const renderNotification = ({ item }) => (
    <View
      style={[
        styles.notificationCard,
        item.read && styles.notificationCardRead,
      ]}
    >
      <View style={styles.iconContainer}>
        <Ionicons name={item.icon} size={24} color={item.read ? "#FF497C" : "#FFF"} />
      </View>

      <View style={styles.notificationContent}>
        <Text style={styles.notificationTitle}>{item.title}</Text>
        <Text style={styles.notificationDescription}>{item.description}</Text>
        {item.estimatedDays && (
          <Text style={styles.estimatedText}>
            Tiempo estimado: {item.estimatedDays}
          </Text>
        )}
        <Text style={styles.statusText}>Estado: {item.status}</Text>

        {/* Botones Recibido/No Recibido solo si el estado es Enviado */}
        {item.title.includes("Producto Enviado") && item.status === "Enviado" && (
          <View style={styles.buttonContainer}>
            <TouchableOpacity
              style={styles.receivedButton}
              onPress={() => handleReceived(item.id)}
            >
              <Text style={styles.buttonText}>Recibido</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.notReceivedButton}
              onPress={() => handleNotReceived(item.id)}
            >
              <Text style={styles.buttonText}>No Recibido</Text>
            </TouchableOpacity>
          </View>
        )}
      </View>
    </View>
  );

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Ionicons name="chevron-back" size={28} color="#FF497C" />
        </TouchableOpacity>
        <Text style={styles.title}>Notificaciones</Text>
        <Ionicons name="notifications-outline" size={28} color="#FF497C" />
      </View>

      {/* Botón Marcar Todas Debajo del Header */}
      <TouchableOpacity style={styles.markAllButton} onPress={markAllAsRead}>
        <Text style={styles.markAllText}>Marcar todas como leídas</Text>
      </TouchableOpacity>

      {/* Lista de Notificaciones */}
      <FlatList
        data={notifications}
        keyExtractor={(item) => item.id.toString()}
        renderItem={renderNotification}
        contentContainerStyle={styles.listContainer}
      />
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
    paddingHorizontal: 20,
    paddingTop: 50,
    paddingBottom: 20,
    borderBottomWidth: 1,
    borderBottomColor: "#EEE",
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#FF497C",
  },
  markAllButton: {
    backgroundColor: "#FF497C",
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 20,
    alignItems: "center",
    margin: 15,
  },
  markAllText: {
    fontSize: 16,
    color: "#FFF",
    fontWeight: "bold",
  },
  listContainer: {
    paddingHorizontal: 20,
    paddingTop: 10,
  },
  notificationCard: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#F7F7F7",
    padding: 15,
    marginBottom: 10,
    borderRadius: 10,
  },
  notificationCardRead: {
    backgroundColor: "#EAEAEA",
  },
  iconContainer: {
    backgroundColor: "#FF497C",
    borderRadius: 25,
    width: 40,
    height: 40,
    justifyContent: "center",
    alignItems: "center",
    marginRight: 15,
  },
  notificationContent: {
    flex: 1,
  },
  notificationTitle: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#333",
  },
  notificationDescription: {
    fontSize: 14,
    color: "#777",
    marginTop: 5,
  },
  estimatedText: {
    fontSize: 14,
    color: "#FF497C",
    marginTop: 5,
  },
  statusText: {
    fontSize: 14,
    fontWeight: "bold",
    marginTop: 5,
    color: "#333",
  },
  buttonContainer: {
    flexDirection: "row",
    marginTop: 10,
    justifyContent: "space-around",
  },
  receivedButton: {
    backgroundColor: "#4CAF50",
    padding: 10,
    borderRadius: 10,
    flex: 1,
    marginHorizontal: 5,
    alignItems: "center",
  },
  notReceivedButton: {
    backgroundColor: "#FF497C",
    padding: 10,
    borderRadius: 10,
    flex: 1,
    marginHorizontal: 5,
    alignItems: "center",
  },
  buttonText: {
    color: "#FFF",
    fontWeight: "bold",
  },
});

export default notificacionespe;
