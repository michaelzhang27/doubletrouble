import "react-native-gesture-handler";
import {
  StyleSheet,
  Text,
  Pressable,
  View,
  Image,
  Dimensions,
} from "react-native";
import React from "react";
import { SafeAreaView } from "react-native-safe-area-context";

const Admin_Top_Bar = ({ navigation }) => {
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.iconsContainer}>
        <View>
          <View style={{ height: 20 }}></View>
          <Text style={styles.slogan}>Let's Work, </Text>
          <Text style={styles.name}>Admin</Text>
          <View style={{ height: 20 }}></View>
        </View>
        <Pressable
          style={{ zIndex: 10, height: 60, width: 60 }}
          onPress={() => navigation.navigate("Landing_App")}
        >
          <Image
            style={{ height: "100%", width: "100%", borderRadius: "50%" }}
            source={require("../../assets/logo.png")}
          />
        </Pressable>
      </View>
    </SafeAreaView>
  );
};

export default Admin_Top_Bar;

const styles = StyleSheet.create({
  container: {
    width: "100%",
    justifyContent: "flex-end",
    position: "absolute",
    top: Dimensions.get("window").height * 0.05,
    height: "19%",
  },
  iconsContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginHorizontal: 30,
    marginBottom: 6,
    alignItems: "center",
  },
  slogan: {
    fontSize: 20,
  },
  name: {
    fontSize: 40,
    fontWeight: "bold",
  },
});
