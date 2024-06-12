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
import React, { useState, useEffect } from "react";
import { db, auth, firebase } from "../firebase.js";
import { Button, Input } from "react-native-elements";
import ShimmerPlaceholder from "react-native-shimmer-placeholder";
import { useNavigation, CommonActions } from "@react-navigation/native";

const Package_Info_Screen = ({ route }) => {
  let data = route.params;
  let id = route.params.id;

  const [name, setName] = useState("");
  const [grade, setGrade] = useState("");
  const [loggedIn, setLoggedIn] = useState(false);

  useEffect(() => {
    if (auth.currentUser) {
      setLoggedIn(true);
    } else {
    }
  }, []);

  const navigation = useNavigation();

  const addToCart = () => {
    if (!name || !grade) {
      Alert.alert("Please Fill Out All Information");
      return;
    }

    if (data.jerseyShortSizeIsChecked === true && jerseyShortSize === "") {
      Alert.alert("Please Fill Out All Information");
      return;
    }

    if (data.jerseySizeIsChecked === true && jerseySize === "") {
      Alert.alert("Please Fill Out All Information");
      return;
    }

    if (data.shirtSize === true && shirtSize === "") {
      Alert.alert("Please Fill Out All Information");
      return;
    }

    if (data.shortSize === true && shortSize === "") {
      Alert.alert("Please Fill Out All Information");
      return;
    }

    if (
      data.shortSizeIsChecked &&
      shortSize != "XS" &&
      shortSize != "S" &&
      shortSize != "M" &&
      shortSize != "L" &&
      shortSize != "XL"
    ) {
      Alert.alert("Please Enter Your Size - 'XS', 'S', 'M', 'L', or 'XL' ");
      return;
    } else if (
      data.shirtSizeIsChecked &&
      shirtSize != "XS" &&
      shirtSize != "S" &&
      shirtSize != "M" &&
      shirtSize != "L" &&
      shirtSize != "XL"
    ) {
      Alert.alert("Please Enter Your Size - 'XS', 'S', 'M', 'L', or 'XL' ");
      return;
    } else if (
      data.jerseySize &&
      jerseySize != "XS" &&
      jerseySize != "S" &&
      jerseySize != "M" &&
      jerseySize != "L" &&
      jerseySize != "XL"
    ) {
      Alert.alert("Please Enter Your Size - 'XS', 'S', 'M', 'L', or 'XL' ");
      return;
    } else if (
      data.jerseyShortSize &&
      jerseyShortSize != "XS" &&
      jerseyShortSize != "S" &&
      jerseyShortSize != "M" &&
      jerseyShortSize != "L" &&
      jerseyShortSize != "XL"
    ) {
      Alert.alert("Please Enter Your Size - 'XS', 'S', 'M', 'L', or 'XL' ");
      return;
    }

    db.collection("users")
      .doc(auth.currentUser.uid)
      .collection("cart")
      .doc(data.id + name.replace(/ /g, ""))
      .set({
        id: data.id,
        name: data.name,
        imageURL: data.packageImageURL,
        price: parseFloat(data.packagePrice),
        description: data.packageDescription,
        participantGrade: grade,
        participantName: name,
        shirtSize,
        shortSize,
        jerseySize,
        jerseyShortSize,
        quantity: 1,
      });

    Alert.alert("Item Added to Cart");
    setName("");
    setGrade("");
    setShirtSize("");
    setShortSize("");
    setJerseyShortSize("");
    setJerseySize("");
  };

  const [shirtSize, setShirtSize] = useState(null);
  const [shortSize, setShortSize] = useState(null);
  const [jerseySize, setJerseySize] = useState(null);
  const [jerseyShortSize, setJerseyShortSize] = useState(null);

  const [loading, setLoading] = useState(true);

  return (
    <KeyboardAvoidingView
      keyboardVerticalOffset={100}
      enabled
      behavior="padding"
      style={styles.container}
    >
      <ScrollView
        showsVerticalScrollIndicator={false}
        style={{ width: "100%" }}
      >
        <View style={styles.productInfo}>
          {loading && (
            <View style={{ alignItems: "center" }}>
              <ShimmerPlaceholder
                style={{
                  position: "absolute",
                  height: 350,
                  width: 350,
                  margin: 5,
                  borderRadius: 30,
                }}
              />
            </View>
          )}
          <View style={styles.top}>
            <Image
              source={{ uri: data.packageImageURL }}
              onLoadEnd={() => setLoading(false)}
              style={{
                height: 350,
                width: 350,
                borderRadius: 30,
                marginTop: 10,
              }}
            />
          </View>
          <View style={styles.bottom}>
            <Text numberOfLines={2} style={styles.name}>
              {data.name}
              <Text style={styles.price}>
                <View style={{ width: 15 }}></View>${data.packagePrice}
              </Text>
            </Text>
            <Text numberOfLines={4} style={styles.description}>
              {data.packageDescription}
            </Text>
          </View>
        </View>
        <View style={styles.inputContainer}>
          <View style={{ height: 20 }}></View>
          <Input
            placeholder="Participant Name"
            value={name}
            onChangeText={(text) => setName(text)}
          />
          <Input
            placeholder="Participant Grade Level"
            value={grade}
            onChangeText={(text) => setGrade(text)}
          />
          {data.shirtSizeIsChecked && (
            <Input
              placeholder="Participant Shirt Size (XS, S, M, L, XL)"
              value={shirtSize}
              onChangeText={(text) => setShirtSize(text)}
            />
          )}
          {data.shortSizeIsChecked && (
            <Input
              placeholder="Participant Short Size (XS, S, M, L, XL)"
              value={shortSize}
              onChangeText={(text) => setShortSize(text)}
            />
          )}
          {data.jerseySizeIsChecked && (
            <Input
              placeholder="Participant Jersey Size (XS, S, M, L, XL)"
              value={jerseySize}
              onChangeText={(text) => setJerseySize(text)}
            />
          )}
          {data.jerseyShortSizeIsChecked && (
            <Input
              placeholder="Participant Jersey Short Size (XS, S, M, L, XL)"
              value={jerseyShortSize}
              onChangeText={(text) => setJerseyShortSize(text)}
            />
          )}
          {loggedIn && (
            <Button
              style={styles.button}
              title="Add To Cart"
              onPress={addToCart}
            />
          )}
          {!loggedIn && (
            <Button
              style={styles.button}
              title="Add To Cart"
              onPress={() => {
                Alert.alert("Please Sign in or Register to Continue");
                navigation.navigate("Login_Screen");
              }}
            />
          )}
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

export default Package_Info_Screen;

const styles = StyleSheet.create({
  container: {
    justifyContent: "center",
    alignItems: "center",
  },
  productInfo: {
    flexDirection: "row",
    marginTop: 15,
    backgroundColor: "white",
    width: "95%",
    borderRadius: 10,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.22,
    shadowRadius: 2.22,
    elevation: 3,
    alignSelf: "center",
    flexDirection: "column",
  },
  top: {
    width: "100%",
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.22,
    shadowRadius: 2.22,
    elevation: 3,
    borderRadius: 20,
  },
  button: {
    marginBottom: 20,
  },
  inputContainer: {
    marginTop: 20,
    paddingHorizontal: 20,
    backgroundColor: "white",
    width: "95%",
    borderRadius: 10,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.22,
    shadowRadius: 2.22,
    elevation: 3,
    alignSelf: "center",
    marginBottom: 30,
  },
  bottom: {
    margin: 20,
  },
  name: {
    fontSize: 25,
    fontWeight: "bold",
  },
  price: {
    marginTop: 3,
    fontWeight: 200,
    fontSize: 15,
  },
  description: {
    marginTop: 5,
    fontSize: 18,
    marginBottom: 15,
  },
});
