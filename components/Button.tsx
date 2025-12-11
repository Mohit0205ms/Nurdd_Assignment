import React from 'react';
import { TouchableOpacity, Text, StyleSheet, ViewStyle, ActivityIndicator } from 'react-native';

export default function Button({
  title,
  onPress,
  disabled = false,
  style,
  loading = false,
}: {
  title: string;
  onPress: () => void;
  disabled?: boolean;
  style?: ViewStyle;
  loading?: boolean;
}) {
  return (
    <TouchableOpacity
      style={[styles.button, style, disabled && { opacity: 0.6 }]}
      onPress={onPress}
      disabled={disabled}
    >
      {!loading && <Text style={styles.text}>{title}</Text>}
      {loading && (
        <ActivityIndicator size={'small'} color={'white'}/>
      )}
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  button: {
    backgroundColor: '#5B43FF',
    paddingVertical: 14,
    paddingHorizontal: 18,
    borderRadius: 14,
    alignItems: 'center',
    justifyContent: 'center',
    minWidth: 140,
    shadowColor: '#5b43ff',
    shadowOpacity: 0.25,
    shadowRadius: 12,
    elevation: 4,
  },
  text: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '700',
  },
});
