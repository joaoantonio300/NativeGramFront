import React from 'react'
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native'
import { Ionicons } from '@expo/vector-icons' 

export default function LikeContainer({ photo, user, handleLike }) {
  if (!photo.likes || !user) return null

  const isLiked = photo.likes.includes(user._id)

  return (
    <View style={styles.like}>
      {isLiked ? (
        <Ionicons name="heart" size={24} color="#e63946" />
      ) : (
        <TouchableOpacity onPress={() => handleLike(photo)}>
          <Ionicons name="heart-outline" size={24} color="#363636" />
        </TouchableOpacity>
      )}
      <Text style={styles.likeText}>{photo.likes.length} like(s)</Text>
    </View>
  )
}

const styles = StyleSheet.create({
  like: {
    flexDirection: 'row',
    alignItems: 'center',
    borderTopWidth: 1,
    borderBottomWidth: 1,
    borderColor: '#363636',
    paddingVertical: 8,
  },
  likeText: {
    marginLeft: 12, 
    fontSize: 16,
    color: '#222',
  },
})
