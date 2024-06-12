import "react-native-gesture-handler";
import { StyleSheet, View, ScrollView, Pressable } from "react-native";
import React, { useEffect, useState } from "react";
import { Feather } from "@expo/vector-icons";
import { firebase } from "../firebase.js";
import Admin_Product_Card from "./admin_components/Admin_Product_Card";

const Admin_Shop_Screen = ({ navigation }) => {
  const [products, setProducts] = useState([]);
  let count = 0;

  useEffect(() => {
    const unsubscribe = firebase
      .firestore()
      .collection("products")
      .onSnapshot((snapshot) => {
        setProducts(
          snapshot.docs.map((doc) => ({
            id: doc.id,
            data: doc.data(),
          }))
        );
      });
    return unsubscribe;
  }, []);

  return (
    <View style={{ height: "100%" }}>
      <ScrollView>
        <View style={styles.productsContainer}>
          {products.map(({ id, data }) => {
            count = count + 1;
            return <Admin_Product_Card key={id} data={data} id={id} />;
          })}
          {(count + 1) % 2 === 0 && <View style={{ width: 150 }}></View>}
        </View>
        <View style={{ marginBottom: 20 }}></View>
      </ScrollView>

      <View style={styles.addProduct}>
        <Pressable
          onPress={() => {
            navigation.navigate("Admin_Add_Product_Screen");
          }}
        >
          <Feather name="plus-circle" size={40} color="#e5e5e5" />
        </Pressable>
      </View>
    </View>
  );
};

export default Admin_Shop_Screen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  productsContainer: {
    height: "100%",
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-around",
    marginTop: 10,
  },
  addProduct: {
    backgroundColor: "white",
    height: 60,
    width: 60,
    borderRadius: 30,
    position: "absolute",
    right: 0,
    bottom: 0,
    margin: 20,
    justifyContent: "center",
    alignItems: "center",
    shadowColor: "gray",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.8,
    shadowRadius: 2,
  },
});
