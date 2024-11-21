import React, { useState } from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity, Dimensions } from 'react-native';
import SwipeCards from 'react-native-swipeable-cards';
import Ionicons from 'react-native-vector-icons/Ionicons';

// Dimensiones de la pantalla
const { width, height } = Dimensions.get('window');

// Datos de ejemplo para las tarjetas
const sampleCards = [
  {
    id: 1,
    name: "Ariana",
    age: 23,
    distance: "Metropolitana, Las Condes",
    bio: "Estilista con mas años de experiencia",
    image: "https://d3puay5pkxu9s4.cloudfront.net/curso/4264/800_imagen.jpg",
  },
  {
    id: 2,
    name: "Carlos",
    age: 58,
    distance: "Metropolitana, Santiago",
    bio: "Especialista en dermatología, más de 20 años en experiencia",
    image: "https://www.clinicalaparva.cl/wp-content/uploads/2019/02/Dr.Vidal650x650.jpg",
  },
  {
    id: 3,
    name: "Lucía",
    age: 30,
    distance: "Metropolitana, Quinta Normal",
    bio: "Masajista profesional, alivio tendones, musculatura",
    image: "https://i.pinimg.com/236x/95/d3/37/95d337684fceb3b738951cf5e6859020.jpg",
  },
];

const PatientHomeScreen = ({ navigation }) => {
  const [cards, setCards] = useState(sampleCards);

  // Manejar cuando una tarjeta es deslizada a la derecha (like)
  const handleSwipeRight = (card) => {
    console.log("Liked:", card.name);
    removeCard(card);
  };

  // Manejar cuando una tarjeta es deslizada a la izquierda (dislike)
  const handleSwipeLeft = (card) => {
    console.log("Disliked:", card.name);
    removeCard(card);
  };

  // Eliminar tarjeta del estado actual
  const removeCard = (card) => {
    setCards((prevCards) => prevCards.filter((c) => c.id !== card.id));
  };

  // Renderizar cada tarjeta
  const renderCard = (card) => (
    <View style={styles.card}>
      <Image source={{ uri: card.image }} style={styles.cardImage} />
      <View style={styles.cardContent}>
        <Text style={styles.cardTitle}>{card.name}, {card.age}</Text>
        <Text style={styles.cardSubtitle}>{card.distance}</Text>
        <Text style={styles.cardBio}>{card.bio}</Text>
      </View>
    </View>
  );

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity>
          <Ionicons name="notifications-outline" size={24} color="#FF497C" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Descubre Especialistas</Text>
        <TouchableOpacity>
          <Ionicons name="options-outline" size={24} color="#FF497C" />
        </TouchableOpacity>
      </View>
      <SwipeCards
        cards={cards}
        renderCard={renderCard}
        keyExtractor={(card) => card.id.toString()}
        onSwipeRight={handleSwipeRight}
        onSwipeLeft={handleSwipeLeft}
        stack={true}
        stackDepth={3}
      />
      <View style={styles.navBar}>
        <TouchableOpacity onPress={() => navigation.navigate('Home')}>
          <Ionicons name="home-outline" size={28} color="#FFF" />
        </TouchableOpacity>
        <TouchableOpacity onPress={() => navigation.navigate('Profile')}>
          <Ionicons name="person-outline" size={28} color="#FFF" />
        </TouchableOpacity>
        <TouchableOpacity onPress={() => navigation.navigate('Calendar')}>
          <Ionicons name="calendar-outline" size={28} color="#FFF" />
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
    paddingHorizontal: 20,
    paddingVertical: 10,
    marginTop: 50, // Ajustado para bajar más el header
    backgroundColor: "#FFF",
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: "600",
    color: "#333",
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    textAlign: "center",
    marginVertical: 20,
    color: "#333",
  },
  card: {
    width: width * 0.85,
    height: height * 0.65,
    borderRadius: 20,
    backgroundColor: "#FFF",
    elevation: 5,
    shadowColor: "#000",
    shadowOpacity: 0.2,
    shadowOffset: { width: 0, height: 3 },
    shadowRadius: 5,
    alignSelf: "center",
  },
  cardImage: {
    width: "100%",
    height: "70%",
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
  },
  cardContent: {
    padding: 15,
  },
  cardTitle: {
    fontSize: 22,
    fontWeight: "bold",
    textAlign: "center",
  },
  cardSubtitle: {
    fontSize: 18,
    color: "#777",
    textAlign: "center",
    marginVertical: 5,
  },
  cardBio: {
    fontSize: 16,
    color: "#555",
    textAlign: "center",
  },
  navBar: {
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center",
    paddingVertical: 10,
    backgroundColor: "#FF497C",
    borderRadius: 30,
    marginHorizontal: 10,
    marginBottom: 20,
    position: "absolute",
    bottom: 10,
    width: "95%",
    alignSelf: "center",
  },
  noMoreCards: {
    fontSize: 18,
    color: "#999",
    textAlign: "center",
    marginTop: 20,
  },
});

export default PatientHomeScreen;

