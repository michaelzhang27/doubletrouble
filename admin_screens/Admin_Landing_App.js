import "react-native-gesture-handler";
import { StyleSheet, Text, View } from "react-native";
import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { Feather } from "@expo/vector-icons";

// SCREENS
import Admin_Home_Screen from "./Admin_Home_Screen";
import Admin_Calendar_Screen from "./Admin_Calendar_Screen";
import Admin_Shop_Screen from "./Admin_Shop_Screen";
import Admin_Account_Screen from "./Admin_Account_Screen";

const Tab = createBottomTabNavigator();

const Admin_Landing_App = () => {
  return (
    <Tab.Navigator
      initialRouteName="Home_Screen"
      screenOptions={{
        tabBarStyle: [{ paddingTop: 10, height: 100 }, null],
      }}
    >
      <Tab.Screen
        options={{
          headerShown: false,
          tabBarShowLabel: false,
          tabBarIcon: ({ focused }) => (
            <View>
              <Feather
                name="home"
                size={24}
                color={focused ? "blue" : "gray"}
              />
            </View>
          ),
        }}
        name="Admin_Home_Screen"
        component={Admin_Home_Screen}
      />
      <Tab.Screen
        options={{
          headerTitle: "Calendar",
          tabBarShowLabel: false,
          tabBarIcon: ({ focused }) => (
            <View>
              <Feather
                name="calendar"
                size={24}
                color={focused ? "blue" : "gray"}
              />
            </View>
          ),
        }}
        name="Admin_Calendar_Screen"
        component={Admin_Calendar_Screen}
      />
      <Tab.Screen
        options={{
          headerTitle: "Shop",
          tabBarShowLabel: false,
          tabBarIcon: ({ focused }) => (
            <View>
              <Feather
                name="shopping-bag"
                size={24}
                color={focused ? "blue" : "gray"}
              />
            </View>
          ),
        }}
        name="Admin_Shop_Screen"
        component={Admin_Shop_Screen}
      />
      <Tab.Screen
        options={{
          headerTitle: "Account",
          tabBarShowLabel: false,
          tabBarIcon: ({ focused }) => (
            <View>
              <Feather
                name="user"
                size={24}
                color={focused ? "blue" : "gray"}
              />
            </View>
          ),
        }}
        name="Admin_Account_Screen"
        component={Admin_Account_Screen}
      />
    </Tab.Navigator>
  );
};

export default Admin_Landing_App;

const styles = StyleSheet.create({});
