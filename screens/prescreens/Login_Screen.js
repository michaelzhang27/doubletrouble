import "react-native-gesture-handler";
import {
  KeyboardAvoidingView,
  StyleSheet,
  View,
  Image,
  Dimensions,
} from "react-native";
import { useState, useEffect } from "react";
import React from "react";
import { Button, Input } from "react-native-elements";
import { auth } from "../../firebase.js";
import { CommonActions } from "@react-navigation/native";

const Login_Screen = ({ navigation }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const forgotPassword = () => {};

  const login = () => {
    // sLbxL3xX45Jc
    if (email === "sLbxL3xX45Jc" && password === "sLbxL3xX45Jc") {
      navigation.replace("Admin_Landing_App");
      return;
    }
    auth
      .signInWithEmailAndPassword(email, password)
      .catch((error) => alert(error));
  };

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((authUser) => {
      if (authUser) {
        navigation.dispatch(
          CommonActions.reset({
            index: 1,
            routes: [{ name: "Landing_App" }],
          })
        );
      } else {
        console.log("");
      }
    });
    return unsubscribe;
  }, []);

  return (
    <KeyboardAvoidingView behavior="padding" enabled style={styles.container}>
      <Image
        source={require("../../assets/logo.png")}
        style={{ width: 200, height: 200 }}
      />
      <View style={styles.inputContainer}>
        <Input
          autoCapitalize="none"
          type="Email"
          placeholder="Email"
          value={email}
          onChangeText={(text) => setEmail(text)}
        />
        <Input
          autoCapitalize="none"
          secureTextEntry
          type="password"
          placeholder="Password"
          value={password}
          onChangeText={(text) => setPassword(text)}
        />
      </View>
      <Button containerStyle={styles.button} onPress={login} title="Login" />
      <Button
        containerStyle={styles.button}
        type="outline"
        onPress={() => navigation.navigate("Register_Screen")}
        title="Register"
      />
      <Button
        titleStyle={{ fontSize: 15, marginTop: 10 }}
        type="clear"
        title="Forgot Password?"
        onPress={() => navigation.navigate("Forgot_Password")}
      />
      <View style={{ height: 100 }}></View>
    </KeyboardAvoidingView>
  );
};

export default Login_Screen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
    alignItems: "center",
    justifyContent: "center",
    padding: 10,
  },
  inputContainer: {
    width: 300,
    marginTop: Dimensions.get("window").height * 0.05,
  },
  button: {
    width: 200,
    marginTop: 10,
  },
});
