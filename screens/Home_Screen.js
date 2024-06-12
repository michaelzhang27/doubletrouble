import { ScrollView, StyleSheet, Text, View, SafeAreaView } from "react-native";
import React, { useEffect } from "react";
import { auth } from "../firebase";

// COMPONENTS
import Top_Bar from "../components/home_components/Top_Bar";
import Workout_Packages from "../components/home_components/Workout_Packages";
import Media from "../components/home_components/Media";
import Contact from "../components/home_components/Contact";

const Home_Screen = ({ navigation }) => {
  return (
    <SafeAreaView style={styles.container}>
      <View
        style={{
          height: "20%",
          width: "100%",
          justifyContent: "flex-end",
          position: "absolute",
          top: 0,
          paddingBottom: 20,
        }}
      >
        <Top_Bar />
      </View>
      <View style={{ marginTop: "24%" }}>
        <ScrollView
          showsVerticalScrollIndicator={false}
          style={{ height: "100%" }}
        >
          <Workout_Packages />
          <Media />
          <Contact />
        </ScrollView>
      </View>
    </SafeAreaView>
  );
};

export default Home_Screen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    marginTop: "5%",
  },
});
