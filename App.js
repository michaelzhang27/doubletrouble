import "react-native-gesture-handler";
import { StyleSheet, Text, View } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";

// SCREENS
import New_Screen from "./screens/New_Screen";
import Login_Screen from "./screens/prescreens/Login_Screen";
import Landing_App from "./screens/Landing_App";
import Register_Screen from "./screens/prescreens/Register_Screen";
import Forgot_Password from "./screens/prescreens/Forgot_Password";
import Account_Screen from "./screens/Account_Screen";
import Product_Info_Screen from "./screens/Product_Info_Screen";
import Package_Info_Screen from "./screens/Package_Info_Screen";
import Book_Private_Screen from "./screens/Book_Private_Screen";

import Admin_Landing_App from "./admin_screens/Admin_Landing_App";
import Edit_Slide_Screen from "./admin_screens/Edit_Slide_Screen";
import Add_Slide_Screen from "./admin_screens/Add_Slide_Screen";
import Admin_Add_Product_Screen from "./admin_screens/Admin_Add_Product_Screen";
import Edit_Product_Screen from "./admin_screens/Edit_Product_Screen";
import Admin_Add_Session_Screen from "./admin_screens/Admin_Add_Session_Screen";

const Stack = createStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen
          options={{ headerShown: false }}
          name="New_Screen"
          component={New_Screen}
        />
        <Stack.Screen
          options={{ headerShown: false }}
          name="Landing_App"
          component={Landing_App}
        />
        <Stack.Screen
          options={{ headerBackTitle: "Back", headerTitle: "Log In" }}
          name="Login_Screen"
          component={Login_Screen}
        />
        <Stack.Screen
          options={{ headerBackTitle: "Back", headerTitle: "Register" }}
          name="Register_Screen"
          component={Register_Screen}
        />
        <Stack.Screen
          options={{ headerBackTitle: "Back", headerTitle: "Account" }}
          name="Account_Screen"
          component={Account_Screen}
        />
        <Stack.Screen
          options={{
            headerBackTitle: "Back",
            headerTitle: "Forgot Password",
          }}
          name="Forgot_Password"
          component={Forgot_Password}
        />
        <Stack.Screen
          options={{
            headerBackTitle: "Back",
            headerTitle: "",
          }}
          name="Product_Info_Screen"
          component={Product_Info_Screen}
        />
        <Stack.Screen
          options={{
            headerBackTitle: "Back",
            headerTitle: "",
          }}
          name="Package_Info_Screen"
          component={Package_Info_Screen}
        />
        <Stack.Screen
          options={{
            headerBackTitle: "Back",
            headerTitle: "Individual Session",
          }}
          name="Book_Private_Screen"
          component={Book_Private_Screen}
        />

        <Stack.Screen
          options={{ headerShown: false }}
          name="Admin_Landing_App"
          component={Admin_Landing_App}
        />
        <Stack.Screen
          options={{ headerBackTitle: "Back", headerTitle: "Edit Slide" }}
          name="Edit_Slide_Screen"
          component={Edit_Slide_Screen}
        />
        <Stack.Screen
          options={{ headerBackTitle: "Back", headerTitle: "Add Slide" }}
          name="Add_Slide_Screen"
          component={Add_Slide_Screen}
        />
        <Stack.Screen
          options={{ headerBackTitle: "Back", headerTitle: "Add Product" }}
          name="Admin_Add_Product_Screen"
          component={Admin_Add_Product_Screen}
        />
        <Stack.Screen
          options={{ headerBackTitle: "Back", headerTitle: "Edit Product" }}
          name="Edit_Product_Screen"
          component={Edit_Product_Screen}
        />
        <Stack.Screen
          options={{ headerBackTitle: "Back", headerTitle: "Add Session" }}
          name="Admin_Add_Session_Screen"
          component={Admin_Add_Session_Screen}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
