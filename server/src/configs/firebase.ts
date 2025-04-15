import dotenv from "dotenv";
import admin from "firebase-admin";

dotenv.config();

const serviceAccount = process.env.GOOGLE_APPLICATION_CREDENTIALS as string;

admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
});

export default admin;
