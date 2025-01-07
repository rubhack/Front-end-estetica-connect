import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  FlatList,
  Image,
  Modal,
  Platform,
  StatusBar,
  Alert,
  Dimensions,
} from "react-native";
import Ionicons from "react-native-vector-icons/Ionicons";

const { width } = Dimensions.get("window");

const MasDetalle = ({ route, navigation }) => {
  const { product } = route.params;
  const [quantity, setQuantity] = useState(1);
  const [cartCount, setCartCount] = useState(0);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedImage, setSelectedImage] = useState("");

  const productImages = [
    product.image,
    "https://via.placeholder.com/600/0000FF/808080",
    "https://img.buzzfeed.com/buzzfeed-static/static/2021-05/24/18/asset/c1322ae3bccd/sub-buzz-6101-1621879390-19.png"
  ];

  const handleAddToCart = () => {
    setCartCount(cartCount + quantity);
    Alert.alert("¡Éxito!", `${product.name} agregado al carrito con éxito`);
  };

  const handleScroll = (event) => {
    const slideIndex = Math.round(event.nativeEvent.contentOffset.x / width);
    setCurrentIndex(slideIndex);
  };

  const handleImagePress = (image) => {
    setSelectedImage(image);
    setModalVisible(true);
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Ionicons name="chevron-back" size={28} color="#FF497C" />
        </TouchableOpacity>
        <Text style={styles.title}>Detalle del Producto</Text>
        <TouchableOpacity onPress={() => navigation.navigate("CarritoDeCompra")}>
          <View style={styles.cartIconContainer}>
            <Ionicons name="cart-outline" size={28} color="#FF497C" />
            {cartCount > 0 && (
              <View style={styles.cartCountBadge}>
                <Text style={styles.cartCountText}>{cartCount}</Text>
              </View>
            )}
          </View>
        </TouchableOpacity>
      </View>

      <View style={styles.imageContainer}>
        <FlatList
          data={productImages}
          horizontal
          pagingEnabled
          showsHorizontalScrollIndicator={false}
          onScroll={handleScroll}
          snapToInterval={width}
          decelerationRate="fast"
          keyExtractor={(_, index) => index.toString()}
          renderItem={({ item }) => (
            <TouchableOpacity onPress={() => handleImagePress(item)}>
              <Image source={{ uri: item }} style={styles.productImage} />
            </TouchableOpacity>
          )}
        />
        
        <View style={styles.pagination}>
          {productImages.map((_, index) => (
            <View
              key={index}
              style={[
                styles.dot,
                currentIndex === index ? styles.activeDot : styles.inactiveDot,
              ]}
            />
          ))}
        </View>
      </View>

      <View style={styles.detailContainer}>
        <Text style={styles.productTitle}>{product.name}</Text>
        <Text style={styles.productPrice}>${product.price.toLocaleString("es-CL")}</Text>
        <Text style={styles.productDescription}>
          {product.description || "Sin Descripcion"}
        </Text>

        <View style={styles.quantityContainer}>
          <TouchableOpacity onPress={() => setQuantity(Math.max(1, quantity - 1))}>
            <Ionicons name="remove-circle-outline" size={28} color="#FF497C" />
          </TouchableOpacity>
          <Text style={styles.quantityText}>{quantity}</Text>
          <TouchableOpacity onPress={() => setQuantity(quantity + 1)}>
            <Ionicons name="add-circle-outline" size={28} color="#FF497C" />
          </TouchableOpacity>
        </View>

        <TouchableOpacity style={styles.addButton} onPress={handleAddToCart}>
          <Text style={styles.addButtonText}>Agregar al Carrito</Text>
        </TouchableOpacity>
      </View>

      <Modal visible={modalVisible} transparent={true} onRequestClose={() => setModalVisible(false)}>
        <View style={styles.modalContainer}>
          <Image source={{ uri: selectedImage }} style={styles.modalImage} />
          <TouchableOpacity style={styles.closeButton} onPress={() => setModalVisible(false)}>
            <Text style={styles.closeButtonText}>Cerrar</Text>
          </TouchableOpacity>
        </View>
      </Modal>
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
    paddingTop: Platform.OS === "android" ? StatusBar.currentHeight + 10 : 44,
    height: Platform.OS === "android" ? 80 : 88,
    borderBottomWidth: 1,
    borderColor: "#EEE",
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#FF497C",
  },
  cartIconContainer: {
    position: "relative",
  },
  cartCountBadge: {
    position: "absolute",
    top: -8,
    right: -8,
    backgroundColor: "#FF497C",
    borderRadius: 10,
    minWidth: 18,
    height: 18,
    justifyContent: "center",
    alignItems: "center",
  },
  cartCountText: {
    color: "#FFF",
    fontSize: 12,
    fontWeight: "bold",
  },
  imageContainer: {
    height: width,
    backgroundColor: "#F8F8F8",
  },
  productImage: {
    width: width,
    height: width,
    resizeMode: "contain",
  },
  pagination: {
    flexDirection: "row",
    justifyContent: "center",
    position: "absolute",
    bottom: 10,
    left: 0,
    right: 0,
  },
  dot: {
    height: 8,
    width: 8,
    borderRadius: 4,
    marginHorizontal: 4,
  },
  activeDot: {
    backgroundColor: "#FF497C",
  },
  inactiveDot: {
    backgroundColor: "#DDD",
  },
  detailContainer: {
    flex: 1,
    padding: 20,
  },
  productTitle: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#333",
    marginBottom: 8,
  },
  productPrice: {
    fontSize: 22,
    fontWeight: "bold",
    color: "#FF497C",
    marginBottom: 16,
  },
  productDescription: {
    fontSize: 16,
    color: "#666",
    marginBottom: 24,
  },
  quantityContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 24,
  },
  quantityText: {
    fontSize: 20,
    marginHorizontal: 20,
    minWidth: 30,
    textAlign: "center",
  },
  addButton: {
    backgroundColor: "#FF497C",
    paddingVertical: 16,
    borderRadius: 25,
    alignItems: "center",
  },
  addButtonText: {
    color: "#FFF",
    fontSize: 18,
    fontWeight: "bold",
  },
  modalContainer: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.9)",
    justifyContent: "center",
    alignItems: "center",
  },
  modalImage: {
    width: width,
    height: width,
    resizeMode: "contain",
  },
  closeButton: {
    position: "absolute",
    bottom: 40,
    backgroundColor: "#FF497C",
    paddingVertical: 12,
    paddingHorizontal: 30,
    borderRadius: 20,
  },
  closeButtonText: {
    color: "#FFF",
    fontSize: 16,
    fontWeight: "bold",
  },
});

export default MasDetalle;
