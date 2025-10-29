import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  ActivityIndicator,
} from "react-native";
import { useNavigation } from "@react-navigation/native";

// Components
// import Message from "../../components/Message";

import { useSelector, useDispatch } from "react-redux";

import { register, reset } from "../../slices/authSlice";

export default function Register() {
  // eu faço a navegacao com isso
  const navigation = useNavigation();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const dispatch = useDispatch();

  const { loading, error } = useSelector((state) => state.auth);

  const handleSubmit = (e) => {
    e.preventDefault();

    const user = {
      name,
      email,
      password,
      confirmPassword,
    };

    console.log(user);

    dispatch(register(user));
  };

  useEffect(() => {
    dispatch(reset());
  }, [dispatch]);

   return (
   <View style={styles.view}>
     <View style={styles.container}>
      <Text style={styles.title}>ReactGram</Text>
      <Text style={styles.subtitle}>
        Cadastre-se para ver as fotos dos seus amigos.
      </Text>

      <View style={styles.form}>
        <TextInput
          style={styles.input}
          placeholder="Nome"
          placeholderTextColor="#999"
          value={name}
          onChangeText={setName}
        />
        <TextInput
          style={styles.input}
          placeholder="E-mail"
          placeholderTextColor="#999"
          keyboardType="email-address"
          value={email}
          onChangeText={setEmail}
        />
        <TextInput
          style={styles.input}
          placeholder="Senha"
          placeholderTextColor="#999"
          secureTextEntry
          value={password}
          onChangeText={setPassword}
        />
        <TextInput
          style={styles.input}
          placeholder="Confirme a senha"
          placeholderTextColor="#999"
          secureTextEntry
          value={confirmPassword}
          onChangeText={setConfirmPassword}
        />

        {!loading ? (
          <TouchableOpacity style={styles.button} onPress={handleSubmit}>
            <Text style={styles.buttonText}>Cadastrar</Text>
          </TouchableOpacity>
        ) : (
          <TouchableOpacity style={[styles.button, styles.disabled]} disabled>
            <ActivityIndicator color="#fff" />
          </TouchableOpacity>
        )}

        {error ? <Text style={styles.error}>{error}</Text> : null}
      </View>

      <Text style={styles.footerText}>
        Já tem conta?{" "}
        <Text
          style={styles.link}
          onPress={() => navigation.navigate("Login")}
        >
          Clique aqui.
        </Text>
      </Text>
    </View>
   </View>
  );
}

const styles = StyleSheet.create({
  view: {
    flex: 1,
    alignContent: "center",
    justifyContent: "center",
    backgroundColor: "#000"
  },
  container: {
    borderWidth: 1,
    borderColor: "#363636",
    backgroundColor: "#000",
    paddingVertical: 24,
    paddingHorizontal: 20,
    margin: 24,
    borderRadius: 8,
  },
  title: {
    textAlign: "center",
    color: "#fff",
    fontSize: 22,
    fontWeight: "bold",
    marginBottom: 20,
  },
  subtitle: {
    textAlign: "center",
    color: "#999",
    fontWeight: "bold",
    marginBottom: 20,
  },
  form: {
    borderBottomWidth: 1,
    borderBottomColor: "#363636",
    paddingBottom: 20,
    marginBottom: 20,
  },
  input: {
    borderWidth: 1,
    borderColor: "#363636",
    color: "#fff",
    padding: 10,
    borderRadius: 5,
    marginBottom: 12,
  },
  button: {
    backgroundColor: "#0094f6",
    paddingVertical: 12,
    borderRadius: 5,
    alignItems: "center",
  },
  buttonText: {
    color: "#fff",
    fontWeight: "bold",
  },
  disabled: {
    opacity: 0.6,
  },
  error: {
    color: "#ff4444",
    textAlign: "center",
    marginTop: 10,
  },
  footerText: {
    color: "#ccc",
    textAlign: "center",
  },
  link: {
    color: "#0094f6",
    fontWeight: "bold",
  },
});