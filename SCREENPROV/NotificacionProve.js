import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  TouchableOpacity,
} from "react-native";
import Ionicons from "react-native-vector-icons/Ionicons";

// Datos de ejemplo de notificaciones para el proveedor
const sampleNotifications = [
  {
    id: 1,
    title: "Nuevo Pedido Realizado",
    description: "Un especialista ha realizado un nuevo pedido.",
    time: "2M",
    date: "Hoy",
    icon: "cart-outline",
    read: false,
  },
  {
    id: 2,
    title: "Pedido Pendiente de Envío",
    description: "Recuerda que tienes un pedido pendiente de envío.",
    time: "2H",
    date: "Hoy",
    icon: "time-outline",
    read: false,
  },
  {
    id: 3,
    title: "Pedido Entregado",
    description: "El pedido #A123 ha sido entregado exitosamente.",
    time: "3H",
    date: "Hoy",
    icon: "checkmark-circle-outline",
    read: true,
  },
  {
    id: 4,
    title: "Producto Agotado",
    description: "El producto 'Serum Facial' se encuentra con bajo stock.",
    time: "1D",
    date: "Ayer",
    icon: "alert-circle-outline",
    read: false,
  },
];

const NotificacionProve = ({ navigation }) => {
  const [notifications, setNotifications] = useState(sampleNotifications);
  const [filter, setFilter] = useState("Hoy");

  // Función para filtrar notificaciones por rango de tiempo
  const filteredNotifications = notifications.filter((notification) => {
    if (filter === "Hoy") return notification.date === "Hoy";
    if (filter === "1 Semana") return notification.date !== "Hoy"; 
    if (filter === "1 Mes") return true; 
    return true;
  });

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
        <Text style={styles.title}>Notificaciones Proveedor</Text>
        <TouchableOpacity onPress={markAllAsRead}>
          <Ionicons name="checkmark-done-outline" size={28} color="#FF497C" />
        </TouchableOpacity>
      </View>

      {/* Filtro Actualizado con Selección de Hoy, 1 Semana y 1 Mes */}
      <View style={styles.filterContainer}>
        {["Hoy", "1 Semana", "1 Mes"].map((option) => (
          <TouchableOpacity
            key={option}
            style={[
              styles.filterButton,
              filter === option && styles.activeFilterButton,
            ]}
            onPress={() => setFilter(option)}
          >
            <Text
              style={[
                styles.filterText,
                filter === option && styles.activeFilterText,
              ]}
            >
              {option}
            </Text>
          </TouchableOpacity>
        ))}
      </View>

      {/* Lista de Notificaciones Filtradas */}
      <FlatList
        data={filteredNotifications}
        keyExtractor={(item) => item.id.toString()}
        renderItem={renderNotification}
        contentContainerStyle={styles.listContainer}
      />

      {/* Footer */}
      <View style={styles.navBar}>
        <TouchableOpacity onPress={() => navigation.navigate("ProveedorHomeScreen")}>
          <Ionicons name="home-outline" size={28} color="#FFF" />
        </TouchableOpacity>
        <TouchableOpacity onPress={() => navigation.navigate("Inventory")}>
          <Ionicons name="cube-outline" size={28} color="#FFF" />
        </TouchableOpacity>
        <TouchableOpacity onPress={() => navigation.navigate("AddProduct")}>
          <Ionicons name="add-outline" size={28} color="#FFF" />
        </TouchableOpacity>
        <TouchableOpacity onPress={() => navigation.navigate("Pedidos")}>
          <Ionicons name="clipboard-outline" size={28} color="#FFF" />
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
  filterContainer: {
    flexDirection: "row",
    justifyContent: "center",
    marginVertical: 10,
  },
  filterButton: {
    paddingVertical: 8,
    paddingHorizontal: 15,
    borderRadius: 20,
    backgroundColor: "#EEE",
    marginHorizontal: 5,
  },
  activeFilterButton: {
    backgroundColor: "#FF497C",
  },
  filterText: {
    fontSize: 14,
    color: "#333",
  },
  activeFilterText: {
    color: "#FFF",
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
  navBar: {
    flexDirection: "row",
    justifyContent: "space-around",
    paddingVertical: 10,
    backgroundColor: "#FF497C",
    borderRadius: 30,
    marginHorizontal: 10,
    marginBottom: 10,
  },
});

export default NotificacionProve;
