import React, { useState, useEffect } from 'react';
import { useSignIn, useAuth } from '@clerk/clerk-expo';
import {
  View,
  Text,
  StyleSheet,
  KeyboardAvoidingView,
  Platform,
  TouchableOpacity,
  TouchableWithoutFeedback,
  Keyboard,
  ActivityIndicator,
} from 'react-native';
import Input from '../components/Input';
import Button from '../components/Button';
import { useRouter } from 'expo-router';

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);

  const router = useRouter();
  const { signIn, setActive, isLoaded } = useSignIn();
  const { isLoaded: authLoaded, isSignedIn } = useAuth();

  useEffect(() => {
    if (authLoaded && isSignedIn) {
      router.replace('/home');
    }
  }, [authLoaded, isSignedIn, router]);

  if (!authLoaded) {
    return (
      <View
        style={{
          flex: 1,
          justifyContent: 'center',
          alignItems: 'center',
          backgroundColor: '#0b0b0d',
        }}
      >
        <ActivityIndicator size={'large'} color={'white'} />
      </View>
    );
  }

  if (isSignedIn) {
    return (
      <View
        style={{
          flex: 1,
          justifyContent: 'center',
          alignItems: 'center',
          backgroundColor: '#0b0b0d',
        }}
      >
        <ActivityIndicator size={'large'} color={'white'} />
      </View>
    );
  }

  const onLogin = async () => {
    if (!isLoaded) return;
    setLoading(true);
    try {
      const signInAttempt = await signIn.create({
        identifier: email,
        password: password,
      });

      if (signInAttempt.status === 'complete') {
        await setActive({ session: signInAttempt.createdSessionId });
        router.replace('/home');
      } else {
        console.error(JSON.stringify(signInAttempt, null, 2));
      }
    } catch (err) {
      console.error(JSON.stringify(err, null, 2));
    } finally {
      setLoading(false);
    }
  };

  return (
    <KeyboardAvoidingView
      style={styles.screen}
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}
    >
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <View style={styles.inner}>
          <Text style={styles.logo}>nurdd</Text>
          <Text style={styles.title}>Login</Text>

          <View style={styles.inputBox}>
            <Text style={styles.label}>Email</Text>
            <Input
              placeholder='Enter your email'
              value={email}
              onChangeText={setEmail}
              keyboardType='email-address'
              style={styles.input}
            />
          </View>
          <View style={styles.inputBox}>
            <Text style={styles.label}>Password</Text>
            <Input
              placeholder='Enter your password'
              value={password}
              onChangeText={setPassword}
              secureTextEntry
              style={styles.input}
            />
          </View>

          <Button
            title={loading ? 'Logging in...' : 'Login'}
            onPress={onLogin}
            disabled={!isLoaded || loading}
            style={styles.loginButton}
            loading={loading}
          />
          <Text style={styles.small}>
            Don't have an account?{' '}
            <TouchableOpacity onPress={() => router.navigate('/signUp')}>
              <Text style={{ color: '#5B43FF' }}>Sign up</Text>
            </TouchableOpacity>
          </Text>
        </View>
      </TouchableWithoutFeedback>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: '#0b0b0d',
  },
  inner: {
    flex: 1,
    padding: 24,
    justifyContent: 'center',
  },
  logo: {
    color: '#dfe9ff',
    fontSize: 22,
    fontWeight: '700',
    marginBottom: 6,
    alignSelf: 'center',
  },
  input: {
    height: 50,
    backgroundColor: 'rgba(255,255,255,0.06)',
    borderRadius: 12,
    paddingHorizontal: 14,
    color: '#fff',
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.15)',
    fontSize: 16,
  },
  title: {
    color: '#fff',
    fontSize: 36,
    fontWeight: '700',
    marginBottom: 24,
    alignSelf: 'center',
  },
  small: {
    color: '#9a9aa0',
    marginTop: 18,
    textAlign: 'center',
  },
  inputBox: {
    marginBottom: 20,
  },
  label: {
    color: '#eee',
    fontSize: 16,
    marginBottom: 6,
    fontWeight: '500',
  },
  loginButton: {
    height: 52,
    borderRadius: 12,
    marginTop: 10,
    justifyContent: 'center',
    alignItems: 'center',
    overflow: 'hidden',
    borderWidth: 1,
    backgroundColor: '#5B43FF',
    shadowColor: '#1e3cff',
    shadowOpacity: 0.4,
    shadowRadius: 12,
    shadowOffset: { width: 0, height: 0 },
  },
});
