import React, { useEffect, useState } from "react";
import {
  Alert,
  Pressable,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { useSelector } from "react-redux";
import { FontAwesome } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/core";
import {
  selectDestination,
  selectOrigin,
  selectUser,
} from "../slices/navSlice";

const RideOptionsCard = () => {
  const user = useSelector(selectUser);
  const origin = useSelector(selectOrigin);
  const destination = useSelector(selectDestination);
  const navigation = useNavigation();
  const [price, setPrice] = useState({});
  useEffect(() => {
    calculatePrice();
  }, []);
  const calculatePrice = () => {
    fetch("http://apimoviles2.jmacboy.com/api/calcularprecio", {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        Authorization: "Bearer " + user.access_token,
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
  const createDelivery = () => {
    fetch("http://apimoviles2.jmacboy.com/api/entregas", {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        Authorization: "Bearer " + user.access_token,
      },
      body: JSON.stringify({
        latitudOrigen: origin.location.lat,
        latitudDestino: destination.location.lat,
        longitudOrigen: origin.location.lng,
        longitudDestino: destination.location.lng,
        precio: price.precio,
        client_id: user.cliente,
      }),
    })
      .then((response) => response.json())
      .then((json) => {
        console.log(json);
        Alert.alert("Esperando chofer ...");
      })
      .catch((error) => {
        console.error(error);
      });
  };
  return (
    <View style={styles.container}>
      <View
        style={{
          flexDirection: "row",
          justifyContent: "space-between",
        }}
      >
        <TouchableOpacity onPress={() => navigation.navigate("NavigateCard")}>
          <View>
            <FontAwesome
              style={{ fontSize: 35, marginLeft: "20%", marginVertical: 10 }}
              name="angle-left"
              backgroundColor="black"
            ></FontAwesome>
          </View>
        </TouchableOpacity>
        <Text
          style={{
            textAlign: "center",
            paddingVertical: 7,
            fontSize: 20,
            marginRight: "27%",
            marginVertical: 10,
          }}
        >
          Precio de la entrega
        </Text>
      </View>
      <Text style={{ textAlign: "center", fontSize: 18 }}>
        {price.precio} Bs
      </Text>

      <Pressable style={styles.button} onPress={() => createDelivery()}>
        <Text style={styles.text}>Pedir</Text>
      </Pressable>
    </View>
  );
};

export default RideOptionsCard;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
  },
  button: {
    position: "absolute",
    bottom: 100,
    alignSelf: "center",
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 12,
    paddingHorizontal: 32,
    backgroundColor: "black",
    width: 200,
  },
  text: {
    color: "white",
    fontWeight: "bold",
    fontSize: 16,
  },
});
