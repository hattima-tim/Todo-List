import {
  getAuth,
  onAuthStateChanged,
  GoogleAuthProvider,
  signInWithPopup,
  signOut,
} from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyDVcyTrhhQce-iGjNGS63F5Cayr5ZuDizA",
  authDomain: "todo-list-7046d.firebaseapp.com",
  projectId: "todo-list-7046d",
  storageBucket: "todo-list-7046d.appspot.com",
  messagingSenderId: "1089066977716",
  appId: "1:1089066977716:web:99030fdd3bbc5583908ae1",
  measurementId: "G-J27P39SHDS",
};

async function signIn() {
  // Sign in Firebase using popup auth and Google as the identity provider.
  var provider = new GoogleAuthProvider();
  await signInWithPopup(getAuth(), provider);
  console.log(isUserSignedIn());
}

export { firebaseConfig, signIn };