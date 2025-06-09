import React,{useState} from 'react'
import { auth } from "../firebase/firebase";
import { createUserWithEmailAndPassword } from "firebase/auth";
function SignUp() {
    const [firstName,setFirstName]=useState('');
    const [lastName,setLastName]=useState('');
    const [email,setEmail]=useState('');
    const [password,setPassword]=useState('');
    const [error,setError]=useState(false);
    const [conPassError,setConPassError]=useState('');
    const [emailError, setEmailError] = useState('');
    const [passwordError, setPasswordError] = useState('');
    const [firstNameError, setFirstNameError] = useState('');
    const [lastNameError, setLastNameError] = useState('');
const check=(e)=>{
    if (e.target.value !== password){
     setConPassError(true);
    }
    else{
        setConPassError(false);
    }
}
    const handleSubmit = (e) => {
        e.preventDefault();
    if(!emailError && !passwordError && !firstNameError && !lastNameError){
    createUserWithEmailAndPassword(auth, email, password, firstName, lastName)
    .then((userCredential) => {
        // Signed up 
        const user = userCredential.user;
        console.log(user)
        return window.location.href = '/';
    })
    .catch((error) => {
        const errorCode = error.code;

  if (errorCode === "auth/email-already-in-use") {
    setError("User already exists");
  } else if (errorCode === "auth/invalid-email") {
    setError("Invalid email format");
  } else if (errorCode === "auth/weak-password") {
    setError("Password is too weak");
  } else {
    setError("Something went wrong: " + error.message);
  }

  console.log(error);
    });
    }
}

const emailValidate=(e)=>{
    if (!/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(e.target.value)) {
        setEmailError('Email should be of standard format');
      } else {
        setEmailError('');
        setEmail(e.target.value);
      }
 };

const passwordValidate=(e)=>{
    if (!/(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[*.!@#$%^&(){}[\]:;<>,.?/~_+-=|]).{8,}/.test(e.target.value)) {
        setPasswordError('Password must contain a lowercase character, an uppercase character, a number, a special character, and be at least 8 characters long');
      } else {
        setPasswordError('');
        setPassword(e.target.value);
      }
    };

const firstNameValidate=(e)=>{
    if (!/^[a-zA-Z]+$/.test(e.target.value)) {
        setFirstNameError('First Name must contain alphabets');
    } else{
        setFirstNameError('');
        setFirstName(e.target.value);
    }
};
const lastNameValidate=(e)=>{
    if (!/^[a-zA-Z]+$/.test(e.target.value)) {
        setLastNameError('Last Name must contain alphabets');
    } else{
        setLastNameError('');
        setLastName(e.target.value);
    }
};
 return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <form onSubmit={handleSubmit} className="w-full max-w-md bg-white p-8 rounded shadow-md">
        <h2 className="text-2xl font-bold text-center mb-6">Sign Up</h2>

        <div className="mb-4">
          <label className="block font-medium mb-1">First Name</label>
          <input
            type="text"
            placeholder="Enter your first name"
            className="w-full border border-gray-300 rounded px-3 py-2"
            onChange={firstNameValidate}
          />
          {firstNameError && <p className="text-red-500 text-sm">{firstNameError}</p>}
        </div>

        <div className="mb-4">
          <label className="block font-medium mb-1">Last Name</label>
          <input
            type="text"
            placeholder="Enter your last name"
            className="w-full border border-gray-300 rounded px-3 py-2"
            onChange={lastNameValidate}
          />
          {lastNameError && <p className="text-red-500 text-sm">{lastNameError}</p>}
        </div>

        <div className="mb-4">
          <label className="block font-medium mb-1">Email</label>
          <input
            type="email"
            placeholder="Enter your email"
            className="w-full border border-gray-300 rounded px-3 py-2"
            onChange={emailValidate}
          />
          {emailError && <p className="text-red-500 text-sm">{emailError}</p>}
        </div>

        <div className="mb-4">
          <label className="block font-medium mb-1">Password</label>
          <input
            type="password"
            placeholder="Enter your password"
            className="w-full border border-gray-300 rounded px-3 py-2"
            onChange={passwordValidate}
          />
          {passwordError && <p className="text-red-500 text-sm">{passwordError}</p>}
        </div>

        <div className="mb-4">
          <label className="block font-medium mb-1">Confirm Password</label>
          <input
            type="password"
            placeholder="Re-enter your password"
            className="w-full border border-gray-300 rounded px-3 py-2"
            onChange={check}
          />
          {conPassError && <p className="text-red-500 text-sm">Both passwords must be same</p>}
        </div>

        {error && <p className="text-red-500 text-sm mb-2">{error}</p>}

        <button type="submit" className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700 transition">
          Sign Up
        </button>
      </form>
    </div>
  );
}

export default SignUp