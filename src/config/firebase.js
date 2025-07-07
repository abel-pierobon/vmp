import { initializeApp } from "firebase/app";

const firebaseConfig = {
	// apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
	// authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN,
	// projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID,
	// storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET,
	// messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID,
	// appId: import.meta.env.VITE_FIREBASE_APP_ID,
	// apiKey: "AIzaSyCqQIbXkjP06wKvHSn5MLj9neth75aANJo",
	// authDomain: "vuebienesraices-c2af2.firebaseapp.com",
	// projectId: "vuebienesraices-c2af2",
	// storageBucket: "vuebienesraices-c2af2.appspot.com",
	// messagingSenderId: "694114564527",
	// appId: "1:694114564527:web:eea4a00a5843c235dd175a",
	apiKey: "AIzaSyCXgHqWS0fcBAX75pYaZdo6RJjRsDVq0Vo",
	authDomain: "vmppropiedades-aa289.firebaseapp.com",
	projectId: "vmppropiedades-aa289",
	storageBucket: "vmppropiedades-aa289.firebasestorage.app",
	messagingSenderId: "100351186431",
	appId: "1:100351186431:web:d1e45173b4d6fcf9d783ca",
};

export const firebaseApp = initializeApp(firebaseConfig);
