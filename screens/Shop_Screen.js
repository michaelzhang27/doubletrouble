import {
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  ScrollView,
  Pressable,
} from "react-native";
import React, { useState, useEffect } from "react";
import { Feather } from "@expo/vector-icons";
import { firebase } from "../firebase.js";
import ProductCard from "../components/home_components/ProductCard";

const Shop_Screen = () => {
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
      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={styles.productsContainer}>
          {products.map(({ id, data }) => {
            count = count + 1;
            return <ProductCard key={id} id={id} data={data} />;
          })}
          {(count + 1) % 2 === 0 && <View style={{ width: 150 }}></View>}
        </View>
        <View style={{ marginBottom: 20 }}></View>
      </ScrollView>
    </View>
  );
};

export default Shop_Screen;

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
  },
});
