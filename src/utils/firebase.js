import {initializeApp} from 'firebase/app';
import {
  getFirestore,
  collection,
  getDocs,
  addDoc,
  onSnapshot,
  doc,
  deleteDoc,
  updateDoc,
  query,
  where,
  Firestore,
} from 'firebase/firestore';
import {getAuth, onAuthStateChanged} from 'firebase/auth';

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: 'AIzaSyASA3NRx52e3O8omS1QyzcvUmbH2CcWtDA',
  authDomain: 'ast-app-9656b.firebaseapp.com',
  projectId: 'ast-app-9656b',
  storageBucket: 'ast-app-9656b.appspot.com',
  messagingSenderId: '28271342960',
  appId: '1:28271342960:web:dbbb2f03d913d34b49cbb5',
};

// Initialize Firebase

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const auth = getAuth(app); // where app is the app you initialized with firebase

export {
  db,
  collection,
  getDocs,
  addDoc,
  onSnapshot,
  doc,
  deleteDoc,
  updateDoc,
  query,
  where,
  auth,
  onAuthStateChanged,
  Firestore,
};
