import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  TouchableOpacity,
  Alert,
  Image,
  Platform,
  StatusBar,
  ScrollView,
} from "react-native";
import Ionicons from "react-native-vector-icons/Ionicons";
import * as ImagePicker from "expo-image-picker";

const AddProduct = ({ navigation }) => {
  const [productName, setProductName] = useState("");
  const [price, setPrice] = useState("");
  const [description, setDescription] = useState("");
  const [stock, setStock] = useState("");
  const [productImages, setProductImages] = useState({
    mainImage: null, 
    gallery: [null, null, null],
  });

  const handleSelectImage = async (index = null) => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      quality: 1,
      aspect: index !== null ? [600, 600] : [200, 200],
    });

    // Manejo actualizado para obtener la URI correcta
    if (!result.cancelled && result.assets && result.assets.length > 0) {
      const imageUri = result.assets[0].uri;
      if (index !== null) {
        const updatedGallery = [...productImages.gallery];
        updatedGallery[index] = imageUri;
        setProductImages({ ...productImages, gallery: updatedGallery });
      } else {
        setProductImages({ ...productImages, mainImage: imageUri });
      }
    }
  };

  const handleSaveProduct = () => {
    if (!productName || !price || !description || !stock || !productImages.mainImage || productImages.gallery.includes(null)) {
      Alert.alert("Error", "Por favor complete todos los campos e imágenes.");
      return;
    }
    Alert.alert(
      "¡Producto Agregado!",
      `${productName} fue agregado exitosamente.\n\nPodrás visualizar cómo verán tu producto los especialistas dentro de la sección Inventario.`,
      [{ text: "Entendido", onPress: () => navigation.goBack() }]
    );
};


  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Ionicons name="chevron-back" size={28} color="#FF497C" />
        </TouchableOpacity>
        <Text style={styles.title}>Agregar Producto</Text>
        <View style={{ width: 30 }} />
      </View>

      <ScrollView showsVerticalScrollIndicator={false}>
        {/* Imágenes */}
        <Text style={styles.sectionTitle}>Imágenes del Producto</Text>

        {/* Imagen principal 200x200 */}
        <TouchableOpacity onPress={() => handleSelectImage(null)} style={styles.imagePicker}>
          {productImages.mainImage ? (
            <Image source={{ uri: productImages.mainImage }} style={styles.productImageSmall} />
          ) : (
            <Ionicons name="camera-outline" size={48} color="#FF497C" />
          )}
          <Text style={styles.imageText}>Cargar Imagen 200x200 (Para Perfil del Producto)</Text>
        </TouchableOpacity>

        {/* Imágenes de 600x600 */}
        {productImages.gallery.map((image, index) => (
          <TouchableOpacity key={index} onPress={() => handleSelectImage(index)} style={styles.imagePicker}>
            {image ? (
              <Image source={{ uri: image }} style={styles.productImageLarge} />
            ) : (
              <Ionicons name="camera-outline" size={48} color="#FF497C" />
            )}
            <Text style={styles.imageText}>Cargar Imagen 600x600 (Galería del Producto)</Text>
          </TouchableOpacity>
        ))}

        {/* Inputs del Producto */}
        <TextInput
          style={styles.input}
          placeholder="Nombre del Producto"
          value={productName}
          onChangeText={setProductName}
        />
        <TextInput
          style={styles.input}
          placeholder="Precio"
          value={price}
          keyboardType="numeric"
          onChangeText={setPrice}
        />
        <TextInput
          style={styles.input}
          placeholder="Descripción del Producto"
          value={description}
          onChangeText={setDescription}
          multiline
        />
        <TextInput
          style={styles.input}
          placeholder="Cantidad en Stock"
          value={stock}
          keyboardType="numeric"
          onChangeText={setStock}
        />

        {/* Botón de Guardar */}
        <TouchableOpacity style={styles.saveButton} onPress={handleSaveProduct}>
          <Text style={styles.saveButtonText}>Guardar Producto</Text>
        </TouchableOpacity>
      </ScrollView>

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
    paddingBottom: 80, 
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
  sectionTitle: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#333",
    marginVertical: 20,
  },
  imagePicker: {
    alignItems: "center",
    justifyContent: "center",
    padding: 15,
    borderRadius: 15,
    borderWidth: 2,
    borderColor: "#FF497C",
    marginBottom: 20,
  },
  productImageSmall: {
    width: 200,
    height: 200,
    borderRadius: 20,
  },
  productImageLarge: {
    width: 300,
    height: 300,
    borderRadius: 20,
  },
  imageText: {
    marginTop: 10,
    fontSize: 14,
    color: "#FF497C",
  },
  input: {
    borderWidth: 1,
    borderColor: "#FF497C",
    borderRadius: 15,
    padding: 15,
    marginBottom: 15,
  },
  saveButton: {
    backgroundColor: "#FF497C",
    paddingVertical: 15,
    borderRadius: 20,
    alignItems: "center",
  },
  saveButtonText: {
    color: "#FFF",
    fontSize: 18,
    fontWeight: "bold",
  },
  navBar: {
    flexDirection: "row",
    justifyContent: "space-around",
    paddingVertical: 10,
    backgroundColor: "#FF497C",
    borderRadius: 30,
    position: "absolute",
    bottom: 10,
    left: 10,
    right: 10,
  },
});

export default AddProduct;
