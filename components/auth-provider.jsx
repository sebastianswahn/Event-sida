"use client";

import { useAuth } from "@clerk/nextjs";
import { signInWithCustomToken } from "firebase/auth";
import { auth } from "@firebase/config";
import { useEffect, createContext, useContext, useState } from "react";
import { getEvent } from "@lib/eventHandler";

const AuthContext = createContext();

function AuthProvider({ children }) {
  const { userId, isLoaded, getToken } = useAuth();
  const [user, setUser] = useState(null);
  const [isAdmin, setIsAdmin] = useState(false);

  useEffect(() => {
    if (!isLoaded) return;

    const signInWithClerk = async () => {
      const token = await getToken({ template: "integration_firebase" });
      if (token) {
        const userCredential = await signInWithCustomToken(auth, token || "");
        setUser(userCredential.user);
      }
    };

    signInWithClerk();
  }, [isLoaded, getToken]);

  useEffect(() => {
    const checkAdmin = async () => {
      if (userId) {
        const admin = await getEvent("admins", userId);
        if (admin) {
          setIsAdmin(true);
        } else {
          setIsAdmin(false);
        }
      } else {
        setIsAdmin(false);
      }
    };

    if (isLoaded) checkAdmin();
  }, [userId, isLoaded]);

  if (!isLoaded) {
    return <div>Loading...</div>;
  }

  return (
    <AuthContext.Provider value={{ userId, user, isAdmin }}>
      {children}
    </AuthContext.Provider>
  );
}

export const useAuthContext = () => useContext(AuthContext);

export default AuthProvider;
