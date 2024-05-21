"use client";

import {
  createContext,
  useContext,
  useState,
  useEffect,
  ReactNode,
} from "react";

interface User {
  firstName: string;
  lastName: string;
  phone: string;
  email: string;
  _id: string;
}

interface UserProviderProps {
  children: ReactNode;
}

const UserContext = createContext<User | null>(null);
export function UserProvider({ children }: UserProviderProps) {
  const [user, setUser] = useState<User | null>(null);
  useEffect(() => {
    const storedUserString = localStorage.getItem("blazeUser");
    if (storedUserString) {
      try {
        const storedUser = JSON.parse(storedUserString) as User;
        setUser(storedUser);
      } catch (error) {
        console.error("Error parsing stored user data", error);
      }
    }
  }, []);

  return <UserContext.Provider value={user}>{children}</UserContext.Provider>;
}

export function useUser() {
  return useContext(UserContext);
}
