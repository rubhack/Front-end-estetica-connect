import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  FlatList,
  Image,
  Platform,
  StatusBar,
  Alert,
} from "react-native";
import Ionicons from "react-native-vector-icons/Ionicons";

const CarritoDeCompra = ({ navigation }) => {
  const [cartItems, setCartItems] = useState([
    {
      id: "1",
      name: "Crema Anti-edad",
      price: 15000,
      quantity: 1,
      image: "https://img.buzzfeed.com/buzzfeed-static/static/2021-05/24/18/asset/c1322ae3bccd/sub-buzz-6101-1621879390-19.png?downsize=900:*&output-format=auto&output-quality=auto",
    },
    {
      id: "2",
      name: "Mascarilla Facial",
      price: 8000,
      quantity: 2,
      image: "https://cyzone.cyzone.com/wp-content/uploads/2020/10/Grafica2-Tips-Mascarilla-de-tela.jpg",
    },
  ]);

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

  // Calcular total del carrito
  const calculateTotal = () => {
    return cartItems.reduce((total, item) => total + item.price * item.quantity, 0);
  };

  // Incrementar la cantidad de un producto
  const increaseQuantity = (id) => {
    setCartItems((prevItems) =>
      prevItems.map((item) =>
        item.id === id ? { ...item, quantity: item.quantity + 1 } : item
      )
    );
  };

  // Disminuir la cantidad de un producto
  const decreaseQuantity = (id) => {
    setCartItems((prevItems) =>
      prevItems
        .map((item) =>
          item.id === id ? { ...item, quantity: Math.max(1, item.quantity - 1) } : item
        )
        .filter((item) => item.quantity > 0)
    );
  };

  // Eliminar un producto del carrito
  const removeItem = (id) => {
    setCartItems((prevItems) => prevItems.filter((item) => item.id !== id));
  };

  // Proceder con la compra
  const handlePurchase = () => {
    if (cartItems.length === 0) {
      Alert.alert("Tu carrito está vacío");
      return;
    }
    navigation.navigate("DetallesDeCompra", { cartItems, total: calculateTotal() });
  };

  const renderItem = ({ item }) => (
    <View style={styles.productCard}>
     <ProductImage uri={item.image} />
      <View style={styles.productInfo}>
        <Text style={styles.productName}>{item.name}</Text>
        <Text style={styles.productPrice}>${item.price.toLocaleString("es-CL")}</Text>
        <View style={styles.quantityContainer}>
          <TouchableOpacity onPress={() => decreaseQuantity(item.id)}>
            <Ionicons name="remove-circle-outline" size={28} color="#FF497C" />
          </TouchableOpacity>
          <Text style={styles.quantityText}>{item.quantity}</Text>
          <TouchableOpacity onPress={() => increaseQuantity(item.id)}>
            <Ionicons name="add-circle-outline" size={28} color="#FF497C" />
          </TouchableOpacity>
        </View>
      </View>
      <TouchableOpacity onPress={() => removeItem(item.id)}>
        <Ionicons name="trash-outline" size={28} color="red" />
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
        <Text style={styles.title}>Carrito de Compra</Text>
        <View style={{ width: 28 }} />
      </View>

      {/* Lista de productos en el carrito */}
      <FlatList
        data={cartItems}
        keyExtractor={(item) => item.id}
        renderItem={renderItem}
      />

      {/* Total y botón de compra */}
      <View style={styles.footer}>
        <Text style={styles.totalText}>Total: ${calculateTotal().toLocaleString("es-CL")}</Text>
        <TouchableOpacity style={styles.purchaseButton} onPress={handlePurchase}>
          <Text style={styles.purchaseButtonText}>Comprar</Text>
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
    paddingVertical: 10,
    backgroundColor: "#FFF",
    paddingTop: Platform.OS === "android" ? StatusBar.currentHeight + 10 : 50,
    borderBottomWidth: 1,
    borderBottomColor: "#EEE",
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#FF497C",
  },
  productCard: {
    flexDirection: "row",
    alignItems: "center",
    padding: 15,
    borderBottomWidth: 1,
    borderColor: "#EEE",
  },
  productImage: {
    width: 80,
    height: 80,
    borderRadius: 10,
  },
  productInfo: {
    flex: 1,
    marginLeft: 15,
  },
  productName: {
    fontSize: 18,
    fontWeight: "bold",
  },
  productPrice: {
    fontSize: 16,
    color: "#555",
  },
  quantityContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 10,
  },
  quantityText: {
    fontSize: 18,
    marginHorizontal: 15,
  },
  footer: {
    padding: 20,
    borderTopWidth: 1,
    borderColor: "#EEE",
    alignItems: "center",
  },
  totalText: {
    fontSize: 22,
    fontWeight: "bold",
    marginBottom: 15,
  },
  purchaseButton: {
    backgroundColor: "#FF497C",
    paddingVertical: 15,
    paddingHorizontal: 50,
    borderRadius: 25,
  },
  purchaseButtonText: {
    color: "#FFF",
    fontSize: 18,
    fontWeight: "bold",
  },
});

export default CarritoDeCompra;
