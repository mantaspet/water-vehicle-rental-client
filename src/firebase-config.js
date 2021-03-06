import firebase from 'firebase';

export function initFirebase() {
	const config = {
		apiKey: process.env.VUE_APP_FIREBASE_API_KEY,
		authDomain: process.env.VUE_APP_FIREBASE_AUTH_DOMAIN,
		databaseURL: process.env.VUE_APP_FIREBASE_DATABASE_URL,
		projectId: process.env.VUE_APP_FIREBASE_PROJECT_ID,
		storageBucket: process.env.VUE_APP_FIREBASE_STORAGE_BUCKET,
		messagingSenderId: process.env.VUE_APP_FIREBASE_MESSAGING_SENDER_ID,
	};
	firebase.initializeApp(config);
	const firestore = firebase.firestore();
	const settings = {timestampsInSnapshots: true};
	firestore.settings(settings);
}
