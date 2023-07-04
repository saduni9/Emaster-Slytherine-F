import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';
import { getStorage } from 'firebase/storage';

const firebaseConfig = {
    apiKey: "AIzaSyCRjX_Lqr1k688_PeChoTX8gypCup7zwPQ",
    authDomain: "lms-b20.firebaseapp.com",
    projectId: "lms-b20",
    storageBucket: "lms-b20.appspot.com",
    messagingSenderId: "366295833956",
    appId: "1:366295833956:web:d741541a187c4395b0ee71"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const storage = getStorage(app);

export { app, db, storage };