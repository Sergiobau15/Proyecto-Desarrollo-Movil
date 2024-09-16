import React, { useState } from "react";
import { View, Text, ScrollView, Image, StyleSheet } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useRouter, Link } from "expo-router";
import { createEmailSession } from '../../lib/appwrite';

import { images } from "../../constants";
import FormField from "../../components/FormField";
import CustomButton from '../../components/CustomButton';

const SignIn = () => {
  const [form, setForm] = useState({
    email: '',
    password: ''
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const router = useRouter();

  const isValidEmail = email => {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  };

  const submit = async () => {
    if (!form.email || !form.password) {
      alert("Por favor, complete ambos campos.");
      return;
    }

    if (!isValidEmail(form.email)) {
      alert("Por favor, ingrese un correo electrónico válido.");
      return;
    }

    setIsSubmitting(true);

    try {
      await createEmailSession({ email: form.email, password: form.password });
      alert("Inicio de sesión exitoso");
      router.push("/home");
    } catch (error) {
      console.error("Error al iniciar sesión:", error);
      alert("Error al iniciar sesión. Por favor, verifica tus credenciales.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView contentContainerStyle={styles.scrollView}>
        <View style={styles.container}>
          <Image
            source={images.logoSmall}
            resizeMode="contain"
            style={styles.logo}
          />
          <Text style={styles.title}>Inicia sesión</Text>
          <FormField
            title="Correo Electrónico"
            value={form.email}
            handleChangeText={e => setForm({ ...form, email: e })}
            containerStyle={styles.formField}
            keyboardType="email-address"
          />
          <FormField
            title="Contraseña"
            value={form.password}
            handleChangeText={e => setForm({ ...form, password: e })}
            containerStyle={styles.formField}
            secureTextEntry
          />
          <CustomButton
            title="Iniciar Sesión"
            handlePress={submit}
            containerStyle={styles.button}
            isLoading={isSubmitting}
          />
          <View style={styles.footer}>
            <Text style={styles.footerText}>¿No tienes una cuenta?</Text>
            <Link href="/sign-up" style={styles.footerLink}>
              Regístrate
            </Link>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    backgroundColor: '#003366', // Azul oscuro
    flex: 1,
  },
  scrollView: {
    flexGrow: 1,
    justifyContent: 'center',
  },
  container: {
    width: '90%',
    alignSelf: 'center',
    padding: 24,
    backgroundColor: '#ffffff', // Fondo blanco para el formulario
    borderRadius: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 5,
  },
  logo: {
    width: 115,
    height: 35,
    alignSelf: 'center',
  },
  title: {
    fontSize: 24,
    color: '#003366', // Azul oscuro
    fontWeight: 'bold',
    textAlign: 'center',
    marginVertical: 20,
  },
  formField: {
    marginBottom: 15,
  },
  button: {
    marginTop: 20,
  },
  footer: {
    marginTop: 30,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  footerText: {
    fontSize: 16,
    color: '#666',
  },
  footerLink: {
    fontSize: 16,
    color: '#003366', // Azul oscuro
    fontWeight: 'bold',
    marginLeft: 5,
  },
});

export default SignIn;
