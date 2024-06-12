import { Dimensions, StyleSheet, Text, View } from "react-native";
import React, { useEffect, useState } from "react";
import Carousel from "react-native-snap-carousel-expo-46-compatible/src/carousel/Carousel";
import { db } from "../../firebase.js";

import BannerSlider from "./BannerSlider";

const Workout_Packages = () => {
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
            nameIsChecked: doc.data().nameIsChecked,
            gradeIsChecked: doc.data().gradeIsChecked,
            shirtSizeIsChecked: doc.data().shirtSizeIsChecked,
            shortSizeIsChecked: doc.data().shortSizeIsChecked,
            jerseySizeIsChecked: doc.data().jerseySizeIsChecked,
            jerseyShortSizeIsChecked: doc.data().jerseyShortSizeIsChecked,
            id: doc.id,
          }))
        );
      });
    return unsubscribe;
  }, []);

  const render_banner = ({ item, index }) => {
    return <BannerSlider data={item} />;
  };

  return (
    <View style={styles.container}>
      <Text style={styles.label}>Featured Packages</Text>
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

export default Workout_Packages;

const styles = StyleSheet.create({
  container: {
    height: Dimensions.get("window").height * 0.56,
    marginTop: 20,
  },
  label: {
    fontSize: Dimensions.get("screen").width * 0.08,
    fontWeight: 500,
    marginLeft: 20,
    paddingBottom: 6,
  },
});
