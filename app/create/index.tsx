import React, { useEffect, useState } from 'react';
import {
  View,
  StyleSheet,
  Alert,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';
import Header from '../../components/Header';
import Input from '../../components/Input';
import Button from '../../components/Button';
import { usePosts } from '../../hooks/usePosts';
import { useLocalSearchParams, useRouter } from 'expo-router';
import {
  SafeAreaView
} from 'react-native-safe-area-context';

export default function CreateEdit() {
  const { createPost, updatePost, getPostById } = usePosts();
  const params = useLocalSearchParams<{ editId?: string }>();
  const editId = params.editId ? Number(params.editId) : undefined;
  const router = useRouter();

  const [title, setTitle] = useState('');
  const [body, setBody] = useState('');
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (editId) {
      const p = getPostById(editId);
      if (p) {
        setTitle(p.title);
        setBody(p.body);
      }
    }
  }, [editId]);

  const onSubmit = async () => {
    if (!title.trim() || !body.trim())
      return Alert.alert('Validation', 'Please fill all fields.');
    setLoading(true);
    try {
      if (editId) {
        await updatePost(editId, { title, body });
        Alert.alert('Updated', 'Post updated successfully.');
      } else {
        await createPost({ title, body });
        Alert.alert('Created', 'Post created and added to list.');
      }
      router.back();
    } catch (e) {
      Alert.alert('Error', 'Unable to save post.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: '#050507' }}>
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}
        style={{ flex: 1 }}
      >
        <Header title={editId ? 'Edit Post' : 'Create Post'} back />
        <View style={styles.container}>
          <Input placeholder='Title' value={title} onChangeText={setTitle} />
          <Input
            placeholder='Body'
            value={body}
            onChangeText={setBody}
            multiline
            style={{
              height: 120,
              backgroundColor: 'rgba(255,255,255,0.06)',
              color: 'white',
              paddingLeft: 20,
              borderRadius: 12
            }}
          />
          <View style={{ marginTop: 20 }}>
            <Button
              title={loading ? 'Saving...' : 'Submit'}
              onPress={onSubmit}
              disabled={loading}
            />
          </View>
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { 
    flex: 1, 
    padding: 16 
  },
});
