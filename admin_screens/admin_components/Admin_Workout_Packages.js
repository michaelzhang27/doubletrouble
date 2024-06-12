import "react-native-gesture-handler";
import { StyleSheet, Text, View, Dimensions, Pressable } from "react-native";
import React, { useEffect, useState } from "react";
import Carousel from "react-native-snap-carousel-expo-46-compatible/src/carousel/Carousel";
import { Feather } from "@expo/vector-icons";
import { db } from "../../firebase.js";

import Admin_Banner_Slider from "./Admin_Banner_Slider";
import { useNavigation } from "@react-navigation/native";

const Admin_Workout_Packages = () => {
  const navigation = useNavigation();

  const [packages, setPackages] = useState([]);

  useEffect(() => {
    const unsubscribe = db
      .collection("packages")
      .orderBy("packageOrder")
      .onSnapshot((snapshot) => {
        setPackages(
          snapshot.docs.map((doc) => ({
            name: doc.data().packageName,
            packageImageURL: doc.data().packageImageURL,
            packagePrice: doc.data().packagePrice,
            packageDescription: doc.data().packageDescription,
            packageOrder: doc.data().packageOrder,
            id: doc.id,
          }))
        );
      });
    return unsubscribe;
  }, []);

  const render_banner = ({ item, index }) => {
    return <Admin_Banner_Slider data={item} />;
  };

  return (
    <View style={styles.container}>
      {/* REASON FOR CRASH IS THIS CSS ON VIEW style={{
          flexDirection: "row",
          justifyContent: "space-between",
          alignItems: "baseline",
        }} */}
      <View style={styles.header}>
        <View>
          <Text style={styles.label}>Featured Packages</Text>
        </View>
        <View>
          <Pressable
            style={{
              height: 60,
              width: 60,
              paddingTop: 8,
            }}
            onPress={() => navigation.navigate("Add_Slide_Screen")}
          >
            <Feather name="edit" size={24} color={"gray"} />
          </Pressable>
        </View>
      </View>
      <Carousel
        data={packages}
        renderItem={render_banner}
        itemWidth={300}
        loop={true}
        sliderWidth={Dimensions.get("window").width - 18}
      />
    </View>
  );
};

export default Admin_Workout_Packages;

const styles = StyleSheet.create({
  container: {
    height: Dimensions.get("window").height * 0.58,
    marginTop: 10,
  },
  label: {
    fontSize: 32,
    fontWeight: 500,
    marginLeft: 20,
    marginBottom: 5,
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
});
