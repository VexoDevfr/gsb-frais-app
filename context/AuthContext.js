import { createContext, useContext, useState, useEffect } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { signIn, signOut } from "../services/authService";
const AuthContext = createContext();
export function AuthProvider({ children }) {
    const [user, setUser] = useState(null);
    const [token, setToken] = useState(null);
    const [sessionLoading, setSessionLoading] = useState(true);
    useEffect(() => {
    const restoreSession = async () => {
      try {
        const storedUser = await getCurrentUser();
        const storedToken = await getAuthToken();
        if (storedUser && storedToken) {
          setUser(storedUser);   
          setToken(storedToken);
        }
      } catch (error) {
        console.error("Erreur lors de la restauration de session : ", error);
      } finally {
        setSessionLoading(false);
      }
    };
    restoreSession();                               
  }, []);
    async function loginUser(login, password) {
    const data = await signIn(login, password);
    if (!data.token) {
      throw new Error("Identifiants incorrects");
    }
    setUser(data.visiteur); 
    setToken(data.token);
    return data;
    }
    const logoutUser = async () => {
        await signOut();
        setUser(null);
        setToken(null);
    };

    return (
        <AuthContext.Provider value={{ user, token, sessionLoading, loginUser, logoutUser }}>
            {children}
        </AuthContext.Provider>
    );
}
export function useAuth() {
    return useContext(AuthContext);
}

export const getCurrentUser = async () => {
  const raw = await AsyncStorage.getItem("user");
  return raw ? JSON.parse(raw) : null;
};

export const getAuthToken = async () => {
  const token = await AsyncStorage.getItem("token");
  return token ? token : null;
};