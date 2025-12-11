import React, { useEffect, useState, useCallback } from 'react';
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  TextInput,
  ActivityIndicator,
  BackHandler,
  Alert,
  RefreshControl,
} from 'react-native';
import { usePosts } from '../../hooks/usePosts';
import Card from '../../components/Card';
import Header from '../../components/Header';
import Button from '../../components/Button';
import { useRouter } from 'expo-router';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useFocusEffect, useNavigation } from '@react-navigation/native';

export default function Home() {
  const { posts, loading, fetchPosts } = usePosts();
  const [query, setQuery] = useState('');
  const router = useRouter();
  const navigation = useNavigation();

  useEffect(() => {
    fetchPosts();
  }, []);

  useEffect(() => {
    navigation.setOptions({
      gestureEnabled: false,
    });
  }, [navigation]);

  useFocusEffect(
    useCallback(() => {
      const subscription = BackHandler.addEventListener('hardwareBackPress', () => {
        Alert.alert(
          'Exit App',
          'Are you sure you want to exit?',
          [
            { text: 'Cancel', style: 'cancel' },
            { text: 'Exit', onPress: () => BackHandler.exitApp() },
          ],
          { cancelable: true }
        );
        return true;
      });

      return () => {
        subscription.remove();
      };
    }, [])
  );

  const filtered = posts.filter((p) =>
    p.title.toLowerCase().includes(query.toLowerCase()),
  );

  return (
    <SafeAreaView style={styles.screen}>
      <Header title='Posts' showLogout={true}/>
      <View style={styles.content}>
        <TextInput
          placeholder='Search'
          placeholderTextColor='#8b8b92'
          style={styles.search}
          value={query}
          onChangeText={setQuery}
        />

        {loading ? (
          <ActivityIndicator
            color='#7c62ff'
            size='large'
            style={{ marginTop: 24 }}
          />
        ) : (
          <FlatList
            data={filtered}
            keyExtractor={(i) => String(i.id)}
            renderItem={({ item }) => (
              <Card
                item={item}
                onPress={() => router.push(`/home/${item.id}`)}
              />
            )}
            contentContainerStyle={{ paddingBottom: 120 }}
            refreshControl={
              <RefreshControl
                refreshing={loading}
                onRefresh={fetchPosts}
              />
            }
          />
        )}
        <View style={styles.fab}>
          <Button title='+ Create' onPress={() => router.push('/create')} />
        </View>
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
    flex: 1,
    paddingHorizontal: 16,
    paddingTop: 8,
  },
  search: {
    backgroundColor: '#0f0f12',
    padding: 12,
    borderRadius: 12,
    color: '#fff',
    marginBottom: 12,
    borderWidth: 1,
    borderColor: '#19171a',
  },
  fab: {
    position: 'absolute',
    bottom: 24,
    right: 16,
  },
});
