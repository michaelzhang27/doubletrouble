import "react-native-gesture-handler";
import {
  Dimensions,
  ScrollView,
  StyleSheet,
  Text,
  View,
  Alert,
} from "react-native";
import React, { useEffect, useState, useLayoutEffect } from "react";
import { Button } from "react-native-elements";
import Cart_Item from "../components/Cart_Item.js";
import { StripeProvider, useStripe } from "@stripe/stripe-react-native";
import { auth, db, firebase } from "../firebase.js";

const Cart_Screen = ({ navigation }) => {
  const [cartProducts, setCartProducts] = useState([]);
  const [displayPrice, setDisplayPrice] = useState(0);
  const [orderCount, setOrderCount] = useState(0);
  const [pPackages, setPPackages] = useState([]);
  const [pProducts, setPProducts] = useState([]);

  let finalPrice = 0;
  let IDNames = [];

  const clearCart = async () => {
    var colRef = db
      .collection("users")
      .doc(auth.currentUser.uid)
      .collection("cart");
    colRef.get().then((querySnapshot) => {
      Promise.all(querySnapshot.docs.map((d) => d.ref.delete()));
    });
  };

  const [loggedIn, setLoggedIn] = useState(false);

  useEffect(() => {
    if (auth.currentUser) {
      setLoggedIn(true);
      get_order_count();
    } else {
      Alert.alert("Please Login or Sign up to Continue");
      navigation.navigate("Login_Screen");
    }
  }, []);

  useLayoutEffect(() => {
    if (auth.currentUser) {
      db.collection("users")
        .doc(auth.currentUser.uid)
        .collection("cart")
        .onSnapshot((snapshot) => {
          setCartProducts(
            snapshot.docs.map((doc) => ({
              id: doc.id,
              data: doc.data(),
            }))
          );
        });
    }
  }, []);

  const get_order_count = () => {
    firebase
      .firestore()
      .collection("users")
      .doc(auth.currentUser.uid)
      .get()
      .then((snapshot) => {
        if (snapshot.exists) {
          setOrderCount(snapshot.data().orderCount);
          setPPackages(snapshot.data().packages_ordered);
          setPProducts(snapshot.data().products_ordered);
        }
      });
  };

  useEffect(() => {
    if (auth.currentUser) {
      cartProducts.map(({ id, data }) => {
        finalPrice = finalPrice + data.price;
        IDNames.push(data.id);
      });
      setDisplayPrice(finalPrice);
    } else {
    }
  });

  const [user, setUser] = useState(null);

  useEffect(() => {
    if (auth.currentUser) {
      db.collection("users")
        .doc(auth.currentUser.uid)
        .get()
        .then((snapshot) => {
          if (snapshot.exists) {
            setUser(snapshot.data());
          }
        });
    }
  }, []);

  const API_URL = "https://server-bumn.onrender.com";
  // const API_URL = "http://localhost:3000";

  const sendEmail = async (data) => {
    cartProducts.map((p) => {});
    const response = await fetch(`${API_URL}/nodemail`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Value:
          auth.currentUser.email +
          "_" +
          user.name +
          "_" +
          user.phoneNumber +
          "_ " +
          user.address,
      },
      body: JSON.stringify(
        cartProducts.map((cartProduct) => ({
          name: cartProduct.data.name,
          price: cartProduct.data.price,
          description: cartProduct.data.description,
          participantGrade: cartProduct.data.participantGrade,
          participantName: cartProduct.data.participantName,
          jerseyShortSize: cartProduct.data.jerseyShortSize,
          jerseySize: cartProduct.data.jerseySize,
          quantity: cartProduct.data.quantity,
          size: cartProduct.data.size,
          imageURL: cartProduct.data.imageURL,
          shirtSize: cartProduct.data.shirtSize,
          shortSize: cartProduct.data.shortSize,
          date: cartProduct.data.date,
          isIndividual: cartProduct.data.isIndividual,
          time: cartProduct.data.time,
          location: cartProduct.data.location,
        }))
      ),
    });
  };

  // try this auth.currentuser.displayName
  if (auth.currentUser) {
    const name = auth.currentUser.displayName;
  } // fix this later on server side and have it display correct value as well
  const stripe = useStripe();

  const [payLoading, setPayLoading] = useState(false);

  // if error with calendar, could be here, or bad test cases on 5/31/24
  const checkIfOK = () => {
    const promises = cartProducts.map(({ id, data }) => {
      if (data.hasOwnProperty("isIndividual")) {
        return db
          .collection("calendar")
          .doc(data.date)
          .get()
          .then((snapshot) => {
            for (const value of Object.values(snapshot.data())) {
              if (value.id === data.id) {
                if (value.booked) {
                  Alert.alert(
                    "Someone else has booked Coach " +
                      value.name +
                      " at " +
                      value.time +
                      " on " +
                      value.date
                  );
                  return null; // Indicate a conflict
                }
              }
            }
          });
      } else {
        // If the condition is not met, return a resolved promise to keep the array consistent.
        return Promise.resolve();
      }
    });

    Promise.all(promises)
      .then((results) => {
        // Check if any promise returned null indicating a conflict
        if (results.some((result) => result === null)) {
          // Early exit if there's a conflict
          return;
        }
        pay();
      })
      .catch((error) => {
        console.error(error);
        // Handle other potential errors if necessary
      });
  };

  // change to exact payment amount not 2500
  // then update the server to send right name, right payment, and /nodemail functionality
  const pay = async () => {
    const name = auth.currentUser.displayName;
    try {
      // sending request
      setPayLoading(true);
      const response = await fetch(`${API_URL}/pay`, {
        method: "POST",
        body: JSON.stringify({ name }),
        headers: {
          "Content-Type": "application/json",
          Value: parseFloat(displayPrice.toFixed(2)) * 100,
        },
      });
      const data = await response.json();
      if (!response.ok) return Alert.alert(data.message);
      setPayLoading(false);
      const clientSecret = data.clientSecret;
      const initSheet = await stripe.initPaymentSheet({
        paymentIntentClientSecret: clientSecret,
      });
      if (initSheet.error) return Alert.alert(initSheet.error.message);
      const presentSheet = await stripe.presentPaymentSheet({
        clientSecret,
      });
      if (presentSheet.error) return Alert.alert(presentSheet.error.message);
      logOrder();
      Alert.alert(
        "Payment complete, thank you! Email confirmation sent, it may be in your spam."
      );
      clearCart();
      await sendEmail();
    } catch (err) {
      console.log(err);
      Alert.alert("Something went wrong, try again later!");
    }
  };

  const logOrder = () => {
    newRef = db
      .collection("users")
      .doc(auth.currentUser.uid)
      .collection("orders")
      .doc("order" + (orderCount + 1).toString());

    get_order_count();
    current_order_count = orderCount + 1;
    db.collection("users").doc(auth.currentUser.uid).update({
      orderCount: current_order_count,
    });

    const packages_ordered = [];
    const products_ordered = [];

    cartProducts.map(({ id, data }) => {
      if (data.hasOwnProperty("jerseySize")) {
        packages_ordered.push(data.id);
        newRef.collection(data.id).doc().set({
          id: data.id,
          imageURL: data.imageURL,
          jerseySize: data.jerseySize,
          jerseyShortSize: data.jerseyShortSize,
          grade: data.participantGrade,
          name: data.participantName,
          shirtSize: data.shirtSize,
          shortSize: data.shortSize,
          price: data.price,
        });
      } else if (data.hasOwnProperty("isIndividual")) {
        newRef.collection(data.id).doc().set({
          id: data.id,
          imageURL: data.imageURL,
          price: data.price,
          name: data.name,
          time: data.time,
          location: data.location,
          date: data.date,
        });
        db.collection("calendar")
          .doc(data.date)
          .update({
            [data.id]: {
              booked: true,
              id: data.id,
              name: data.name,
              time: data.time,
              location: data.location,
              date: data.date,
            },
          });
        // mark data.id as booked, look at account screen for how to update
      } else {
        products_ordered.push(data.id);
        newRef.collection(data.id).doc().set({
          id: data.id,
          imageURL: data.imageURL,
          price: data.incrementPrice,
          name: data.name,
          size: data.size,
          quantity: data.quantity,
        });
      }
      // try package first, then do regular product
    });

    newRef = db.collection("users").doc(auth.currentUser.uid);
    newRef.update({
      email: auth.currentUser.email,
      name: auth.currentUser.displayName,
    });
  };

  return (
    <View style={styles.container}>
      <StripeProvider publishableKey="pk_test_51PMejPHzszku9PwKwmmvp0BelSq2wKkIHZQsXUAUwhscwWd14y1Nus5Atl4Dsi1vl04wiYkKmrFkaS0zXCCbmShO00KRgjwT7h">
        {cartProducts.length < 1 && (
          <View
            style={{
              justifyContent: "center",
              alignSelf: "center",
              height: "100%",
            }}
          >
            {loggedIn && <Text>Nothing in Your Cart Right Now</Text>}
            {!loggedIn && (
              <Button
                style={{ width: 200 }}
                title={"Login to Access Cart"}
                onPress={() => navigation.navigate("Login_Screen")}
              ></Button>
            )}
          </View>
        )}
        {cartProducts.length > 0 && (
          <View styles={styles.itemsContainer}>
            <ScrollView
              style={{ height: "100%" }}
              showsVerticalScrollIndicator={false}
            >
              {cartProducts.map(({ id, data }) => {
                return <Cart_Item key={id} data={data} id={id} />;
              })}
              <View style={{ height: 50 }}></View>
            </ScrollView>
          </View>
        )}

        {cartProducts.length > 0 && (
          <View
            style={{
              position: "absolute",
              bottom: 0,
              width: "100%",
            }}
          >
            {payLoading === false && (
              <Button
                onPress={checkIfOK}
                style={styles.button}
                title={"Check Out - $" + parseFloat(displayPrice.toFixed(2))}
              />
            )}
            {payLoading === true && (
              <Button
                raised
                disabled
                containerStyle={styles.button}
                title="Loading . . ."
              />
            )}
          </View>
        )}
      </StripeProvider>
    </View>
  );
};

export default Cart_Screen;

const styles = StyleSheet.create({
  container: {
    marginTop: 10,
  },
  itemsContainer: {
    backgroundColor: "red",
  },
  button: {
    marginHorizontal: 40,
    marginVertical: 20,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.22,
    shadowRadius: 2.22,
    elevation: 3,
  },
});
