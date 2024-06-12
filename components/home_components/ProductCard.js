import "react-native-gesture-handler";
import {
  StyleSheet,
  Text,
  View,
  Pressable,
  Image,
  Dimensions,
  Alert,
} from "react-native";
import React, { useEffect, useState } from "react";
import { useNavigation } from "@react-navigation/native";
import ShimmerPlaceholder from "react-native-shimmer-placeholder";
import { auth } from "../../firebase.js";

const ProductCard = ({ data, id }) => {
  const navigation = useNavigation();
  const [loading, setLoading] = useState(true);
  const [loggedIn, setLoggedIn] = useState(false);

  useEffect(() => {
    if (auth.currentUser) {
      console.log("yes");
      setLoggedIn(true);
    }
  }, []);

  return (
    <View style={styles.productCardContainer}>
      <View style={styles.productCard}>
        <Pressable
          onPress={() =>
            navigation.navigate("Product_Info_Screen", { data, id })
          }
        >
          {loading && (
            <View>
              <ShimmerPlaceholder
                style={{
                  position: "absolute",
                  height: Dimensions.get("screen").height * 0.17,
                  width: Dimensions.get("screen").height * 0.17,
                  margin: 5,
                  borderRadius: 20,
                }}
              />
            </View>
          )}
          <Image
            style={styles.productImage}
            source={{ uri: data.productImageURL }}
            onLoadEnd={() => setLoading(false)}
          />
        </Pressable>
        <View style={styles.productInfo}>
          <Text numberOfLines={2} style={styles.productName}>
            {data.productName}
          </Text>
          <View style={styles.bottomInfo}>
            <Text style={styles.productPrice}>${data.productPrice}</Text>
          </View>
        </View>
      </View>
    </View>
  );
};

export default ProductCard;

const styles = StyleSheet.create({
  productCardContainer: {
    marginTop: 40,
  },
  productCard: {
    alignItems: "center",
  },
  productImage: {
    height: Dimensions.get("screen").height * 0.17,
    width: Dimensions.get("screen").height * 0.17,
    borderRadius: 20,
  },
  productInfo: {
    height: 50,
    paddingTop: 10,
    width: 150,
  },
  productName: {
    fontWeight: "bold",
    fontSize: 15,
    paddingLeft: 5,
  },
  productPrice: {
    fontWeight: "300",
  },
  bottomInfo: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "baseline",
    paddingTop: 8,
    paddingLeft: 5,
  },
});
