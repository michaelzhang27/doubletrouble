import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  Alert,
  KeyboardAvoidingView,
} from "react-native";
import React, { useState } from "react";
import { Input, Button } from "react-native-elements";
import { db } from "../firebase.js";

const Admin_Add_Session_Screen = () => {
  const [date, setDate] = useState("");
  const [name, setName] = useState("");
  const [AMTime, setAMTime] = useState("");
  const [AMLocation, setAMLocation] = useState("");
  const [PMTime, setPMTime] = useState("");
  const [PMLocation, setPMLocation] = useState("");

  const addAMSession = () => {
    if (!date || !name || !AMTime || !AMLocation) {
      Alert.alert("Please Fill in Date and Name and AM Details");
      return;
    }
    let id = "Coach" + name + AMTime + "AM";
    db.collection("calendar")
      .doc(date)
      .get()
      .then((snapshot) => {
        if (snapshot.exists) {
          db.collection("calendar")
            .doc(date)
            .update({
              [id]: {
                booked: false,
                id,
                name,
                time: AMTime + "AM",
                location: AMLocation,
                date,
              },
            });
          Alert.alert("Session added, a refresh may be needed to see change");
        } else {
          db.collection("calendar")
            .doc(date)
            .set({
              [id]: {
                booked: false,
                id,
                name,
                time: AMTime + "AM",
                location: AMLocation,
                date,
              },
            });
          Alert.alert("Session added, a refresh may be needed to see change");
        }
      });
  };

  const addPMSession = () => {
    if (!date || !name || !PMTime || !PMLocation) {
      Alert.alert("Please Fill in Date and Name and PM Details");
      return;
    }
    let id = "Coach" + name + PMTime + "PM";
    db.collection("calendar")
      .doc(date)
      .get()
      .then((snapshot) => {
        if (snapshot.exists) {
          db.collection("calendar")
            .doc(date)
            .update({
              [id]: {
                booked: false,
                id,
                name,
                time: PMTime + "PM",
                location: PMLocation,
                date,
              },
            });
          Alert.alert("Session added, a refresh may be needed to see change");
        } else {
          db.collection("calendar")
            .doc(date)
            .set({
              [id]: {
                booked: false,
                id,
                name,
                time: PMTime + "PM",
                location: PMLocation,
                date,
              },
            });
          Alert.alert("Session added, a refresh may be needed to see change");
        }
      });
  };

  return (
    <KeyboardAvoidingView
      keyboardVerticalOffset={100}
      behavior="padding"
      style={styles.container}
    >
      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={styles.dc}>
          <Input
            value={date}
            onChangeText={(text) => setDate(text)}
            placeholder="Date in YYYY-MM-DD Format"
          />
          <Input
            value={name}
            onChangeText={(text) => setName(text)}
            placeholder="Name (Without 'Coach')"
          />
        </View>
        <View style={styles.dc}>
          <Input
            value={AMTime}
            onChangeText={(text) => setAMTime(text)}
            placeholder="Time (AM) (Ex. 10:00-11:00)"
          />
          <Input
            value={AMLocation}
            onChangeText={(text) => setAMLocation(text)}
            placeholder="Location"
          />
          <Button onPress={addAMSession} title={"Add AM Session"} />
        </View>
        <View style={styles.dc}>
          <Input
            value={PMTime}
            onChangeText={(text) => setPMTime(text)}
            placeholder="Time (PM) (Ex. 10:00-11:00)"
          />
          <Input
            value={PMLocation}
            onChangeText={(text) => setPMLocation(text)}
            placeholder="Location"
          />
          <Button onPress={addPMSession} title={"Add PM Session"} />
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

export default Admin_Add_Session_Screen;

const styles = StyleSheet.create({
  container: {
    marginTop: 15,
    width: "95%",
    height: "90%",
    borderRadius: 10,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.22,
    shadowRadius: 2.22,
    elevation: 3,
    alignSelf: "center",
  },
  dc: {
    padding: 20,
    marginHorizontal: 20,
    borderRadius: 20,
    backgroundColor: "white",
    marginTop: 30,
  },
});
