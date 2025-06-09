import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider, signInWithPopup } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyCcJCkfa55G9XVVMpIwGwVeZBexQdgQPlQ",
  authDomain: "citypulse-83af2.firebaseapp.com",
  projectId: "citypulse-83af2",
  storageBucket: "citypulse-83af2.appspot.com",
  messagingSenderId: "581149125768",
  appId: "1:581149125768:web:19109f537993d4dcde033d"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const provider = new GoogleAuthProvider();

export const signInWithGoogle = async () => {
  const result = await signInWithPopup(auth, provider);
  const token = await result.user.getIdToken(); 

  return {
    email: result.user.email,
    name: result.user.displayName,
    token, 
  };
};

export { auth };
