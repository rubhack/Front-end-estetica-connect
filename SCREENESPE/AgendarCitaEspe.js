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

const AgendarCitaEspe = ({ route, navigation }) => {
    const { selectedDate, specialistData } = route.params || {}; 

    const [fullName, setFullName] = useState("");
    const [age, setAge] = useState("");
    const [rut, setRut] = useState("");
    const [phone, setPhone] = useState("");
    const [gender, setGender] = useState("Masculino");
    const [problemDescription, setProblemDescription] = useState("");
    const [selectedHour, setSelectedHour] = useState(null);

    // Horarios disponibles (simulación)
    const availableHours = [
        "9:00 AM", "10:00 AM", "11:00 AM",
        "12:00 PM", "1:00 PM", "2:00 PM", "3:00 PM", "4:00 PM"
    ];

    const handleConfirmAppointment = () => {
        if (!fullName || !age || !rut || !phone || !selectedHour) {
            alert("Por favor complete todos los campos.");
            return;
        }
        alert("Cita Agendada con éxito");
        navigation.navigate("ComprobanteEspe", {
            specialistData,
            selectedDate,
            selectedHour,
            fullName,
            age,
            rut,
            phone,
            gender,
            problem: problemDescription,
        });
    };

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
                {/* Especialista y Fecha */}
                <View style={styles.specialistInfoContainer}>
                    <Text style={styles.specialistName}>
                        {specialistData?.name ? `Dr. ${specialistData.name}` : "Especialista no definido"}
                    </Text>
                    <Text style={styles.specialistDate}>
                        {selectedDate ? `Fecha seleccionada: ${selectedDate}` : "Fecha no seleccionada"}
                    </Text>
                </View>

                {/* Selección de Hora */}
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

                {/* Detalles del Paciente */}
                <View style={styles.sectionContainer}>
                    <Text style={styles.sectionTitle}>Detalles del Paciente</Text>
                    <TextInput
                        style={styles.input}
                        placeholder="Nombre Completo"
                        placeholderTextColor="#AAA"
                        value={fullName}
                        onChangeText={setFullName}
                    />
                    <TextInput
                        style={styles.input}
                        placeholder="Edad"
                        placeholderTextColor="#AAA"
                        keyboardType="numeric"
                        value={age}
                        onChangeText={setAge}
                    />
                    <TextInput
                        style={styles.input}
                        placeholder="RUT"
                        placeholderTextColor="#AAA"
                        value={rut}
                        onChangeText={setRut}
                    />
                    <TextInput
                        style={styles.input}
                        placeholder="Teléfono"
                        placeholderTextColor="#AAA"
                        keyboardType="phone-pad"
                        value={phone}
                        onChangeText={setPhone}
                    />

                    {/* Selección de Género */}
                    <View style={styles.genderContainer}>
                        {["Masculino", "Femenino", "Otro"].map((option) => (
                            <TouchableOpacity
                                key={option}
                                style={[
                                    styles.genderButton,
                                    gender === option && styles.selectedButton,
                                ]}
                                onPress={() => setGender(option)}
                            >
                                <Text
                                    style={[
                                        styles.genderText,
                                        gender === option && styles.selectedButtonText,
                                    ]}
                                >
                                    {option}
                                </Text>
                            </TouchableOpacity>
                        ))}
                    </View>
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

                {/* Botón Confirmar Cita */}
                <TouchableOpacity
                    style={styles.confirmButton}
                    onPress={handleConfirmAppointment}
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
        marginBottom: 15,
    },
    genderButton: {
        flex: 1,
        padding: 10,
        marginHorizontal: 5,
        borderRadius: 10,
        borderWidth: 1,
        borderColor: "#FF497C",
        alignItems: "center",
    },
    genderText: {
        color: "#FF497C",
    },
    selectedButton: {
        backgroundColor: "#FF497C",
    },
    selectedButtonText: {
        color: "#FFF",
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

export default AgendarCitaEspe;
