// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app';
import { getDatabase } from 'firebase/database';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    authDomain: 'ti-stats-c491d.firebaseapp.com',
    databaseURL:
        'https://ti-stats-c491d-default-rtdb.europe-west1.firebasedatabase.app',
    projectId: 'ti-stats-c491d',
    storageBucket: 'ti-stats-c491d.firebasestorage.app',
    messagingSenderId: '848081025843',
    appId: '1:848081025843:web:6bdc91ad175de6e12d9c46',
    measurementId: 'G-MY89MT8BZV',
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
// const analytics = getAnalytics(app);
export const db = getDatabase(app);
