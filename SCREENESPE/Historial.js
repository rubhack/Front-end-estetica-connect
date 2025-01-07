import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  FlatList,
  Platform,
  StatusBar,
  TouchableOpacity,
} from "react-native";
import Ionicons from "react-native-vector-icons/Ionicons";

// Datos de ejemplo para el historial de compras con empresas
const samplePurchases = [
  {
    id: "1",
    productName: "Crema Anti-edad",
    price: 15000,
    date: "2024-01-10",
    status: "Completado",
    company: "BeautyPro",
  },
  {
    id: "2",
    productName: "Mascarilla Facial",
    price: 8000,
    date: "2024-01-05",
    status: "Completado",
    company: "EstéticaAvanzada",
  },
  {
    id: "3",
    productName: "Serum Facial",
    price: 12000,
    date: "2024-01-01",
    status: "Pendiente",
    company: "CorpoBelleza",
  },
  {
    id: "4",
    productName: "Aceite Corporal",
    price: 10000,
    date: "2023-12-25",
    status: "Completado",
    company: "EliteBody",
  },
  {
    id: "5",
    productName: "Gel Exfoliante",
    price: 7000,
    date: "2023-12-20",
    status: "Pendiente",
    company: "GlamourStyle",
  },
];

const Historial = ({ navigation }) => {
  const [purchases, setPurchases] = useState(samplePurchases);
  const [searchQuery, setSearchQuery] = useState("");

  // Lógica de búsqueda inteligente
  const handleSearch = (query) => {
    setSearchQuery(query);
    const filteredPurchases = samplePurchases.filter(
      (item) =>
        item.productName.toLowerCase().includes(query.toLowerCase()) ||
        item.company.toLowerCase().includes(query.toLowerCase()) ||
        item.status.toLowerCase().includes(query.toLowerCase())
    );
    setPurchases(filteredPurchases);
  };

  const renderPurchaseItem = ({ item }) => (
    <View style={styles.purchaseCard}>
      <View style={styles.purchaseInfo}>
        <Text style={styles.productName}>{item.productName}</Text>
        <Text style={styles.companyText}>Empresa: {item.company}</Text>
        <Text style={styles.dateText}>Fecha: {item.date}</Text>
        <Text style={styles.priceText}>Precio: ${item.price.toLocaleString("es-CL")}</Text>
      </View>
      <Text
        style={[
          styles.statusText,
          item.status === "Completado" ? styles.completed : styles.pending,
        ]}
      >
        {item.status}
      </Text>
    </View>
  );

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Ionicons name="chevron-back" size={28} color="#FF497C" />
        </TouchableOpacity>
        <Text style={styles.title}>Historial de Compras</Text>
        <View style={{ width: 28 }} />
      </View>

      {/* Barra de búsqueda inteligente */}
      <TextInput
        style={styles.searchBar}
        placeholder="Buscar por producto, empresa o estado..."
        value={searchQuery}
        onChangeText={handleSearch}
      />

      {/* Lista de Compras */}
      <FlatList
        data={purchases}
        keyExtractor={(item) => item.id}
        renderItem={renderPurchaseItem}
        contentContainerStyle={styles.purchaseList}
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
    paddingHorizontal: 15,
    paddingVertical: 10,
    paddingTop: Platform.OS === "android" ? StatusBar.currentHeight + 10 : 50,
    borderBottomWidth: 1,
    borderBottomColor: "#EEE",
  },
  title: {
    fontSize: 22,
    fontWeight: "bold",
    color: "#FF497C",
    textAlign: "center",
    flex: 1,
  },
  searchBar: {
    margin: 15,
    padding: 10,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: "#FF497C",
  },
  purchaseList: {
    padding: 15,
  },
  purchaseCard: {
    backgroundColor: "#F5F5F5",
    borderRadius: 15,
    padding: 15,
    marginBottom: 15,
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowRadius: 10,
    shadowOffset: { width: 0, height: 4 },
    elevation: 5,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  purchaseInfo: {
    flex: 1,
  },
  productName: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#333",
  },
  companyText: {
    fontSize: 16,
    fontStyle: "italic",
    color: "#777",
    marginBottom: 5,
  },
  dateText: {
    fontSize: 14,
    color: "#555",
    marginVertical: 5,
  },
  priceText: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#FF497C",
  },
  statusText: {
    fontSize: 16,
    fontWeight: "bold",
  },
  completed: {
    color: "#28A745", // Verde para completado
  },
  pending: {
    color: "#FFC107", // Amarillo para pendiente
  },
});

export default Historial;
