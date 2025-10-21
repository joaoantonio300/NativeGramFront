import React from "react";
import { View, Text, StyleSheet } from "react-native";

const Message = ({ msg, type }) => {
  if (!msg) return null;

  return (
    <View style={[styles.message, type === "error" ? styles.error : styles.success]}>
      <Text style={[styles.text, type === "error" ? styles.errorText : styles.successText]}>
        {msg}
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  message: {
    borderRadius: 5,
    padding: 10,
    marginVertical: 8,
    alignItems: "center",
    justifyContent: "center",
    width: "90%",
    alignSelf: "center",
  },
  error: {
    backgroundColor: "#f8d7da",
    borderColor: "#f5c6cb",
    borderWidth: 1,
  },
  success: {
    backgroundColor: "#d4edda",
    borderColor: "#c3e6cb",
    borderWidth: 1,
  },
  text: {
    fontSize: 16,
    textAlign: "center",
  },
  errorText: {
    color: "#721c24",
  },
  successText: {
    color: "#155724",
  },
});

export default Message;
