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

// Triggers when the auth state change for instance when the user signs-in or signs-out.
function authStateObserver(user) {
  const userInfo = document.querySelector(".user_info");
  const userPicElement = document.querySelector(".user_pic");
  const signInArea = document.querySelector(".sign_in");

  if (user) {
    // User is signed in!
    // Get the signed-in user's profile pic and name.
    const profilePicUrl = getProfilePicUrl();
    // Set the user's profile pic and name.
    userPicElement.src = `${profilePicUrl}`;
    // Show user's profile and sign-out button.
    userInfo.style.display = "block";
    // Hide sign-in button.
    signInArea.style.display = "none";
  } else {
    // User is signed out!
    // Hide user's profile and sign-out button.
    userInfo.style.display = "none";
    // Show sign-in button.
    signInArea.style.display = "block";
  }
}

// Initialize firebase auth
function initFirebaseAuth() {
  // Listen to auth state changes.
  onAuthStateChanged(getAuth(), authStateObserver);
}

export {
  firebaseConfig,
  signIn,
  signOutUser,
  initFirebaseAuth,
};
