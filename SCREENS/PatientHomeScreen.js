import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  Dimensions,
  ScrollView,
} from "react-native";
import SwipeCards from "react-native-swipeable-cards";
import Ionicons from "react-native-vector-icons/Ionicons";

const { width, height } = Dimensions.get("window");

const sampleCards = [
  {
    id: 1,
    name: "Ariana",
    age: 23,
    distance: "Metropolitana, Las Condes",
    bio: "Estilista con más de 5 años de experiencia en peluquería. Trabajando en el sector profesional con clientes destacados. Me encantaría ayudarte con tu próximo cambio de look.",
    rating: 4.5,
    reviews: 120,
    image: "https://d3puay5pkxu9s4.cloudfront.net/curso/4264/800_imagen.jpg",
  },
  {
    id: 2,
    name: "Carlos",
    age: 58,
    distance: "Metropolitana, Santiago",
    bio: "Especialista en dermatología con más de 20 años de experiencia. Tratamientos avanzados de piel y asesorías personalizadas.",
    rating: 4.8,
    reviews: 200,
    image: "https://www.clinicalaparva.cl/wp-content/uploads/2019/02/Dr.Vidal650x650.jpg",
  },
  {
    id: 3,
    name: "Lucía",
    age: 30,
    distance: "Metropolitana, Quinta Normal",
    bio: "Masajista profesional. Experta en alivio de musculatura y tendones. Trabajo con técnicas avanzadas para mejorar tu calidad de vida.",
    rating: 4.2,
    reviews: 75,
    image: "https://i.pinimg.com/236x/95/d3/37/95d337684fceb3b738951cf5e6859020.jpg",
  },
];

const PatientHomeScreen = ({ navigation }) => {
  const [cards, setCards] = useState(sampleCards);
  const [expandedCardId, setExpandedCardId] = useState(null);

  const handleSwipeRight = (card) => {
    console.log("Liked:", card.name);
    navigation.navigate("Previsualizacionagendaespe", { specialistData: card });
    removeCard(card);
  };
  

  const handleSwipeLeft = (card) => {
    console.log("Disliked:", card.name);
    removeCard(card);
  };

  const removeCard = (card) => {
    setCards((prevCards) => prevCards.filter((c) => c.id !== card.id));
  };

  const refreshScreen = () => {
    navigation.navigate("PatientHomeScreen");
  };

  const renderCard = (card) => {
    const isExpanded = expandedCardId === card.id;
    const bio = isExpanded ? card.bio : `${card.bio.substring(0, 100)}...`;

    return (
      <View style={[styles.card, { width: width * 0.85, height: height * 0.65 }]}>
        <Image source={{ uri: card.image }} style={styles.cardImage} />
        <View style={styles.cardContent}>
          <Text style={styles.cardTitle}>{card.name}, {card.age}</Text>
          <Text style={styles.cardSubtitle}>{card.distance}</Text>
          <ScrollView style={styles.bioContainer}>
            <Text style={styles.cardBio}>{bio}</Text>
            {!isExpanded && card.bio.length > 100 && (
              <TouchableOpacity onPress={() => setExpandedCardId(card.id)}>
                <Text style={styles.readMore}>Leer más</Text>
              </TouchableOpacity>
            )}
            {isExpanded && (
              <TouchableOpacity onPress={() => setExpandedCardId(null)}>
                <Text style={styles.readMore}>Leer menos</Text>
              </TouchableOpacity>
            )}
          </ScrollView>
          <View style={styles.ratingContainer}>
            <Ionicons name="star" size={16} color="#FFD700" />
            <Text style={styles.ratingText}>{card.rating}</Text>
            <Text style={styles.reviewsText}>({card.reviews} reseñas)</Text>
          </View>
        </View>
      </View>
    );
  };

  const currentCard = cards[0];

  return (
    <View style={styles.container}>
  <View style={styles.header}>
  <TouchableOpacity onPress={() => navigation.navigate("Notificationpatient")}>
  <Ionicons name="notifications-outline" size={24} color="#FF497C" />
  </TouchableOpacity>
  <Text style={styles.title}>Descubre Especialistas</Text>
  <TouchableOpacity onPress={() => navigation.navigate("settingpatient")}>
    <Ionicons name="settings-outline" size={24} color="#FF497C" />
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
      {cards.length === 0 && (
        <Text style={styles.noMoreCards}>¡No hay más tarjetas para mostrar!</Text>
      )}
      {currentCard && (
        <View style={styles.buttonContainer}>
          <TouchableOpacity
            style={styles.dislikeButton}
            onPress={() => handleSwipeLeft(currentCard)}
          >
            <Ionicons name="close" size={30} color="#FFF" />
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.likeButton}
            onPress={() => handleSwipeRight(currentCard)}
          >
            <Ionicons name="eye" size={30} color="#FFF" />
          </TouchableOpacity>
        </View>
      )}
      <View style={styles.navBar}>
        <TouchableOpacity onPress={refreshScreen}>
          <Ionicons name="home-outline" size={28} color="#FFF" />
        </TouchableOpacity>
        <TouchableOpacity onPress={() => navigation.navigate("PatientProfileScreen")}>
          <Ionicons name="person-outline" size={28} color="#FFF" />
        </TouchableOpacity>
        <TouchableOpacity onPress={() => navigation.navigate("Historialcita")}>
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
    paddingHorizontal: 15,
    paddingVertical: 10,
    backgroundColor: "#FFF",
    paddingTop: 50,
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#FF497C",
  },
  card: {
    borderRadius: 20,
    backgroundColor: "#FFF",
    elevation: 5,
    shadowColor: "#000",
    shadowOpacity: 0.2,
    shadowOffset: { width: 0, height: 3 },
    shadowRadius: 5,
    alignSelf: "center",
    marginVertical: 10,
  },
  cardImage: {
    width: "100%",
    height: "60%",
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
  bioContainer: {
    maxHeight: "40%",
  },
  cardBio: {
    fontSize: 16,
    color: "#555",
    textAlign: "center",
  },
  readMore: {
    fontSize: 14,
    color: "#FF497C",
    textAlign: "center",
    marginTop: 5,
  },
  ratingContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    marginTop: 15,
  },
  ratingText: {
    fontSize: 16,
    fontWeight: "bold",
    marginLeft: 5,
    color: "#333",
  },
  reviewsText: {
    fontSize: 14,
    color: "#777",
    marginLeft: 5,
  },
  buttonContainer: {
    flexDirection: "row",
    justifyContent: "space-around",
    marginTop: -30,
    marginBottom: 40,
  },
  dislikeButton: {
    backgroundColor: "#B22222",
    width: 60,
    height: 60,
    borderRadius: 30,
    justifyContent: "center",
    alignItems: "center",
  },
  likeButton: {
    backgroundColor: "#228B22",
    width: 60,
    height: 60,
    borderRadius: 30,
    justifyContent: "center",
    alignItems: "center",
  },
  navBar: {
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center",
    paddingVertical: 10,
    backgroundColor: "#FF497C",
    borderRadius: 30,
    marginHorizontal: 10,
    marginBottom: 10,
  },
  noMoreCards: {
    fontSize: 18,
    color: "#999",
    textAlign: "center",
    marginTop: 20,
  },
});

export default PatientHomeScreen;
