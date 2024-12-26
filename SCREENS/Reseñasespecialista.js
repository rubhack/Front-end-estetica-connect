import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  FlatList,
  Dimensions,
  Platform,
  StatusBar,
} from "react-native";
import Ionicons from "react-native-vector-icons/Ionicons";

const { width } = Dimensions.get("window");

const Reseñasespecialista = ({ route, navigation }) => {
  const { specialistData } = route.params;

  // Simulamos comentarios y reseñas
  const comments = [
    { id: 1, stars: 5, text: "Excelente atención, muy profesional." },
    { id: 2, stars: 4, text: "Buena experiencia, aunque podría mejorar." },
    { id: 3, stars: 5, text: "Todo perfecto, muy recomendado." },
    { id: 4, stars: 3, text: "Fue decente, pero no cumplió mis expectativas." },
    { id: 5, stars: 2, text: "No quedé satisfecho con el servicio." },
  ];

  const [selectedStars, setSelectedStars] = useState(null); // Filtro por estrellas

  const filteredComments = selectedStars
    ? comments.filter((comment) => comment.stars === selectedStars)
    : comments;

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Ionicons name="chevron-back" size={28} color="#FF497C" />
        </TouchableOpacity>
        <Text style={styles.title}>Reseñas</Text>
        <View style={{ width: 28 }} /> 
      </View>

      <View style={styles.content}>
        {/* Resumen general */}
        <View style={styles.summary}>
          <Text style={styles.averageRating}>
            {specialistData.rating.toFixed(1)} ⭐
          </Text>
          <Text style={styles.totalReviews}>
            {specialistData.reviews} reseñas
          </Text>
        </View>

        {/* Filtro por estrellas */}
        <View style={styles.filterContainer}>
          {[5, 4, 3, 2, 1].map((star) => (
            <TouchableOpacity
              key={star}
              style={[
                styles.filterButton,
                selectedStars === star && styles.filterButtonSelected,
              ]}
              onPress={() =>
                setSelectedStars(selectedStars === star ? null : star)
              }
            >
              <Text
                style={[
                  styles.filterText,
                  selectedStars === star && styles.filterTextSelected,
                ]}
              >
                {star} ⭐
              </Text>
            </TouchableOpacity>
          ))}
        </View>

        {/* Lista de comentarios */}
        <FlatList
          data={filteredComments}
          keyExtractor={(item) => item.id.toString()}
          renderItem={({ item }) => (
            <View style={styles.commentCard}>
              <Text style={styles.commentStars}>{item.stars} ⭐</Text>
              <Text style={styles.commentText}>{item.text}</Text>
            </View>
          )}
          ListEmptyComponent={
            <Text style={styles.emptyText}>
              No hay comentarios para este filtro.
            </Text>
          }
        />
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
  content: {
    padding: 15,
    flex: 1,
  },
  summary: {
    alignItems: "center",
    marginBottom: 20,
  },
  averageRating: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#FF497C",
  },
  totalReviews: {
    fontSize: 16,
    color: "#555",
  },
  filterContainer: {
    flexDirection: "row",
    justifyContent: "space-around",
    marginBottom: 15,
  },
  filterButton: {
    padding: 10,
    borderWidth: 1,
    borderColor: "#FF497C",
    borderRadius: 20,
  },
  filterButtonSelected: {
    backgroundColor: "#FF497C",
  },
  filterText: {
    fontSize: 14,
    color: "#FF497C",
  },
  filterTextSelected: {
    color: "#FFF",
  },
  commentCard: {
    padding: 15,
    backgroundColor: "#F5F5F5",
    borderRadius: 10,
    marginBottom: 10,
    elevation: 2,
  },
  commentStars: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#FF497C",
    marginBottom: 5,
  },
  commentText: {
    fontSize: 14,
    color: "#555",
  },
  emptyText: {
    textAlign: "center",
    color: "#999",
    fontSize: 14,
  },
});

export default Reseñasespecialista;
