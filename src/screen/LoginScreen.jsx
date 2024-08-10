import React, { useContext, useEffect, useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, ActivityIndicator, Image } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { useForm, Controller } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { login } from '../services/userServices';
import UserContext from '../context/UserContext';
import { Tabs } from '../../Navigator';
import icon from '../assets/icon.jpg'
const schema = z.object({
  email: z.string().email({ message: "Enter valid email" }),
  password: z.string().min(8, { message: "Password must be at least 8 characters" })
});

const LoginScreen = () => {
  const [userLoading, setUserLoading] = useState(true);
  const user = useContext(UserContext);
  const navigation = useNavigation();
  const [formError, setFormError] = useState("");
  const [loading, setLoading] = useState(false);
  
  const { control, handleSubmit, formState: { errors } } = useForm({
    resolver: zodResolver(schema)
  });



  const onSubmit = async (formData) => {
    setLoading(true);
    try {
      await login(formData);
      navigation.replace('TABS');
      
    } catch (err) {
      setFormError('Invalid email or password. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  // if (userLoading) {
  //   return (
  //     <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center',backgroundColor:"#EAE9EE" }}>
  //       <ActivityIndicator size="large" color="#E96E6E" />
  //     </View>
  //   );
  // }

  return (
    <View style={styles.container}>
    <Image source={icon} style={{height:200, width:200}}/>
      <Text style={styles.welcomeText}>Welcome Again </Text>

      <Controller
        control={control}
        name="email"
        render={({ field: { onChange, onBlur, value } }) => (
          <>
            <TextInput
              style={styles.input}
              placeholder="Email"
              placeholderTextColor="#999"
              onBlur={onBlur}
              onChangeText={onChange}
              value={value}
            />
            {errors.email && <Text style={styles.errorText}>{errors.email.message}</Text>}
          </>
        )}
      />

      <Controller
        control={control}
        name="password"
        render={({ field: { onChange, onBlur, value } }) => (
          <>
            <TextInput
              style={styles.input}
              placeholder="Password"
              placeholderTextColor="#999"
              secureTextEntry
              onBlur={onBlur}
              onChangeText={onChange}
              value={value}
            />
            {errors.password && <Text style={styles.errorText}>{errors.password.message}</Text>}
          </>
        )}
      />

      {formError && <Text style={styles.errorText}>{formError}</Text>}

      <TouchableOpacity onPress={handleSubmit(onSubmit)} style={[styles.loginButton, loading && styles.disabledButton]} disabled={loading}>
        {loading ? (
          <ActivityIndicator size="small" color="#fff" />
        ) : (
          <Text style={styles.loginButtonText}>LOG IN</Text>
        )}
      </TouchableOpacity>

      <TouchableOpacity onPress={() => navigation.navigate('SIGNUP')}>
        <Text style={styles.signupText}>
          Don't have an account? <Text style={styles.signupLink}>Sign Up</Text>
        </Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#ecfcfb',
    padding: 20,
  },
  welcomeText: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#8A2BE2',
    marginBottom: 30,
  },
  input: {
    color: '#8A2BE2',
    width: '100%',
    height: 50,
    borderColor: '#ddd',
    borderWidth: 1,
    borderRadius: 8,
    paddingHorizontal: 10,
    fontSize: 16,
    marginBottom: 10,
  },
  errorText: {
    color: 'red',
    marginBottom: 10,
    alignSelf: 'flex-start',
    minHeight: 20,  // Ensure space for error messages
  },
  loginButton: {
    width: '100%',
    height: 50,
    backgroundColor: '#8A2BE2',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 8,
    marginBottom: 20,
  },
  loginButtonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
  disabledButton: {
    backgroundColor: '#B19CD9',
  },
  signupText: {
    color: '#666',
    fontSize: 16,
  },
  signupLink: {
    color: '#8A2BE2',
    fontWeight: 'bold',
  },
});

export default LoginScreen;
