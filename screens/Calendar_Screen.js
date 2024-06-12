import "react-native-gesture-handler";
import React, { useState, useEffect } from "react";
import {
  View,
  Pressable,
  Text,
  StyleSheet,
  Dimensions,
  Alert,
} from "react-native";
import { Agenda } from "react-native-calendars";
import { Card } from "react-native-paper";
import moment from "moment";
import { db, auth } from "../firebase.js";

const Calendar_Screen = ({ navigation }) => {
  let today = new Date();
  let date = moment(today, "YYYY-MM-DD").format();
  let todays_date = date.split("T")[0];

  const [loggedIn, setLoggedIn] = useState(false);

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
    if (auth.currentUser) {
      setLoggedIn(true);
    }
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

  const renderItem = (item) => {
    return (
      <Pressable style={{ marginRight: 10, marginTop: 17 }}>
        {item.booked === false && (
          <Card style={{ backgroundColor: "white" }}>
            <Card.Content>
              {loggedIn && (
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
                    <View style={{ flexDirection: "column" }}>
                      <Text>{item.time}</Text>
                      <Text
                        style={{ color: "blue", fontWeight: 100, marginTop: 5 }}
                      >
                        Book Now
                      </Text>
                    </View>
                    <View style={styles.verticalLine}></View>
                    <View>
                      <Text style={{ fontSize: 20, fontWeight: 500 }}>
                        Coach {item.name}
                      </Text>
                      <Text style={styles.its}>
                        Individual Training Session
                      </Text>
                      <Text
                        style={{
                          color: "#909090",
                          fontSize: Dimensions.get("screen").height * 0.015,
                        }}
                      >
                        {item.location}
                      </Text>
                    </View>
                  </View>
                </Pressable>
              )}
              {!loggedIn && (
                <Pressable
                  onPress={() => {
                    Alert.alert("Please Login or Sign up to Continue");
                    navigation.navigate("Login_Screen");
                  }}
                >
                  <View
                    style={{
                      flexDirection: "row",
                      alignItems: "center",
                    }}
                  >
                    <View style={{ flexDirection: "column" }}>
                      <Text>{item.time}</Text>
                      <Text
                        style={{ color: "blue", fontWeight: 100, marginTop: 5 }}
                      >
                        Book Now
                      </Text>
                    </View>
                    <View style={styles.verticalLine}></View>
                    <View>
                      <Text style={{ fontSize: 20, fontWeight: 500 }}>
                        Coach {item.name}
                      </Text>
                      <Text style={styles.its}>
                        Individual Training Session
                      </Text>
                      <Text
                        style={{
                          color: "#909090",
                          fontSize: Dimensions.get("screen").height * 0.015,
                        }}
                      >
                        {item.location}
                      </Text>
                    </View>
                  </View>
                </Pressable>
              )}
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
                  <Text style={styles.its}>Individual Training Session</Text>
                  <Text
                    style={{
                      color: "#909090",
                      fontSize: Dimensions.get("screen").height * 0.015,
                    }}
                  >
                    {item.location}
                  </Text>
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
  its: {
    color: "#909090",
    marginTop: 5,
    fontSize: Dimensions.get("screen").height * 0.015,
  },
});
