import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import { useClerk } from '@clerk/clerk-expo';

export default function Header({
  title,
  back = false,
  showLogout = false
}: {
  title: string;
  back?: boolean;
  showLogout?: boolean;
}) {
  const router = useRouter();
  const { signOut } = useClerk();

  const handleSignOut = async () => {
    try {
      await signOut()
      router.replace('/');
    } catch (err) {
      console.error(JSON.stringify(err, null, 2))
    }
  }

  return (
    <View style={styles.header}>
      {back ? (
        <TouchableOpacity onPress={() => router.back()}>
          <Ionicons name='chevron-back' size={22} color='#fff' />
        </TouchableOpacity>
      ) : (
        <View style={{ width: 28 }} />
      )}
      <Text style={styles.title}>{title}</Text>
      <View style={{ width: 28 }} />
      {showLogout && (
        <TouchableOpacity onPress={handleSignOut} style={{position: 'absolute', right: 20}}>
          <Ionicons name='log-out-outline' size={30} color='#fff' />
        </TouchableOpacity>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  header: {
    height: 56,
    paddingHorizontal: 16,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: '#050507',
  },
  title: { 
    color: '#fff', 
    fontSize: 18, 
    fontWeight: '700' 
  },
});
