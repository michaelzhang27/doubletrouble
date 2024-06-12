import "react-native-gesture-handler";
import { Alert, ScrollView, StyleSheet, View, Dimensions } from "react-native";
import React, { useState, useLayoutEffect } from "react";
import { auth, firebase, db } from "../firebase.js";
import { Button, Input } from "react-native-elements";
import * as ImagePicker from "expo-image-picker";

const Account_Screen = ({ navigation }) => {
  const [btnLoading, setBTNLoading] = useState(false);
  const [image, setImage] = useState("");
  const [uploading, setUploading] = useState(false);
  const [user, setUser] = useState("");

  useLayoutEffect(() => {
    const unsubscribe = firebase
      .firestore()
      .collection("users")
      .doc(auth.currentUser.uid)
      .get()
      .then((snapshot) => {
        if (snapshot.exists) {
          setUser(snapshot.data());
        }
      });
  }, []);

  let cn = user.name;
  let cpn = user.phoneNumber;
  let addy = user.address;
  const [name, setName] = useState(cn);
  const [email, setEmail] = useState(user.email);
  const [phoneNumber, setPhoneNumber] = useState(cpn);
  const [address, setAddress] = useState(addy);

  const logOut = () => {
    auth
      .signOut()
      .catch((error) => alert(error))
      .then(() => {
        navigation.replace("Landing_App");
      });
  };

  const deleteAccount = () => {
    Alert.alert(
      "Are You Sure You Want to Delete?",
      "After your account is deleted, it cannot be recovered.",
      [
        {
          text: "Yes",
          onPress: () => {
            auth.currentUser.delete().then(() => {
              Alert.alert("Account Deleted", "Refresh the app to see changes");
              navigation.navigate("Landing_App");
            });
          },
        },
        {
          text: "No",
          onPress: () => console.log(""),
        },
      ],
      { cancelable: false }
    );
  };

  const updateProfile = () => {
    if (!name || !phoneNumber || !address) {
      Alert.alert("Please Fill Out All Profile Details and Try Again");
    } else {
      setBTNLoading(true);
      db.collection("users")
        .doc(auth.currentUser.uid)
        .update({
          name,
          phoneNumber,
          address,
        })
        .then(() => {
          if (image != null) {
            uploadImage();
          }
        });
      navigation.navigate("LoggedInHome");
      setBTNLoading(false);
      Alert.alert(
        "Account Updated, A Refresh May Be Needed to See Some Changes"
      );
    }
  };

  return (
    <View style={styles.container}>
      <ScrollView
        showsVerticalScrollIndicator={false}
        style={{ width: "100%", height: "100%" }}
      >
        <View style={styles.card}>
          <View style={styles.inputContainer}>
            <Input
              placeholder="Email"
              type="email"
              value={user.email}
              disabled
            />
            <Input
              placeholder={user.name}
              value={name}
              onChangeText={(text) => setName(text)}
            />
            <Input
              placeholder={user.phoneNumber}
              value={phoneNumber}
              onChangeText={(text) => setPhoneNumber(text)}
            />
            <Input
              placeholder={user.address}
              value={address}
              onChangeText={(text) => setAddress(text)}
            />
            {btnLoading === false && (
              <Button
                raised
                containerStyle={styles.button}
                title="Update Profile"
                onPress={updateProfile}
              />
            )}
          </View>
          {btnLoading === true && (
            <Button
              raised
              disabled
              containerStyle={styles.button}
              title="Loading . . . "
              onPress={updateProfile}
            />
          )}
          <View style={{ height: 150 }}></View>
        </View>
        <View style={styles.card2}>
          <Button
            style={{
              width: 300,
              marginTop: 15,
              alignSelf: "center",
              marginBottom: 15,
            }}
            title="Sign Out"
            onPress={logOut}
          />
        </View>
        <View style={styles.card2}>
          <Button
            style={{
              width: 300,
              marginTop: 15,
              alignSelf: "center",
              marginBottom: 15,
            }}
            title="Delete Account"
            onPress={deleteAccount}
          />
        </View>
      </ScrollView>
    </View>
  );
};

export default Account_Screen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
  },
  card: {
    backgroundColor: "white",
    width: "90%",
    borderRadius: 10,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.22,
    shadowRadius: 2.22,
    elevation: 3,
    marginTop: 20,
    height: Dimensions.get("window").height * 0.5,
    alignSelf: "center",
  },
  card2: {
    backgroundColor: "white",
    width: "90%",
    borderRadius: 10,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.22,
    shadowRadius: 2.22,
    elevation: 3,
    marginTop: 20,
    alignSelf: "center",
  },
  inputContainer: {
    width: 300,
    marginTop: 20,
    alignItems: "center",
    alignSelf: "center",
  },
  button: {
    width: 200,
    marginTop: 15,
    alignSelf: "center",
  },
  imageContainer: {
    marginTop: 30,
    alignItems: "center",
  },
  uploadButtonContainer: {
    flexDirection: "row",
    marginTop: 15,
    paddingHorizontal: 30,
    alignSelf: "center",
  },
  loadingContainer: {
    height: "100%",
    width: "100%",
    backgroundColor: "transparent",
  },
});
