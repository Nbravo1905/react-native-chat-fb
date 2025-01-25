import { createUserWithEmailAndPassword, onAuthStateChanged, signInWithEmailAndPassword, signOut } from "firebase/auth";
import { createContext, useEffect, useState, ReactNode, useContext } from "react";
import { doc, getDoc, setDoc } from "firebase/firestore";

import { auth, db } from "@/config/firebase";

interface loginProps {
  email: string;
  password: string;
}

interface registerProps {
  email: string;
  password: string;
  userName: string;
  profileUrl?: string;
}

interface AuthContextProps {
  user: any;
  isAuthenticated: boolean;
  login: ({ email, password }: loginProps) => Promise<{ success: boolean; msg?: any }>;
  logout: () => Promise<{ success: boolean; msg?: any }>;
  register: ({ email, password, userName, profileUrl }: registerProps) => Promise<{ success: boolean; data?: any; msg?: any }>;
}

const defaultAuthContext: AuthContextProps = {
  user: null,
  isAuthenticated: false,
  login: async () => ({ success: false }),
  logout: async () => ({ success: false }),
  register: async () => ({ success: false }),
};

export const AuthContext = createContext<AuthContextProps>(defaultAuthContext);

export const AuthContextProvider = ({children}: any) => {

  const [user, setUser] = useState<any>(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    // Check if user is authenticated

    const unsub = onAuthStateChanged(auth, (user: any) => {
      if(user) {
        setIsAuthenticated(true);
        setUser(user);
        updateUserData(user.uid);
      }else {
        setIsAuthenticated(false);
        setUser(null);
      }
    });

    return unsub;

  }, []);


  const updateUserData = async (userId: string) => {
    
    const docRef = doc(db, 'users', userId);
    const docSnap = await getDoc(docRef);

    if(docSnap.exists()) {
      let data = docSnap.data();
      setUser({...user, userName: data.userName, profileUrl: data.profileUrl, userId: data.userId});
    }
  }

  
  const login = async ({email, password}: loginProps) => {
    try {
      
      const response = await signInWithEmailAndPassword(auth, email, password);
      return {success: true};
    } catch (error: any) {
      let msg = error.message;
      if(msg.includes('(auth/invalid-email)')) msg = 'Invalid email address';
      if(msg.includes('(auth/invalid-credential)')) msg = 'Invalid email or password';

      return {success: false, msg};
    }
  }

  const logout = async () => {
    try {
      await signOut(auth);
      return {success: true};
    } catch (error: any) {
      return {success: false, msg: error.message};
    }
  }

  
  const register = async ({email, password, userName, profileUrl }: registerProps) => {
    try {
      
      const response = await createUserWithEmailAndPassword(auth, email, password);

      await setDoc(doc(db, 'users', response?.user?.uid), {
        userName,
        profileUrl: profileUrl || null,
        userId: response?.user?.uid,
      });

      return {success: true, data: response?.user};

    } catch (err: any) {
      let msg = err.message;
      if(msg.includes('(auth/invalid-email)')) msg = 'Invalid email address';
      if(msg.includes('(auth/email-already-in-use)')) msg = 'Email already in use';

      return {success: false, msg};
    }
  }



  return (
    <AuthContext.Provider value={{ user, isAuthenticated, login, logout, register }}>
      {children}
    </AuthContext.Provider>
  )

};


export const useAuth = () => {
  const value = useContext(AuthContext);

  if(!value) {
    throw new Error('useAuth must be used within AuthContextProvider');
  }

  return value;
}