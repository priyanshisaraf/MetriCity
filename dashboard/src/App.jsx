import React, { useEffect, useState } from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "./firebase/firebase";

import Login from "./components/Login";
import SignUp from "./components/SignUp";
import Dashboard from "./components/Dashboard";
import DarkModeToggle from "./components/DarkModeToggle";
import PageWrapper from "./components/PageWrapper";

function App() {
  const [user, setUser] = useState(null);
  const [checkingAuth, setCheckingAuth] = useState(true);

  useEffect(() => {
    document.title = "MetriCity";
  }, []);

  useEffect(() => {
  console.log("Setting up onAuthStateChanged listener");

  const timeoutId = setTimeout(() => {
    console.warn("Auth state check timeout – proceeding without Firebase response");
    setCheckingAuth(false);
  }, 3000); // 3 seconds fallback

  const unsubscribe = onAuthStateChanged(auth, (firebaseUser) => {
    console.log("🔥 onAuthStateChanged callback:", firebaseUser);
    clearTimeout(timeoutId);
    setUser(firebaseUser);
    setCheckingAuth(false);
  });

  return () => {
    console.log("Cleaning up onAuthStateChanged listener");
    clearTimeout(timeoutId);
    unsubscribe();
  };
}, []);


  if (checkingAuth) return <div className="text-center mt-20">Loading...</div>;

  return (
    <Router>
      <DarkModeToggle />
      <Routes>
        <Route
          path="/"
          element={
            user ? (
              <PageWrapper><Dashboard user={user} /></PageWrapper>
            ) : (
              <Navigate to="/login" />
            )
          }
        />
        <Route
          path="/login"
          element={
            !user ? (
              <PageWrapper><Login /></PageWrapper>
            ) : (
              <Navigate to="/" />
            )
          }
        />
        <Route
          path="/signup"
          element={
            !user ? (
              <PageWrapper><SignUp /></PageWrapper>
            ) : (
              <Navigate to="/login" />
            )
          }
        />
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </Router>
  );
}

export default App;