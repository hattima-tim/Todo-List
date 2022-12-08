import {
  getAuth,
  GoogleAuthProvider,
  signInWithPopup,
  signOut,
} from "firebase/auth";

import {
  getFirestore,
  setDoc,
  doc,
  arrayUnion,
} from "firebase/firestore";

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
}

function signOutUser() {
  // Sign out of Firebase.
  signOut(getAuth());
}

// Returns the signed-in user's profile Pic URL.
function getProfilePicUrl() {
  return (
    getAuth().currentUser.photoURL ||
    "https://res.cloudinary.com/du3oueesv/image/upload/v1670301075/profile_placeholder_phbctd.png"
  );
}

// Returns true if a user is signed-in.
function isUserSignedIn() {
  return !!getAuth().currentUser;
}

// Returns the signed-in user's display name.
function getUserName() {
  return getAuth().currentUser.displayName;
}

async function saveToDB(projectName, task, operation) {
  const db = getFirestore();
  const userRef = doc(db, `users/${getUserName()}`);
  const userProjectRef = doc(
    db,
    `users/${getUserName()}/projects/${projectName}`
  );
  try {
    switch (operation) {
      case "createProject":
        // Create a new project in the database
        await setDoc(userProjectRef, { [projectName]: arrayUnion() });
        break;
      case "addTask":
        // Add a new task to an existing project in the database
        await setDoc(
          userProjectRef,
          { [projectName]: arrayUnion(task) },
          { merge: true }
        );
        break;
    }
  } catch (error) {
    console.error("Error writing to Firebase Database", error);
  }
}

export {
  firebaseConfig,
  signIn,
  signOutUser,
  getProfilePicUrl,
  isUserSignedIn,
  saveToDB
};
