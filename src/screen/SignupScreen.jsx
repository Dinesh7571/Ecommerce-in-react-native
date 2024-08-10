import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Image, ActivityIndicator, KeyboardAvoidingViewBase, KeyboardAvoidingView } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { useForm, Controller } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';

import { signup } from '../services/userServices';

const schema = z.object({
  name: z.string().min(3, { message: "Name should be at least 3 characters" }),
  email: z.string().email({ message: "Enter valid email" }),
  password: z.string().min(8, { message: "Password must be 8 characters" }),
  confirmPassword: z.string(),
  deliveryAddress: z.string().min(15, { message: "Address must be at least 15 characters" })
}).refine(data => data.password === data.confirmPassword, {
  message: "Confirm password does not match password.",
  path: ["confirmPassword"]
});

const SignupScreen = () => {
  const navigation = useNavigation();
  const [profilePic, setProfilePic] = useState(null);
  const [formError, setFormError] = useState("");
  const [loading, setLoading] = useState(false);

  const { control, handleSubmit, formState: { errors } } = useForm({
    resolver: zodResolver(schema)
  });

  const onSubmit = async (formData) => {
    setLoading(true);
    try {
      await signup(formData, profilePic);
      navigation.replace('TABS');
    } catch (err) {
      setFormError('An unexpected error occurred. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  // const pickImage = async () => {
  //   ImagePicker.openPicker({
  //     cropping: true,
  //   }).then(image => {
  //     setProfilePic(image.path);
  //   });
  // };

  return (
    <KeyboardAvoidingView style={styles.container}>
      <TouchableOpacity  style={styles.imageContainer}>
        <Image source={profilePic ? { uri: profilePic } : require('../assets/girl1.png')} style={styles.imagePreview} />
        <Text style={styles.uploadText}>Upload Image</Text>
      </TouchableOpacity>

      <Text style={styles.welcomeText}>Create Account</Text>
      
      <Controller
        control={control}
        name="name"
        render={({ field: { onChange, onBlur, value } }) => (
          <>
            <TextInput
              style={styles.input}
              placeholder="Name"
              placeholderTextColor="#999"
              onBlur={onBlur}
              onChangeText={onChange}
              value={value}
            />
            {errors.name && <Text style={styles.errorText}>{errors.name.message}</Text>}
          </>
        )}
      />

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

      <Controller
        control={control}
        name="confirmPassword"
        render={({ field: { onChange, onBlur, value } }) => (
          <>
            <TextInput
              style={styles.input}
              placeholder="Confirm Password"
              placeholderTextColor="#999"
              secureTextEntry
              onBlur={onBlur}
              onChangeText={onChange}
              value={value}
            />
            {errors.confirmPassword && <Text style={styles.errorText}>{errors.confirmPassword.message}</Text>}
          </>
        )}
      />

      <Controller
        control={control}
        name="deliveryAddress"
        render={({ field: { onChange, onBlur, value } }) => (
          <>
            <TextInput
              style={[styles.input, styles.textArea]}
              placeholder="Delivery Address"
              placeholderTextColor="#999"
              multiline
              numberOfLines={4}
              onBlur={onBlur}
              onChangeText={onChange}
              value={value}
            />
            {errors.deliveryAddress && <Text style={styles.errorText}>{errors.deliveryAddress.message}</Text>}
          </>
        )}
      />

      {formError && <Text style={styles.errorText}>{formError}</Text>}

      <TouchableOpacity onPress={handleSubmit(onSubmit)} style={[styles.signupButton, loading && styles.disabledButton]} disabled={loading}>
        {loading ? (
          <ActivityIndicator size="small" color="#fff" />
        ) : (
          <Text style={styles.signupButtonText}>SIGN UP</Text>
        )}
      </TouchableOpacity>

      <TouchableOpacity onPress={() => navigation.navigate('LOGIN')}>
        <Text style={styles.loginText}>
          Already have an account? <Text style={styles.loginLink}>Log In</Text>
        </Text>
      </TouchableOpacity>
      
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
    padding: 20,
  },
  imageContainer: {
    alignItems: 'center',
    marginBottom: 20,
  },
  imagePreview: {
    width: 100,
    height: 100,
    borderRadius: 50,
    marginBottom: 10,
  },
  uploadText: {
    color: '#8A2BE2',
    fontWeight: 'bold',
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
  textArea: {
    height: 80,
  },
  errorText: {
    color: 'red',
    marginBottom: 10,
    alignSelf: 'flex-start',
    minHeight: 20,  // Ensure space for error messages
  },
  signupButton: {
    width: '100%',
    height: 50,
    backgroundColor: '#8A2BE2',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 8,
    marginBottom: 20,
  },
  signupButtonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
  disabledButton: {
    backgroundColor: '#B19CD9',
  },
  loginText: {
    color: '#666',
    fontSize: 16,
  },
  loginLink: {
    color: '#8A2BE2',
    fontWeight: 'bold',
  },
});

export default SignupScreen;
