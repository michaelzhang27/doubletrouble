import "react-native-gesture-handler";
import {
  Alert,
  Image,
  ScrollView,
  StyleSheet,
  View,
  KeyboardAvoidingView,
} from "react-native";
import React, { useState } from "react";
import { useNavigation } from "@react-navigation/native";
import { db, firebase } from "../firebase.js";
import { Input, Button } from "react-native-elements";
import * as ImagePicker from "expo-image-picker";

const Edit_Slide_Screen = ({ route }) => {
  data = route.params;
  id = data.id;

  const navigation = useNavigation();

  const [image, setImage] = useState("");
  const [uploading, setUploading] = useState(false);
  const [packageName, setPackageName] = useState(data.name);
  const [packageDescription, setPackageDescription] = useState(
    data.packageDescription
  );
  const [packagePrice, setPackagePrice] = useState("" + data.packagePrice);
  const [packageOrder, setPackageOrder] = useState("" + data.packageOrder);

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

  const updatePackage = async () => {
    if (!packageName || !packageDescription || !packagePrice || !packageOrder) {
      Alert.alert("Please Fill Out All Product Details and Try Again");
      return;
    }

    if (
      packageName &&
      packageOrder &&
      packagePrice &&
      packageDescription &&
      image === ""
    ) {
      db.collection("packages")
        .doc(id)
        .update({
          packageName,
          packageDescription,
          packagePrice: parseFloat(packagePrice),
          packageOrder: parseFloat(packageOrder),
        });
      Alert.alert("Product Has Been Updated");
      navigation.navigate("Admin_Landing_App");
    } else {
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
                  .doc(id)
                  .update({
                    packageName,
                    packageDescription,
                    packagePrice: parseFloat(packagePrice),
                    packageOrder: parseFloat(packageOrder),
                    packageImageURL: url,
                  });
              });

            setUploading(false);
            setImage(data.packageImageURL);
            setPackageName(data.packageName);
            setPackagePrice(data.packagePrice);
            navigation.navigate("Admin_Landing_App");
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

  const cancel = () => {
    setImage("");
  };

  const deleteProduct = () => {
    Alert.alert(
      "Are You Sure You Want to Delete?",
      "After a product is deleted, it cannot be recovered.",
      [
        {
          text: "Yes",
          onPress: () => {
            navigation.replace("Admin_Landing_App");
            db.collection("packages").doc(id).delete();
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

  return (
    <KeyboardAvoidingView style={styles.container} enabled behavior="padding">
      <ScrollView showsVerticalScrollIndicator="false">
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
        </View>
        {image === "" && (
          <View style={{ marginTop: 30 }}>
            <Button
              style={styles.button}
              title="Select Package Image"
              onPress={pickImage}
            />
            <Image
              style={{ width: 300, height: 300 }}
              source={{ uri: data.packageImageURL }}
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
            title="Update Package"
            style={styles.button}
            onPress={updatePackage}
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
        <Button
          title="Delete Package"
          style={styles.button}
          onPress={deleteProduct}
        />
        <View style={{ height: 50 }}></View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

export default Edit_Slide_Screen;

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
