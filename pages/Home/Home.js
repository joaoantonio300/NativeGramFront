import React, { useEffect } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  ActivityIndicator,
  StyleSheet,
  Dimensions,
} from "react-native";
import { useSelector, useDispatch } from "react-redux";
import { useNavigation } from "@react-navigation/native";

import LikeContainer from "../../components/LikeContainer";
import PhotoItem from "../../components/PhotoItem";
import { useResetComponentMessage } from "../../hooks/useResetComponentMessage";
import { getPhotos, like } from "../../slices/photoSlice";

export default function Home() {
  const dispatch = useDispatch();
  const navigation = useNavigation();
  const resetMessage = useResetComponentMessage(dispatch);

  const { user } = useSelector((state) => state.auth);
  const { photos, loading } = useSelector((state) => state.photo);

  useEffect(() => {
    dispatch(getPhotos());
  }, [dispatch]);

  const handleLike = (photo) => {
    dispatch(like(photo._id));
    resetMessage();
  };

  if (loading) {
    return (
      <View style={styles.center}>
        <ActivityIndicator size="large" color="#0094f6" />
        <Text>Carregando...</Text>
      </View>
    );
  }

  return (
    <ScrollView contentContainerStyle={styles.container}>
      {Array.isArray(photos) && photos.length > 0 ? (
        photos.map((photo) => (
          <View key={photo._id} style={styles.photoBlock}>
            <PhotoItem photo={photo} />
            <LikeContainer photo={photo} user={user} handleLike={handleLike} />
            <TouchableOpacity
              style={styles.btn}
              onPress={() => navigation.navigate("Photo", { id: photo._id })}
            >
              <Text style={styles.btnText}>Ver mais</Text>
            </TouchableOpacity>
          </View>
        ))
      ) : (
        <Text style={styles.noPhotos}>
          Ainda não há fotos publicadas,{" "}
          <Text
            style={styles.link}
            onPress={() => navigation.navigate("Profile", { id: user._id })}
          >
            Clique aqui
          </Text>
        </Text>
      )}
    </ScrollView>
  );
}

const screenWidth = Dimensions.get("window").width;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: screenWidth * 0.9,
    alignSelf: "center",
    paddingTop: 24,
    paddingBottom: 40,
  },
  photoBlock: {
    marginBottom: 20,
  },
  btn: {
    alignSelf: "center",
    maxWidth: 80,
    backgroundColor: "#0094f6",
    paddingVertical: 6,
    paddingHorizontal: 8,
    borderRadius: 6,
    marginTop: 8,
    marginBottom: 24,
  },
  btnText: {
    color: "#fff",
    textAlign: "center",
    fontWeight: "bold",
  },
  noPhotos: {
    textAlign: "center",
    fontSize: 16,
  },
  link: {
    color: "#0094f6",
    fontWeight: "bold",
  },
  center: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    paddingTop: 100,
  },
});
