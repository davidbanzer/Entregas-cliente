import React from "react";
import { View, Text, StyleSheet } from "react-native";
import Map from "../components/Map";
import MapView from "react-native-maps";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import NavigateCard from "../components/NavigateCard";
import RideOptionsCard from "../components/RideOptionsCard";

const MapScreen = () => {
  const Stack = createNativeStackNavigator();
  return (
    <View>
      <View style={styles.views}>
        <Map></Map>
      </View>
      <View style={styles.views}>
        <Stack.Navigator>
          <Stack.Screen
            name="NavigateCard"
            component={NavigateCard}
            options={{
              headerShown: false,
            }}
          />
          <Stack.Screen
            name="RideOptionsCard"
            component={RideOptionsCard}
            options={{
              headerShown: false,
            }}
          />
        </Stack.Navigator>
      </View>
    </View>
  );
};
const styles = StyleSheet.create({
  views: {
    height: "50%",
  },
});
export default MapScreen;
