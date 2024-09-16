import { Account, Client, ID } from 'react-native-appwrite';

// Configuración de Appwrite
export const appwriteConfig = {
    endpoint: 'https://cloud.appwrite.io/v1',
    projectId: '66cbe88800065ab24f69',
};

// Inicialización del cliente de Appwrite
const client = new Client();
client
    .setEndpoint(appwriteConfig.endpoint) // Endpoint de Appwrite
    .setProject(appwriteConfig.projectId); // ID del proyecto

const account = new Account(client);

// Función para crear el usuario
export const createUser = async (userData) => {
    try {
        // Crear cuenta en Auth con correo, contraseña y teléfono
        const authUser = await account.create(
            ID.unique(),            // ID único para el usuario
            userData.email,         // Correo electrónico
            userData.password,      // Contraseña
            userData.username
        );

        console.log("Usuario creado exitosamente:", authUser);
        return authUser;
    } catch (error) {
        console.error("Error al crear el usuario:", error);
        throw error;
    }
};
