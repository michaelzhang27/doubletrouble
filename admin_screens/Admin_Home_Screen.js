import { StyleSheet, Text, View, SafeAreaView, ScrollView } from "react-native";
import React from "react";

import Admin_Top_Bar from "./admin_components/Admin_Top_Bar.js";
import Admin_Workout_Packages from "./admin_components/Admin_Workout_Packages.js";
import Media from "../components/home_components/Media";
import Contact from "../components/home_components/Contact";

const Admin_Home_Screen = () => {
  return (
    <SafeAreaView style={styles.container}>
      <Admin_Top_Bar />
      <View style={{ height: "13%" }}></View>
      <ScrollView
        showsVerticalScrollIndicator={false}
        style={{ height: "100%" }}
      >
        <Admin_Workout_Packages />
        <Media />
        <Contact />
      </ScrollView>
    </SafeAreaView>
  );
};

export default Admin_Home_Screen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    marginTop: "5%",
  },
});
