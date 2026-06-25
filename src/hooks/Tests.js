import { useState, useEffect } from "react";
import axios from "axios";

// 🔹 إنشاء instance من axios
const BaseLink = axios.create({
    baseURL: "https://localhost:7085/api/",
});

// 🔐 Interceptor لإضافة الـ access token في كل طلب
BaseLink.interceptors.request.use(
    (config) => {
        const token = localStorage.getItem("accessToken");
        if (token) {
            config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
    },
    (error) => Promise.reject(error)
);

// 🔁 Interceptor لتجديد التوكن عند انتهاءه
let isRefreshing = false;
let failedQueue = [];

const processQueue = (error, token = null) => {
    failedQueue.forEach((prom) => {
        if (error) {
            prom.reject(error);
        } else {
            prom.resolve(token);
        }
    });
    failedQueue = [];
};

BaseLink.interceptors.response.use(
    (response) => response,
    async (error) => {
        const originalRequest = error.config;

        // لو السيرفر رجع 401 (توكن غير صالح)
        if (error.response && error.response.status === 401 && !originalRequest._retry) {
            if (isRefreshing) {
                // لو في طلب تاني بيجدد التوكن دلوقتي، نستناه
                return new Promise(function (resolve, reject) {
                    failedQueue.push({ resolve, reject });
                })
                    .then((token) => {
                        originalRequest.headers.Authorization = `Bearer ${token}`;
                        return BaseLink(originalRequest);
                    })
                    .catch((err) => Promise.reject(err));
            }

            originalRequest._retry = true;
            isRefreshing = true;

            try {
                // نجيب refreshToken من localStorage
                const refreshToken = localStorage.getItem("refreshToken");
                if (!refreshToken) throw new Error("No refresh token found");

                // نطلب توكن جديد من السيرفر
                const res = await axios.post("https://localhost:7085/api/Auth/refresh", {
                    refreshToken,
                });

                const newAccessToken = res.data.accessToken;
                localStorage.setItem("accessToken", newAccessToken);

                processQueue(null, newAccessToken);

                // نكرر الطلب الأصلي بالتوكن الجديد
                originalRequest.headers.Authorization = `Bearer ${newAccessToken}`;
                return BaseLink(originalRequest);
            } catch (err) {
                processQueue(err, null);
                localStorage.removeItem("accessToken");
                localStorage.removeItem("refreshToken");
                window.location.href = "/login"; // ترجعي المستخدم لتسجيل الدخول
                return Promise.reject(err);
            } finally {
                isRefreshing = false;
            }
        }

        return Promise.reject(error);
    }
);

export function useApi({ url, method = "GET", body = null, autoFetch = true }) {
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
                data: customBody || body,
            });

            setData(response.data);
        } catch (err) {
            setError(err.message || "Something went wrong");
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        if (autoFetch && method.toUpperCase() === "GET") {
            fetchData();
        }
        // eslint-disable-next-line
    }, [url]);

    return { data, loading, error, refetch: fetchData };
}

export default useApi;
