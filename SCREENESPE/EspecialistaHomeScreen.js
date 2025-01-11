import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  FlatList,
} from "react-native";
import Ionicons from "react-native-vector-icons/Ionicons";

// Datos de ejemplo para pacientes, ahora con hora agendada
const samplePatients = [
  {
    id: 1,
    name: "Ana López",
    age: 29,
    condition: "Dolor muscular crónico",
    image: "https://centrointegraldepsicologia.com/wp-content/uploads/2023/06/El-Sindrome-de-la-Buena-Persona-Los-Limites-Olvidados-1024x576.png",
    time: "10:30 AM", // Hora agendada
  },
  {
    id: 2,
    name: "Carlos Pérez",
    age: 41,
    condition: "Rehabilitación postquirúrgica",
    image: "https://miro.medium.com/v2/resize:fit:1224/1*XKpA4-JcY06QcMOiPB1zaQ.jpeg",
    time: "1:00 PM", // Hora agendada
  },
  {
    id: 3,
    name: "María González",
    age: 35,
    condition: "Tratamiento facial",
    image: "https://images.ecestaticos.com/-f-ySwBW7Mp-ggDplxXveJ0bCNQ=/0x0:991x445/992x446/filters:fill(white):format(jpg)/f.elconfidencial.com%2Foriginal%2F743%2F930%2F270%2F743930270aabd407a594e0f8b8d5dbe9.jpg",
    time: "3:15 PM", // Hora agendada
  },
];


// Generar automáticamente las fechas de la semana
const getWeekDates = () => {
  const today = new Date();
  const dayOfWeek = today.getDay(); // 0 (domingo) a 6 (sábado)
  const days = Array.from({ length: 7 }, (_, i) => {
    const date = new Date(today);
    date.setDate(today.getDate() - dayOfWeek + i); // Calcular cada día
    const day = date.toLocaleString("default", { weekday: "short" }); // Ej: "Mon"
    const num = date.getDate();
    return { day, num };
  });
  return days;
};

const EspecialistaHomeScreen = ({ navigation }) => {
  const [weekDates, setWeekDates] = useState(getWeekDates());
  const [selectedDay, setSelectedDay] = useState(new Date().getDay()); // Día seleccionado

  // Actualizar las fechas cada vez que se carga la pantalla
  useEffect(() => {
    setWeekDates(getWeekDates());
  }, []);

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <View style={styles.headerContent}>
          <Image
            source={{ uri: "https://i.pravatar.cc/100" }}
            style={styles.profileImage}
          />
          <Text style={styles.welcomeText}>Hola, Bienvenido</Text>
          <Text style={styles.userName}>Dr. John Doe</Text>
        </View>
        <View style={styles.headerIcons}>
        <TouchableOpacity onPress={() => navigation.navigate("notificacionespe")}>
          <Ionicons name="notifications-outline" size={24} color="#FFF" />
          </TouchableOpacity>
          <TouchableOpacity onPress={() => navigation.navigate("ajusteespecialista")}>
          <Ionicons
            name="settings-outline"
            size={24}
            color="#FFF"
            style={{ marginLeft: 15 }}
          />
          </TouchableOpacity>
        </View>
      </View>

      {/* Calendario */}
      <View style={styles.calendar}>
        {weekDates.map((date, index) => (
          <TouchableOpacity
            key={index}
            style={[
              styles.calendarDay,
              index === selectedDay && styles.selectedDay,
            ]}
            onPress={() => setSelectedDay(index)}
          >
            <Text
              style={[
                styles.calendarDayText,
                index === selectedDay && styles.selectedDayText,
              ]}
            >
              {date.day}
            </Text>
            <Text
              style={[
                styles.calendarDateText,
                index === selectedDay && styles.selectedDayText,
              ]}
            >
              {date.num}
            </Text>
          </TouchableOpacity>
        ))}
      </View>
      
      <FlatList
  data={samplePatients}
  keyExtractor={(item) => item.id.toString()}
  renderItem={({ item }) => (
    <TouchableOpacity
      onPress={() =>
        navigation.navigate("Citaforpacien", {
          patientData: item, // Pasar datos del paciente a la nueva pantalla
        })
      }
    >
      <View style={styles.patientCard}>
        <Image source={{ uri: item.image }} style={styles.patientImage} />
        <View style={styles.patientInfo}>
          <Text style={styles.patientName}>
            {item.name}, {item.age}
          </Text>
          <Text style={styles.patientCondition}>{item.condition}</Text>
        </View>
        <Text style={styles.appointmentTime}>{item.time}</Text>
      </View>
    </TouchableOpacity>
  )}
  style={styles.patientList}
/>


      {/* Footer */}
      <View style={styles.navBar}>
        <TouchableOpacity onPress={() => navigation.navigate("EspecialistaHomeScreen")}>
          <Ionicons name="home-outline" size={28} color="#FFF" />
        </TouchableOpacity>
        <TouchableOpacity onPress={() => navigation.navigate("Estadisticaespe")}>
          <Ionicons name="stats-chart-outline" size={28} color="#FFF" />
        </TouchableOpacity>
        <TouchableOpacity onPress={() => navigation.navigate("Calendarespe")}>
          <Ionicons name="calendar-outline" size={28} color="#FFF" />
        </TouchableOpacity>
        <TouchableOpacity onPress={() => navigation.navigate("Proveedor")}>
        <Ionicons name="cart-outline" size={28} color="#FFF" />
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
    backgroundColor: "#FF497C",
    paddingHorizontal: 15,
    paddingVertical: 20,
    paddingTop: 40, // Espaciado superior para evitar superposición
    borderBottomLeftRadius: 20,
    borderBottomRightRadius: 20,
  },
  headerContent: {
    flexDirection: "column",
  },
  profileImage: {
    width: 50,
    height: 50,
    borderRadius: 25,
  },
  welcomeText: {
    fontSize: 14,
    color: "#FFF",
  },
  userName: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#FFF",
  },
  headerIcons: {
    flexDirection: "row",
  },
  calendar: {
    flexDirection: "row",
    justifyContent: "space-evenly",
    paddingVertical: 15,
    backgroundColor: "#F0F0F0",
  },
  calendarDay: {
    alignItems: "center",
    padding: 10,
    borderRadius: 10,
  },
  selectedDay: {
    backgroundColor: "#FF497C",
  },
  calendarDayText: {
    fontSize: 14,
    color: "#333",
  },
  calendarDateText: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#333",
  },
  selectedDayText: {
    color: "#FFF",
  },
  patientList: {
    flex: 1,
    marginTop: 10,
    paddingHorizontal: 10,
  },
  patientCard: {
    flexDirection: "row",
    backgroundColor: "#FFF",
    padding: 10,
    marginVertical: 5,
    borderRadius: 10,
    elevation: 2,
    alignItems: "center",
  },
  patientImage: {
    width: 50,
    height: 50,
    borderRadius: 25,
  },
  patientInfo: {
    flex: 1,
    marginLeft: 10,
  },
  patientName: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#333",
  },
  patientCondition: {
    fontSize: 14,
    color: "#666",
  },
  appointmentTime: {
    fontSize: 14,
    color: "#FF497C",
    fontWeight: "bold",
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
});

export default EspecialistaHomeScreen;
