import { useNavigation } from "@react-navigation/core";
import React from "react";
import { View, Text, TouchableOpacity, Image, StyleSheet } from "react-native";

const HomeScreen = () => {
  const navigation = useNavigation();
  return (
    <View style={styles.container}>
      <TouchableOpacity
        style={styles.touchable}
        onPress={() => navigation.navigate("Mapa")}
      >
        <View>
          <Image
            style={styles.image}
            source={{ uri: "https://links.papareact.com/3pn" }}
          />
        </View>
        <Text style={styles.text}>Enviar paquete</Text>
      </TouchableOpacity>
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    backgroundColor: "#ffffff",
    flex: 1,
    padding: 10,
  },
  image: {
    width: 120,
    height: 120,
    resizeMode: "contain",
  },
  touchable: {
    alignItems: "center",
    margin: 20,
    padding: 10,
    width: 150,
    height: 170,
    backgroundColor: "#dcdcdc",
  },
  text: {
    fontWeight: "bold",
    fontSize: 16,
  },
});
export default HomeScreen;
