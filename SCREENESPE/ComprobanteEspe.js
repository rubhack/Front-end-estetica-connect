import React from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Platform,
  StatusBar,
} from "react-native";
import Ionicons from "react-native-vector-icons/Ionicons";
import * as Print from 'expo-print'; 
import { shareAsync } from 'expo-sharing';

const ComprobanteEspe = ({ route, navigation }) => {
    const { selectedDate, specialistData, selectedHour, fullName, age, rut, phone, gender, problem } = route.params;

    const generatePDF = async () => {
        const html = `
            <html>
                <head>
                    <style>
                        body { font-family: Arial, sans-serif; padding: 20px; }
                        h1 { color: #FF497C; }
                        p { font-size: 18px; }
                    </style>
                </head>
                <body>
                    <h1>Comprobante de Cita</h1>
                    <p><strong>Especialista:</strong> Dr. ${specialistData?.name || 'No Definido'}</p>
                    <p><strong>Fecha:</strong> ${selectedDate}</p>
                    <p><strong>Hora:</strong> ${selectedHour}</p>
                    <p><strong>Paciente:</strong> ${fullName}</p>
                    <p><strong>Edad:</strong> ${age}</p>
                    <p><strong>RUT:</strong> ${rut}</p>
                    <p><strong>Teléfono:</strong> ${phone}</p>
                    <p><strong>Género:</strong> ${gender}</p>
                    <p><strong>Descripción del problema:</strong> ${problem}</p>
                </body>
            </html>
        `;

        try {
            const { uri } = await Print.printToFileAsync({ html });
            await shareAsync(uri);
            alert("PDF generado con éxito");
            navigation.navigate("Calendarespe");
        } catch (error) {
            console.error("Error al generar el PDF:", error);
        }
    };

    return (
        <View style={styles.container}>
            {/* Header */}
            <View style={styles.header}>
                <TouchableOpacity onPress={() => navigation.goBack()}>
                    <Ionicons name="chevron-back" size={28} color="#FF497C" />
                </TouchableOpacity>
                <Text style={styles.title}>Comprobante de Cita</Text>
                <View style={{ width: 28 }} />
            </View>

            {/* Información del Comprobante */}
            <View style={styles.infoContainer}>
                <Text style={styles.infoText}><Text style={styles.boldText}>Especialista:</Text> Dr. {specialistData?.name}</Text>
                <Text style={styles.infoText}><Text style={styles.boldText}>Fecha:</Text> {selectedDate}</Text>
                <Text style={styles.infoText}><Text style={styles.boldText}>Hora:</Text> {selectedHour}</Text>
                <Text style={styles.infoText}><Text style={styles.boldText}>Paciente:</Text> {fullName}</Text>
                <Text style={styles.infoText}><Text style={styles.boldText}>Edad:</Text> {age}</Text>
                <Text style={styles.infoText}><Text style={styles.boldText}>RUT:</Text> {rut}</Text>
                <Text style={styles.infoText}><Text style={styles.boldText}>Teléfono:</Text> {phone}</Text>
                <Text style={styles.infoText}><Text style={styles.boldText}>Género:</Text> {gender}</Text>
                <Text style={styles.infoText}><Text style={styles.boldText}>Descripción del problema:</Text> {problem}</Text>
            </View>

            {/* Botón para Generar PDF */}
            <TouchableOpacity style={styles.downloadButton} onPress={generatePDF}>
                <Text style={styles.downloadButtonText}>Generar PDF</Text>
            </TouchableOpacity>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#FFF",
        padding: 20,
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
    infoContainer: {
        marginTop: 20,
        padding: 15,
        borderRadius: 10,
        backgroundColor: "#F5F5F5",
    },
    infoText: {
        fontSize: 16,
        marginBottom: 10,
        color: "#333",
    },
    boldText: {
        fontWeight: "bold",
    },
    downloadButton: {
        backgroundColor: "#FF497C",
        padding: 15,
        borderRadius: 10,
        alignItems: "center",
        marginTop: 20,
    },
    downloadButtonText: {
        color: "#FFF",
        fontSize: 16,
        fontWeight: "bold",
    },
});

export default ComprobanteEspe;
