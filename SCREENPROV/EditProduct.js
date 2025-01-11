import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  FlatList,
  Image,
  TouchableOpacity,
  Platform,
  StatusBar,
  Alert,
  ScrollView,
  Dimensions,
} from "react-native";
import Ionicons from "react-native-vector-icons/Ionicons";
import * as ImagePicker from "expo-image-picker";

const windowWidth = Dimensions.get('window').width;

const EditProduct = ({ route, navigation }) => {
  const { product } = route.params;
  
  const [productName, setProductName] = useState(product.name);
  const [productPrice, setProductPrice] = useState(product.price.toString());
  const [productDescription, setProductDescription] = useState(product.description || "Sin descripción");
  const [quantity, setQuantity] = useState(product.quantity.toString());
  
  const [images, setImages] = useState([
    { id: '1', url: product.image },
    { id: '2', url: product.image },
    { id: '3', url: product.image },
  ]);

  // Función corregida para seleccionar imágenes
  const handleEditImage = async (imageId) => {
    const permissionResult = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (!permissionResult.granted) {
      Alert.alert("Permiso denegado", "Se necesita acceso a la galería.");
      return;
    }

    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [1, 1],
      quality: 1,
    });

    if (!result.canceled && result.assets && result.assets.length > 0) {
      const updatedImages = images.map(img =>
        img.id === imageId ? { ...img, url: result.assets[0].uri } : img
      );
      setImages(updatedImages);
      Alert.alert("Imagen Actualizada", "La imagen ha sido cambiada correctamente.");
    }
  };

  // Guardar cambios
  const handleSaveChanges = () => {
    Alert.alert("Producto Actualizado", "Los cambios han sido guardados exitosamente.");
    navigation.goBack();
  };

  const renderImage = ({ item }) => (
    <TouchableOpacity 
      style={styles.imageWrapper}
      onPress={() => handleEditImage(item.id)}
    >
      <Image source={{ uri: item.url }} style={styles.productImage} />
      <View style={styles.editImageButton}>
        <Ionicons name="pencil" size={20} color="#FFF" />
      </View>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      {/* Header fijo */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Ionicons name="chevron-back" size={28} color="#FF497C" />
        </TouchableOpacity>
        <Text style={styles.title}>Editar Producto</Text>
        <View style={{ width: 28 }} />
      </View>

      <ScrollView style={styles.scrollContainer} showsVerticalScrollIndicator={false}>
        {/* Carrusel de Imágenes */}
        <View style={styles.imageContainer}>
          <FlatList
            data={images}
            renderItem={renderImage}
            keyExtractor={(item) => item.id}
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={styles.imageList}
          />
        </View>

        {/* ID del Producto (No Editable) */}
        <View style={styles.inputContainer}>
          <Text style={styles.label}>ID del Producto</Text>
          <TextInput
            style={[styles.input, styles.disabledInput]}
            value={product.id}
            editable={false}
          />
        </View>

        {/* Campos Editables */}
        <View style={styles.inputContainer}>
          <Text style={styles.label}>Nombre del Producto</Text>
          <TextInput
            style={styles.input}
            value={productName}
            onChangeText={setProductName}
          />
        </View>

        <View style={styles.inputContainer}>
          <Text style={styles.label}>Precio</Text>
          <TextInput
            style={styles.input}
            value={productPrice}
            onChangeText={setProductPrice}
            keyboardType="numeric"
          />
        </View>

        <View style={styles.inputContainer}>
          <Text style={styles.label}>Descripción</Text>
          <TextInput
            style={[styles.input, styles.descriptionInput]}
            value={productDescription}
            onChangeText={setProductDescription}
            multiline
            numberOfLines={4}
          />
        </View>

        <View style={styles.inputContainer}>
          <Text style={styles.label}>Cantidad Disponible</Text>
          <TextInput
            style={styles.input}
            value={quantity}
            onChangeText={setQuantity}
            keyboardType="numeric"
          />
        </View>

        {/* Botón para Guardar Cambios */}
        <TouchableOpacity style={styles.saveButton} onPress={handleSaveChanges}>
          <Text style={styles.saveButtonText}>Guardar</Text>
        </TouchableOpacity>
      </ScrollView>
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
  scrollContainer: {
    flex: 1,
    padding: 20,
  },
  title: {
    fontSize: 22,
    fontWeight: "bold",
    color: "#FF497C",
  },
  imageContainer: {
    marginVertical: 10,
  },
  imageList: {
    paddingRight: 20,
  },
  imageWrapper: {
    marginRight: 15,
    position: 'relative',
  },
  productImage: {
    width: windowWidth - 100,
    height: 250,
    borderRadius: 20,
    resizeMode: "cover",
  },
  editImageButton: {
    position: 'absolute',
    right: 10,
    top: 10,
    backgroundColor: '#FF497C',
    borderRadius: 20,
    padding: 8,
    elevation: 3,
  },
  inputContainer: {
    marginVertical: 10,
  },
  label: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#333",
    marginBottom: 5,
  },
  input: {
    borderWidth: 1,
    borderColor: "#FF497C",
    borderRadius: 10,
    padding: 15,
    fontSize: 16,
  },
  descriptionInput: {
    height: 100,
    textAlignVertical: 'top',
  },
  disabledInput: {
    backgroundColor: "#EEE",
    color: "#999",
  },
  saveButton: {
    marginVertical: 30,
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
});

export default EditProduct;
