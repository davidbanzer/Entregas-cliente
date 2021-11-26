import { useNavigation } from "@react-navigation/core";
import React from "react";
import { View, Text, TouchableOpacity, Image, StyleSheet } from "react-native";
import { GooglePlacesAutocomplete } from "react-native-google-places-autocomplete";
import { useDispatch, useSelector } from "react-redux";
import { selectOrigin, setDestination, setOrigin } from "../slices/navSlice";
const HomeScreen = () => {
  const dispatch = useDispatch();
  const origin = useSelector(selectOrigin);
  const navigation = useNavigation();
  return (
    <View style={styles.container}>
      <GooglePlacesAutocomplete
        placeholder="Ubicación origen"
        nearbyPlacesAPI="GooglePlacesSearch"
        debounce={400}
        enablePoweredByContainer={false}
        minLength={2}
        query={{
          key: "AIzaSyDx5v3iGIIcAxjb60jqki-YDvuJ_qR5y58",
          language: "es",
        }}
        onPress={(data, details = null) => {
          dispatch(
            setOrigin({
              location: details.geometry.location,
              description: data.description,
            })
          );
          dispatch(setDestination(null));
        }}
        fetchDetails={true}
        styles={{
          container: {
            flex: 0,
            marginHorizontal: 10,
          },
        }}
      />
      <TouchableOpacity
        style={styles.touchable}
        onPress={() => navigation.navigate("Mapa")}
        disabled={!origin}
      >
        <View>
          <Image
            style={styles.image}
            source={{ uri: "https://links.papareact.com/3pn" }}
          />
        </View>
        <Text style={styles.text}>Solicitar chofer</Text>
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
