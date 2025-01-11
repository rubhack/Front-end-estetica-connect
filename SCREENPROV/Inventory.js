import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  Image,
  TouchableOpacity,
  Platform,
  StatusBar,
  TextInput,
  Dimensions,
} from "react-native";
import Ionicons from "react-native-vector-icons/Ionicons";

// Obtenemos el ancho de la pantalla para calcular el ancho de las cards
const windowWidth = Dimensions.get('window').width;
const cardWidth = (windowWidth - 40) / 2;

const sampleInventory = [
  {
    id: "A123",
    name: "Crema Anti-edad",
    price: 15000,
    quantity: 20,
    image: "https://aldiaargentina.microjuris.com/wp-content/uploads/2013/12/remedios.jpg",
  },
  {
    id: "B456",
    name: "Mascarilla Facial",
    price: 8000,
    quantity: 9,
    image: "https://res.cloudinary.com/wpchile/image/upload/f_auto,q_auto,w_200/easyfarma/woo_product/26662/100000.jpg",
  },
  {
    id: "C789",
    name: "Serum Facial",
    price: 12000,
    quantity: 5,
    image: "https://www.cofatuc.org.ar/sec_nov/deco_enfermedades_cronicas_medicamentos_truchos.jpg",
  },
  {
    id: "D101",
    name: "Aceite Corporal",
    price: 10000,
    quantity: 30,
    image: "https://www.farmaciamoreo.com/2960-home_default/angileptol-30-comprimidos-para-chupar-sabor-miel-limon.jpg",
  },
];

const Inventory = ({ navigation }) => {
  const [products, setProducts] = useState(sampleInventory);
  const [searchQuery, setSearchQuery] = useState("");
  const [filter, setFilter] = useState("Todos");

  const filteredProducts = products.filter((product) => {
    const matchesSearch =
      product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      product.id.toLowerCase().includes(searchQuery.toLowerCase());

    const matchesFilter =
      filter === "Todos" ||
      (filter === "Alta Disponibilidad" && product.quantity > 20) ||
      (filter === "Media Disponibilidad" && product.quantity <= 20 && product.quantity >= 10) ||
      (filter === "Baja Disponibilidad" && product.quantity < 10);

    return matchesSearch && matchesFilter;
  });

  const renderProductItem = ({ item }) => (
    <View style={styles.productCard}>
      <Image source={{ uri: item.image }} style={styles.productImage} />
      <Text style={styles.productName}>{item.name}</Text>
      <Text style={styles.productPrice}>${item.price.toLocaleString("es-CL")}</Text>
      <Text style={styles.productId}>ID: {item.id}</Text>
      <Text
        style={[
          styles.productQuantity,
          item.quantity < 10 ? styles.lowStock : styles.inStock,
        ]}
      >
        {item.quantity < 10
          ? `⚠️ Poco disponible: ${item.quantity}`
          : `Cantidad disponible: ${item.quantity}`}
      </Text>
      <TouchableOpacity
        style={styles.editButton}
        onPress={() => navigation.navigate("EditProduct", { product: item })}
      >
        <Text style={styles.editButtonText}>Editar Producto</Text>
      </TouchableOpacity>
    </View>
  );

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Ionicons name="chevron-back" size={28} color="#FF497C" />
        </TouchableOpacity>
        <Text style={styles.title}>Inventario</Text>
        <View style={{ width: 30 }} />
      </View>

      {/* Buscador Inteligente */}
      <TextInput
        style={styles.searchBar}
        placeholder="Buscar producto por nombre o ID..."
        value={searchQuery}
        onChangeText={setSearchQuery}
      />

      {/* Filtros de Cantidad */}
      <View style={styles.filterContainer}>
        {["Todos", "Alta Disponibilidad", "Media Disponibilidad", "Baja Disponibilidad"].map(
          (option) => (
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
          )
        )}
      </View>

      {/* Contador de Productos Encontrados */}
      <Text style={styles.counterText}>
        Productos encontrados: {filteredProducts.length}
      </Text>

      {/* Lista de Productos */}
      <FlatList
        data={filteredProducts}
        keyExtractor={(item) => item.id}
        renderItem={renderProductItem}
        numColumns={2}
        contentContainerStyle={styles.productList}
        columnWrapperStyle={styles.columnWrapper}
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
    paddingHorizontal: 15,
    paddingTop: Platform.OS === "android" ? StatusBar.currentHeight + 10 : 50,
    paddingBottom: 10,
    borderBottomWidth: 1,
    borderColor: "#EEE",
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#FF497C",
  },
  searchBar: {
    marginHorizontal: 15,
    marginTop: 10,
    padding: 10,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: "#FF497C",
    fontSize: 16,
  },
  counterText: {
    fontSize: 16,
    color: "#333",
    marginHorizontal: 15,
    marginTop: 10,
    fontWeight: "bold",
  },
  filterContainer: {
    flexDirection: "row",
    justifyContent: "center",
    marginVertical: 10,
    flexWrap: "wrap",
  },
  filterButton: {
    paddingVertical: 8,
    paddingHorizontal: 15,
    borderRadius: 20,
    backgroundColor: "#EEE",
    marginHorizontal: 5,
    marginVertical: 5,
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
  productList: {
    padding: 15,
  },
  columnWrapper: {
    justifyContent: 'space-between',
  },
  productCard: {
    backgroundColor: "#FFF",
    borderRadius: 15,
    padding: 10,
    marginBottom: 15,
    alignItems: "center",
    width: cardWidth,
    borderWidth: 1,
    borderColor: "#EEE",
    elevation: 3,
  },
  productImage: {
    width: cardWidth - 20,
    height: cardWidth - 20,
    borderRadius: 10,
    marginBottom: 10,
    resizeMode: 'cover',
  },
  productName: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#333",
    textAlign: 'center',
    marginTop: 5,
  },
  productPrice: {
    fontSize: 16,
    color: "#777",
    marginVertical: 5,
  },
  productId: {
    fontSize: 14,
    color: "#666",
    marginBottom: 5,
  },
  productQuantity: {
    fontSize: 14,
    fontWeight: "bold",
    marginBottom: 10,
    textAlign: 'center',
  },
  editButton: {
    backgroundColor: "#FF497C",
    paddingVertical: 8,
    paddingHorizontal: 15,
    borderRadius: 15,
    marginTop: 5,
  },
  editButtonText: {
    color: "#FFF",
    fontWeight: "bold",
    fontSize: 14,
  },
  inStock: {
    color: "#4CAF50",
  },
  lowStock: {
    color: "#FF0000",
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

export default Inventory;