import { useNavigation } from "@react-navigation/core";
import React from "react";
import { SafeAreaView, StyleSheet, Text, View } from "react-native";
import { GooglePlacesAutocomplete } from "react-native-google-places-autocomplete";
import { useDispatch, useSelector } from "react-redux";
import {
  selectDestination,
  selectOrigin,
  selectToken,
  setDestination,
} from "../slices/navSlice";
const NavigateCard = () => {
  const dispatch = useDispatch();
  const token = useSelector(selectToken);
  const origin = useSelector(selectOrigin);
  const destination = useSelector(selectDestination);
  const navigation = useNavigation();
  const fetchPrice = () => {
    fetch("http://apimoviles2.jmacboy.com/api/calcularprecio", {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        Authorization: "Bearer " + token,
      },
      body: JSON.stringify({
        latitudOrigen: origin.location.lat,
        latitudDestino: destination.location.lat,
        longitudOrigen: origin.location.lng,
        longitudDestino: destination.location.lng,
      }),
    })
      .then((response) => response.json())
      .then((json) => {
        console.log(json);
      })
      .catch((error) => {
        console.error(error);
      });
  };
  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: "white" }}>
      <Text style={styles.title}>Seleccione el destino</Text>
      <View style={styles.autocomplete}>
        <GooglePlacesAutocomplete
          placeholder="Ubicación destion"
          nearbyPlacesAPI="GooglePlacesSearch"
          debounce={400}
          enablePoweredByContainer={false}
          minLength={2}
          fetchDetails={true}
          query={{
            key: "AIzaSyDx5v3iGIIcAxjb60jqki-YDvuJ_qR5y58",
            language: "es",
          }}
          onPress={(data, details = null) => {
            dispatch(
              setDestination({
                location: details.geometry.location,
                description: data.description,
              })
            );
            fetchPrice();
          }}
          styles={{
            container: {
              flex: 0,
              marginHorizontal: 10,
            },
            textInput: {
              backgroundColor: "#DDDDDF",
              borderRadius: 0,
            },
            textInputContainer: {
              paddingHorizontal: 20,
            },
          }}
        />
      </View>
    </SafeAreaView>
  );
};

export default NavigateCard;

const styles = StyleSheet.create({
  title: {
    textAlign: "center",
    padding: 15,
    fontSize: 18,
  },
});
