import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image } from 'react-native';
import { Post } from '../types/post';

export default function Card({
  item,
  onPress,
}: {
  item: Post;
  onPress: () => void;
}) {
  return (
    <TouchableOpacity style={styles.card} onPress={onPress}>
      <Image
        source={{ uri: `https://picsum.photos/seed/${item.id}/80/80` }}
        style={styles.thumb}
      />
      <View style={{ flex: 1 }}>
        <Text numberOfLines={1} style={styles.title}>
          {item.title}
        </Text>
        <Text numberOfLines={2} style={styles.desc}>
          {item.body}
        </Text>
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: '#0f0f12',
    padding: 12,
    borderRadius: 14,
    flexDirection: 'row',
    gap: 12,
    marginBottom: 12,
    borderWidth: 1,
    borderColor: '#1b1a1d',
  },
  thumb: { width: 72, height: 72, borderRadius: 10, backgroundColor: '#222' },
  title: { color: '#fff', fontWeight: '700', marginBottom: 4 },
  desc: { color: '#bdbdc3', fontSize: 13 },
});
