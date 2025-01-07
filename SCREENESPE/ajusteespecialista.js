import React from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Dimensions,
  Image,
} from "react-native";
import Ionicons from "react-native-vector-icons/Ionicons";

const { width } = Dimensions.get("window");

const ajusteespecialista = ({ navigation }) => {
  const handleLogout = () => {
    // Aquí puedes limpiar el estado o realizar cualquier otra acción necesaria
    navigation.replace("EspecialistaLogScreen"); // Redirige a la pantalla de inicio de sesión
  };

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Ionicons name="chevron-back" size={28} color="#FF497C" />
        </TouchableOpacity>
        <Text style={styles.title}>Mi Perfil</Text>
        <View style={{ width: 28 }} />
      </View>

      {/* Perfil del usuario */}
      <View style={styles.profileContainer}>
        <Image
          source={{
            uri: "https://www.clinicalaparva.cl/wp-content/uploads/2019/02/Dr.Vidal650x650.jpg",
          }}
          style={styles.profileImage}
        />
        <Text style={styles.userName}>John Doe</Text>
      </View>

      {/* Opciones */}
      <View style={styles.optionsContainer}>
        <TouchableOpacity style={styles.option} onPress={() => navigation.navigate("updateperfilespe")}>
          <Ionicons name="person-outline" size={24} color="#FF497C" />
          <Text style={styles.optionText}>Perfil</Text>
          <Ionicons name="chevron-forward" size={24} color="#FF497C" />
        </TouchableOpacity>

        <TouchableOpacity style={styles.option}>
          <Ionicons name="card-outline" size={24} color="#FF497C" />
          <Text style={styles.optionText}>Métodos de Pago</Text>
          <Ionicons name="chevron-forward" size={24} color="#FF497C" />
        </TouchableOpacity>

        <TouchableOpacity style={styles.option}>
          <Ionicons name="lock-closed-outline" size={24} color="#FF497C" />
          <Text style={styles.optionText}>Política de Privacidad</Text>
          <Ionicons name="chevron-forward" size={24} color="#FF497C" />
        </TouchableOpacity>

        <TouchableOpacity style={styles.option} onPress={() => navigation.navigate("settingespe")}>
          <Ionicons name="settings-outline" size={24} color="#FF497C" />
          <Text style={styles.optionText}>Ajustes</Text>
          <Ionicons name="chevron-forward" size={24} color="#FF497C" />
        </TouchableOpacity>

        <TouchableOpacity style={styles.option}>
          <Ionicons name="help-circle-outline" size={24} color="#FF497C" />
          <Text style={styles.optionText}>Ayuda</Text>
          <Ionicons name="chevron-forward" size={24} color="#FF497C" />
        </TouchableOpacity>
      </View>

      {/* Botón de Cerrar Sesión */}
      <TouchableOpacity style={styles.logoutButton} onPress={handleLogout}>
        <Ionicons name="log-out-outline" size={24} color="#FFF" />
        <Text style={styles.logoutText}>Cerrar Sesión</Text>
      </TouchableOpacity>

      {/* Footer */}
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
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 20,
    paddingTop: 50,
    paddingBottom: 20,
    backgroundColor: "#FFF",
    borderBottomWidth: 1,
    borderBottomColor: "#EEE",
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#FF497C",
  },
  profileContainer: {
    alignItems: "center",
    marginVertical: 20,
  },
  profileImage: {
    width: 80,
    height: 80,
    borderRadius: 40,
    marginBottom: 10,
  },
  userName: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#333",
  },
  optionsContainer: {
    marginTop: 20,
    paddingHorizontal: 20,
  },
  option: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    backgroundColor: "#FFF",
    padding: 15,
    marginVertical: 10,
    borderRadius: 10,
    elevation: 3,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 3,
  },
  optionText: {
    flex: 1,
    marginLeft: 10,
    fontSize: 16,
    color: "#333",
  },
  logoutButton: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#FF497C",
    padding: 15,
    marginHorizontal: 20,
    marginVertical: 20,
    borderRadius: 10,
  },
  logoutText: {
    marginLeft: 10,
    fontSize: 16,
    color: "#FFF",
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
    position: "absolute",
    bottom: 10,
    width: "95%",
    alignSelf: "center",
  },
});

export default ajusteespecialista;
