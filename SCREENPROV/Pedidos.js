import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  TouchableOpacity,
  FlatList,
  Platform,
  StatusBar,
  ScrollView,
} from "react-native";
import Ionicons from "react-native-vector-icons/Ionicons";

const sampleOrders = {
  Nuevos: [
    { id: 1, name: "Dr. Ana López", item: "Serum Facial", orderId: "A123" },
    { id: 2, name: "Dr. Carlos Pérez", item: "Aceite Corporal", orderId: "B456" },
  ],
  Pendientes: [
    { id: 3, name: "Dr. María González", item: "Mascarilla Facial", orderId: "C789" },
  ],
  Entregados: [
    { id: 4, name: "Dr. Pedro Ramírez", item: "Crema Hidratante", orderId: "D101" },
  ],
  "No Entregados": [
    { id: 5, name: "Dr. Elena Castro", item: "Kit Facial", orderId: "E111" },
  ],
};

const Pedidos = ({ navigation }) => {
  const [activeTab, setActiveTab] = useState("Nuevos");
  const [searchQuery, setSearchQuery] = useState("");
  const [filteredOrders, setFilteredOrders] = useState(sampleOrders[activeTab]);

  const handleSearch = (query) => {
    setSearchQuery(query);
    const filtered = sampleOrders[activeTab].filter(
      (order) =>
        order.name.toLowerCase().includes(query.toLowerCase()) ||
        order.orderId.includes(query)
    );
    setFilteredOrders(filtered);
  };

  const handleTabChange = (tab) => {
    setActiveTab(tab);
    setFilteredOrders(sampleOrders[tab]);
    setSearchQuery("");
  };

  const handleDetailNavigation = (order) => {
    if (activeTab === "Nuevos") {
      navigation.navigate("AgendarPedido", { order });
    } else if (activeTab === "Pendientes") {
      navigation.navigate("DetallePendiente", { order });
    } else if (activeTab === "Entregados") {
      navigation.navigate("Entregado", { order });
    } else if (activeTab === "No Entregados") {
      navigation.navigate("NoEntregado", { order });
    }
  };

  const renderOrderItem = ({ item }) => (
    <View style={styles.orderCard}>
      <View style={styles.orderInfo}>
        <Text style={styles.orderText}>👨‍⚕️ {item.name}</Text>
        <Text style={styles.orderText}>🛍️ {item.item}</Text>
        <Text style={styles.orderText}>📦 ID: {item.orderId}</Text>
      </View>
      <TouchableOpacity
        style={styles.detailButton}
        onPress={() => handleDetailNavigation(item)}
      >
        <Text style={styles.detailButtonText}>Ver Detalles</Text>
      </TouchableOpacity>
    </View>
  );

  return (
    <View style={styles.container}>
      {/* Header con ícono de estadísticas agregado */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Ionicons name="chevron-back" size={28} color="#FF497C" />
        </TouchableOpacity>
        <Text style={styles.title}>Pedidos</Text>
        <TouchableOpacity onPress={() => navigation.navigate("EstadisticaProve")}>
          <Ionicons name="stats-chart-outline" size={28} color="#FF497C" />
        </TouchableOpacity>
      </View>

      {/* Tabs Container */}
      <View style={styles.tabsWrapper}>
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.tabsContainer}
        >
          {["Nuevos", "Pendientes", "Entregados", "No Entregados"].map((tab) => (
            <TouchableOpacity
              key={tab}
              style={[styles.tabButton, activeTab === tab && styles.activeTab]}
              onPress={() => handleTabChange(tab)}
            >
              <Text
                style={[styles.tabText, activeTab === tab && styles.activeTabText]}
              >
                {tab}
              </Text>
            </TouchableOpacity>
          ))}
        </ScrollView>
      </View>

      {/* Búsqueda */}
      <TextInput
        style={styles.searchBar}
        placeholder="Buscar por nombre o ID..."
        value={searchQuery}
        onChangeText={handleSearch}
      />

      {/* Lista de pedidos */}
      <FlatList
        data={filteredOrders}
        keyExtractor={(item) => item.id.toString()}
        renderItem={renderOrderItem}
        style={styles.orderList}
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
    paddingTop: Platform.OS === "android" ? StatusBar.currentHeight + 10 : 50,
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 15,
    paddingBottom: 10,
    borderBottomWidth: 1,
    borderColor: "#EEE",
  },
  title: {
    fontSize: 22,
    fontWeight: "bold",
    color: "#FF497C",
  },
  tabsWrapper: {
    height: 60,
    marginTop: 20,
  },
  tabsContainer: {
    flexDirection: "row",
    paddingHorizontal: 15,
  },
  tabButton: {
    height: 40,
    paddingHorizontal: 20,
    borderRadius: 20,
    backgroundColor: "#EEE",
    marginRight: 10,
    justifyContent: "center",
    alignItems: "center",
  },
  activeTab: {
    backgroundColor: "#FF497C",
  },
  tabText: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#333",
  },
  activeTabText: {
    color: "#FFF",
  },
  searchBar: {
    marginTop: 20,
    marginHorizontal: 15,
    padding: 10,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: "#FF497C",
  },
  orderList: {
    marginTop: 20,
    paddingHorizontal: 15,
  },
  orderCard: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    backgroundColor: "#F5F5F5",
    padding: 15,
    borderRadius: 10,
    marginBottom: 10,
    borderWidth: 1,
    borderColor: "#FF497C",
  },
  orderInfo: {
    flex: 1,
  },
  orderText: {
    fontSize: 16,
    marginBottom: 5,
  },
  detailButton: {
    backgroundColor: "#FF497C",
    padding: 10,
    borderRadius: 10,
  },
  detailButtonText: {
    color: "#FFF",
    fontWeight: "bold",
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

export default Pedidos;
