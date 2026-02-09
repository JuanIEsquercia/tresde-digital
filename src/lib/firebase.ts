import * as admin from 'firebase-admin';

function initFirebase() {
    if (!admin.apps.length) {
        try {
            if (!process.env.FIREBASE_PROJECT_ID) {
                throw new Error('FIREBASE_PROJECT_ID is not defined');
            }

            admin.initializeApp({
                credential: admin.credential.cert({
                    projectId: process.env.FIREBASE_PROJECT_ID,
                    clientEmail: process.env.FIREBASE_CLIENT_EMAIL,
                    // Reemplazar saltos de línea escapados para asegurar formato correcto
                    privateKey: process.env.FIREBASE_PRIVATE_KEY?.replace(/\\n/g, '\n'),
                }),
            });
            console.log('🔥 Firebase Admin inicializado correctamente');
        } catch (error) {
            console.error('❌ Error initializing Firebase Admin:', error);
            // En build time (CI/CD) no queremos que explote si faltan variables,
            // pero en runtime sí debe fallar si intentamos usar la DB.
        }
    }

    return admin.firestore();
}

// Singleton pattern para reutilizar la instancia
let dbInstance: admin.firestore.Firestore | null = null;

export const getDb = () => {
    if (!dbInstance) {
        dbInstance = initFirebase();
    }
    return dbInstance;
};

// Mantener compatibilidad (opcional, pero mejor migrar)
// export const db = getDb(); // Esto causaría el mismo problema si se llama al importar.

