import "react-native-gesture-handler";
import { StyleSheet, Text, View } from "react-native";
import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { Feather } from "@expo/vector-icons";

// SCREENS
import Home_Screen from "./Home_Screen";
import Calendar_Screen from "./Calendar_Screen";
import Shop_Screen from "./Shop_Screen";
import Cart_Screen from "./Cart_Screen";

const Tab = createBottomTabNavigator();

const Landing_App = () => {
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
        name="Home_Screen"
        component={Home_Screen}
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
        name="Calendar_Screen"
        component={Calendar_Screen}
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
        name="Shop_Screen"
        component={Shop_Screen}
      />
      <Tab.Screen
        options={{
          headerTitle: "Cart",
          tabBarShowLabel: false,
          tabBarIcon: ({ focused }) => (
            <View>
              <Feather
                name="shopping-cart"
                size={24}
                color={focused ? "blue" : "gray"}
              />
            </View>
          ),
        }}
        name="Cart_Screen"
        component={Cart_Screen}
      />
    </Tab.Navigator>
  );
};

export default Landing_App;

const styles = StyleSheet.create({});
