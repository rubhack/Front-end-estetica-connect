import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  Platform,
  StatusBar,
  TouchableOpacity,
  ScrollView,
  TextInput,
} from "react-native";
import Ionicons from "react-native-vector-icons/Ionicons";
import { LineChart, BarChart } from "react-native-chart-kit";

// Datos de ejemplo para estadísticas
const sampleStats = {
  topSellingProducts: [
    { name: "Serum Facial", sold: 120 },
    { name: "Crema Anti-edad", sold: 95 },
    { name: "Aceite Corporal", sold: 80 },
  ],
  leastSellingProducts: [
    { name: "Kit Facial", sold: 10 },
    { name: "Mascarilla Facial", sold: 15 },
  ],
  topClients: [
    { name: "Dr. Ana López", purchases: 30 },
    { name: "Dr. Carlos Pérez", purchases: 25 },
  ],
  totalRevenue: 1500000, // En CLP
  // Datos para gráficos
  monthlyRevenue: {
    labels: ["Ene", "Feb", "Mar", "Abr", "May", "Jun"],
    datasets: [{
      data: [1200000, 1300000, 1400000, 1500000, 1600000, 1500000]
    }]
  }
};

const EstadisticaProve = ({ navigation }) => {
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');

  const renderStatItem = ({ item }) => (
    <View style={styles.statCard}>
      <Text style={styles.statItemName}>{item.name}</Text>
      <Text style={styles.statItemValue}>{item.sold || item.purchases} ventas</Text>
    </View>
  );

  const chartConfig = {
    backgroundGradientFrom: "#fff",
    backgroundGradientTo: "#fff",
    color: (opacity = 1) => `rgba(255, 73, 124, ${opacity})`,
    strokeWidth: 2,
    decimalPlaces: 0,
  };

  const handleDateChange = (text, setDate) => {
    // Permite solo números y /
    const formattedText = text.replace(/[^\d/]/g, '');
    
    // Agrega automáticamente las barras (/)
    let finalText = formattedText;
    if (formattedText.length === 2 && !formattedText.includes('/')) {
      finalText = formattedText + '/';
    } else if (formattedText.length === 5 && formattedText.split('/').length === 2) {
      finalText = formattedText + '/';
    }
    
    // Limita la longitud total a 10 caracteres (DD/MM/AAAA)
    if (finalText.length <= 10) {
      setDate(finalText);
    }
  };

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Ionicons name="chevron-back" size={28} color="#FF497C" />
        </TouchableOpacity>
        <Text style={styles.title}>Estadísticas</Text>
        <View style={{ width: 28 }} />
      </View>

      {/* ScrollView principal */}
      <ScrollView style={styles.mainContainer}>
        {/* Filtro de fechas */}
        <View style={styles.dateFilter}>
          <Text style={styles.dateFilterTitle}>Filtrar por fecha</Text>
          <View style={styles.dateInputContainer}>
            <View style={styles.dateInputWrapper}>
              <Text style={styles.dateLabel}>Desde:</Text>
              <TextInput
                style={styles.dateInput}
                placeholder="DD/MM/AAAA"
                value={startDate}
                onChangeText={(text) => handleDateChange(text, setStartDate)}
                keyboardType="numeric"
              />
            </View>
            <View style={styles.dateInputWrapper}>
              <Text style={styles.dateLabel}>Hasta:</Text>
              <TextInput
                style={styles.dateInput}
                placeholder="DD/MM/AAAA"
                value={endDate}
                onChangeText={(text) => handleDateChange(text, setEndDate)}
                keyboardType="numeric"
              />
            </View>
          </View>
        </View>

        {/* Total de Ventas */}
        <View style={styles.revenueCard}>
          <Text style={styles.revenueTitle}>Total en Ventas</Text>
          <Text style={styles.revenueAmount}>
            ${sampleStats.totalRevenue.toLocaleString("es-CL")}
          </Text>
        </View>

        {/* Gráfico de ventas mensuales */}
        <View style={styles.chartContainer}>
          <Text style={styles.sectionTitle}>Ventas Mensuales</Text>
          <LineChart
            data={sampleStats.monthlyRevenue}
            width={Platform.OS === 'web' ? 600 : 350}
            height={220}
            chartConfig={chartConfig}
            bezier
            style={styles.chart}
          />
        </View>

        {/* Productos Más Vendidos */}
        <View style={styles.sectionHeader}>
          <Text style={styles.sectionTitle}>Productos Más Vendidos</Text>
        </View>
        <BarChart
          data={{
            labels: sampleStats.topSellingProducts.map(p => p.name.split(' ')[0]),
            datasets: [{
              data: sampleStats.topSellingProducts.map(p => p.sold)
            }]
          }}
          width={Platform.OS === 'web' ? 600 : 350}
          height={220}
          chartConfig={chartConfig}
          style={styles.chart}
          showValuesOnTopOfBars
        />
        <FlatList
          data={sampleStats.topSellingProducts}
          keyExtractor={(item, index) => index.toString()}
          renderItem={renderStatItem}
          scrollEnabled={false}
          contentContainerStyle={styles.flatListContainer}
        />

        {/* Productos Menos Vendidos */}
        <View style={styles.sectionHeader}>
          <Text style={styles.sectionTitle}>Productos Menos Vendidos</Text>
        </View>
        <BarChart
          data={{
            labels: sampleStats.leastSellingProducts.map(p => p.name.split(' ')[0]),
            datasets: [{
              data: sampleStats.leastSellingProducts.map(p => p.sold)
            }]
          }}
          width={Platform.OS === 'web' ? 600 : 350}
          height={220}
          chartConfig={chartConfig}
          style={styles.chart}
          showValuesOnTopOfBars
        />
        <FlatList
          data={sampleStats.leastSellingProducts}
          keyExtractor={(item, index) => index.toString()}
          renderItem={renderStatItem}
          scrollEnabled={false}
          contentContainerStyle={styles.flatListContainer}
        />

        {/* Clientes con Más Compras */}
        <View style={styles.sectionHeader}>
          <Text style={styles.sectionTitle}>Clientes con Más Compras</Text>
        </View>
        <BarChart
          data={{
            labels: sampleStats.topClients.map(c => c.name.split(' ')[1]),
            datasets: [{
              data: sampleStats.topClients.map(c => c.purchases)
            }]
          }}
          width={Platform.OS === 'web' ? 600 : 350}
          height={220}
          chartConfig={chartConfig}
          style={styles.chart}
          showValuesOnTopOfBars
        />
        <FlatList
          data={sampleStats.topClients}
          keyExtractor={(item, index) => index.toString()}
          renderItem={renderStatItem}
          scrollEnabled={false}
          contentContainerStyle={styles.flatListContainer}
        />
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
    paddingHorizontal: 20,
    paddingTop: Platform.OS === "android" ? StatusBar.currentHeight + 10 : 50,
    paddingBottom: 10,
    borderBottomWidth: 1,
    borderColor: "#EEE",
  },
  title: {
    fontSize: 22,
    fontWeight: "bold",
    color: "#FF497C",
  },
  mainContainer: {
    flex: 1,
    paddingHorizontal: 20,
  },
  dateFilter: {
    marginVertical: 15,
  },
  dateFilterTitle: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#333",
    marginBottom: 10,
  },
  dateInputContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  dateInputWrapper: {
    width: "48%",
  },
  dateLabel: {
    fontSize: 14,
    color: "#666",
    marginBottom: 5,
  },
  dateInput: {
    backgroundColor: "#F8F8F8",
    padding: 10,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: "#EEE",
  },
  revenueCard: {
    backgroundColor: "#FF497C",
    padding: 20,
    borderRadius: 20,
    alignItems: "center",
    marginBottom: 20,
    shadowColor: "#000",
    shadowOpacity: 0.2,
    shadowRadius: 5,
    elevation: 5,
  },
  revenueTitle: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#FFF",
  },
  revenueAmount: {
    fontSize: 28,
    fontWeight: "bold",
    color: "#FFF",
    marginTop: 10,
  },
  chartContainer: {
    marginVertical: 15,
  },
  chart: {
    marginVertical: 8,
    borderRadius: 16,
  },
  sectionHeader: {
    marginTop: 20,
    marginBottom: 10,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#FF497C",
  },
  flatListContainer: {
    paddingBottom: 10,
  },
  statCard: {
    backgroundColor: "#F8F8F8",
    borderRadius: 15,
    padding: 15,
    marginVertical: 5,
    borderWidth: 1,
    borderColor: "#EEE",
  },
  statItemName: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#333",
  },
  statItemValue: {
    fontSize: 14,
    color: "#777",
    marginTop: 5,
  },
});

export default EstadisticaProve;