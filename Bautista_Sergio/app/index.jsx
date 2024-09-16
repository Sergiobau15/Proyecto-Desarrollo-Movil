import React from "react";
import { Text, View, ScrollView, Image, StyleSheet } from "react-native";
import CustomButton from "../components/CustomButton";
import { StatusBar } from "expo-status-bar";
import { router } from "expo-router";
import { SafeAreaView } from "react-native-safe-area-context";
import { images } from "../constants";

export default function App() {
  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView contentContainerStyle={styles.scrollView}>
        <View style={styles.container}>
          {/* Contenedor para el logo y el texto */}
          <View style={styles.logoContainer}>
            <Image
              source={images.logoSmall}
              style={styles.logo}
              resizeMode="contain"
            />
            <Text style={styles.logoText}>
              Solo Electricos
            </Text>
          </View>

          <View style={styles.headerContainer}>
            <Text style={styles.headerText}>
              ¡Encuentra herramientas y materiales con{" "}
              <Text style={styles.highlightText}>Calidad</Text> y{" "}
              <Text style={styles.highlightText}>Confianza</Text>!
            </Text>
            <Image
              source={images.path}
              style={styles.pathImage}
              resizeMode="contain"
            />
          </View>

          <Text style={styles.descriptionText}>
            En nuestra ferretería encontrarás una amplia gama de herramientas, 
            equipos y materiales para todo tipo de proyectos. Desde bricolaje 
            hasta mantenimiento profesional, tenemos lo que necesitas.
          </Text>

          <CustomButton
            title="Inicia Sesion"
            handlePress={() => router.push('/sign-in')}
            containerStyles={styles.button}
          />
        </View>
      </ScrollView>
      <StatusBar backgroundColor="#003366" /> {/* Azul oscuro */}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    backgroundColor: '#003366', // Azul oscuro
    flex: 1,
  },
  scrollView: {
    flexGrow: 1,
  },
  container: {
    width: '100%',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 30,
  },
  logoContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
  },
  logo: {
    width: 130,
    height: 84,
  },
  logoText: {
    fontSize: 20,
    color: '#FFFFFF',
    marginLeft: 10,
    fontWeight: 'bold',
  },
  headerContainer: {
    position: 'relative',
    marginBottom: 20,
  },
  headerText: {
    fontSize: 26,
    color: '#FFFFFF',
    fontWeight: 'bold',
    textAlign: 'center',
    paddingHorizontal: 20,
  },
  highlightText: {
    color: '#FFD700', // Color dorado
  },
  pathImage: {
    width: 136,
    height: 15,
    position: 'absolute',
    bottom: -10,
    right: -8,
  },
  descriptionText: {
    fontSize: 16,
    color: '#E0E0E0',
    marginVertical: 20,
    textAlign: 'center',
    paddingHorizontal: 20,
  },
  button: {
    width: '100%',
    marginTop: 20,
  },
});
