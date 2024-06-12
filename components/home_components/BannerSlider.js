import "react-native-gesture-handler";
import {
  Dimensions,
  StyleSheet,
  Text,
  View,
  Pressable,
  Image,
  Alert,
} from "react-native";
import React, { useEffect, useState } from "react";
import { useNavigation } from "@react-navigation/native";
import ShimmerPlaceholder from "react-native-shimmer-placeholder";
import { auth } from "../../firebase.js";

const BannerSlider = ({ data }) => {
  const navigation = useNavigation();
  const [loading, setLoading] = useState(true);

  return (
    <View style={styles.container}>
      <Pressable
        onPress={() => navigation.navigate("Package_Info_Screen", data)}
      >
        <View style={styles.card}>
          <View style={styles.imageContainer}>
            {loading && (
              <ShimmerPlaceholder
                style={{
                  position: "absolute",
                  height: Dimensions.get("window").height * 0.3,
                  width: Dimensions.get("window").height * 0.3,
                  marginTop: 10,
                }}
              />
            )}
            <Image
              source={{ uri: data.packageImageURL }}
              style={styles.image}
              onLoadEnd={() => setLoading(false)}
            />
          </View>
          <View style={{ height: 20 }}></View>
          <View style={styles.buttons}>
            <View style={{ width: "100%", marginLeft: 40 }}>
              <Text style={styles.title} numberOfLines={1}>
                {data.name}
              </Text>
              <Text style={styles.description} numberOfLines={1}>
                {data.packageDescription}
              </Text>
            </View>
          </View>
          <View style={{ height: 20 }}></View>
        </View>
      </Pressable>
    </View>
  );
};

export default BannerSlider;

const styles = StyleSheet.create({
  container: {
    height: "100%",
  },
  card: {
    backgroundColor: "white",
    alignItems: "center",
    marginTop: 15,
    borderRadius: Dimensions.get("window").height * 0.02,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.22,
    shadowRadius: 2.22,
    elevation: 3,
  },
  image: {
    height: Dimensions.get("window").height * 0.31,
    width: Dimensions.get("window").height * 0.31,
    borderRadius: Dimensions.get("window").height * 0.02,
    marginTop: 15,
  },
  imageContainer: {
    borderRadius: Dimensions.get("window").height * 0.02,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.22,
    shadowRadius: 2.22,
    elevation: 2,
  },
  buttons: {
    alignItems: "center",
    justifyContent: "center",
    width: "100%",
    paddingTop: 8,
  },
  title: {
    marginBottom: 10,
    fontWeight: "500",
    fontSize: 23,
    width: "90%",
  },
  description: {
    fontWeight: 300,
    fontSize: 17,
    width: "90%",
  },
  container: {
    height: "100%",
  },
});
