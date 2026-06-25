import axios from "axios";
import { useEffect, useState } from "react";
import { store } from "../Store/store";

const BaseLink = axios.create({
    baseURL: "https://localhost:7085/api/",
    //baseURL: "https://10.159.94.73:7085/api/",

});

BaseLink.interceptors.request.use(
    (config) => {
        let token = null;

        try {
            token = store.getState().auth.token;
        } catch (e) {
            console.warn("Store not ready yet");
        }
        if (token) {
            config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
    },
    (error) => Promise.reject(error)
);

export function UseApi({ url, method = "GET", body = null, autoFetch = true }) {
    const [data, setData] = useState(null);
    const [loading, setLoading] = useState(autoFetch);
    const [error, setError] = useState(null);

    const fetchData = async (customBody = null) => {
        setLoading(true);
        setError(null);

        try {
            const response = await BaseLink({
                url,
                method,
                data: customBody ?? body,

            });

            setData(response.data);
            return response.data;

        } catch (err) {
            if (err.response && err.response.status === 401) {
                console.warn("Token expired or invalid.");
            }

            const errMsg =
                err.response?.data?.message ||
                //err.response?.data ||
                err.response?.statusText ||
                err.message;

            setError(errMsg);

            return {
                error: errMsg,
                status: err.response?.status
            };
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        if (autoFetch && method.toUpperCase() === "GET") {
            fetchData();
        }
    }, [url]);

    return { data, loading, error, refetch: fetchData };
}

export default UseApi;
