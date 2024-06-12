import { StyleSheet, Text, View, Image, Dimensions } from "react-native";
import React from "react";

const Media = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.label}>Media</Text>
      <View style={styles.mediaContainer}>
        <View style={styles.cardBG}>
          <Image
            source={require("../../assets/app_images/bb1.jpg")}
            style={styles.card}
          />
        </View>
        <View style={styles.cardBG}>
          <Image
            source={require("../../assets/app_images/bb2.jpg")}
            style={styles.card}
          />
        </View>
        <View style={styles.cardBG}>
          <Image
            source={require("../../assets/app_images/bb3.jpg")}
            style={styles.card}
          />
        </View>
        <View style={styles.cardBG}>
          <Image
            source={require("../../assets/app_images/bb4.jpg")}
            style={styles.card}
          />
        </View>
      </View>
      <View style={{ height: 30 }}></View>
    </View>
  );
};

export default Media;

const styles = StyleSheet.create({
  container: {
    width: "95%",
    alignSelf: "center",
  },
  label: {
    fontSize: Dimensions.get("screen").width * 0.08,
    fontWeight: 500,
    marginLeft: 20,
    marginTop: 8,
    marginBottom: 8,
  },
  mediaContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-around",
    marginTop: 10,
    alignSelf: "center",
  },
  card: {
    borderRadius: 20,
    height: 160,
    width: 160,
    marginBottom: 15,
  },
  cardBG: {
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.22,
    shadowRadius: 2.22,
    elevation: 3,
    borderRadius: 20,
    height: 160,
    width: 160,
    marginBottom: 8,
  },
});
