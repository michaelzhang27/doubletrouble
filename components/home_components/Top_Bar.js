import "react-native-gesture-handler";
import {
  StyleSheet,
  Text,
  Pressable,
  View,
  Image,
  Dimensions,
  Alert,
} from "react-native";
import React, { useState, useEffect } from "react";
import { useNavigation } from "@react-navigation/native";
import { firebase, auth } from "../../firebase.js";
import { SafeAreaView } from "react-native-safe-area-context";

const Top_Bar = () => {
  const navigation = useNavigation();
  const [user, setUser] = useState("");
  const [name, setName] = useState("");
  const [loggedIn, setLoggedIn] = useState(false);

  useEffect(() => {
    if (!auth.currentUser) {
      setUser({
        profilePictureURL:
          "https://firebasestorage.googleapis.com/v0/b/doubletroubletrainingapp-5b94a.appspot.com/o/default.png?alt=media&token=996846c2-6b8d-43a3-8686-8bd4c77133ff",
      });
      setName("Player");
    } else {
      setLoggedIn(true);
      firebase
        .firestore()
        .collection("users")
        .doc(auth.currentUser.uid)
        .get()
        .then((snapshot) => {
          if (snapshot.exists) {
            setUser(snapshot.data());
            setName(snapshot.data().name);
          }
        });
    }
  }, []);

  const fName = name.split(" ");

  return (
    <View style={styles.iconsContainer}>
      <View>
        <Text style={styles.slogan}>Let's Work, </Text>
        <Text style={styles.name}>{fName[0]}</Text>
        <View style={{ height: 10 }}></View>
      </View>
      {loggedIn && (
        <Pressable onPress={() => navigation.navigate("Account_Screen")}>
          <Image
            style={{ height: 60, width: 60, borderRadius: 30 }}
            source={{ uri: user.profilePictureURL }}
          />
          <View style={{ height: 10 }}></View>
        </Pressable>
      )}
      {!loggedIn && (
        <Pressable
          onPress={() => {
            Alert.alert("Please Login or Sign up to Continue");
            navigation.navigate("Login_Screen");
          }}
        >
          <Image
            style={{ height: 60, width: 60, borderRadius: 30 }}
            source={{ uri: user.profilePictureURL }}
          />
        </Pressable>
      )}
    </View>
  );
};

export default Top_Bar;

const styles = StyleSheet.create({
  container: {
    width: "100%",
    justifyContent: "flex-end",
    position: "absolute",
    top: 0,
  },
  iconsContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginHorizontal: 30,
    alignItems: "center",
  },
  slogan: {
    fontSize: Dimensions.get("screen").width * 0.05,
  },
  name: {
    fontSize: Dimensions.get("screen").width * 0.105,
    fontWeight: "bold",
  },
});
