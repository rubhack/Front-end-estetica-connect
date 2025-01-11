import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  TouchableOpacity,
  FlatList,
  Image,
  Platform,
  StatusBar,
} from "react-native";
import Ionicons from "react-native-vector-icons/Ionicons";

const sampleProducts = [
  {
    id: "1",
    name: "Crema Anti-edad",
    price: 15000,
    image: "https://deutschepharma.cl/wp-content/uploads/2023/06/crema-hidratante_para_cuerpo_pierl_normal_ureacer-min.jpg",
  },
  {
    id: "2",
    name: "Mascarilla Facial",
    price: 8000,
    image: "https://cyzone.cyzone.com/wp-content/uploads/2020/10/Grafica2-Tips-Mascarilla-de-tela.jpg",
  },
  {
    id: "3",
    name: "Serum Facial",
    price: 12000,
    image: "https://trends.lbel.com/cl/wp-content/uploads/sites/4/2024/06/MicrosoftTeams-image-23_1787402_3051980.png",
  },
  {
    id: "4",
    name: "Aceite Corporal",
    price: 10000,
    image: "https://dbs.cl/media/catalog/product/o/r/organic-osh-14255-1.jpg?optimize=low&bg-color=255,255,255&fit=bounds&height=&width=",
  },
  {
    id: "5",
    name: "Gel Exfoliante",
    price: 7000,
    image: "https://img.buzzfeed.com/buzzfeed-static/static/2021-05/24/18/asset/c1322ae3bccd/sub-buzz-6101-1621879390-19.png?downsize=900:*&output-format=auto&output-quality=auto",
  },
];

const ProductImage = ({ uri }) => {
  const [hasError, setHasError] = useState(false);
  
  return (
    <Image
      source={{ 
        uri: hasError ? 'https://picsum.photos/200' : uri,
      }}
      style={styles.productImage}
      onError={() => setHasError(true)}
    />
  );
};

const Compraespe = ({ route, navigation }) => {
  const { companyName } = route.params || { companyName: "Proveedor" }; 
  const [searchQuery, setSearchQuery] = useState("");
  const [filteredProducts, setFilteredProducts] = useState(sampleProducts);
  const [cartCount, setCartCount] = useState(0);

  // Buscar productos por nombre
  const handleSearch = (query) => {
    setSearchQuery(query);
    const filtered = sampleProducts.filter((product) =>
      product.name.toLowerCase().includes(query.toLowerCase())
    );
    setFilteredProducts(filtered);
  };

  // Agregar producto al carrito
  const handleAddToCart = () => {
    setCartCount(cartCount + 1);
  };

  // Renderizar cada producto
  const renderProductItem = ({ item }) => (
    <View style={styles.productCard}>
      <ProductImage uri={item.image} />
      <Text style={styles.productName}>{item.name}</Text>
      <Text style={styles.productPrice}>${item.price.toLocaleString("es-CL")}</Text>
      <TouchableOpacity
        style={styles.addButton}
        onPress={handleAddToCart}
      >
        <Text style={styles.addButtonText}>Agregar</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.detailLink}
        onPress={() => navigation.navigate("MasDetalle", { product: item })}
      >
        <Text style={styles.detailLinkText}>Más Detalle</Text>
      </TouchableOpacity>
    </View>
  );

  return (
    <View style={styles.container}>
      {/* Header con carrito de compras y contador */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Ionicons name="chevron-back" size={28} color="#FF497C" />
        </TouchableOpacity>
        <Text style={styles.title}>{companyName}</Text>
        <TouchableOpacity onPress={() => navigation.navigate("CarritoDeCompra")}>
          <Ionicons name="cart-outline" size={28} color="#FF497C" />
          {cartCount > 0 && (
            <View style={styles.cartBadge}>
              <Text style={styles.cartBadgeText}>{cartCount}</Text>
            </View>
          )}
        </TouchableOpacity>
      </View>

      {/* Barra de búsqueda */}
      <TextInput
        style={styles.searchBar}
        placeholder="Buscar producto..."
        value={searchQuery}
        onChangeText={handleSearch}
      />

      {/* Mostrar cantidad de productos */}
      <Text style={styles.productCount}>Productos encontrados: {filteredProducts.length}</Text>

      {/* Lista de productos */}
      <FlatList
        data={filteredProducts}
        keyExtractor={(item) => item.id}
        renderItem={renderProductItem}
        numColumns={2}
        contentContainerStyle={styles.productList}
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
    fontSize: 20,
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
  productCount: {
    paddingHorizontal: 15,
    fontSize: 16,
    color: "#333",
    marginBottom: 10,
  },
  productList: {
    padding: 8,
  },
  productCard: {
    flex: 1,
    backgroundColor: "#F5F5F5",
    borderRadius: 15,
    padding: 10,
    margin: 8,
    alignItems: "center",
    justifyContent: "space-between",
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowRadius: 10,
    shadowOffset: { width: 0, height: 4 },
    elevation: 5,
    minWidth: '45%',
  },
  productImage: {
    width: '100%',
    height: 180,
    marginBottom: 10,
    borderRadius: 10,
    backgroundColor: '#f0f0f0',
    resizeMode: 'cover',
  },
  productName: {
    fontSize: 16,
    fontWeight: "bold",
    textAlign: "center",
    color: "#333",
    marginTop: 5,
  },
  productPrice: {
    fontSize: 14,
    color: "#666",
    marginVertical: 5,
  },
  addButton: {
    backgroundColor: "#FF497C",
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 10,
    marginTop: 8,
    width: '90%',
  },
  addButtonText: {
    color: "#FFF",
    fontWeight: "bold",
    textAlign: 'center',
  },
  detailLink: {
    marginTop: 5,
  },
  detailLinkText: {
    color: "#FF497C",
    textDecorationLine: "underline",
  },
  cartBadge: {
    position: "absolute",
    right: -8,
    top: -8,
    backgroundColor: "#FF497C",
    borderRadius: 10,
    minWidth: 20,
    height: 20,
    justifyContent: "center",
    alignItems: "center",
  },
  cartBadgeText: {
    color: "#FFF",
    fontSize: 12,
    fontWeight: "bold",
  },
});

export default Compraespe;
