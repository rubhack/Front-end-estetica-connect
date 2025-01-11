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

// Datos de ejemplo para especialistas
const sampleSpecialists = [
  {
    id: 1,
    name: "Ana López",
    condition: "Insumos acrílicos",
    image: "https://d3puay5pkxu9s4.cloudfront.net/curso/4264/800_imagen.jpg",
    status: "Nuevo",
  },
  {
    id: 2,
    name: "Carlos Pérez",
    condition: "Brillos con diseños",
    image: "https://www.clinicalaparva.cl/wp-content/uploads/2019/02/Dr.Vidal650x650.jpg",
    status: "Nuevo",
  },
  {
    id: 3,
    name: "María González",
    condition: "Diseño de Chile",
    image: "https://i.pinimg.com/236x/95/d3/37/95d337684fceb3b738951cf5e6859020.jpg",
    status: "Nuevo",
  },
];

// Generar automáticamente las fechas de la semana
const getWeekDates = () => {
  const today = new Date();
  const dayOfWeek = today.getDay();
  const days = Array.from({ length: 7 }, (_, i) => {
    const date = new Date(today);
    date.setDate(today.getDate() - dayOfWeek + i);
    const day = date.toLocaleString("default", { weekday: "short" });
    const num = date.getDate();
    return { day, num };
  });
  return days;
};

const ProveedorHomeScreen = ({ navigation }) => {
  const [weekDates, setWeekDates] = useState(getWeekDates());
  const [selectedDay, setSelectedDay] = useState(new Date().getDay());
  const [specialists, setSpecialists] = useState(sampleSpecialists);

  useEffect(() => {
    setWeekDates(getWeekDates());
  }, []);

  const handleSelectSpecialist = (specialist) => {
    if (specialist.status === "Pendiente") {
      alert("Este pedido ya está pendiente. Puedes ver más detalles en la sección 'Pedidos Pendientes'.");
    } else {
      navigation.navigate("AgendarPedido", {
       specialist, 
        onConfirm: (id) => updateSpecialistStatus(id),
      });
    }
  };

  const updateSpecialistStatus = (id) => {
    const updatedSpecialists = specialists.map((specialist) =>
      specialist.id === id ? { ...specialist, status: "Pendiente" } : specialist
    );
    setSpecialists(updatedSpecialists);
  };

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <View style={styles.headerContent}>
          <Image
            source={{
              uri: "https://api.freelogodesign.org/assets/thumb/logo/b868e882e7d9429fbfec06b7f53eca72_300.png",
            }}
            style={styles.profileImage}
          />
          <Text style={styles.welcomeText}>Hola, Bienvenido</Text>
          <Text style={styles.userName}>Empresas Wayne</Text>
        </View>
        <View style={styles.headerIcons}>
          <TouchableOpacity onPress={() => navigation.navigate("NotificacionProve")}>
            <Ionicons name="notifications-outline" size={24} color="#FFF" />
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => navigation.navigate("ajustesprove")}
            style={{ marginLeft: 15 }}
          >
            <Ionicons name="settings-outline" size={24} color="#FFF" />
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
            <Text style={[styles.calendarDayText, index === selectedDay && styles.selectedDayText]}>
              {date.day}
            </Text>
            <Text style={[styles.calendarDateText, index === selectedDay && styles.selectedDayText]}>
              {date.num}
            </Text>
          </TouchableOpacity>
        ))}
      </View>

      {/* Lista de Especialistas */}
      <FlatList
        data={specialists}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <TouchableOpacity
            style={styles.specialistCard}
            onPress={() => handleSelectSpecialist(item)}
          >
            <Image source={{ uri: item.image }} style={styles.specialistImage} />
            <View style={styles.specialistInfo}>
              <Text style={styles.specialistName}>{item.name}</Text>
              <Text style={styles.specialistCondition}>{item.condition}</Text>
              <Text
                style={item.status === "Nuevo" ? styles.newStatus : styles.pendingStatus}
              >
                {item.status}
              </Text>
            </View>
          </TouchableOpacity>
        )}
        style={styles.specialistList}
      />

      {/* Footer Restaurado */}
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
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    backgroundColor: "#FF497C",
    paddingTop: 50,
    paddingBottom: 20,
    paddingHorizontal: 15,
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
  specialist: {
    flex: 1,
    marginTop: 10,
    paddingHorizontal: 10,
  },
  specialistCard: {
    flexDirection: "row",
    backgroundColor: "#FFF",
    padding: 15,
    borderRadius: 10,
    marginBottom: 10,
    elevation: 3,
  },
  specialistImage: {
    width: 50,
    height: 50,
    borderRadius: 25,
  },
  specialistInfo: {
    marginLeft: 10,
  },
  specialistName: {
    fontSize: 16,
    fontWeight: "bold",
  },
  newStatus: {
    color: "#FF497C",
    fontWeight: "bold",
  },
  pendingStatus: {
    color: "#FFA500",
    fontWeight: "bold",
  },
  navBar: {
    flexDirection: "row",
    justifyContent: "space-around",
    paddingVertical: 10,
    backgroundColor: "#FF497C",
    borderRadius: 30,
    marginHorizontal: 10,
    marginBottom: 10,
  },
});

export default ProveedorHomeScreen;
