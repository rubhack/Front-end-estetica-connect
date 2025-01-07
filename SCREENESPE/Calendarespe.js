import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Platform,
  StatusBar,
  ActivityIndicator,
  ScrollView,
} from "react-native";
import { Calendar } from "react-native-calendars";
import Ionicons from "react-native-vector-icons/Ionicons";

// URL del ejemplo de API pública para obtener los días festivos
const HOLIDAY_API_URL = "https://date.nager.at/api/v3/PublicHolidays/2025/CL"; // Chile como ejemplo

const Calendarespe = ({ navigation, route }) => {
    const [selectedDate, setSelectedDate] = useState(new Date().toISOString().split('T')[0]);
    const [workingDays, setWorkingDays] = useState(["Monday", "Tuesday", "Wednesday"]);
    const [workHolidays, setWorkHolidays] = useState(false);
    const [holidays, setHolidays] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchHolidays = async () => {
            setLoading(true);
            try {
                const response = await fetch(HOLIDAY_API_URL);
                const data = await response.json();
                const holidayDates = data.map(holiday => holiday.date);
                setHolidays(holidayDates);
            } catch (error) {
                console.error("Error al obtener días festivos:", error);
            } finally {
                setLoading(false);
            }
        };
        fetchHolidays();
    }, []);

    useEffect(() => {
        if (route.params) {
            const { updatedWorkingDays, updatedWorkHolidays } = route.params;
            if (updatedWorkingDays) setWorkingDays(updatedWorkingDays);
            if (updatedWorkHolidays !== undefined) setWorkHolidays(updatedWorkHolidays);
        }
    }, [route.params]);

    const handleDayPress = (day) => {
        setSelectedDate(day.dateString);
        // Navegar a la pantalla CitaDelDia y pasar la fecha seleccionada
        navigation.navigate("CitaDelDia", { selectedDate: day.dateString });
    };

    const generateMarkedDates = () => {
        const markedDates = {};
        for (let i = 0; i < 365; i++) {
            const date = new Date();
            date.setDate(date.getDate() + i);
            const dayName = date.toLocaleDateString('en-US', { weekday: 'long' });
            const dateString = date.toISOString().split('T')[0];

            if (!workingDays.includes(dayName) || (!workHolidays && holidays.includes(dateString))) {
                markedDates[dateString] = {
                    disabled: true,
                    disableTouchEvent: true,
                    dotColor: 'grey',
                    textColor: 'grey',
                };
            } else {
                markedDates[dateString] = {
                    selected: true,
                    selectedColor: "#FF497C"
                };
            }
        }
        return markedDates;
    };

    const handleModifyAgenda = () => {
        navigation.navigate("ModificarAgenda", {
            currentWorkingDays: workingDays,
            currentWorkHolidays: workHolidays,
        });
    };

    return (
        <View style={styles.container}>
            {/* Header */}
            <View style={styles.header}>
                <TouchableOpacity onPress={() => navigation.goBack()}>
                    <Ionicons name="chevron-back" size={28} color="#FF497C" />
                </TouchableOpacity>
                <Text style={styles.title}>Calendario</Text>
                <View style={{ width: 28 }} />
            </View>

            {/* Cuerpo con Scroll para evitar desbordamientos */}
            <ScrollView contentContainerStyle={styles.scrollContent}>
                {/* Loading Spinner */}
                {loading ? (
                    <ActivityIndicator size="large" color="#FF497C" style={styles.spinner} />
                ) : (
                    <>
                     {/* Calendario */}
            <Calendar
                current={selectedDate}
                markedDates={generateMarkedDates()}
                onDayPress={handleDayPress}
                theme={{
                    selectedDayBackgroundColor: "#FF497C",
                    todayTextColor: "#FF497C",
                    arrowColor: "#FF497C",
                    textMonthFontWeight: "bold",
                    textDayHeaderFontWeight: "bold",
                }}
            />

                        {/* Leyenda Visual */}
                        <View style={styles.legendContainer}>
                            <View style={styles.legendItem}>
                                <View style={[styles.legendDot, { backgroundColor: "#FF497C" }]} />
                                <Text style={styles.legendText}>Días hábiles</Text>
                            </View>
                            <View style={styles.legendItem}>
                                <View style={[styles.legendDot, { backgroundColor: "grey" }]} />
                                <Text style={styles.legendText}>Días no hábiles</Text>
                            </View>
                        </View>

                        {/* Texto Descriptivo en Banner */}
                        <View style={styles.banner}>
                            <Text style={styles.bannerText}>
                                Selecciona un día para visualizar tus citas o agendar una nueva para un cliente especial.
                            </Text>
                        </View>

                        {/* Botón Modificar Agenda centrado */}
                        <TouchableOpacity style={styles.modifyButton} onPress={handleModifyAgenda}>
                            <Text style={styles.modifyButtonText}>Modificar Agenda</Text>
                        </TouchableOpacity>
                    </>
                )}
            </ScrollView>

            {/* Footer Fijo al Fondo */}
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
        paddingHorizontal: 15,
        paddingVertical: 10,
        paddingTop: Platform.OS === "android" ? StatusBar.currentHeight + 10 : 50,
        borderBottomWidth: 1,
        borderBottomColor: "#EEE",
    },
    title: {
        fontSize: 20,
        fontWeight: "bold",
        color: "#FF497C",
    },
    scrollContent: {
        flexGrow: 1,
        paddingBottom: 20, 
    },
    legendContainer: {
        flexDirection: "row",
        justifyContent: "center",
        alignItems: "center",
        marginVertical: 20,
    },
    legendItem: {
        flexDirection: "row",
        alignItems: "center",
        marginHorizontal: 10,
    },
    legendDot: {
        width: 20,
        height: 20,
        borderRadius: 10,
        marginRight: 8,
    },
    legendText: {
        fontSize: 16,
        color: "#333",
    },
    banner: {
        backgroundColor: "#FFC0CB", 
        borderRadius: 15,
        padding: 15,
        marginHorizontal: 20,
        marginBottom: 20,
        alignItems: "center",
    },
    bannerText: {
        fontSize: 14,
        fontWeight: "bold",
        color: "#333",
        textAlign: "center",
    },
    modifyButton: {
        backgroundColor: "#FF497C",
        borderRadius: 10,
        padding: 15,
        alignItems: "center",
        marginHorizontal: 20,
        marginBottom: 20,
    },
    modifyButtonText: {
        color: "#FFF",
        fontSize: 16,
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
    spinner: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
    }
});

export default Calendarespe;
