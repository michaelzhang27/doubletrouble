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
import { auth, db, firebase } from "../firebase";
import * as ImagePicker from "expo-image-picker";
import { useNavigation } from "@react-navigation/native";

const Edit_Product_Screen = ({ route }) => {
  let data = route.params.data;
  let id = route.params.id;

  const navigation = useNavigation();

  const [image, setImage] = useState("");
  const [uploading, setUploading] = useState(false);
  const [productName, setProductName] = useState(data.productName);
  p = data.productPrice.toString();
  const [productPrice, setProductPrice] = useState(p);

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

  const updateProduct = async () => {
    if (!productName || !productPrice) {
      Alert.alert("Please Fill Out All Product Details and Try Again");
      return;
    }

    if (productName && productPrice && image === "") {
      db.collection("products").doc(id).update({
        productName,
        productPrice,
      });
      Alert.alert("Product Has Been Updated");
      navigation.navigate("Admin_Shop_Screen");
    } else {
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
                  .doc(id)
                  .update({
                    productName,
                    productPrice: parseFloat(productPrice),
                    productImageURL: url,
                  });
              });

            setUploading(false);
            setImage("");
            setProductName("");
            navigation.navigate("Admin_Shop_Screen");
            Alert.alert("Product Has Been Added");
          }
        );

      try {
        await ref;
      } catch (e) {
        console.log(e);
      }
    }
  };

  return (
    <View style={styles.container}>
      <ScrollView>
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
        </View>
        {image === "" && (
          <View style={{ marginTop: 30 }}>
            <Button
              style={styles.button}
              title="Select Product Image"
              onPress={pickImage}
            />
            <Image
              style={{ width: 300, height: 300 }}
              source={{ uri: data.productImageURL }}
            />
          </View>
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
          <View
            style={{
              width: 300,
              flexDirection: "row",
              justifyContent: "space-between",
            }}
          >
            <Button
              style={styles.cancelButton}
              title="Revert"
              type="outline"
              onPress={cancel}
            />
            <Button
              style={styles.cancelButton}
              title="Cancel"
              type="outline"
              onPress={cancel}
            />
          </View>
        )}
        {uploading === false && (
          <Button
            title="Update Product"
            style={styles.button}
            onPress={updateProduct}
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
      </ScrollView>
    </View>
  );
};

export default Edit_Product_Screen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
  },
  button: {
    width: 200,
    marginBottom: 15,
    alignSelf: "center",
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
    width: 146,
    marginVertical: 15,
  },
});
