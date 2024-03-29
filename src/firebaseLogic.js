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
  arrayRemove,
  getDoc,
  getDocs,
  updateDoc,
  deleteDoc,
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

async function createProjectInCloud(projectName) {
  const db = getFirestore();
  const userProjectRef = doc(
    db,
    `users/${getUserName()}/projects/${projectName}`
  );

  try {
    await setDoc(userProjectRef, { [projectName]: "[]" });
  } catch (error) {
    console.error("Error creating new project", error);
  }
}

async function deleteProjectInCloud(projectName) {
  const db = getFirestore();
  const projectRef = doc(
    db,
    `users/${getUserName()}/projects/${projectName}`
  );

  try {
    await deleteDoc(projectRef);
  } catch (error) {
    console.error("Error creating new project", error);
  }
}

async function addTaskListToCloud(projectName, taskList) {
  const db = getFirestore();
  const userProjectRef = doc(
    db,
    `users/${getUserName()}/projects/${projectName}`
  );

  try {
    await setDoc(
      userProjectRef,
      { [projectName]: taskList } // taskList is in json format
    );
  } catch (error) {
    console.error("Error with adding tasks", error);
  }
}

async function setCompletionCountInCloud(taskCompletionCount,operation) {
  const db = getFirestore();
  const userRef = doc(db, `users/${getUserName()}`);

  try {
    switch (operation) {
      case 'add':        
      await setDoc(userRef, {
        taskCompletionCount: taskCompletionCount,
      },{merge:true});
      break;

      case 'update':
      await updateDoc(userRef, {
        taskCompletionCount: taskCompletionCount,
      });
      break;
    }
  } catch (error) {
    console.error("Error with setting completion count", error);
  }
}

async function saveProjectNameArrayInCloud(arrayJSON,operation) {
  const db = getFirestore();
  const userRef = doc(db, `users/${getUserName()}`);

  try {
    switch (operation) {
      case 'add':        
        await setDoc(userRef, {
          projectNameArray: arrayJSON,
        },{merge:true});
        break;

      case 'update':
        await updateDoc(userRef, {
          projectNameArray: arrayJSON,
        });
        break;        
    }
  } catch (error) {
    console.error("Error with saving project name array", error);
  }
}

const getTaskCompletionCountFromCloud = async () => {
  const db = getFirestore();
  const userRef = doc(db, `users/${getUserName()}`);
  const userSnap = await getDoc(userRef);
  const doesUserDocumentExist = userSnap.exists();
  
  if (doesUserDocumentExist && 'taskCompletionCount' in userSnap.data()) {
    const taskCompletionCountInDB = userSnap.data().taskCompletionCount;
    return taskCompletionCountInDB;
  }

  setCompletionCountInCloud(0,'add');
  return 0;
};

const getTaskListFromCloud = async (projectName) => {
  const db = getFirestore();
  const projectRef = doc(db, `users/${getUserName()}/projects/${projectName}`);
  try {
    const userSnap = await getDoc(projectRef);
    const taskListJSON = `${userSnap.data()[projectName]}`;
    const taskList = JSON.parse(taskListJSON);

    return taskList;
  } catch (error) {
    console.error("Error getting task list from firestore", error);
  }
};

const getProjectNameArrayFromCloud = async () => {
  const db = getFirestore();
  const userRef = doc(db, `users/${getUserName()}`);
  
  try{
    const userSnap = await getDoc(userRef);
    const doesUserDocumentExist = userSnap.exists();
  
    if (doesUserDocumentExist && 'projectNameArray' in userSnap.data()) {
      const projectNameArrayJSON = userSnap.data().projectNameArray;
      const projectNameArray = JSON.parse(projectNameArrayJSON);
      return projectNameArray;
    }

    createProjectInCloud("Home");
    saveProjectNameArrayInCloud(JSON.stringify(['Home']),'add');
    return ["Home"];  
  }catch(error){
    console.log('Error getting project name array from firestore',error);
  }
};

export {
  firebaseConfig,
  signIn,
  signOutUser,
  getProfilePicUrl,
  isUserSignedIn,
  createProjectInCloud,
  deleteProjectInCloud,
  addTaskListToCloud,
  setCompletionCountInCloud,
  getTaskCompletionCountFromCloud,
  getTaskListFromCloud,
  getProjectNameArrayFromCloud,
  saveProjectNameArrayInCloud
};
