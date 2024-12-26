import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  TouchableOpacity,
} from "react-native";
import Ionicons from "react-native-vector-icons/Ionicons";

// Datos de ejemplo de notificaciones
const sampleNotifications = [
  {
    id: 1,
    title: "Cita Programada",
    description: "Tu cita con el especialista ha sido programada exitosamente.",
    time: "2M",
    date: "Hoy",
    icon: "calendar-outline",
    read: false,
  },
  {
    id: 2,
    title: "Cambio en la Cita",
    description: "Tu cita ha sido modificada. Revisa los nuevos detalles.",
    time: "2H",
    date: "Hoy",
    icon: "swap-horizontal-outline",
    read: false,
  },
  {
    id: 3,
    title: "Notas Médicas",
    description: "Se han actualizado tus notas médicas.",
    time: "3H",
    date: "Hoy",
    icon: "document-text-outline",
    read: false,
  },
  {
    id: 4,
    title: "Cita Programada",
    description: "Tu cita con el especialista ha sido confirmada.",
    time: "1D",
    date: "Ayer",
    icon: "calendar-outline",
    read: false,
  },
  {
    id: 5,
    title: "Actualización del Historial Médico",
    description: "Se han actualizado los datos de tu historial médico.",
    time: "5D",
    date: "15 de Abril",
    icon: "document-outline",
    read: false,
  },
];

const NotificationPatientScreen = ({ navigation }) => {
  const [notifications, setNotifications] = useState(sampleNotifications);

  // Función para marcar todas las notificaciones como leídas
  const markAllAsRead = () => {
    const updatedNotifications = notifications.map((notification) => ({
      ...notification,
      read: true,
    }));
    setNotifications(updatedNotifications);
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
      </View>
      <Text style={styles.notificationTime}>{item.time}</Text>
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
        <TouchableOpacity>
          <View style={styles.newsBadge}>
            <Text style={styles.newsBadgeText}>Nuevas</Text>
          </View>
        </TouchableOpacity>
      </View>

      {/* Opciones para "Hoy", "Ayer", etc. */}
      <View style={styles.dateFilters}>
        <Text style={styles.filterText}>Hoy</Text>
        <TouchableOpacity onPress={markAllAsRead}>
          <Text style={styles.markAllText}>Marcar todas</Text>
        </TouchableOpacity>
      </View>

      {/* Lista de notificaciones */}
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
    backgroundColor: "#FFF",
    borderBottomWidth: 1,
    borderBottomColor: "#EEE",
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#FF497C",
  },
  newsBadge: {
    backgroundColor: "#FF497C",
    borderRadius: 15,
    paddingHorizontal: 10,
    paddingVertical: 5,
  },
  newsBadgeText: {
    color: "#FFF",
    fontSize: 12,
  },
  dateFilters: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 20,
    paddingVertical: 10,
    backgroundColor: "#F7F7F7",
  },
  filterText: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#FF497C",
  },
  markAllText: {
    fontSize: 14,
    color: "#FF497C",
    textDecorationLine: "underline",
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
    backgroundColor: "#FFF",
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
    fontSize: 16,
    fontWeight: "bold",
    color: "#333",
  },
  notificationDescription: {
    fontSize: 14,
    color: "#777",
    marginTop: 5,
  },
  notificationTime: {
    fontSize: 12,
    color: "#999",
    marginLeft: 10,
  },
});

export default NotificationPatientScreen;
