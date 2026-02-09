import * as admin from 'firebase-admin';

if (!admin.apps.length) {
    try {
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
    }
}

export const db = admin.firestore();
