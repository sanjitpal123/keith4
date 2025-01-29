import { createContext, useState, useContext } from "react";

// Create AuthContext
export const AuthContext = createContext();

// Create AuthProvider
export function AuthProvider({ children }) {
    const [user, setUser] = useState(null);

    const login = (userData) => {
        setUser(userData);
        localStorage.setItem("user", JSON.stringify(userData));
    };

    const logout = () => {
        setUser(null);
        localStorage.removeItem("user");
    };

    return (
        <AuthContext.Provider value={{ user, login, logout }}>
            {children}
        </AuthContext.Provider>
    );
}