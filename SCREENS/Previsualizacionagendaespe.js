import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Image,
  ScrollView,
  Dimensions,
  Platform, 
  StatusBar,
} from "react-native";
import Ionicons from "react-native-vector-icons/Ionicons";
import { Calendar } from "react-native-calendars";

const { width } = Dimensions.get("window");

const Previsualizacionagendaespe = ({ route, navigation }) => {
  const { specialistData } = route.params; // Recibe los datos del especialista seleccionado

  const [selectedDate, setSelectedDate] = useState(null);

  // Obtener la fecha actual
  const today = new Date();
  const todayString = today.toISOString().split("T")[0];

  // Generar fechas futuras como disponibles
  const generateFutureDates = () => {
    const dates = {};
    for (let i = 0; i < 30; i++) {
      const date = new Date(today);
      date.setDate(today.getDate() + i);
      const dateString = date.toISOString().split("T")[0];
      dates[dateString] = { selected: true, selectedColor: "#FF497C" };
    }
    return dates;
  };

  const markedDates = {
    ...generateFutureDates(),
    [selectedDate]: { selected: true, selectedColor: "#FF1E5B" },
  };

  const handleDayPress = (day) => {
    if (new Date(day.dateString) >= today) {
      setSelectedDate(day.dateString);
      navigation.navigate("agendarcitapac", { date: day.dateString, specialistData });
    }
  };
  

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Ionicons name="chevron-back" size={28} color="#FF497C" />
        </TouchableOpacity>
        <Text style={styles.title}>Agendar Especialista</Text>
        <View style={{ width: 28 }} />
      </View>

      <ScrollView contentContainerStyle={styles.content}>
        {/* Información del especialista */}
        <View style={styles.card}>
          <Image source={{ uri: specialistData.image }} style={styles.image} />
          <View style={styles.info}>
            <Text style={styles.name}>{specialistData.name}</Text>
            <Text style={styles.details}>{specialistData.bio}</Text>
            <TouchableOpacity
              onPress={() => navigation.navigate("Reseñasespecialista", { specialistData })}
            >
              <Text style={styles.rating}>
                {specialistData.rating} ⭐ ({specialistData.reviews} reseñas)
              </Text>
            </TouchableOpacity>
          </View>
        </View>

        {/* Calendario dinámico */}
        <View style={styles.calendar}>
          <Text style={styles.subtitle}>Selecciona una fecha</Text>
          <Calendar
            onDayPress={handleDayPress}
            markedDates={markedDates}
            theme={{
              selectedDayBackgroundColor: "#FF497C",
              todayTextColor: "#FF497C",
              arrowColor: "#FF497C",
              dotColor: "#FF497C",
              textDisabledColor: "#BEBEBE", // Color gris para días no seleccionables
            }}
            minDate={todayString} // Deshabilitar días anteriores a hoy
          />
        </View>

        {/* Fecha seleccionada */}
        {selectedDate && (
          <View style={styles.selectedDateContainer}>
            <Text style={styles.selectedDateText}>
              Fecha seleccionada: {selectedDate}
            </Text>
          </View>
        )}
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
  },
  card: {
    backgroundColor: "#F5F5F5",
    borderRadius: 10,
    padding: 20,
    marginBottom: 15,
  },
  image: {
    width: "100%",
    height: 200,
    borderRadius: 10,
    marginBottom: 15,
  },
  info: {
    alignItems: "center",
  },
  name: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#333",
    marginBottom: 10,
  },
  details: {
    fontSize: 14,
    color: "#555",
    textAlign: "center",
    marginBottom: 10,
  },
  rating: {
    fontSize: 14,
    color: "#777",
    textDecorationLine: "underline",
  },
  calendar: {
    backgroundColor: "#FFF",
    borderRadius: 10,
    padding: 15,
    marginTop: 20,
    elevation: 3,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 3,
  },
  subtitle: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#333",
    marginBottom: 10,
  },
  selectedDateContainer: {
    marginTop: 20,
    padding: 15,
    backgroundColor: "#F5F5F5",
    borderRadius: 10,
  },
  selectedDateText: {
    fontSize: 14,
    color: "#333",
  },
});

export default Previsualizacionagendaespe;
