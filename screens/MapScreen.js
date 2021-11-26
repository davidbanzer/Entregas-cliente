import React from "react";
import { View, Text, StyleSheet } from "react-native";
import Map from "../components/Map";
import MapView from "react-native-maps";

const MapScreen = () => {
  return (
    <View>
      <View style={styles.views}>
        <Map></Map>
      </View>
      <View style={styles.views}>
        <Text>Card</Text>
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
