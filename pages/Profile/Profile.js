import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  Image,
  TextInput,
  TouchableOpacity,
  ScrollView,
  FlatList,
  StyleSheet,
  ActivityIndicator,
} from "react-native";
import * as ImagePicker from "expo-image-picker";
import { Feather, Ionicons } from "@expo/vector-icons";
import { useSelector, useDispatch } from "react-redux";
import { useRoute } from "@react-navigation/native";

import Message from "../../components/Message";

import { getUserDetails } from "../../slices/userSlice";
import {
  publishPhoto,
  resetMessage,
  getUserPhotos,
  deletePhoto,
  updatePhoto,
} from "../../slices/photoSlice";

import { uploads } from "../../utils/config";

export default function Profile() {
  const route = useRoute();
  const { id } = route.params;

  const dispatch = useDispatch();

  const { user, loading } = useSelector((state) => state.user);
  const { user: userAuth } = useSelector((state) => state.auth);
  const userId = userAuth?.user._id;
  const {
    photos,
    loading: loadingPhoto,
    message: messagePhoto,
    error: errorPhoto,
  } = useSelector((state) => state.photo);

  const [title, setTitle] = useState("");
  const [imageAsset, setImageAsset] = useState(null);
  const [editMode, setEditMode] = useState(false);
  const [editTitle, setEditTitle] = useState("");
  const [editId, setEditId] = useState("");

  useEffect(() => {
    dispatch(getUserDetails(userId));
    dispatch(getUserPhotos(userId));
  }, [dispatch, userId]);

  const resetComponentMessage = () => {
    setTimeout(() => {
      dispatch(resetMessage());
    }, 2000);
  };

  const handlePickImage = async () => {
    const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (status !== "granted") {
      alert("Precisamos de permissão para acessar suas fotos!");
      return;
    }

    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      quality: 1,
    });

    if (!result.canceled) {
      setImageAsset(result.assets[0]);
    }
  };

  const handleSubmit = () => {
    if (!title || !imageAsset) {
      alert("Preencha todos os campos!");
      return;
    }

    const formData = new FormData();

    const uri = imageAsset.uri;

    const fileName = imageAsset.fileName || uri.split("/").pop();

    let mimeType = imageAsset.mimeType;
    if (!mimeType) {
      const fileExtension = fileName.split(".").pop();
      mimeType = `image/${fileExtension === "jpg" ? "jpeg" : fileExtension}`;
    }

    formData.append("image", {
      uri: uri,
      name: fileName,
      type: mimeType,
    });

    formData.append("title", title);

    dispatch(publishPhoto(formData));

    setTitle("");
    setImageAsset(null);
    resetComponentMessage();
  };

  const handleDelete = (photoId) => {
    dispatch(deletePhoto(photoId));
    resetComponentMessage();
  };

  const handleEdit = (photo) => {
    setEditMode(true);
    setEditId(photo._id);
    setEditTitle(photo.title);
  };

  const handleUpdate = () => {
    const photoData = { id: editId, title: editTitle };
    dispatch(updatePhoto(photoData));
    setEditMode(false);
    resetComponentMessage();
  };

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#00f" />
      </View>
    );
  }

  return (
    <ScrollView style={styles.container}>
      <View style={styles.profileHeader}>
        {user.profileImage && (
          <Image
            source={{ uri: `${uploads}/users/${user.profileImage}` }}
            style={styles.profileImage}
          />
        )}
        <View style={styles.profileDescription}>
          <Text style={styles.name}>{user.name}</Text>
          <Text style={styles.bio}>{user.bio}</Text>
        </View>
      </View>

      {!editMode ? (
        <View style={styles.newPhoto}>
          <Text style={styles.sectionTitle}>
            Compartilhe algum momento seu:
          </Text>
          <TextInput
            style={styles.input}
            placeholder="Insira um título"
            placeholderTextColor="#aaa"
            value={title}
            onChangeText={setTitle}
          />
          <TouchableOpacity style={styles.pickButton} onPress={handlePickImage}>
            <Text style={styles.pickButtonText}>Escolher imagem</Text>
          </TouchableOpacity>

          {imageAsset && (
            <Image source={{ uri: imageAsset.uri }} style={styles.preview} />
          )}

          <TouchableOpacity style={styles.submitButton} onPress={handleSubmit}>
            <Text style={styles.submitText}>Postar</Text>
          </TouchableOpacity>
        </View>
      ) : (
        <View style={styles.editPhoto}>
          <Text style={styles.sectionTitle}>Editando:</Text>
          <TextInput
            style={styles.input}
            placeholder="Novo título"
            placeholderTextColor="#aaa"
            value={editTitle}
            onChangeText={setEditTitle}
          />
          <TouchableOpacity style={styles.submitButton} onPress={handleUpdate}>
            <Text style={styles.submitText}>Atualizar</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.submitButton, { backgroundColor: "#444" }]}
            onPress={() => setEditMode(false)}
          >
            <Text style={styles.submitText}>Cancelar edição</Text>
          </TouchableOpacity>
        </View>
      )}

      <View style={styles.photosContainer}>
        <Text style={styles.sectionTitle}>Fotos publicadas:</Text>

        {!Array.isArray(photos) || photos.length === 0 ? (
          <Text style={styles.noPhotos}>Ainda não há fotos publicadas</Text>
        ) : (
          <FlatList
            data={photos}
            numColumns={3}
            keyExtractor={(item) => item._id}
            renderItem={({ item }) => (
              <View style={styles.photo}>
                <Image source={{ uri: item.image }} style={styles.photoImage} />
                <View style={styles.actions}>
                  <Feather
                    name="edit"
                    size={20}
                    color="#fff"
                    onPress={() => handleEdit(item)}
                  />
                  <Ionicons
                    name="trash"
                    size={20}
                    color="#f33"
                    onPress={() => handleDelete(item._id)}
                  />
                </View>
                {errorPhoto && <Message msg={errorPhoto} type="error" />}
                {messagePhoto && <Message msg={messagePhoto} type="success" />}
              </View>
            )}
          />
        )}
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#000",
    padding: 10,
  },
  profileHeader: {
    flexDirection: "row",
    alignItems: "center",
    padding: 10,
    borderBottomColor: "#363636",
    borderBottomWidth: 1,
  },
  profileImage: {
    width: 100,
    height: 100,
    borderRadius: 50,
    marginRight: 20,
  },
  profileDescription: {
    flex: 1,
  },
  name: {
    color: "#fff",
    fontSize: 20,
    fontWeight: "bold",
  },
  bio: {
    color: "#999",
    marginTop: 4,
  },
  newPhoto: {
    padding: 10,
    borderBottomColor: "#363636",
    borderBottomWidth: 1,
  },
  sectionTitle: {
    color: "#fff",
    fontWeight: "bold",
    marginBottom: 10,
  },
  input: {
    borderWidth: 1,
    borderColor: "#363636",
    color: "#fff",
    borderRadius: 5,
    padding: 10,
    marginBottom: 10,
  },
  pickButton: {
    backgroundColor: "#222",
    padding: 10,
    borderRadius: 5,
    marginBottom: 10,
    alignItems: "center",
  },
  pickButtonText: {
    color: "#999",
  },
  preview: {
    width: "100%",
    height: 180,
    borderRadius: 5,
    marginBottom: 10,
  },
  submitButton: {
    backgroundColor: "#0094f6",
    padding: 10,
    borderRadius: 5,
    alignItems: "center",
    marginBottom: 10,
  },
  submitText: {
    color: "#fff",
    fontWeight: "bold",
  },
  photosContainer: {
    paddingVertical: 20,
  },
  photo: {
    width: "32%",
    margin: "0.6%",
  },
  photoImage: {
    width: "100%",
    height: 100,
    borderRadius: 5,
  },
  actions: {
    flexDirection: "row",
    justifyContent: "space-around",
    paddingVertical: 5,
  },
  noPhotos: {
    color: "#777",
    textAlign: "center",
  },
  editPhoto: {
    padding: 10,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});
