import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  TextInput,
  ScrollView,
  Platform,
  StatusBar,
  Dimensions,
} from "react-native";
import Ionicons from "react-native-vector-icons/Ionicons";

const { width } = Dimensions.get("window");

const agendarcitapac = ({ route, navigation }) => {
  const { date, specialistData } = route.params; // Recibe la fecha y los datos del especialista

  const [patientType, setPatientType] = useState("Yo"); // "Yo" o "Otra persona"
  const [gender, setGender] = useState("Masculino"); // "Masculino", "Femenino", "Otro"
  const [problemDescription, setProblemDescription] = useState("");
  const [selectedHour, setSelectedHour] = useState(null);

  // Horarios disponibles (simulación, esto debería venir del backend)
  const availableHours = [
    "9:00 AM",
    "10:00 AM",
    "11:00 AM",
    "12:00 PM",
    "1:00 PM",
    "2:00 PM",
    "3:00 PM",
    "4:00 PM",
  ];

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Ionicons name="chevron-back" size={28} color="#FF497C" />
        </TouchableOpacity>
        <Text style={styles.title}>Agendar Cita</Text>
        <View style={{ width: 28 }} />
      </View>

      <ScrollView contentContainerStyle={styles.content}>
        {/* Nombre del especialista */}
        <View style={styles.specialistInfoContainer}>
          <Text style={styles.specialistName}>Dr. {specialistData.name}</Text>
          <Text style={styles.specialistDate}>Fecha seleccionada: {date}</Text>
        </View>

        {/* Selección de hora */}
        <View style={styles.sectionContainer}>
          <Text style={styles.sectionTitle}>Selecciona una hora</Text>
          <View style={styles.hoursContainer}>
            {availableHours.map((hour, index) => (
              <TouchableOpacity
                key={index}
                style={[
                  styles.hourButton,
                  selectedHour === hour && styles.selectedHourButton,
                ]}
                onPress={() => setSelectedHour(hour)}
              >
                <Text
                  style={[
                    styles.hourText,
                    selectedHour === hour && styles.selectedHourText,
                  ]}
                >
                  {hour}
                </Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>

        {/* Detalles del paciente */}
        <View style={styles.sectionContainer}>
          <Text style={styles.sectionTitle}>Detalles del Paciente</Text>
          <View style={styles.patientTypeContainer}>
            <TouchableOpacity
              style={[
                styles.patientTypeButton,
                patientType === "Yo" && styles.selectedButton,
              ]}
              onPress={() => setPatientType("Yo")}
            >
              <Text
                style={[
                  styles.patientTypeText,
                  patientType === "Yo" && styles.selectedButtonText,
                ]}
              >
                Yo
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[
                styles.patientTypeButton,
                patientType === "Otra persona" && styles.selectedButton,
              ]}
              onPress={() => setPatientType("Otra persona")}
            >
              <Text
                style={[
                  styles.patientTypeText,
                  patientType === "Otra persona" && styles.selectedButtonText,
                ]}
              >
                Otra persona
              </Text>
            </TouchableOpacity>
          </View>

          {patientType === "Otra persona" && (
            <>
              <TextInput
                style={styles.input}
                placeholder="Nombre Completo"
                placeholderTextColor="#AAA"
              />

              <TextInput
                style={styles.input}
                placeholder="Edad"
                placeholderTextColor="#AAA"
                keyboardType="numeric"
              />

              <TextInput
                style={styles.input}
                placeholder="RUT"
                placeholderTextColor="#AAA"
              />

              <TextInput
                style={styles.input}
                placeholder="Teléfono"
                placeholderTextColor="#AAA"
                keyboardType="phone-pad"
              />

              <View style={styles.genderContainer}>
                <TouchableOpacity
                  style={[
                    styles.genderButton,
                    gender === "Masculino" && styles.selectedButton,
                  ]}
                  onPress={() => setGender("Masculino")}
                >
                  <Text
                    style={[
                      styles.genderText,
                      gender === "Masculino" && styles.selectedButtonText,
                    ]}
                  >
                    Masculino
                  </Text>
                </TouchableOpacity>
                <TouchableOpacity
                  style={[
                    styles.genderButton,
                    gender === "Femenino" && styles.selectedButton,
                  ]}
                  onPress={() => setGender("Femenino")}
                >
                  <Text
                    style={[
                      styles.genderText,
                      gender === "Femenino" && styles.selectedButtonText,
                    ]}
                  >
                    Femenino
                  </Text>
                </TouchableOpacity>
                <TouchableOpacity
                  style={[
                    styles.genderButton,
                    gender === "Otro" && styles.selectedButton,
                  ]}
                  onPress={() => setGender("Otro")}
                >
                  <Text
                    style={[
                      styles.genderText,
                      gender === "Otro" && styles.selectedButtonText,
                    ]}
                  >
                    Otro
                  </Text>
                </TouchableOpacity>
              </View>
            </>
          )}
        </View>

        {/* Descripción del problema */}
        <View style={styles.sectionContainer}>
          <Text style={styles.sectionTitle}>Describe tu problema</Text>
          <TextInput
            style={styles.textArea}
            placeholder="Describe tu problema aquí..."
            placeholderTextColor="#AAA"
            multiline
            value={problemDescription}
            onChangeText={setProblemDescription}
          />
        </View>

        <TouchableOpacity
  style={styles.confirmButton}
  onPress={() =>
    navigation.navigate("Detallecita", {
      specialistData,
      date,
      time: selectedHour,
      patientDetails: {
        type: patientType,
        name: patientType === "Yo" ? "Tu Nombre" : "Nombre de Otra Persona", // Simulación
        age: patientType === "Yo" ? 30 : 25, // Simulación
        gender,
        problem: problemDescription,
      },
    })
  }
>
  <Text style={styles.confirmButtonText}>Confirmar Cita</Text>
</TouchableOpacity>

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
  specialistInfoContainer: {
    alignItems: "center",
    marginBottom: 20,
  },
  specialistName: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#333",
  },
  specialistDate: {
    fontSize: 14,
    color: "#555",
    marginTop: 5,
  },
  sectionContainer: {
    marginBottom: 20,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#333",
    marginBottom: 10,
  },
  hoursContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-around",
    marginBottom: 15,
  },
  hourButton: {
    padding: 10,
    borderRadius: 10,
    backgroundColor: "#F5F5F5",
    margin: 5,
  },
  selectedHourButton: {
    backgroundColor: "#FF497C",
  },
  hourText: {
    fontSize: 14,
    color: "#555",
  },
  selectedHourText: {
    color: "#FFF",
  },
  patientTypeContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 15,
  },
  patientTypeButton: {
    flex: 1,
    marginHorizontal: 5,
    padding: 10,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: "#FF497C",
    alignItems: "center",
  },
  selectedButton: {
    backgroundColor: "#FF497C",
  },
  patientTypeText: {
    color: "#FF497C",
  },
  selectedButtonText: {
    color: "#FFF",
  },
  input: {
    backgroundColor: "#F5F5F5",
    borderRadius: 10,
    padding: 15,
    fontSize: 16,
    marginBottom: 15,
  },
  genderContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  genderButton: {
    flex: 1,
    marginHorizontal: 5,
    padding: 10,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: "#FF497C",
    alignItems: "center",
  },
  genderText: {
    color: "#FF497C",
  },
  textArea: {
    backgroundColor: "#F5F5F5",
    borderRadius: 10,
    padding: 15,
    fontSize: 16,
    minHeight: 100,
    textAlignVertical: "top",
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
});

export default agendarcitapac;
