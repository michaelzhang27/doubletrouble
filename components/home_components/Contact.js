import {
  StyleSheet,
  Text,
  View,
  Image,
  Dimensions,
  ScrollView,
} from "react-native";
import React from "react";

const Contact = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.label}>Contact</Text>
      <View style={styles.card}>
        <View style={styles.left}>
          <Image
            source={require("../../assets/app_images/bros.jpg")}
            style={{ height: 155, width: 155, borderRadius: 20 }}
          />
        </View>
        <View style={styles.right}>
          <ScrollView
            horizontal={true}
            showsHorizontalScrollIndicator={false}
            style={{ width: "100%" }}
          >
            <Text numberOfLines={1} style={styles.title}>
              Charles Pack
            </Text>
          </ScrollView>
          <ScrollView
            horizontal={true}
            showsHorizontalScrollIndicator={false}
            style={{ width: "100%" }}
          >
            <Text numberOfLines={1} style={styles.number}>
              770-558-9295
            </Text>
          </ScrollView>
          <ScrollView
            horizontal={true}
            showsHorizontalScrollIndicator={false}
            style={{ width: "100%" }}
          >
            <Text numberOfLines={1} style={styles.title}>
              Michael Pack
            </Text>
          </ScrollView>
          <ScrollView
            horizontal={true}
            showsHorizontalScrollIndicator={false}
            style={{ width: "100%" }}
          >
            <Text numberOfLines={1} style={styles.number}>
              678-457-1760
            </Text>
          </ScrollView>
        </View>
      </View>

      <View style={{ height: 60 }}></View>
    </View>
  );
};

export default Contact;

const styles = StyleSheet.create({
  container: {
    width: "100%",
    alignSelf: "center",
  },
  label: {
    fontSize: Dimensions.get("screen").width * 0.08,
    fontWeight: 500,
    marginLeft: 20,
  },
  card: {
    flexDirection: "row",
    marginTop: 15,
    backgroundColor: "white",
    width: "95%",
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
    padding: 10,
  },
  left: {
    alignSelf: "center",
    marginLeft: 7,
  },
  right: {
    marginLeft: 20,
    paddingTop: 10,
  },
  title: {
    fontSize: Dimensions.get("screen").width * 0.04,
    fontWeight: "bold",
  },
  number: {
    fontSize: Dimensions.get("screen").width * 0.04,
    fontWeight: 300,
  },
});
