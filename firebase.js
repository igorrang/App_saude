import AsyncStorage from '@react-native-async-storage/async-storage';
import { initializeApp } from 'firebase/app';
import {
  initializeAuth,
  getReactNativePersistence
} from 'firebase/auth/react-native';
import { getFirestore } from 'firebase/firestore';
import {getStorage} from 'firebase/storage';

const firebaseConfig = {
  apiKey: "AIzaSyC1UOo6wNCAIX3o-VLJwhccWsE3BeDJjlk",
  authDomain: "ipesaudeapp-b9b06.firebaseapp.com",
  projectId: "ipesaudeapp-b9b06",
  storageBucket: "ipesaudeapp-b9b06.appspot.com",
  messagingSenderId: "473929146651",
  appId: "1:473929146651:web:8ac3a1aa87a4b71f67b3be"
};
// initialize firebase app
const app = initializeApp(firebaseConfig);

// initialize auth
const firebase = initializeAuth(app, {
  persistence: getReactNativePersistence(AsyncStorage)
});

const db = getFirestore(app);

const storage = getStorage(app)

export { app, db, firebase, storage };