import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Platform,
  StatusBar,
  ScrollView,
} from "react-native";
import DateTimePicker from "@react-native-community/datetimepicker";
import Ionicons from "react-native-vector-icons/Ionicons";

const ModificarAgenda = ({ navigation }) => {
    const [selectedHours, setSelectedHours] = useState(["09:00", "10:00", "11:00", "12:00", "13:00", "14:00"]);
    const [selectedDays, setSelectedDays] = useState([]);
    const [workHolidays, setWorkHolidays] = useState(false);
    const [showPicker, setShowPicker] = useState(null);
  
    const toggleDaySelection = (day) => {
      if (selectedDays.includes(day)) {
        setSelectedDays(selectedDays.filter((d) => d !== day));
      } else {
        setSelectedDays([...selectedDays, day]);
      }
    };
  
    const handleHourChange = (index, event, selectedTime) => {
      const currentTime = selectedTime || new Date();
      let hours = currentTime.getHours();
      let minutes = currentTime.getMinutes();
      const formattedTime = `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}`;
      const updatedHours = [...selectedHours];
      updatedHours[index] = formattedTime;
      setSelectedHours(updatedHours);
      setShowPicker(null);
    };
  
    const addNewHour = () => {
      setSelectedHours([...selectedHours, "09:00"]);
    };
  
    const deleteHour = (index) => {
      const updatedHours = selectedHours.filter((_, i) => i !== index);
      setSelectedHours(updatedHours);
    };
  

const saveAgenda = () => {
    const dayTranslations = {
        "Lun": "Monday",
        "Mar": "Tuesday",
        "Mié": "Wednesday",
        "Jue": "Thursday",
        "Vie": "Friday",
        "Sáb": "Saturday",
        "Dom": "Sunday"
    };

    const translatedDays = selectedDays.map(day => dayTranslations[day]);

    navigation.navigate('Calendarespe', {
      updatedWorkingDays: translatedDays,
      updatedWorkHolidays: workHolidays
    });
};


  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Ionicons name="chevron-back" size={28} color="#FF497C" />
        </TouchableOpacity>
        <Text style={styles.title}>Modificar Agenda</Text>
        <View style={{ width: 28 }} />
      </View>

      <ScrollView contentContainerStyle={styles.content}>
        <Text style={styles.sectionTitle}>Selecciona tus horas de trabajo</Text>
        {selectedHours.map((hour, index) => (
          <View key={index} style={styles.hourRow}>
            <TouchableOpacity
              style={styles.hourButton}
              onPress={() => setShowPicker(index)}
            >
              <Text style={styles.hourText}>{hour}</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => deleteHour(index)} style={styles.deleteButton}>
              <Ionicons name="trash-outline" size={20} color="#FF497C" />
            </TouchableOpacity>
          </View>
        ))}

        {showPicker !== null && (
          <DateTimePicker
            value={new Date()}
            mode="time"
            display="spinner"
            onChange={(event, selectedTime) => handleHourChange(showPicker, event, selectedTime)}
          />
    
      
        )}

        <TouchableOpacity onPress={addNewHour} style={styles.addButton}>
          <Text style={styles.addButtonText}>+ Agregar otra hora</Text>
        </TouchableOpacity>

        <Text style={styles.sectionTitle}>Selecciona los días que trabajas</Text>
        <View style={styles.daysContainer}>
          {["Lun", "Mar", "Mié", "Jue", "Vie", "Sáb", "Dom"].map((day) => (
            <TouchableOpacity
              key={day}
              style={[styles.dayButton, selectedDays.includes(day) && styles.selectedDayButton]}
              onPress={() => toggleDaySelection(day)}
            >
              <Text
                style={
                  selectedDays.includes(day) ? styles.selectedDayText : styles.dayText
                }
              >
                {day}
              </Text>
            </TouchableOpacity>
          ))}
        </View>

        <Text style={styles.sectionTitle}>¿Trabajas días festivos?</Text>
        <View style={styles.holidayContainer}>
          <TouchableOpacity
            style={[styles.holidayOption, workHolidays && styles.selectedOption]}
            onPress={() => setWorkHolidays(true)}
          >
            <Text style={[styles.optionText, workHolidays && { color: "#FFF" }]}>Sí</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.holidayOption, !workHolidays && styles.selectedOption]}
            onPress={() => setWorkHolidays(false)}
          >
            <Text style={[styles.optionText, !workHolidays && { color: "#FFF" }]}>No</Text>
          </TouchableOpacity>
        </View>

        <TouchableOpacity style={styles.saveButton} onPress={saveAgenda}>
          <Text style={styles.saveButtonText}>Guardar Agenda</Text>
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
        paddingTop: Platform.OS === "android" ? StatusBar.currentHeight + 10 : 50,
      },
      title: {
        fontSize: 20,
        fontWeight: "bold",
        color: "#FF497C",
      },
      content: {
        padding: 15,
      },
      hourRow: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
        marginBottom: 10,
      },
      deleteButton: {
        marginLeft: 10,
        padding: 10,
      },
      deleteButtonText: {
        color: "#FFF",
      },
      hourButton: {
        backgroundColor: "#EEE",
        padding: 10,
        borderRadius: 10,
        flex: 1,
      },
  hourText: {
    fontSize: 16,
    color: "#333",
  },
  addButton: {
    backgroundColor: "#FF497C",
    padding: 15,
    borderRadius: 10,
    marginVertical: 10,
  },
  addButtonText: {
    color: "#FFF",
    textAlign: "center",
    fontWeight: "bold",
  },
  daysContainer: {
    flexDirection: "row",
    justifyContent: "space-around",
    marginVertical: 10,
  },
  dayButton: {
    padding: 15,
    borderRadius: 10,
    backgroundColor: "#EEE",
  },
  selectedDayButton: {
    backgroundColor: "#FF497C",
  },
  selectedDayText: {
    color: "#FFF",
  },
  dayText: {
    color: "#333",
  },
  holidayContainer: {
    flexDirection: "row",
    justifyContent: "space-around",
    marginVertical: 10,
  },
  holidayOption: {
    padding: 15,
    borderRadius: 10,
    backgroundColor: "#EEE",
  },
  selectedOption: {
    backgroundColor: "#FF497C",
  },
  optionText: {
    color: "#333",
  },
  saveButton: {
    backgroundColor: "#FF497C",
    padding: 15,
    borderRadius: 10,
    marginTop: 20,
  },
  saveButtonText: {
    color: "#FFF",
    textAlign: "center",
    fontWeight: "bold",
  },
});

export default ModificarAgenda;
