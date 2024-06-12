import {
  Alert,
  Image,
  KeyboardAvoidingView,
  ScrollView,
  StyleSheet,
  Text,
  Pressable,
  View,
} from "react-native";
import React, { useState } from "react";
import { Button, Input } from "react-native-elements";
import * as ImagePicker from "expo-image-picker";
import { StatusBar } from "expo-status-bar";
import { auth, db, firebase } from "../../firebase.js";

const Register_Screen = () => {
  const [image, setImage] = useState("");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [btnLoading, setBTNLoading] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [address, setAddress] = useState(
    "Contact Double Trouble to Update Address"
  );

  const handleImagePickerPress = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    if (!result.canceled) {
      setImage(result.assets[0].uri);
    }
  };

  const register = () => {
    if (!name || !email || !password || !phoneNumber) {
      Alert.alert("Please Fill Out All Profile Details and Try Again");
    } else {
      setBTNLoading(true);
      auth
        .createUserWithEmailAndPassword(email, password)
        .then((authUser) => {
          authUser.user.updateProfile({ displayName: name });
        })
        .catch((error) => {
          setBTNLoading(false);
          alert(error.message);
        })
        .then(() => {
          db.collection("users").doc(auth.currentUser.uid).set({
            name,
            email,
            orderCount: 0,
            password,
            phoneNumber,
            address,
            profilePictureURL:
              "https://firebasestorage.googleapis.com/v0/b/doubletroubletrainingapp-5b94a.appspot.com/o/default.png?alt=media&token=996846c2-6b8d-43a3-8686-8bd4c77133ff",
          });
        })
        .then(() => {
          if (image != "") {
            uploadImage();
          } else {
            setBTNLoading(false);
          }
        });
    }
  };

  const uploadImage = async () => {
    setUploading(true);
    const response = await fetch(image);
    const blob = await response.blob();
    const filename = image.substring(image.lastIndexOf("/") + 1);

    var ref = firebase
      .storage()
      .ref()
      .child(filename)
      .put(blob)
      .on(
        firebase.storage.TaskEvent.STATE_CHANGED,
        (snapshot) => {
          console.log(
            "progress: " +
              (snapshot.bytesTransferred / snapshot.totalBytes) * 100
          );
        },
        (error) => {
          console.log(error);
        },
        () => {
          firebase
            .storage()
            .ref(filename)
            .getDownloadURL()
            .then((url) => {
              db.collection("users").doc(auth.currentUser.uid).update({
                profilePictureURL: url,
              });
            });

          setUploading(false);
          setImage(null);
          setBTNLoading(false);
        }
      );

    try {
      await ref;
    } catch (e) {
      console.log(e);
    }
  };

  return (
    <KeyboardAvoidingView behavior="padding" enabled style={styles.container}>
      {image && <Image style={styles.img} source={{ uri: image }} />}
      <StatusBar />
      <ScrollView
        showsVerticalScrollIndicator={false}
        style={{ height: "100%", width: "100%" }}
      >
        <View style={styles.imageContainer}>
          <Pressable onPress={handleImagePickerPress}>
            {!image && (
              <Image
                style={{ height: 200, width: 200 }}
                source={require("../../assets/app_images/default.png")}
              />
            )}
            {image && (
              <Image
                source={{ uri: image }}
                style={{
                  width: 200,
                  height: 200,
                  borderRadius: 100,
                }}
              />
            )}
          </Pressable>
        </View>
        {image === "" && <View style={{ height: 50 }}></View>}
        {image != "" && (
          <View style={styles.uploadButtonContainer}>
            <Button
              type="outline"
              title="Cancel"
              onPress={() => setImage("")}
            />
          </View>
        )}
        <View style={styles.inputContainer}>
          <Input
            autoFocus
            placeholder="Name"
            value={name}
            onChangeText={(text) => setName(text)}
          />
          <Input
            autoCapitalize="none"
            placeholder="Email"
            type="email"
            value={email}
            onChangeText={(text) => setEmail(text)}
          />
          <Input
            autoCapitalize="none"
            placeholder="Password"
            type="password"
            value={password}
            onChangeText={(text) => setPassword(text)}
          />
          <Input
            placeholder="Phone Number"
            value={phoneNumber}
            onChangeText={(text) => setPhoneNumber(text)}
          />
          <Input
            placeholder="Address (optional)"
            value={address}
            onChangeText={(text) => setAddress(text)}
          />
        </View>

        {btnLoading === false && (
          <Button
            raised
            containerStyle={styles.button}
            title="Register"
            onPress={register}
          />
        )}
        {btnLoading === true && (
          <Button
            raised
            disabled
            containerStyle={styles.button}
            title="Loading . . ."
            onPress={register}
          />
        )}
        <View style={{ height: 150 }}></View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

export default Register_Screen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
    alignItems: "center",
    justifyContent: "center",
    padding: 10,
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
});
