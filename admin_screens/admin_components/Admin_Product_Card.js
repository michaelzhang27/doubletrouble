import "react-native-gesture-handler";
import {
  Image,
  StyleSheet,
  Text,
  Pressable,
  View,
  Alert,
  Dimensions,
} from "react-native";
import React, { useState } from "react";
import { useNavigation } from "@react-navigation/native";
import { Feather } from "@expo/vector-icons";
import { db } from "../../firebase.js";
import ShimmerPlaceholder from "react-native-shimmer-placeholder";

const Admin_Product_Card = ({ data, id }) => {
  const navigation = useNavigation();
  const [loading, setLoading] = useState(true);

  const remove = () => {
    Alert.alert(
      "Are You Sure You Want to Delete?",
      "After a product is deleted, it cannot be recovered.",
      [
        {
          text: "Yes",
          onPress: () => {
            db.collection("products").doc(id).delete();
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

  const edit = () => {
    navigation.navigate("Edit_Product_Screen", { data, id });
  };

  return (
    <View style={styles.productCardContainer}>
      <View style={styles.productCard}>
        <Pressable>
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
            <View style={styles.productEditDeleteIcons}>
              <Pressable style={styles.icons} onPress={edit}>
                <Feather name="edit" size={14} color="#495057" />
              </Pressable>
              <Text> </Text>
              <Pressable style={styles.icons} onPress={remove}>
                <Feather name="trash-2" size={14} color="#ff595e" />
              </Pressable>
            </View>
          </View>
        </View>
      </View>
    </View>
  );
};

export default Admin_Product_Card;

const styles = StyleSheet.create({
  productCardContainer: {
    marginTop: 20,
  },
  productCard: {},
  productImage: {
    height: 150,
    width: 150,
    borderRadius: 20,
  },
  productInfo: {
    height: 50,
    paddingTop: 5,
    width: 150,
  },
  productName: {
    fontWeight: "bold",
    fontSize: 15,
  },
  productPrice: {
    fontWeight: "300",
  },
  bottomInfo: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "baseline",
    paddingTop: 8,
  },
  productEditDeleteIcons: {
    flexDirection: "row",
  },
  icons: {
    height: 30,
    alignItems: "center",
  },
});
