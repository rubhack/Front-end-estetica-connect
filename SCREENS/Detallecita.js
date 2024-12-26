import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Image,
  Dimensions,
  Platform,
  StatusBar,
  Modal,
  Alert,
} from "react-native";
import Ionicons from "react-native-vector-icons/Ionicons";
import * as Print from "expo-print";
import { shareAsync } from "expo-sharing";

const { width } = Dimensions.get("window");

const Detallecita = ({ route, navigation }) => {
  const { specialistData, date, time, patientDetails, price } = route.params;
  const [modalVisible, setModalVisible] = useState(false);

  const generatePDF = async () => {
    const html = `
      <html>
        <body style="font-family: Arial, sans-serif; padding: 20px;">
          <h1 style="color: #FF497C; text-align: center;">Detalles de la Cita</h1>
          <h2 style="color: #333;">Especialista</h2>
          <p><strong>Nombre:</strong> Dr. ${specialistData.name}</p>
          <p><strong>Fecha:</strong> ${date}</p>
          <p><strong>Hora:</strong> ${time}</p>
          <h2 style="color: #333;">Detalles del Paciente</h2>
          <p><strong>Reservado para:</strong> ${patientDetails.type}</p>
          <p><strong>Nombre Completo:</strong> ${patientDetails.name}</p>
          <p><strong>Edad:</strong> ${patientDetails.age}</p>
          <p><strong>Género:</strong> ${patientDetails.gender}</p>
          <h2 style="color: #333;">Problema</h2>
          <p>${patientDetails.problem}</p>
          <h2 style="color: #333;">Valor de la Cita</h2>
          <p><strong>${price}</strong></p>
          <h2 style="color: #333;">Número de Cita</h2>
          <p><strong>${Math.floor(Math.random() * 1000000)}</strong></p>
        </body>
      </html>
    `;

    const { uri } = await Print.printToFileAsync({ html });
    await shareAsync(uri, { UTI: "application/pdf", mimeType: "application/pdf" });
  };

  const handleConfirm = () => {
    setModalVisible(true);
  };

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Ionicons name="chevron-back" size={28} color="#FF497C" />
        </TouchableOpacity>
        <Text style={styles.title}>Tu Cita</Text>
        <View style={{ width: 28 }} /> 
      </View>

      <View style={styles.content}>
        {/* Detalles del especialista */}
        <View style={styles.specialistCard}>
          <Image source={{ uri: specialistData.image }} style={styles.image} />
          <View style={styles.specialistInfo}>
            <Text style={styles.specialistName}>Dr. {specialistData.name}</Text>
            <View style={styles.ratingContainer}>
              <Ionicons name="star" size={16} color="#FFD700" />
              <Text style={styles.ratingText}>{specialistData.rating}</Text>
              <Text style={styles.reviewsText}>
                ({specialistData.reviews} reseñas)
              </Text>
            </View>
          </View>
        </View>

        {/* Fecha y hora */}
        <View style={styles.dateTimeContainer}>
          <Text style={styles.dateText}>{date}</Text>
          <View style={styles.timeContainer}>
            <Text style={styles.timeText}>{time}</Text>
            <Ionicons name="checkmark-circle" size={28} color="#FF497C" />
          </View>
        </View>

        {/* Detalles del paciente */}
        <View style={styles.bannerContainer}>
          <Text style={styles.sectionTitle}>Detalles del Paciente</Text>
          <View style={styles.bannerContent}>
            <Text style={styles.detailText}>
              <Text style={styles.detailLabel}>Reservado para: </Text>
              {patientDetails.type}
            </Text>
            <Text style={styles.detailText}>
              <Text style={styles.detailLabel}>Nombre Completo: </Text>
              {patientDetails.name}
            </Text>
            <Text style={styles.detailText}>
              <Text style={styles.detailLabel}>Edad: </Text>
              {patientDetails.age}
            </Text>
            <Text style={styles.detailText}>
              <Text style={styles.detailLabel}>Género: </Text>
              {patientDetails.gender}
            </Text>
          </View>
        </View>

        {/* Problema descrito */}
        <View style={styles.bannerContainer}>
          <Text style={styles.sectionTitle}>Problema</Text>
          <View style={styles.bannerContent}>
            <Text style={styles.problemText}>{patientDetails.problem}</Text>
          </View>
        </View>

        {/* Valor de la cita */}
        <View style={styles.priceContainer}>
          <Text style={styles.sectionTitle}>Valor de la Cita</Text>
          <Text style={styles.priceText}>${price}</Text>
        </View>
      </View>

      {/* Footer */}
      <View style={styles.footer}>
        <TouchableOpacity style={styles.confirmButton} onPress={handleConfirm}>
          <Text style={styles.confirmButtonText}>Confirmar</Text>
        </TouchableOpacity>
      </View>

      {/* Modal */}
      <Modal
        visible={modalVisible}
        animationType="slide"
        transparent
        onRequestClose={() => setModalVisible(false)}
      >
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <Text style={styles.modalText}>¡Cita agendada con éxito!</Text>
            <TouchableOpacity style={styles.modalButton} onPress={generatePDF}>
              <Text style={styles.modalButtonText}>Descargar PDF</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.modalCloseButton}
              onPress={() => {
                setModalVisible(false);
                navigation.navigate("PatientHomeScreen");
              }}
            >
              <Text style={styles.modalCloseButtonText}>Cerrar</Text>
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
  content: {
    padding: 15,
    flex: 1,
  },
  specialistCard: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#F5F5F5",
    borderRadius: 10,
    padding: 10,
    marginBottom: 20,
  },
  image: {
    width: 80,
    height: 80,
    borderRadius: 40,
    marginRight: 15,
  },
  specialistInfo: {
    flex: 1,
  },
  specialistName: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#333",
  },
  ratingContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 5,
  },
  ratingText: {
    fontSize: 14,
    marginLeft: 5,
    color: "#FFD700",
  },
  reviewsText: {
    fontSize: 12,
    color: "#777",
    marginLeft: 5,
  },
  dateTimeContainer: {
    backgroundColor: "#FFF3F7",
    padding: 15,
    borderRadius: 10,
    marginBottom: 20,
    alignItems: "center",
  },
  dateText: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#333",
  },
  timeContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 10,
  },
  timeText: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#333",
    marginRight: 10,
  },
  bannerContainer: {
    backgroundColor: "#FFF5F8",
    borderRadius: 10,
    padding: 15,
    marginBottom: 20,
    elevation: 3,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 3,
  },
  bannerContent: {
    backgroundColor: "#FFF",
    borderRadius: 10,
    padding: 10,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#333",
    marginBottom: 10,
  },
  detailText: {
    fontSize: 14,
    color: "#555",
    marginBottom: 5,
  },
  detailLabel: {
    fontWeight: "bold",
    color: "#333",
  },
  problemText: {
    fontSize: 14,
    color: "#555",
    lineHeight: 20,
  },
  priceContainer: {
    backgroundColor: "#FFF3F7",
    borderRadius: 10,
    padding: 15,
    alignItems: "center",
    marginBottom: 20,
  },
  priceText: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#FF497C",
  },
  footer: {
    padding: 15,
    borderTopWidth: 1,
    borderTopColor: "#EEE",
    backgroundColor: "#FFF",
  },
  confirmButton: {
    backgroundColor: "#FF497C",
    padding: 15,
    borderRadius: 10,
    alignItems: "center",
  },
  confirmButtonText: {
    color: "#FFF",
    fontSize: 16,
    fontWeight: "bold",
  },
  modalContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  },
  modalContent: {
    width: width * 0.8,
    backgroundColor: "#FFF",
    borderRadius: 10,
    padding: 20,
    alignItems: "center",
  },
  modalText: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#333",
    marginBottom: 15,
    textAlign: "center",
  },
  modalButton: {
    backgroundColor: "#FF497C",
    padding: 10,
    borderRadius: 10,
    alignItems: "center",
    marginBottom: 10,
    width: "100%",
  },
  modalButtonText: {
    color: "#FFF",
    fontSize: 16,
    fontWeight: "bold",
  },
  modalCloseButton: {
    backgroundColor: "#CCC",
    padding: 10,
    borderRadius: 10,
    alignItems: "center",
    width: "100%",
  },
  modalCloseButtonText: {
    color: "#333",
    fontSize: 16,
    fontWeight: "bold",
  },
});

export default Detallecita;
