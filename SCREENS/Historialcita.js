import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  FlatList,
  Dimensions,
  Platform,
  StatusBar, 
} from "react-native";
import Ionicons from "react-native-vector-icons/Ionicons";

const { width } = Dimensions.get("window");

const sampleData = {
  complete: [
    {
      id: 1,
      name: "Dr. Olivia Turner, M.D.",
      specialty: "Dermato-Endocrinology",
      rating: 5,
      image: "https://via.placeholder.com/80",
    },
    {
      id: 2,
      name: "Dr. Alexander Bennett, Ph.D.",
      specialty: "Dermato-Genetics",
      rating: 4,
      image: "https://via.placeholder.com/80",
    },
  ],
  upcoming: [
    {
      id: 3,
      name: "Dr. Sophia Martinez, Ph.D.",
      specialty: "Cosmetic Bioengineering",
      date: "Tuesday, 15 June",
      time: "9:30 AM - 10:00 AM",
      image: "https://via.placeholder.com/80",
    },
  ],
  cancelled: [
    {
      id: 4,
      name: "Dr. Michael Davidson, M.D.",
      specialty: "Nano-Dermatology",
      image: "https://via.placeholder.com/80",
    },
  ],
};

const Historialcita = ({ navigation }) => {
  const [selectedTab, setSelectedTab] = useState("complete");

  const renderItem = ({ item }) => (
    <View style={styles.card}>
      <View style={styles.cardContent}>
        <View style={styles.cardImageContainer}>
          <View style={styles.cardImage}>
            <Ionicons name="person-circle-outline" size={40} color="#FFF" />
          </View>
        </View>
        <View style={styles.cardInfo}>
          <Text style={styles.cardTitle}>{item.name}</Text>
          <Text style={styles.cardSubtitle}>{item.specialty}</Text>
          {selectedTab === "upcoming" && (
            <Text style={styles.cardDateTime}>{`${item.date} | ${item.time}`}</Text>
          )}
        </View>
      </View>

      <View style={styles.cardActions}>
        {selectedTab === "complete" && (
          <>
            <TouchableOpacity style={styles.actionButton}>
              <Text style={styles.actionButtonText}>Re-Agendar</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.actionButton}>
              <Text style={styles.actionButtonText}>Detalles</Text>
            </TouchableOpacity>
          </>
        )}
        {selectedTab === "upcoming" && (
          <>
            <TouchableOpacity style={styles.completeButton} 
             onPress={() =>  navigation.navigate("Citacompletada") }
             >
              <Text style={styles.actionButtonText}>Completar</Text>
            </TouchableOpacity>
            <TouchableOpacity
             style={styles.cancelButton}
            onPress={() =>  navigation.navigate("Cancelarcita") }
             >
             <Text style={styles.cancelButtonText}>Cancelar</Text>
            </TouchableOpacity>
         </>
        )}
        {selectedTab === "cancelled" && (
          <TouchableOpacity style={styles.actionButton}>
            <Text style={styles.actionButtonText}>Re-Agendar</Text>
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
        <Text style={styles.title}>Historial de Citas</Text>
        <View style={{ width: 28 }} />
      </View>

      {/* Tabs */}
      <View style={styles.tabsContainer}>
        <TouchableOpacity
          style={[
            styles.tab,
            selectedTab === "complete" && styles.selectedTab,
          ]}
          onPress={() => setSelectedTab("complete")}
        >
          <Text
            style={[
              styles.tabText,
              selectedTab === "complete" && styles.selectedTabText,
            ]}
          >
            Completa
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[
            styles.tab,
            selectedTab === "upcoming" && styles.selectedTab,
          ]}
          onPress={() => setSelectedTab("upcoming")}
        >
          <Text
            style={[
              styles.tabText,
              selectedTab === "upcoming" && styles.selectedTabText,
            ]}
          >
            En Proceso
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[
            styles.tab,
            selectedTab === "cancelled" && styles.selectedTab,
          ]}
          onPress={() => setSelectedTab("cancelled")}
        >
          <Text
            style={[
              styles.tabText,
              selectedTab === "cancelled" && styles.selectedTabText,
            ]}
          >
            Cancelada
          </Text>
        </TouchableOpacity>
      </View>

      {/* List */}
      <FlatList
        data={sampleData[selectedTab]}
        renderItem={renderItem}
        keyExtractor={(item) => item.id.toString()}
        contentContainerStyle={styles.listContainer}
      />

      {/* Footer */}
      <View style={styles.footer}>
        <TouchableOpacity onPress={() => navigation.navigate("PatientHomeScreen")}>
          <Ionicons name="home-outline" size={28} color="#FFF" />
        </TouchableOpacity>
        <TouchableOpacity onPress={() => navigation.navigate("PatientProfileScreen")}>
          <Ionicons name="person-outline" size={28} color="#FFF" />
        </TouchableOpacity>
        <TouchableOpacity onPress={() => navigation.navigate("Historialcita")}>
          <Ionicons name="calendar-outline" size={28} color="#FFF" />
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
  tabsContainer: {
    flexDirection: "row",
    justifyContent: "space-around",
    backgroundColor: "#F5F5F5",
    paddingVertical: 10,
  },
  tab: {
    padding: 10,
    borderRadius: 20,
  },
  selectedTab: {
    backgroundColor: "#FF497C",
  },
  tabText: {
    color: "#999",
    fontSize: 14,
  },
  selectedTabText: {
    color: "#FFF",
    fontWeight: "bold",
  },
  listContainer: {
    paddingHorizontal: 15,
    paddingBottom: 80,
  },
  card: {
    backgroundColor: "#FFF",
    borderRadius: 10,
    padding: 15,
    marginBottom: 15,
    elevation: 3,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 5,
  },
  cardContent: {
    flexDirection: "row",
    alignItems: "center",
  },
  cardImageContainer: {
    marginRight: 15,
  },
  cardImage: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: "#FF497C",
    justifyContent: "center",
    alignItems: "center",
  },
  cardInfo: {
    flex: 1,
  },
  cardTitle: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#333",
  },
  cardSubtitle: {
    fontSize: 14,
    color: "#777",
    marginTop: 5,
  },
  cardDateTime: {
    fontSize: 12,
    color: "#555",
    marginTop: 5,
  },
  cardActions: {
    flexDirection: "row",
    justifyContent: "space-around",
    marginTop: 10,
  },
  actionButton: {
    backgroundColor: "#FF497C",
    borderRadius: 10,
    paddingVertical: 8,
    paddingHorizontal: 15,
  },
  actionButtonText: {
    color: "#FFF",
    fontSize: 14,
    fontWeight: "bold",
  },
  cancelButton: {
    backgroundColor: "#FF1E5B",
    borderRadius: 10,
    paddingVertical: 8,
    paddingHorizontal: 15,
  },
  cancelButtonText: {
    color: "#FFF",
    fontSize: 14,
    fontWeight: "bold",
  },
  completeButton: {
    backgroundColor: "#4CAF50", // Verde para indicar completado
    borderRadius: 10,
    paddingVertical: 8,
    paddingHorizontal: 15,
    alignItems: "center",
    justifyContent: "center",
  },  
  footer: {
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center",
    paddingVertical: 10,
    backgroundColor: "#FF497C",
    position: "absolute",
    bottom: 0,
    width: "100%",
  },
});

export default Historialcita;
