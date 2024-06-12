import "react-native-gesture-handler";
import {
  Alert,
  Image,
  KeyboardAvoidingView,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from "react-native";
import { Input, Button } from "react-native-elements";
import React, { useState } from "react";
import Checkbox from "expo-checkbox";
import * as ImagePicker from "expo-image-picker";
import { auth, db, firebase } from "../firebase.js";
import { useNavigation } from "@react-navigation/native";

const Add_Slide_Screen = () => {
  const [image, setImage] = useState("");
  const [uploading, setUploading] = useState(false);
  const [packageName, setPackageName] = useState("");
  const [packageDescription, setPackageDescription] = useState("");
  const [packagePrice, setPackagePrice] = useState("");
  const [packageOrder, setPackageOrder] = useState("");
  const [nameIsChecked, setNameIsChecked] = useState(false);
  const [gradeIsChecked, setGradeIsChecked] = useState(false);
  const [jerseySizeIsChecked, setJerseySizeIsChecked] = useState(false);
  const [jerseyShortSizeIsChecked, setJerseyShortSizeIsChecked] =
    useState(false);
  const [shirtSizeIsChecked, setShirtSizeIsChecked] = useState(false);
  const [shortSizeIsChecked, setShortSizeIsChecked] = useState(false);

  const navigation = useNavigation();

  const cancel = () => {
    setImage("");
  };

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

  const addPackage = async () => {
    if (image === "" || !packageName || !packageDescription || !packagePrice) {
      Alert.alert("Please Fill Out All Package Details and Try Again");
      return;
    }

    setUploading(true);
    const response = await fetch(image);
    const blob = await response.blob();
    const filename = image.substring(image.lastIndexOf("/") + 1);

    var ref = firebase
      .storage()
      .ref()
      .child("packageImages/" + filename)
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
            .ref("packageImages/" + filename)
            .getDownloadURL()
            .then((url) => {
              db.collection("packages")
                .doc()
                .set({
                  packageName,
                  packageDescription,
                  packagePrice: parseFloat(packagePrice),
                  packageImageURL: url,
                  packageOrder: parseFloat(packageOrder),
                  nameIsChecked,
                  gradeIsChecked,
                  shirtSizeIsChecked,
                  shortSizeIsChecked,
                  jerseySizeIsChecked,
                  jerseyShortSizeIsChecked,
                });
            });
          setUploading(false);
          setImage(null);
          setPackageName("");
          setPackageDescription("");
          setPackagePrice("");
          setPackageOrder("");
          navigation.goBack();
          Alert.alert("Package Has Been Added");
        }
      );

    try {
      await ref;
    } catch (e) {
      console.log(e);
    }
  };

  return (
    <KeyboardAvoidingView style={styles.container} behavior="padding" enabled>
      <ScrollView showsVerticalScrollIndicator="false">
        <View style={styles.container}>
          <View style={styles.textInputs}>
            <Input
              placeholder="Package Name"
              value={packageName}
              onChangeText={(text) => setPackageName(text)}
            />
            <Input
              placeholder="Package Description"
              value={packageDescription}
              onChangeText={(text) => setPackageDescription(text)}
            />
            <Input
              placeholder="Package Price"
              keyboardType="numeric"
              value={packagePrice}
              onChangeText={(text) => setPackagePrice(text)}
            />
            <Input
              placeholder="Package Order"
              keyboardType="numeric"
              value={packageOrder}
              onChangeText={(text) => setPackageOrder(text)}
            />
            <View
              style={{ flexDirection: "row", alignItems: "center", margin: 10 }}
            >
              <Checkbox
                style={styles.checkbox}
                value={nameIsChecked}
                onValueChange={setNameIsChecked}
              />
              <Text style={styles.txt}>Ask for Name?</Text>
            </View>

            <View
              style={{ flexDirection: "row", alignItems: "center", margin: 10 }}
            >
              <Checkbox
                style={styles.checkbox}
                value={gradeIsChecked}
                onValueChange={setGradeIsChecked}
              />
              <Text style={styles.txt}>Ask for Grade?</Text>
            </View>

            <View
              style={{ flexDirection: "row", alignItems: "center", margin: 10 }}
            >
              <Checkbox
                style={styles.checkbox}
                value={shirtSizeIsChecked}
                onValueChange={setShirtSizeIsChecked}
              />
              <Text style={styles.txt}>Ask for Shirt Size?</Text>
            </View>
            <View
              style={{ flexDirection: "row", alignItems: "center", margin: 10 }}
            >
              <Checkbox
                style={styles.checkbox}
                value={shortSizeIsChecked}
                onValueChange={setShortSizeIsChecked}
              />
              <Text style={styles.txt}>Ask for Short Size?</Text>
            </View>
            <View
              style={{ flexDirection: "row", alignItems: "center", margin: 10 }}
            >
              <Checkbox
                style={styles.checkbox}
                value={jerseySizeIsChecked}
                onValueChange={setJerseySizeIsChecked}
              />
              <Text style={styles.txt}>Ask for Jersey Size?</Text>
            </View>

            <View
              style={{ flexDirection: "row", alignItems: "center", margin: 10 }}
            >
              <Checkbox
                style={styles.checkbox}
                value={jerseyShortSizeIsChecked}
                onValueChange={setJerseyShortSizeIsChecked}
              />
              <Text style={styles.txt}>Ask for Jersey Short Size?</Text>
            </View>
          </View>

          {!image && (
            <Button
              style={styles.button}
              title="Select Package Image"
              onPress={handleImagePickerPress}
            />
          )}
          <View style={styles.imageContainer}>
            {image && (
              <Image
                source={{ uri: image }}
                style={{ width: 300, height: 300 }}
              />
            )}
          </View>
          {image && (
            <Button
              style={styles.cancelButton}
              title="Cancel"
              type="outline"
              onPress={cancel}
            />
          )}
          {uploading === false && (
            <Button
              title="Add Package"
              style={styles.button}
              onPress={addPackage}
            />
          )}
          {uploading === true && (
            <Button
              raised
              disabled
              containerStyle={styles.button}
              title="Loading . . ."
            />
          )}
          <View style={{ height: 50 }}></View>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

export default Add_Slide_Screen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  checkbox: {
    margin: 8,
  },
  button: {
    width: 200,
    marginTop: 30,
  },
  textInputs: {
    marginTop: 40,
    width: 300,
  },
  imageContainer: {
    marginTop: 30,
    alignItems: "center",
  },
  cancelButton: {
    width: 200,
    marginTop: 10,
  },
  txt: {
    color: "gray",
    fontSize: 17,
    marginLeft: 10,
  },
});
