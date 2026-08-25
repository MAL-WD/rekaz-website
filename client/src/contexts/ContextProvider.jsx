import { createContext, useContext, useState, useEffect } from "react";

const StateContext = createContext();

const EDITOR_PASSWORD = "rekaz2025"; // Change this to your real password

export const ContextProvider = ({ children }) => {
    const [userAuth, setUserAuth] = useState(() => {
        // Restore auth from sessionStorage
        const stored = sessionStorage.getItem("rekaz_editor_auth");
        if (stored) {
            try {
                return JSON.parse(stored);
            } catch {
                return null;
            }
        }
        return null;
    });

    const [currentMode, setCurrentMode] = useState("Light");

    // Persist auth to sessionStorage
    useEffect(() => {
        if (userAuth) {
            sessionStorage.setItem("rekaz_editor_auth", JSON.stringify(userAuth));
        } else {
            sessionStorage.removeItem("rekaz_editor_auth");
        }
    }, [userAuth]);

    const login = (password) => {
        if (password === EDITOR_PASSWORD) {
            setUserAuth({ access_token: "editor_session", username: "admin" });
            return true;
        }
        return false;
    };

    const logout = () => {
        setUserAuth(null);
    };

    return (
        <StateContext.Provider value={{ userAuth, setUserAuth, currentMode, setCurrentMode, login, logout }}>
            {children}
        </StateContext.Provider>
    );
};

export const useStateContext = () => useContext(StateContext);
