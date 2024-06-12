import "react-native-gesture-handler";
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
import { Input, Button } from "react-native-elements";
import { auth, db, firebase } from "../firebase.js";
import * as ImagePicker from "expo-image-picker";
import Checkbox from "expo-checkbox";

const Admin_Add_Product_Screen = ({ navigation }) => {
  const [image, setImage] = useState("");
  const [uploading, setUploading] = useState(false);
  const [productName, setProductName] = useState("");
  const [productPrice, setProductPrice] = useState();
  const [shirtSizeIsChecked, setShirtSizeIsChecked] = useState(false);
  const [shortSizeIsChecked, setShortSizeIsChecked] = useState(false);

  const pickImage = async () => {
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

  const cancel = () => {
    setImage("");
  };

  const addProduct = async () => {
    if (image === "" || !productName || !productPrice) {
      Alert.alert("Please Fill Out All Product Details and Try Again");
      return;
    }

    setUploading(true);
    const response = await fetch(image);
    const blob = await response.blob();
    const filename = image.substring(image.lastIndexOf("/") + 1);

    var ref = firebase
      .storage()
      .ref()
      .child("productImages/" + filename)
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
            .ref("productImages/" + filename)
            .getDownloadURL()
            .then((url) => {
              db.collection("products")
                .doc()
                .set({
                  productName,
                  productPrice: parseFloat(productPrice),
                  productImageURL: url,
                  shirtSizeIsChecked,
                  shortSizeIsChecked,
                });
            });

          setUploading(false);
          setImage("");
          setProductName("");
          setProductPrice("");
          navigation.navigate("Admin_Shop_Screen");
          Alert.alert("Product Has Been Added");
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
      <ScrollView showsVerticalScrollIndicator="false">
        <View style={styles.container}>
          <View style={styles.textInputs}>
            <Input
              placeholder="Product Name"
              value={productName}
              onChangeText={(text) => setProductName(text)}
            />
            <Input
              placeholder="Product Price"
              value={productPrice}
              onChangeText={(text) => setProductPrice(text)}
            />

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
          </View>
          {image === "" && (
            <Button
              style={styles.button}
              title="Select Product Image"
              onPress={pickImage}
            />
          )}
          <View style={styles.imageContainer}>
            {image != "" && (
              <Image
                source={{ uri: image }}
                style={{ width: 300, height: 300 }}
              />
            )}
          </View>
          {image != "" && (
            <Button
              style={styles.cancelButton}
              title="Cancel"
              type="outline"
              onPress={cancel}
            />
          )}
          {uploading === false && (
            <Button
              title="Add Product"
              style={styles.button}
              onPress={addProduct}
            />
          )}
          {uploading === true && (
            <Button
              raised
              disabled
              containerStyle={styles.button}
              title="Loading . . ."
              onPress={() => {}}
            />
          )}
          <View style={{ height: 50 }}></View>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

export default Admin_Add_Product_Screen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
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
  checkbox: {
    margin: 8,
  },
  txt: {
    color: "gray",
    fontSize: 17,
    marginLeft: 10,
  },
});
