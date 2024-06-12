import "react-native-gesture-handler";
import React, { useState, useEffect } from "react";
import { View, Pressable, Text, StyleSheet, Alert } from "react-native";
import { Agenda } from "react-native-calendars";
import { Card } from "react-native-paper";
import moment from "moment";
import { db, firebase } from "../firebase.js";
import { Feather } from "@expo/vector-icons";

const Calendar_Screen = ({ navigation }) => {
  let today = new Date();
  let date = moment(today, "YYYY-MM-DD").format();
  let todays_date = date.split("T")[0];

  const [workouts, setWorkouts] = useState([]);
  const [items, setItems] = useState({});

  const timeToString = (time) => {
    const date = new Date(time);
    return date.toISOString().split("T")[0];
  };

  const loadItemsForMonth = (day) => {
    setTimeout(() => {
      for (let i = -15; i < 85; i++) {
        const time = day.timestamp + i * 24 * 60 * 60 * 1000;
        const strTime = timeToString(time);
        if (!items[strTime]) {
          items[strTime] = [];
          get_days_workouts(strTime);
        }
      }
    }, 1000);
  };

  useEffect(() => {
    get_days_workouts(todays_date);
  }, []);

  const get_days_workouts = (day) => {
    db.collection("calendar")
      .doc(day)
      .get()
      .then((snapshot) => {
        if (snapshot.exists) {
          setWorkouts(snapshot.data());
        }
      });
  };

  for (const key of Object.keys(workouts)) {
    new_workout = {
      name: workouts[key].name,
      time: workouts[key].time,
      location: workouts[key].location,
      booked: workouts[key].booked,
      date: workouts[key].date,
      id: workouts[key].id,
      isIndividual: true,
    };
    if (items && items.hasOwnProperty(workouts[key].date)) {
      items[workouts[key].date].push(new_workout);
    } else {
      items[workouts[key].date] = [new_workout];
    }
  }

  const remove = (item) => {
    console.log(item.id);
    Alert.alert(
      "Are You Sure You Want to Remove?",
      "After a session is removed, it cannot be recovered.",
      [
        {
          text: "Yes",
          onPress: () => {
            db.collection("calendar")
              .doc(item.date)
              .update({
                [item.id]: firebase.firestore.FieldValue.delete(),
              });
            Alert.alert(
              "Session removed, you may need to refresh to see changes."
            );
          },
        },
        {
          text: "No",
          onPress: () => console.log(""),
        },
      ],
      { cancelable: false }
    );
  };

  const renderItem = (item) => {
    return (
      <Pressable style={{ marginRight: 10, marginTop: 17 }}>
        {item.booked === false && (
          <Card style={{ backgroundColor: "white" }}>
            <Card.Content>
              <Pressable
                onPress={() => {
                  navigation.navigate("Book_Private_Screen", item);
                }}
              >
                <View
                  style={{
                    flexDirection: "row",
                    alignItems: "center",
                  }}
                >
                  <Pressable
                    onPress={() => {
                      remove(item);
                    }}
                  >
                    <View style={{ flexDirection: "column" }}>
                      <Text>{item.time}</Text>
                      <Text style={{ fontWeight: 100, marginVertical: 8 }}>
                        <Feather name="trash-2" size={15} color="#ff595e" />
                      </Text>
                    </View>
                  </Pressable>
                  <View style={styles.verticalLine}></View>
                  <View>
                    <Text style={{ fontSize: 20, fontWeight: 500 }}>
                      Coach {item.name}
                    </Text>
                    <Text style={{ color: "#909090", marginTop: 5 }}>
                      Individual Training Session
                    </Text>
                    <Text style={{ color: "#909090" }}>{item.location}</Text>
                  </View>
                </View>
              </Pressable>
            </Card.Content>
          </Card>
        )}
        {item.booked === true && (
          <Card style={{ backgroundColor: "#e5e5e5" }}>
            <Card.Content>
              <View
                style={{
                  flexDirection: "row",
                  alignItems: "center",
                }}
              >
                {/* CSS MAY CAUSE CRASHES ESPECIALLY FLEXDIRECTION */}
                <View style={{ flexDirection: "column" }}>
                  <Text>{item.time}</Text>
                  <Text style={{ color: "red", fontWeight: 100, marginTop: 5 }}>
                    Sold Out
                  </Text>
                </View>
                <View style={styles.verticalLine}></View>
                <View>
                  <Text style={{ fontSize: 20, fontWeight: 300 }}>
                    Coach {item.name}
                  </Text>
                  <Text style={{ color: "#909090", marginTop: 5 }}>
                    Individual Training Session
                  </Text>
                  <Text style={{ color: "#909090" }}>{item.location}</Text>
                </View>
              </View>
            </Card.Content>
          </Card>
        )}
      </Pressable>
    );
  };

  return (
    <View style={{ flex: 1 }}>
      <Agenda
        minDate={todays_date}
        loadItemsForMonth={loadItemsForMonth}
        items={items}
        selected={todays_date}
        renderItem={renderItem}
      />
      <View style={styles.addProduct}>
        <Pressable
          onPress={() => {
            navigation.navigate("Admin_Add_Session_Screen");
          }}
        >
          <Feather name="plus-circle" size={40} color="#e5e5e5" />
        </Pressable>
      </View>
    </View>
  );
};

export default Calendar_Screen;

const styles = StyleSheet.create({
  verticalLine: {
    height: "100%",
    width: 1,
    backgroundColor: "#909090",
    margin: 12,
  },
  addProduct: {
    backgroundColor: "white",
    height: 60,
    width: 60,
    borderRadius: 30,
    position: "absolute",
    right: 0,
    bottom: 0,
    margin: 20,
    justifyContent: "center",
    alignItems: "center",
    shadowColor: "gray",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.8,
    shadowRadius: 2,
  },
});
