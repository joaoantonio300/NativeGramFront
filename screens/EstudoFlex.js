import React, { useState } from "react";
import {
  StyleSheet,
  Text,
  Image,
  View,
  TouchableOpacity,
  TextInput,
} from "react-native";

export default function EstudoFlex() {
  const [flexDirection, setFlexDirection] = useState("column");
  const [value, setValue] = useState("teste");

  return (
    <PreviewLayout
      label="flexDirection"
      values={["column", "row", "column-reverse", "row-reverse"]}
      selectedValue={flexDirection}
      setSelectedValue={setFlexDirection}
      value={value}
      setValue={setValue}
    >
      <View style={[styles.box, { backgroundColor: "powderblue" }]}></View>
      <View style={[styles.box, { backgroundColor: "skyblue" }]}></View>
      <View style={[styles.box, { backgroundColor: "red" }]}></View>
    </PreviewLayout>
  );
}

const PreviewLayout = ({
  label,
  children,
  values,
  selectedValue,
  setSelectedValue,
  value,
  setValue,
}) => {
  return (
    <View style={{ padding: 10, flex: 1, backgroundColor: "#fff" }}>
      <View style={styles.teste}>
        <View>
          <Image source={require("../assets/reactExample.png")} style={styles.image} />
          <Text style={styles.txt}>
            <Text style={{ fontWeight: "bold" }}>Trampo</Text>Já
          </Text>
        </View>
        <View>
          <TextInput
            style={styles.input}
            placeholder="Buscar..."
            value={value}
            onChangeText={setValue}
          />
        </View>
      </View>
      <View style={styles.row}>
        {values.map((value) => (
          <TouchableOpacity
            key={value}
            onPress={() => setSelectedValue(value)}
            style={[styles.button, selectedValue === value && styles.selected]}
          >
            <Text
              style={[
                styles.buttonLabel,
                selectedValue === value && styles.selectedLabel,
              ]}
            >
              {value}
            </Text>
          </TouchableOpacity>
        ))}
      </View>
      <View style={[styles.container, { [label]: selectedValue }]}>
        {children}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: 8,
    backgroundColor: "aliceblue",
  },
  input: {
    height: 40,
    margin: 10,
    borderWidth: 1,
    padding: 10,
    paddingHorizontal: 15,
  },
  box: {
    width: 50,
    height: 50,
  },
  button: {
    paddingHorizontal: 30,
    paddingVertical: 6,
    backgroundColor: "oldlace",
    borderRadius: 4,
    alignSelf: "flex-start",
    marginHorizontal: "1%",
    marginBottom: 6,
  },
  selected: {
    backgroundColor: "coral",
    borderWidth: 0,
  },
  selectedLabel: {
    color:"white",
  },
  buttonLabel: {
    fontSize: 12,
    fontWeight: "500",
    color: "coral",
  },
  row: {
    flexDirection: "row",
    flexWrap: "wrap",
  },
  teste: {
    flexDirection: "row",
  },
  txt: {
    marginVertical: "10%",
    paddingBottom: 20
  },
  image: {
    textAlign: "center",
    marginBottom: 10,
    width: 70,
    height: 70,
  },
});
