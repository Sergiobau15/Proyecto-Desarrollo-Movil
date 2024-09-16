import React, { useState } from "react";
import { View, Text, ScrollView, Image, StyleSheet, SafeAreaView } from "react-native";
import { Link } from "expo-router";

import { images } from "../../constants";
import FormField from "../../components/FormField";
import CustomButton from '../../components/CustomButton';
import { createUser } from '../../lib/appwrite'; // Asegúrate de que la ruta de importación sea correcta

const SignUp = () => {
    const [form, setForm] = useState({
        username: '',
        email: '',
        password: '',
        phone: ''
    });

    const [isSubmitting, setIsSubmitting] = useState(false);

    const submit = async () => {
        if (!form.username || !form.email || !form.password || !form.phone) {
            alert("Por favor, complete todos los campos obligatorios");
            return;
        }

        setIsSubmitting(true);
        try {
            const result = await createUser(form);
            console.log("Usuario registrado con éxito", result);
            alert("Usuario registrado con éxito");
            // Aquí puedes agregar lógica para navegar a otra pantalla después del registro exitoso
        } catch (error) {
            console.error("Error al registrar usuario:", error);
            alert("Error al registrar usuario. Por favor, intente de nuevo.");
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
                    <Text style={styles.title}>
                        Regístrate
                    </Text>

                    <FormField 
                        title="Nombre de Usuario" 
                        value={form.username} 
                        handleChangeText={e => setForm({ ...form, username: e })} 
                        otherStyles={styles.formField}
                    />
                    <FormField 
                        title="Correo Electrónico" 
                        value={form.email} 
                        handleChangeText={e => setForm({ ...form, email: e })} 
                        otherStyles={styles.formField} 
                        keyboardType="email-address" 
                    />
                    <FormField 
                        title="Contraseña" 
                        value={form.password} 
                        handleChangeText={e => setForm({ ...form, password: e })} 
                        otherStyles={styles.formField} 
                        secureTextEntry
                    />
                    <FormField 
                        title="Teléfono" 
                        value={form.phone} 
                        handleChangeText={e => setForm({ ...form, phone: e })} 
                        otherStyles={styles.formField}
                        keyboardType="phone-pad"
                    />

                    <CustomButton 
                        title="Registrarse" 
                        handlePress={submit} 
                        containerStyles={styles.button} 
                        isLoading={isSubmitting} 
                    />

                    <View style={styles.footer}>
                        <Text style={styles.footerText}>¿Ya tienes una cuenta?</Text>
                        <Link href="/sign-in" style={styles.footerLink}>Iniciar Sesión</Link>
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

export default SignUp;
