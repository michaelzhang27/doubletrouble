import "react-native-gesture-handler";
import { StyleSheet, Text, View, Image, Dimensions, Alert } from "react-native";
import { Button } from "react-native-elements";
import React, { useState } from "react";
import { db, auth } from "../firebase.js";

const Book_Private_Screen = ({ route }) => {
  const data = route.params;
  const addToCart = async () => {
    db.collection("calendar")
      .doc(data.date)
      .get()
      .then((snapshot) => {
        if (snapshot.exists) {
          const session_data = snapshot.get(data.id);
          if (session_data.booked) {
            Alert.alert(
              "This Session Has Already Been Booked, Please Refresh Your App"
            );
            return;
          } else {
            db.collection("users")
              .doc(auth.currentUser.uid)
              .collection("cart")
              .doc()
              .set({
                isIndividual: true,
                date: data.date,
                name: data.name,
                time: data.time,
                price: 85.0,
                location: data.location,
                id: data.id,
                imageURL:
                  "https://firebasestorage.googleapis.com/v0/b/app-again-6a5ee.appspot.com/o/packageImages%2FC437C899-2ABD-4E1B-B693-3BE2E4EDBC43.jpg?alt=media&token=a2cbce23-b40b-4d17-97b2-0116fa482876",
              });
            Alert.alert("Added to Cart: Check Out to Confirm Your Spot!");
          }
        }
      });
    // add to cart, add a special param called isIndividual and set to true
    // figure out how to update booked, look at account edit screen
  };

  return (
    <View style={styles.container}>
      <View style={styles.ic}>
        <Image
          source={{
            uri: "https://firebasestorage.googleapis.com/v0/b/app-again-6a5ee.appspot.com/o/packageImages%2FC437C899-2ABD-4E1B-B693-3BE2E4EDBC43.jpg?alt=media&token=a2cbce23-b40b-4d17-97b2-0116fa482876",
          }}
          style={styles.image}
        />
      </View>
      <View style={styles.dc}>
        <Text style={{ fontWeight: "800", fontSize: 25 }}>
          Individual Workout
        </Text>
        <Text style={{ fontWeight: "600", fontSize: 18, marginTop: 8 }}>
          Led By Coach {data.name}
        </Text>
        <View style={{ marginTop: 20 }}>
          <Text style={{ marginRight: 10, fontSize: 18 }}>
            Date: {data.date}
          </Text>
          <Text style={{ fontSize: 18 }}>Time: {data.time}</Text>
        </View>
        <View style={{ flexDirection: "row", marginTop: 10 }}>
          <Text style={{ fontSize: 15, marginRight: 8 }}>{data.location}</Text>
          <View style={styles.verticalLine}></View>
          <Text style={{ fontSize: 15, marginLeft: 8 }}>$85.00</Text>
        </View>
        <Button
          onPress={addToCart}
          style={{ marginTop: 30 }}
          title={"Add to Cart"}
        ></Button>
      </View>
    </View>
  );
};

export default Book_Private_Screen;

const styles = StyleSheet.create({
  container: {
    marginTop: 15,
    width: "95%",
    height: "90%",
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
  },
  ic: {
    alignItems: "center",
    margin: 20,
    padding: 20,
    borderRadius: 20,
    backgroundColor: "white",
  },
  image: {
    height: Dimensions.get("screen").height * 0.35,
    width: Dimensions.get("screen").height * 0.35,
    borderRadius: 20,
  },
  dc: {
    padding: 20,
    marginHorizontal: 20,
    borderRadius: 20,
    backgroundColor: "white",
  },
  verticalLine: {
    height: "100%",
    width: 1,
    backgroundColor: "#909090",
  },
});
