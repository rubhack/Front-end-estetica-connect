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
  Alert,
  Modal,
} from "react-native";
import Ionicons from "react-native-vector-icons/Ionicons";

// Datos de ejemplo para las citas
const sampleAppointments = [
  {
    id: 1,
    name: "Ana López",
    age: 29,
    condition: "Dolor muscular crónico",
    image: "https://centrointegraldepsicologia.com/wp-content/uploads/2023/06/El-Sindrome-de-la-Buena-Persona-Los-Limites-Olvidados-1024x576.png",
    status: "pendiente",
    comment: "",
  },
  {
    id: 2,
    name: "Carlos Pérez",
    age: 41,
    condition: "Rehabilitación postquirúrgica",
    image: "https://miro.medium.com/v2/resize:fit:1224/1*XKpA4-JcY06QcMOiPB1zaQ.jpeg",
    status: "finalizada",
    comment: "El paciente completó su sesión sin inconvenientes.",
  },
  {
    id: 3,
    name: "María González",
    age: 35,
    condition: "Tratamiento facial",
    image: "https://images.ecestaticos.com/-f-ySwBW7Mp-ggDplxXveJ0bCNQ=/0x0:991x445/992x446/filters:fill(white):format(jpg)/f.elconfidencial.com%2Foriginal%2F743%2F930%2F270%2F743930270aabd407a594e0f8b8d5dbe9.jpg",
    status: "pendiente",
    comment: "",
  },
];

const CitaDelDia = ({ route, navigation }) => {
  const { selectedDate } = route.params || {};
  const [appointments, setAppointments] = useState(sampleAppointments);
  const [selectedAppointment, setSelectedAppointment] = useState(null);
  const [modalVisible, setModalVisible] = useState(false);

  const handleCancelAppointment = (id) => {
    Alert.alert("Cita Cancelada", "La cita ha sido cancelada con éxito.");
    const updatedAppointments = appointments.map((appointment) =>
      appointment.id === id ? { ...appointment, status: "cancelada" } : appointment
    );
    setAppointments(updatedAppointments);
  };

  const handleViewDetails = (appointment) => {
    setSelectedAppointment(appointment);
    setModalVisible(true);
  };

  const handleNewAppointment = () => {
    navigation.navigate("AgendarCitaEspe", {
      selectedDate: selectedDate,
      specialistData: { name: "Nombre del Especialista" }
    });
  };

  const renderAppointmentCard = ({ item }) => (
    <View style={styles.card}>
      <Image source={{ uri: item.image }} style={styles.image} />
      <View style={styles.cardContent}>
        <Text style={styles.name}>{item.name}, {item.age}</Text>
        <Text style={styles.condition}>{item.condition}</Text>
        {item.status === "pendiente" ? (
          <TouchableOpacity
            style={styles.cancelButton}
            onPress={() => handleCancelAppointment(item.id)}
          >
            <Text style={styles.buttonText}>Cancelar</Text>
          </TouchableOpacity>
        ) : (
          <TouchableOpacity
            style={styles.finalizadaButton}
            onPress={() => handleViewDetails(item)}
          >
            <Text style={styles.buttonText}>Ver Detalles</Text>
          </TouchableOpacity>
        )}
      </View>
    </View>
  );

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Ionicons name="chevron-back" size={28} color="#FF497C" />
        </TouchableOpacity>
        <Text style={styles.title}>Citas del Día</Text>
        <TouchableOpacity onPress={handleNewAppointment}>
          <Ionicons name="add-circle-outline" size={28} color="#FF497C" />
        </TouchableOpacity>
      </View>

      {/* Fecha seleccionada */}
      <Text style={styles.selectedDateText}>Citas para el día: {selectedDate}</Text>

      {/* Lista de citas */}
      <FlatList
        data={appointments}
        keyExtractor={(item) => item.id.toString()}
        renderItem={renderAppointmentCard}
        contentContainerStyle={styles.list}
      />

      {/* Modal para Detalles de Cita Finalizada con estilo mejorado */}
      <Modal
        visible={modalVisible}
        animationType="fade"
        transparent={true}
        onRequestClose={() => setModalVisible(false)}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalContainer}>
            <Text style={styles.modalTitle}>Detalles de la Cita</Text>
            {selectedAppointment && (
              <>
                <Image source={{ uri: selectedAppointment.image }} style={styles.modalImage} />
                <Text style={styles.modalText}>Nombre: {selectedAppointment.name}</Text>
                <Text style={styles.modalText}>Edad: {selectedAppointment.age}</Text>
                <Text style={styles.modalText}>Condición: {selectedAppointment.condition}</Text>
                <Text style={styles.modalText}>Comentario: {selectedAppointment.comment || "Sin comentarios"}</Text>
              </>
            )}
            <TouchableOpacity
              style={styles.modalCloseButton}
              onPress={() => setModalVisible(false)}
            >
              <Text style={styles.closeButtonText}>Cerrar</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>

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
  selectedDateText: {
    textAlign: "center",
    fontSize: 18,
    fontWeight: "bold",
    color: "#FF497C",
    marginVertical: 10,
  },
  list: {
    paddingHorizontal: 10,
  },
  card: {
    flexDirection: "row",
    backgroundColor: "#F5F5F5",
    borderRadius: 15,
    padding: 15,
    marginVertical: 10,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 3,
  },
  image: {
    width: 60,
    height: 60,
    borderRadius: 30,
    marginRight: 15,
  },
  cardContent: {
    flex: 1,
  },
  name: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#333",
  },
  condition: {
    fontSize: 16,
    color: "#666",
    marginBottom: 5,
  },
  cancelButton: {
    backgroundColor: "#FF497C",
    padding: 10,
    borderRadius: 10,
    alignItems: "center",
  },
  finalizadaButton: {
    backgroundColor: "#FF497C",
    padding: 10,
    borderRadius: 10,
    alignItems: "center",
  },
  buttonText: {
    color: "#FFF",
    fontWeight: "bold",
    fontSize: 16,
  },
  modalOverlay: {
    flex: 1,
    justifyContent: "center",
    backgroundColor: "rgba(0,0,0,0.5)",
  },
  modalContainer: {
    backgroundColor: "#FFF",
    padding: 20,
    borderRadius: 20,
    alignItems: "center",
  },
  modalImage: {
    width: 100,
    height: 100,
    borderRadius: 50,
    marginBottom: 15,
  },
  modalTitle: {
    fontSize: 22,
    fontWeight: "bold",
    color: "#FF497C",
    marginBottom: 10,
  },
  modalText: {
    fontSize: 16,
    marginBottom: 10,
    color: "#333",
  },
  modalCloseButton: {
    backgroundColor: "#FF497C",
    padding: 12,
    borderRadius: 20,
    marginTop: 15,
  },
  closeButtonText: {
    color: "#FFF",
    fontWeight: "bold",
    textAlign: "center",
  },
});

export default CitaDelDia;
