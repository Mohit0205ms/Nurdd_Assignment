import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Alert,
  Image,
} from 'react-native';
import { useRouter, useLocalSearchParams } from 'expo-router';
import Header from '../../components/Header';
import Button from '../../components/Button';
import { usePosts } from '../../hooks/usePosts';
import { Ionicons } from '@expo/vector-icons';
import {
  SafeAreaView,
  useSafeAreaInsets,
} from 'react-native-safe-area-context';

export default function Detail() {
  const params = useLocalSearchParams<{ id: string }>();
  const id = Number(params.id);
  const { getPostById, toggleFavorite } = usePosts();
  const post = getPostById(id);
  const router = useRouter();
  const insets = useSafeAreaInsets();

  if (!post)
    return (
      <View style={[styles.screen, styles.center]}>
        <Text style={{ color: '#fff' }}>Post not found</Text>
      </View>
    );

  return (
    <SafeAreaView style={styles.screen}>
      <Header title='Post' back />
      <ScrollView contentContainerStyle={styles.content}>
        <View style={styles.headerRow}>
          <View>
            <View>
              {post.image && (
                <Image
                  source={{ uri: post.image }}
                  style={styles.postImage}
                  resizeMode='cover'
                />
              )}
              <TouchableOpacity
                onPress={() => {
                  toggleFavorite(post.id);
                  Alert.alert('Updated', 'Favorite toggled');
                }}
                style={{ position: 'absolute', top: 5, right: 5 }}
              >
                <Ionicons
                  name={post.favorite ? 'heart' : 'heart-outline'}
                  size={26}
                  color={post.favorite ? '#ff2369ff' : '#fff'}
                />
              </TouchableOpacity>
            </View>
            <Text style={styles.title}>{post.title}</Text>
          </View>
        </View>
        <Text style={styles.body}>{post.body}</Text>
      </ScrollView>

      <View style={{ ...styles.bottom, marginBottom: insets.bottom }}>
        <Button
          title='Edit'
          onPress={() =>
            router.push({
              pathname: '/create',
              params: { editId: String(post.id) },
            })
          }
        />
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: '#050507',
  },
  content: {
    padding: 20,
    paddingBottom: 120,
  },
  title: {
    fontSize: 26,
    color: '#fff',
    fontWeight: '700',
    marginBottom: 8,
  },
  body: {
    color: '#bfbfc6',
    fontSize: 16,
    lineHeight: 24,
  },
  bottom: {
    position: 'absolute',
    left: 16,
    right: 16,
    bottom: 24,
  },
  headerRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  center: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  postImage: {
    width: '100%',
    height: 200,
    borderRadius: 12,
    marginBottom: 16,
  },
});
