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
} from "react-native";
import Ionicons from "react-native-vector-icons/Ionicons";

// Datos de ejemplo de categorías y empresas con calificación
const sampleCategories = [
  {
    category: "Cuidado Facial",
    companies: [
      { name: "BeautyPro", rating: 4 },
      { name: "EstéticaAvanzada", rating: 5 }
    ]
  },
  {
    category: "Cuidado Corporal",
    companies: [
      { name: "CorpoBelleza", rating: 3 },
      { name: "EliteBody", rating: 4 }
    ]
  },
  {
    category: "Maquillaje",
    companies: [
      { name: "MakeUpWorld", rating: 5 },
      { name: "GlamourStyle", rating: 4 }
    ]
  },
];

const Proveedor = ({ navigation }) => {
  const [searchQuery, setSearchQuery] = useState("");
  const [filteredCategories, setFilteredCategories] = useState(sampleCategories);

  const handleSearch = (query) => {
    setSearchQuery(query);
    const filtered = sampleCategories.filter((item) =>
      item.category.toLowerCase().includes(query.toLowerCase())
    );
    setFilteredCategories(filtered);
  };

  const handleCategorySelect = (company) => {
    navigation.navigate("Compraespe", { companyName: company.name });
  };

  const handleInfoPress = (company) => {
    navigation.navigate("InfoCompany", { companyName: company.name });
  };

  const renderCategory = ({ item }) => (
    <View style={styles.categoryContainer}>
      <Text style={styles.categoryText}>{item.category}</Text>
      {item.companies.map((company, index) => (
        <View key={index} style={styles.companyRow}>
          {/* Botón para seleccionar la empresa */}
          <TouchableOpacity
            style={styles.companyButton}
            onPress={() => handleCategorySelect(company)}
          >
            <Text style={styles.companyText}>{company.name}</Text>
          </TouchableOpacity>

          {/* Mostrar calificación con estrella */}
          <Text style={styles.ratingText}>{company.rating} ⭐</Text>

          {/* Icono de información con navegación a InfoCompany */}
          <TouchableOpacity onPress={() => handleInfoPress(company)}>
            <Ionicons name="help-circle-outline" size={28} color="#FF497C" />
          </TouchableOpacity>
        </View>
      ))}
    </View>
  );

  return (
    <View style={styles.container}>
      {/* Header con título centrado */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Ionicons name="chevron-back" size={28} color="#FF497C" />
        </TouchableOpacity>
        <Text style={styles.title}>Proveedores</Text>
        <View style={styles.iconContainer}>
          <TouchableOpacity onPress={() => navigation.navigate("Historial")}>
            <Ionicons name="time-outline" size={28} color="#FF497C" />
          </TouchableOpacity>
        </View>
      </View>

      {/* Barra de Búsqueda */}
      <TextInput
        style={styles.searchBar}
        placeholder="Buscar categoría..."
        value={searchQuery}
        onChangeText={handleSearch}
      />

      {/* Lista de Categorías */}
      <FlatList
        data={filteredCategories}
        keyExtractor={(item) => item.category}
        renderItem={renderCategory}
      />
      
      {/* Footer Fijo al Fondo */}
        <View style={styles.navBar}>
                      <TouchableOpacity onPress={() => navigation.navigate("EspecialistaHomeScreen")}>
                          <Ionicons name="home-outline" size={28} color="#FFF" />
                      </TouchableOpacity>
                      <TouchableOpacity onPress={() => navigation.navigate("Estadisticaespe")}>
                          <Ionicons name="stats-chart-outline" size={28} color="#FFF" />
                      </TouchableOpacity>
                      <TouchableOpacity onPress={() => navigation.navigate("Calendarespe")}>
                          <Ionicons name="calendar-outline" size={28} color="#FFF" />
                      </TouchableOpacity>
                      <TouchableOpacity onPress={() => navigation.navigate("Proveedor")}>
                          <Ionicons name="cart-outline" size={28} color="#FFF" />
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
    alignItems: "center",
    paddingHorizontal: 15,
    paddingVertical: 10,
    paddingTop: Platform.OS === "android" ? StatusBar.currentHeight + 10 : 50,
    borderBottomWidth: 1,
    borderBottomColor: "#EEE",
  },
  title: {
    flex: 1,
    fontSize: 20,
    fontWeight: "bold",
    color: "#FF497C",
    textAlign: "center",
  },
  iconContainer: {
    flexDirection: "row",
  },
  searchBar: {
    margin: 15,
    padding: 10,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: "#FF497C",
  },
  categoryContainer: {
    padding: 15,
    borderBottomWidth: 1,
    borderColor: "#EEE",
  },
  categoryText: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#333",
  },
  companyRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginVertical: 10,
  },
  companyButton: {
    flex: 1,
    padding: 10,
    borderRadius: 10,
    backgroundColor: "#FF497C",
    alignItems: "center",
  },
  companyText: {
    color: "#FFF",
    fontWeight: "bold",
  },
  ratingText: {
    fontSize: 18,
    color: "#333",
    marginHorizontal: 10,
  },
  navBar: {
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center",
    paddingVertical: 10,
    backgroundColor: "#FF497C",
    borderRadius: 30,
    marginHorizontal: 10,
    marginBottom: 10,
  },
});

export default Proveedor;
