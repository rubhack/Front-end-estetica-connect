import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Alert,
  Platform,
  StatusBar,
} from "react-native";
import { PieChart } from "react-native-chart-kit";
import * as FileSystem from "expo-file-system";
import * as Sharing from "expo-sharing";
import DateTimePicker from "@react-native-community/datetimepicker";
import { Dimensions } from "react-native";
import Ionicons from "react-native-vector-icons/Ionicons";

const screenWidth = Dimensions.get("window").width;

const Estadisticaespe = ({ navigation }) => {
  const citasData = {
    completadas: 45,
    canceladas: 10,
    pendientes: 20,
  };

  const pieData = [
    {
      name: "Completadas",
      cantidad: citasData.completadas,
      color: "#4CAF50",
      legendFontColor: "#333",
    },
    {
      name: "Canceladas",
      cantidad: citasData.canceladas,
      color: "#FF497C",
      legendFontColor: "#333",
    },
    {
      name: "Pendientes",
      cantidad: citasData.pendientes,
      color: "#FFC107",
      legendFontColor: "#333",
    },
  ];

  const [startDate, setStartDate] = useState(new Date());
  const [endDate, setEndDate] = useState(new Date());
  const [showStartDatePicker, setShowStartDatePicker] = useState(false);
  const [showEndDatePicker, setShowEndDatePicker] = useState(false);

  const handleShowDatePicker = (type) => {
    if (type === "start") {
      setShowStartDatePicker(true);
    } else {
      setShowEndDatePicker(true);
    }
  };

  const handleDateChange = (event, selectedDate, type) => {
    if (type === "start") {
      setStartDate(selectedDate || startDate);
      setShowStartDatePicker(false);
    } else {
      setEndDate(selectedDate || endDate);
      setShowEndDatePicker(false);
    }
  };

  const generateCSV = async () => {
    const csvData = `Fecha Inicio,${startDate.toLocaleDateString()}\nFecha Fin,${endDate.toLocaleDateString()}\nTipo de Cita,Cantidad\nCompletadas,${citasData.completadas}\nCanceladas,${citasData.canceladas}\nPendientes,${citasData.pendientes}\n`;

    const filePath = `${FileSystem.documentDirectory}estadisticas_especialista.csv`;

    try {
      await FileSystem.writeAsStringAsync(filePath, csvData, {
        encoding: FileSystem.EncodingType.UTF8,
      });
      Alert.alert("¡Éxito!", "El archivo CSV ha sido generado correctamente.");
      const canShare = await Sharing.isAvailableAsync();
      if (canShare) {
        await Sharing.shareAsync(filePath);
      } else {
        Alert.alert("Descarga", `El archivo ha sido guardado en: ${filePath}`);
      }
    } catch (error) {
      Alert.alert("Error", "No se pudo generar el archivo CSV.");
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Ionicons name="chevron-back" size={28} color="#FF497C" />
        </TouchableOpacity>
        <Text style={styles.title}>Estadísticas</Text>
        <View style={{ width: 30 }} />
      </View>

      <View style={styles.dateContainer}>
        <TouchableOpacity onPress={() => handleShowDatePicker("start")} style={styles.dateButton}>
          <Text style={styles.label}>Desde: {startDate.toLocaleDateString()}</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => handleShowDatePicker("end")} style={styles.dateButton}>
          <Text style={styles.label}>Hasta: {endDate.toLocaleDateString()}</Text>
        </TouchableOpacity>
      </View>

      {showStartDatePicker && (
        <DateTimePicker
          value={startDate}
          mode="date"
          display="default"
          onChange={(event, date) => handleDateChange(event, date, "start")}
        />
      )}
      {showEndDatePicker && (
        <DateTimePicker
          value={endDate}
          mode="date"
          display="default"
          onChange={(event, date) => handleDateChange(event, date, "end")}
        />
      )}

      <View style={styles.chartWrapper}>
        <View style={styles.chartContainer}>
          <PieChart
            data={pieData}
            width={screenWidth - 40}
            height={200}
            chartConfig={{
              backgroundColor: "#FFF",
              backgroundGradientFrom: "#FFF",
              backgroundGradientTo: "#FFF",
              decimalPlaces: 0,
              color: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
            }}
            accessor="cantidad"
            backgroundColor="transparent"
            paddingLeft="0"
            hasLegend={false}
            center={[(screenWidth - 40) / 4, 0]}
          />
        </View>
      </View>

      <View style={styles.statsContainer}>
        {pieData.map((item, index) => (
          <View key={index} style={styles.statRow}>
            <View style={[styles.legendColorBox, { backgroundColor: item.color }]} />
            <Text style={styles.statText}>
              {item.name}: {item.cantidad}
            </Text>
          </View>
        ))}
      </View>

      <TouchableOpacity style={styles.button} onPress={generateCSV}>
        <Text style={styles.buttonText}>Generar CSV</Text>
      </TouchableOpacity>

    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
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
  dateContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginVertical: 20,
  },
  dateButton: {
    padding: 15,
    backgroundColor: "#FF497C",
    borderRadius: 10,
    flex: 1,
    alignItems: "center",
    marginHorizontal: 5,
  },
  label: {
    fontSize: 16,
    color: "#FFF",
    fontWeight: "bold",
  },
  chartWrapper: {
    alignItems: 'center',
    justifyContent: 'center',
    marginVertical: 20,
  },
  chartContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    height: 200,
  },
  statsContainer: {
    backgroundColor: "#F8F8F8",
    borderRadius: 10,
    padding: 15,
    marginTop: 20,
  },
  statRow: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 10,
  },
  legendColorBox: {
    width: 20,
    height: 20,
    borderRadius: 5,
    marginRight: 10,
  },
  statText: {
    fontSize: 16,
    color: "#333",
  },
  button: {
    marginTop: 30,
    backgroundColor: "#FF497C",
    padding: 15,
    borderRadius: 10,
    alignItems: "center",
  },
  buttonText: {
    color: "#FFF",
    fontSize: 18,
    fontWeight: "bold",
  },
});

export default Estadisticaespe;