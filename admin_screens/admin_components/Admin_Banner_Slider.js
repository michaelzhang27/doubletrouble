import "react-native-gesture-handler";
import {
  Dimensions,
  StyleSheet,
  Text,
  View,
  Pressable,
  Image,
} from "react-native";
import React from "react";
import { Button } from "react-native-elements";
import { Feather } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";

const Admin_Banner_Slider = ({ data }) => {
  const navigation = useNavigation();

  return (
    <View style={styles.container}>
      <View>
        <View style={styles.card}>
          <Pressable
            style={styles.edit}
            onPress={() => navigation.navigate("Edit_Slide_Screen", data)}
          >
            <View
              style={{
                flex: 1,
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <Feather name="edit" size={24} color={"gray"} />
            </View>
          </Pressable>
          <View style={styles.imageContainer}>
            <Image
              source={{ uri: data.packageImageURL }}
              style={styles.image}
            />
          </View>
          <View style={{ height: 20 }}></View>
          <View style={styles.buttons}>
            <View style={{ width: "100%", marginLeft: 40 }}>
              <Text style={styles.title} numberOfLines={2}>
                {data.name}
              </Text>
              <Text style={styles.description} numberOfLines={2}>
                {data.packageDescription}
              </Text>
            </View>
          </View>
          <View style={{ height: 20 }}></View>
        </View>
      </View>
    </View>
  );
};

export default Admin_Banner_Slider;

const styles = StyleSheet.create({
  container: {
    height: "100%",
  },
  card: {
    backgroundColor: "white",
    alignItems: "center",
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
    height: Dimensions.get("window").height * 0.3,
    width: Dimensions.get("window").height * 0.3,
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
    paddingTop: 15,
  },
  title: {
    marginBottom: 10,
    fontWeight: 500,
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
  edit: {
    height: 50,
    width: 50,
    borderRadius: 25,
    backgroundColor: "white",
    margin: 18,
    position: "absolute",
    right: 0,
    zIndex: 10,
    shadowColor: "#000",
    shadowOffset: {
      width: 1,
      height: 4,
    },
    shadowOpacity: 0.22,
    shadowRadius: 2.22,
  },
});
