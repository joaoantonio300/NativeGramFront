import React from 'react'
import { View, Text, Image, StyleSheet, TouchableOpacity } from 'react-native'
import { useNavigation } from '@react-navigation/native'
import { uploads } from '../utils/config'

export default function PhotoItem({ photo }) {
  const navigation = useNavigation()

  return (
    <View style={styles.photoItem}>
      {photo.image && (
        <Image
          source={{ uri: `${uploads}/photos/${photo.image}` }}
          style={styles.photoImage}
          resizeMode="cover"
        />
      )}
      <Text style={styles.title}>{photo.title}</Text>

      <Text style={styles.author}>
        Publicada por:{' '}
        <TouchableOpacity
          onPress={() => navigation.navigate('Profile', { id: photo.userId })}
        >
          <Text style={styles.authorName}>{photo.userName}</Text>
        </TouchableOpacity>
      </Text>
    </View>
  )
}

const styles = StyleSheet.create({
  photoItem: {
    marginBottom: 16,
  },
  photoImage: {
    width: '100%',
    height: 250,
    borderRadius: 8,
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 4, 
  },
  author: {
    textAlign: 'left',
    fontSize: 14,
    color: '#333',
  },
  authorName: {
    fontWeight: 'bold',
    color: '#007bff',
  },
})
