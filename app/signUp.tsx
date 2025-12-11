import { router } from 'expo-router';
import React, { useState } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  KeyboardAvoidingView,
  Platform,
  TouchableWithoutFeedback,
  Keyboard,
} from 'react-native';
import { useSignUp } from '@clerk/clerk-expo';
import Button from '@/components/Button';
import Input from '../components/Input';

export default function SignUpScreen({ navigation }: any) {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [code, setCode] = useState('')
  const [pendingVerification, setPendingVerification] = useState(false);
  const [loading, setLoading] = useState(false);

  const { isLoaded, signUp, setActive } = useSignUp();

  const handleSignUp = async() => {
    if (!isLoaded) return;
    setLoading(true);
    try{
      await signUp.create({
        emailAddress: email,
        password: password
      });
      await signUp.prepareEmailAddressVerification({ strategy: 'email_code' });
      setPendingVerification(true)
    }catch(err) {
      console.error(JSON.stringify(err, null, 2))
    }finally{
      setLoading(false);
    }
  }

  const onVerifyPress = async() => {
    if (!isLoaded) return
    try{
      const signUpAttempt = await signUp.attemptEmailAddressVerification({
        code,
      });
      if (signUpAttempt.status === 'complete') {
        await setActive({ session: signUpAttempt.createdSessionId });
        router.replace('/home');
      } else {
        console.error(JSON.stringify(signUpAttempt, null, 2))
      }
    }catch(err) {
      console.error(JSON.stringify(err, null, 2))
    }
  }

  if (pendingVerification) {
    return (
      <KeyboardAvoidingView
        style={{ flex: 1, backgroundColor: '#000' }}
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}
      >
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
          <View style={[styles.container, styles.center]}>
            <Text style={styles.title}>Verify Your Email</Text>

            <View style={styles.inputBox}>
              <Text style={styles.label}>Verification Code</Text>
              <Input
                value={code}
                placeholder="Enter 6-digit code"
                onChangeText={setCode}
                keyboardType="number-pad"
                style={styles.input}
              />
            </View>

            <Button
              title="Verify"
              onPress={onVerifyPress}
              disabled={!code.trim()}
            />
          </View>
        </TouchableWithoutFeedback>
      </KeyboardAvoidingView>
    )
  }

  return (
    <KeyboardAvoidingView
      style={{ flex: 1, backgroundColor: '#000' }}
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}
    >
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <View style={styles.container}>

        <Text style={styles.title}>Sign Up</Text>

        <View style={styles.inputBox}>
          <Text style={styles.label}>Full Name</Text>
          <Input
            style={styles.input}
            placeholder="Enter your full name"
            value={name}
            onChangeText={setName}
          />
        </View>

        <View style={styles.inputBox}>
          <Text style={styles.label}>Email</Text>
          <Input
            style={styles.input}
            placeholder="Enter your email"
            keyboardType="email-address"
            value={email}
            autoCapitalize="none"
            onChangeText={setEmail}
          />
        </View>

        <View style={styles.inputBox}>
          <Text style={styles.label}>Password</Text>
          <Input
            style={styles.input}
            placeholder="Enter your password"
            secureTextEntry
            value={password}
            onChangeText={setPassword}
          />
        </View>

        <Button
          title='Create Account'
          onPress={handleSignUp}
          loading={loading}
        />

        <TouchableOpacity
          onPress={() => navigation.navigate('Login')}
          style={{ marginTop: 25 }}
        >
          <Text style={styles.linkText}>
            Already have an account? <Text style={{ color: '#6D89FF' }} onPress={() => router.navigate('/')}>Login</Text>
          </Text>
        </TouchableOpacity>

        </View>
      </TouchableWithoutFeedback>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 24,
    justifyContent: 'center',
  },

  title: {
    fontSize: 42,
    color: '#fff',
    fontWeight: '700',
    textAlign: 'center',
    marginBottom: 40,
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

  button: {
    height: 52,
    borderRadius: 12,
    marginTop: 10,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'transparent',
    overflow: 'hidden',
    borderWidth: 1,
    borderColor: '#1B2CCF',
    shadowColor: '#1e3cff',
    shadowOpacity: 0.4,
    shadowRadius: 12,
    shadowOffset: { width: 0, height: 0 },
  },

  buttonText: {
    fontSize: 18,
    fontWeight: '600',
    color: '#bcd0ff',
  },

  linkText: {
    fontSize: 16,
    color: '#ccc',
    textAlign: 'center',
  },
  center: {
    justifyContent: 'center',
    alignItems: 'center',
  },
});
