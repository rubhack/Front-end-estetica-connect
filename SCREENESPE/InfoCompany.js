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
} from "react-native";
import Ionicons from "react-native-vector-icons/Ionicons";

// Datos de ejemplo de comentarios
const sampleComments = [
  { id: "1", rating: 5, comment: "Excelente servicio, muy profesionales." },
  { id: "2", rating: 4, comment: "Productos de calidad, pero un poco costosos." },
  { id: "3", rating: 3, comment: "Servicio aceptable, pero con demoras en la entrega." },
  { id: "4", rating: 5, comment: "Me encantó, todo perfecto." },
  { id: "5", rating: 2, comment: "El producto llegó en mal estado." },
];

// Logos de ejemplo
const companyLogos = {
  BeautyPro: "https://api.freelogodesign.org/assets/thumb/logo/b868e882e7d9429fbfec06b7f53eca72_300.png", 
  EstéticaAvanzada: "https://via.placeholder.com/150",
  CorpoBelleza: "https://via.placeholder.com/150",
  EliteBody: "https://via.placeholder.com/150",
  MakeUpWorld: "https://via.placeholder.com/150",
  GlamourStyle: "https://via.placeholder.com/150"
};

const InfoCompany = ({ route, navigation }) => {
  const { companyName } = route.params;
  const [selectedRating, setSelectedRating] = useState(null);

  const filteredComments = selectedRating
    ? sampleComments.filter((comment) => comment.rating === selectedRating)
    : sampleComments;

  const renderComment = ({ item }) => (
    <View style={styles.commentCard}>
      <Text style={styles.commentText}>{item.comment}</Text>
      <Text style={styles.commentRating}>⭐ {item.rating}</Text>
    </View>
  );

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Ionicons name="chevron-back" size={28} color="#FF497C" />
        </TouchableOpacity>
        <Text style={styles.title}>{companyName}</Text>
        <View style={{ width: 28 }} />
      </View>

      {/* Logo de la Empresa */}
      <View style={styles.logoContainer}>
        <Image
          source={{ uri: companyLogos[companyName] || "https://via.placeholder.com/150" }}
          style={styles.logo}
        />
      </View>

      {/* Información de la Empresa */}
      <View style={styles.infoContainer}>
        <Text style={styles.infoText}>📧 Correo: contacto@{companyName.toLowerCase()}.com</Text>
        <Text style={styles.infoText}>📞 Teléfono: +569 123 456 78</Text>
        <Text style={styles.infoText}>⭐ Calificación: 4.5/5</Text>
      </View>

      {/* Filtro de Estrellas */}
      <View style={styles.filterContainer}>
        <Text style={styles.filterTitle}>Filtrar por estrellas:</Text>
        <View style={styles.ratingFilter}>
          {[5, 4, 3, 2, 1].map((rating) => (
            <TouchableOpacity
              key={rating}
              style={[
                styles.ratingButton,
                selectedRating === rating && styles.selectedRatingButton,
              ]}
              onPress={() => setSelectedRating(rating)}
            >
              <Text
                style={[
                  styles.ratingButtonText,
                  selectedRating === rating && styles.selectedRatingText,
                ]}
              >
                {rating} ⭐
              </Text>
            </TouchableOpacity>
          ))}
          <TouchableOpacity
            style={styles.clearFilterButton}
            onPress={() => setSelectedRating(null)}
          >
            <Text style={styles.clearFilterText}>Limpiar</Text>
          </TouchableOpacity>
        </View>
      </View>

      {/* Lista de Comentarios */}
      <FlatList
        data={filteredComments}
        keyExtractor={(item) => item.id}
        renderItem={renderComment}
        ListEmptyComponent={<Text style={styles.noComments}>Sin comentarios</Text>}
      />

      {/* Botón de Volver */}
      <TouchableOpacity
        style={styles.backButton}
        onPress={() => navigation.goBack()}
      >
        <Text style={styles.backButtonText}>Volver</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FFF",
    padding: 20,
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingTop: Platform.OS === "android" ? 40 : 50,
    paddingBottom: 20,
    borderBottomWidth: 1,
    borderBottomColor: "#EEE",
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#FF497C",
    textAlign: "center",
  },
  logoContainer: {
    alignItems: "center",
    marginTop: 20,
  },
  logo: {
    width: 120,
    height: 120,
    borderRadius: 60,
  },
  infoContainer: {
    marginVertical: 20,
  },
  infoText: {
    fontSize: 18,
    color: "#333",
    marginBottom: 10,
  },
  filterContainer: {
    marginVertical: 20,
  },
  filterTitle: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 10,
    color: "#333",
  },
  ratingFilter: {
    flexDirection: "row",
    justifyContent: "space-around",
  },
  ratingButton: {
    padding: 10,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: "#FF497C",
  },
  selectedRatingButton: {
    backgroundColor: "#FF497C",
  },
  ratingButtonText: {
    fontSize: 16,
    color: "#FF497C",
  },
  selectedRatingText: {
    color: "#FFF",
  },
  clearFilterButton: {
    padding: 10,
    backgroundColor: "#FF497C",
    borderRadius: 10,
  },
  clearFilterText: {
    color: "#FFF",
    fontWeight: "bold",
  },
  commentCard: {
    padding: 15,
    borderRadius: 10,
    backgroundColor: "#F5F5F5",
    marginVertical: 10,
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowRadius: 10,
    shadowOffset: { width: 0, height: 4 },
    elevation: 5,
  },
  commentText: {
    fontSize: 16,
    color: "#333",
  },
  commentRating: {
    marginTop: 5,
    fontSize: 14,
    color: "#FF497C",
  },
  noComments: {
    fontSize: 16,
    textAlign: "center",
    marginTop: 20,
    color: "#999",
  },
  backButton: {
    marginTop: 20,
    padding: 15,
    borderRadius: 10,
    backgroundColor: "#FF497C",
    alignItems: "center",
  },
  backButtonText: {
    color: "#FFF",
    fontWeight: "bold",
  },
});

export default InfoCompany;
