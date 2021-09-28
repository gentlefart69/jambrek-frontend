import React, { useContext, useEffect, useState } from "react";
import client from "../../lib/client";

const AuthContext = React.createContext({
  currentUser: null,
  setUser: () => {},
  logout: () => {},
});

export function useAuth() {
  const ctx = useContext(AuthContext);
  return ctx;
}

export function Auth({ children }) {
  const [currentUser, setUser] = useState(null);

  useEffect(() => {
    if (localStorage.getItem("userObj")) {
      const item = localStorage.getItem("userObj");
      setUser(JSON.parse(item));
    }
  }, []);

  function handleSetUser(value) {
    if (value !== null) {
      localStorage.setItem("userObj", JSON.stringify(value));
    }

    setUser(value);
  }

  async function handleLogout() {
    console.log("logging out!");
    await client.logout();
    localStorage.removeItem("userObj");
    setUser(null);
  }

  return (
    <AuthContext.Provider
      value={{ currentUser, setUser: handleSetUser, logout: handleLogout }}
    >
      {children}
    </AuthContext.Provider>
  );
}
