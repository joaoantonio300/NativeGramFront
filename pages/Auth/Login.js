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

import Message from "../../components/Message";

import { useSelector, useDispatch } from "react-redux";

import { login, reset } from "../../slices/authSlice";

export default function Login() {
  const navigation = useNavigation();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [msg, setMsg] = useState("");

  const dispatch = useDispatch();

  const { loading, error } = useSelector((state) => state.auth);

  const handleSubmit = () => {
    if (!email || !password) {
      return setMsg("O campo de email e senha são obrigatórios");
    }

    setMsg("");

    const user = {
      email,
      password,
    };

    dispatch(login(user));
  };

  useEffect(() => {
    dispatch(reset());
  }, [dispatch]);

  return (
    <View style={styles.view}>
      <View style={styles.container}>
        <Text style={styles.title}>ReactGram</Text>
        <Text style={styles.subtitle}>
          Faça o login para ver o que há de novo.
        </Text>

        <View style={styles.form}>
          <TextInput
            style={styles.input}
            placeholder="E-mail"
            placeholderTextColor="#999"
            keyboardType="email-address"
            value={email || ""}
            onChangeText={setEmail}
          />
          <TextInput
            style={styles.input}
            placeholder="Senha"
            placeholderTextColor="#999"
            secureTextEntry
            value={password || ""}
            onChangeText={setPassword}
          />

          {!loading ? (
            <TouchableOpacity style={styles.button} onPress={handleSubmit}>
              <Text style={styles.buttonText}>Entrar</Text>
            </TouchableOpacity>
          ) : (
            <TouchableOpacity style={[styles.button, styles.disabled]} disabled>
              <ActivityIndicator color="#fff" />
            </TouchableOpacity>
          )}

          {error ? (
            <Message msg={error} style={styles.error} type="error" />
          ) : null}
          {/* {msg ? <Message msg={msg} style={styles.error} type="error" /> : null} */}
        </View>

        <Text style={styles.footerText}>
          Não tem uma conta?{" "}
          <Text
            style={styles.link}
            onPress={() => navigation.navigate("Register")}
          >
            Clique aqui
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
    backgroundColor: "#000",
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
