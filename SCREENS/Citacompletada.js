import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  TextInput,
  Image,
  Platform,
  StatusBar,
} from "react-native";
import Ionicons from "react-native-vector-icons/Ionicons";

const Citacompletada = ({ navigation, route }) => {
    const { specialistData = { 
        image: 'https://via.placeholder.com/100', 
        name: 'Nombre Especialista', 
        specialty: 'Especialidad' 
      } } = route.params || {};      
  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState("");

  const handleAddReview = () => {
    // BACKEND: Enviar el comentario y la calificación al servidor para guardar la reseña.
    console.log("Rating:", rating);
    console.log("Comment:", comment);
    alert("Reseña enviada con éxito");
    navigation.goBack();
  };

  const renderStars = () => {
    return Array.from({ length: 5 }, (_, index) => (
      <TouchableOpacity key={index} onPress={() => setRating(index + 1)}>
        <Ionicons
          name={index < rating ? "star" : "star-outline"}
          size={30}
          color={index < rating ? "#FFD700" : "#CCC"}
        />
      </TouchableOpacity>
    ));
  };

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Ionicons name="chevron-back" size={28} color="#FF497C" />
        </TouchableOpacity>
        <Text style={styles.title}>Reseña</Text>
        <View style={{ width: 28 }} />
      </View>

      {/* Specialist Info */}
      <View style={styles.specialistCard}>
        <Image source={{ uri: specialistData.image }} style={styles.image} />
        <Text style={styles.name}>Dr. {specialistData.name}</Text>
        <Text style={styles.specialty}>{specialistData.specialty}</Text>
      </View>

      {/* Rating Section */}
      <Text style={styles.subtitle}>Calificación</Text>
      <View style={styles.starsContainer}>{renderStars()}</View>

      {/* Comment Section */}
      <Text style={styles.subtitle}>Tu Comentario</Text>
      <TextInput
        style={styles.textArea}
        placeholder="Escribe tu comentario aquí..."
        placeholderTextColor="#AAA"
        multiline
        value={comment}
        onChangeText={setComment}
      />

      {/* Add Review Button */}
      <TouchableOpacity style={styles.addButton} onPress={handleAddReview}>
        <Text style={styles.addButtonText}>Agregar Reseña</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FFF",
    paddingTop: Platform.OS === "android" ? StatusBar.currentHeight : 0,
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 15,
    paddingVertical: 10,
    backgroundColor: "#FFF",
    borderBottomWidth: 1,
    borderBottomColor: "#EEE",
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#FF497C",
  },
  specialistCard: {
    alignItems: "center",
    marginVertical: 20,
  },
  image: {
    width: 100,
    height: 100,
    borderRadius: 50,
    marginBottom: 10,
  },
  name: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#333",
  },
  specialty: {
    fontSize: 14,
    color: "#555",
  },
  subtitle: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#333",
    marginHorizontal: 15,
    marginTop: 20,
  },
  starsContainer: {
    flexDirection: "row",
    justifyContent: "center",
    marginVertical: 10,
  },
  textArea: {
    backgroundColor: "#F5F5F5",
    borderRadius: 10,
    padding: 15,
    fontSize: 16,
    minHeight: 100,
    marginHorizontal: 15,
    textAlignVertical: "top",
  },
  addButton: {
    backgroundColor: "#FF497C",
    padding: 15,
    borderRadius: 10,
    alignItems: "center",
    margin: 20,
  },
  addButtonText: {
    color: "#FFF",
    fontSize: 16,
    fontWeight: "bold",
  },
});

export default Citacompletada;
