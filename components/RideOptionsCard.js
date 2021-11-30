import React, { useEffect, useState } from "react";
import { StyleSheet, Text, View } from "react-native";
import { useSelector } from "react-redux";
import {
  selectDestination,
  selectOrigin,
  selectToken,
} from "../slices/navSlice";
const RideOptionsCard = () => {
  const token = useSelector(selectToken);
  const origin = useSelector(selectOrigin);
  const destination = useSelector(selectDestination);
  const [price, setPrice] = useState({});
  useEffect(() => {
    fetchPrice();
  }, []);
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
        setPrice(json);
      })
      .catch((error) => {
        console.error(error);
      });
  };
  return (
    <View>
      <Text>{price.precio}</Text>
    </View>
  );
};

export default RideOptionsCard;

const styles = StyleSheet.create({});
