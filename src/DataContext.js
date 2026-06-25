import { createContext, useContext, useState, useEffect } from "react";

const DataContext = createContext();

export const DataProvider = ({ children }) => {
    const [sharedData, setSharedData] = useState({});
    const [token, setToken] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const savedToken = sessionStorage.getItem("token");
        if (savedToken) {
            setToken(savedToken);
        }

        const savedData = sessionStorage.getItem("sharedData");
        if (savedData) {
            try {
                setSharedData(JSON.parse(savedData));
            } catch {
                console.warn("Invalid sharedData format in sessionStorage");
            }
        }
        const timer = setTimeout(() => setLoading(false), 100);
        return () => clearTimeout(timer);
    }, []);

    return (
        <DataContext.Provider value={{ sharedData, setSharedData, token, setToken, loading }}>
            {children}
        </DataContext.Provider>
    );
};

export const useData = () => useContext(DataContext);
