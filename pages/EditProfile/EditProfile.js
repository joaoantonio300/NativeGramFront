import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Image,
  StyleSheet,
  ActivityIndicator,
  ScrollView,
} from "react-native";
import * as ImagePicker from "expo-image-picker";
import { useDispatch, useSelector } from "react-redux";
import { profile, updateProfile, resetMessage } from "../../slices/userSlice";
import Message from "../../components/Message";
import { uploads } from "../../utils/config";

const EditProfile = () => {
  const dispatch = useDispatch();
  const { user, message, error, loading } = useSelector((state) => state.user);

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [bio, setBio] = useState("");
  const [profileImage, setProfileImage] = useState(null);
  const [previewImage, setPreviewImage] = useState(null);

  useEffect(() => {
    dispatch(profile());
  }, [dispatch]);

  useEffect(() => {
    if (user) {
      setName(user.name);
      setEmail(user.email);
      setBio(user.bio);
    }
  }, [user]);

  const handleImagePick = async () => {
    const permission = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (!permission.granted) {
      alert("Permissão para acessar a galeria é necessária!");
      return;
    }

    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      quality: 1,
    });

    if (!result.canceled) {
      const uri = result.assets[0];
      setPreviewImage(uri);
      setProfileImage(uri);
    }
  };

  const handleSubmit = async () => {
    const formData = new FormData();

    if (name) {
      formData.append("name", name);
    }
    if (bio) {
      formData.append("bio", bio);
    }
    if (password) {
      formData.append("password", password);
    }
    if (profileImage) {
      const uri = profileImage.uri;
      const fileName = profileImage.fileName || uri.split("/").pop();

      let mimeType = profileImage.mimeType;
      if (!mimeType) {
        const fileExtension = fileName.split(".").pop();
        mimeType = `image/${fileExtension === "jpg" ? "jpeg" : fileExtension}`;
      }
      formData.append("profileImage", {
        uri: uri,
        name: fileName,
        type: mimeType,
      });
    }

    await dispatch(updateProfile(formData));
    setTimeout(() => dispatch(resetMessage()), 2000);
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.title}>Edite seus dados</Text>
      <Text style={styles.subtitle}>
        Adicione uma imagem de perfil e conte mais sobre você...
      </Text>

      {(user?.profileImage || previewImage) && (
        <Image
          style={styles.profileImage}
          source={{
            uri: previewImage
              ? previewImage.uri
              : user.profileImage
              ? `${uploads}/users/${user.profileImage}`
              : null,
          }}
        />
      )}

      <TextInput
        style={styles.input}
        placeholder="Nome"
        placeholderTextColor="#888"
        value={name || ""}
        onChangeText={setName}
      />

      <TextInput
        style={[styles.input, { backgroundColor: "#222" }]}
        placeholder="E-mail"
        placeholderTextColor="#888"
        value={email || ""}
        editable={false}
      />

      <TouchableOpacity style={styles.imageButton} onPress={handleImagePick}>
        <Text style={styles.imageButtonText}>Selecionar imagem do perfil</Text>
      </TouchableOpacity>

      <TextInput
        style={styles.input}
        placeholder="Descrição do perfil"
        placeholderTextColor="#888"
        value={bio || ""}
        onChangeText={setBio}
      />

      <TextInput
        style={styles.input}
        placeholder="Digite sua nova senha"
        placeholderTextColor="#888"
        secureTextEntry
        value={password || ""}
        onChangeText={setPassword}
      />

      {!loading ? (
        <TouchableOpacity style={styles.button} onPress={handleSubmit}>
          <Text style={styles.buttonText}>Atualizar</Text>
        </TouchableOpacity>
      ) : (
        <ActivityIndicator color="#fff" />
      )}

      {error && <Message msg={error} type="error" />}
      {message && <Message msg={message} type="success" />}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#000",
    borderColor: "#363636",
    borderWidth: 1,
    paddingVertical: 24,
    paddingHorizontal: 20,
    alignItems: "center",
    justifyContent: "center",
  },
  title: {
    fontSize: 22,
    color: "#fff",
    marginBottom: 8,
    textAlign: "center",
  },
  subtitle: {
    color: "#ccc",
    fontSize: 14,
    marginBottom: 20,
    textAlign: "center",
  },
  profileImage: {
    width: 150,
    height: 150,
    borderRadius: 75,
    marginBottom: 16,
  },
  input: {
    backgroundColor: "#111",
    color: "#fff",
    borderColor: "#363636",
    borderWidth: 1,
    borderRadius: 8,
    width: "90%",
    padding: 12,
    marginBottom: 12,
  },
  imageButton: {
    backgroundColor: "#222",
    borderColor: "#444",
    borderWidth: 1,
    borderRadius: 8,
    paddingVertical: 10,
    paddingHorizontal: 15,
    marginBottom: 12,
  },
  imageButtonText: {
    color: "#ccc",
    textAlign: "center",
  },
  button: {
    backgroundColor: "#444",
    borderRadius: 8,
    paddingVertical: 12,
    width: "90%",
    marginTop: 10,
  },
  buttonText: {
    color: "#fff",
    textAlign: "center",
    fontWeight: "bold",
  },
});

export default EditProfile;
