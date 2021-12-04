import { useNavigation } from "@react-navigation/core";
import React, { useState } from "react";
import {
  Alert,
  Pressable,
  SafeAreaView,
  StyleSheet,
  Text,
  TextInput,
  ToastAndroid,
  View,
} from "react-native";
import { useDispatch } from "react-redux";
import { setUser } from "../slices/navSlice";

const LoginScreen = () => {
  const dispatch = useDispatch();
  const navigation = useNavigation();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const fetchLogin = () => {
    fetch("http://apimoviles2.jmacboy.com/api/login", {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email: email,
        password: password,
      }),
    })
      .then((response) => response.json())
      .then((json) => {
        if (!json.message) {
          navigation.navigate("Entregas");
          dispatch(setUser(json));
          setEmail("");
          setPassword("");
        } else {
          showToast();
        }
      })
      .catch((error) => {
        console.error(error);
      });
  };
  const showToast = () => {
    ToastAndroid.show("Datos Incorrectos", ToastAndroid.LONG);
  };
  return (
    <SafeAreaView style={styles.container}>
      <View>
        <View>
          <Text style={styles.title}>UBER PEDIDOS</Text>
        </View>
        <TextInput
          style={styles.input}
          onChangeText={setEmail}
          value={email}
          placeholder="Correo"
        />
        <TextInput
          secureTextEntry={true}
          style={styles.input}
          onChangeText={setPassword}
          value={password}
          placeholder="Contraseña"
        />
        <Pressable style={styles.button} onPress={() => fetchLogin()}>
          <Text style={styles.text}>Iniciar</Text>
        </Pressable>
        <Pressable
          style={styles.button}
          onPress={() => navigation.navigate("Register")}
        >
          <Text style={styles.text}>Registrarse</Text>
        </Pressable>
      </View>
    </SafeAreaView>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    padding: 10,
    justifyContent: "center",
  },
  title: {
    textAlign: "center",
    fontSize: 24,
    fontWeight: "bold",
  },
  input: {
    height: 40,
    marginVertical: 12,
    padding: 10,
    borderWidth: 1,
  },
  button: {
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 12,
    paddingHorizontal: 32,
    backgroundColor: "black",
    marginVertical: 10,
  },
  text: {
    color: "white",
    fontWeight: "bold",
    fontSize: 16,
  },
});
export default LoginScreen;
