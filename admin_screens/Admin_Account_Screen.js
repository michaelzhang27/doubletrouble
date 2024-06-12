import "react-native-gesture-handler";
import { StyleSheet, Text, View } from "react-native";
import React from "react";
import { Button } from "react-native-elements";

const Admin_Account_Screen = ({ navigation }) => {
  return (
    <View style={styles.container}>
      <Button
        title="Sign Out of Admin Account"
        onPress={() => {
          navigation.replace("Landing_App");
        }}
      />
    </View>
  );
};

export default Admin_Account_Screen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
});
