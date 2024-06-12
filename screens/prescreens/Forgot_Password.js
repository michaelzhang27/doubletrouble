import { StyleSheet, Text, View, Alert } from "react-native";
import { Input, Button } from "react-native-elements";
import React, { useState } from "react";

const Forgot_Password = () => {
  const [email, setEmail] = useState("");
  /* Why I have to Refresh twice in order to work? */
  const resetPassword = () => {
    if (!email) {
      Alert.alert("Please Enter a Valid Email");
      return;
    }
    auth
      .sendPasswordResetEmail(email)
      .then(() => {
        Alert.alert("Password Reset Email Has Been Sent");
      })
      .catch((e) => {
        Alert.alert(e);
      });
  };

  return (
    <View style={styles.container}>
      <Input
        type="Email"
        placeholder="Enter Account Email"
        value={email}
        onChangeText={(text) => setEmail(text)}
      />
      <Text style={styles.txt}>App Will Close on Unregistered Emails</Text>
      <Button onPress={resetPassword} title="Send Password Reset Link" />
    </View>
  );
};

export default Forgot_Password;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 100,
    width: 350,
    alignSelf: "center",
  },
  txt: {
    fontWeight: 200,
    fontSize: 18,
    marginBottom: 25,
  },
});
