import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, ActivityIndicator } from 'react-native';
import { useAuthStore } from '../store/authStore';
import { linkedInAuth } from '../services/auth';

export default function LoginScreen() {
  const { login, setLoading, isLoading } = useAuthStore();

  const handleLinkedInLogin = async () => {
    setLoading(true);
    try {
      const user = await linkedInAuth.login();
      if (user) {
        login(user);
      }
    } catch (error) {
      console.error('Login error:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>ChipIn</Text>
      <Text style={styles.subtitle}>Discover LinkedIn conversations the algorithm hides</Text>
      
      <TouchableOpacity
        style={styles.button}
        onPress={handleLinkedInLogin}
        disabled={isLoading}
      >
        {isLoading ? (
          <ActivityIndicator color="#fff" />
        ) : (
          <Text style={styles.buttonText}>Sign in with LinkedIn</Text>
        )}
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 24,
    backgroundColor: '#f8f9fa',
  },
  title: {
    fontSize: 36,
    fontWeight: 'bold',
    color: '#0077B5',
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 16,
    color: '#666',
    textAlign: 'center',
    marginBottom: 48,
  },
  button: {
    backgroundColor: '#0077B5',
    paddingVertical: 16,
    paddingHorizontal: 32,
    borderRadius: 8,
    width: '100%',
    alignItems: 'center',
  },
  buttonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: '600',
  },
});
