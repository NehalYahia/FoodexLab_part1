import { UseApi } from "../hooks/main";
import { useNavigate } from "react-router-dom";
import { useData } from "../DataContext";

function LogoutBtn({ usernameProp }) {
    const { setToken, setSharedData, sharedData } = useData();
    const navigate = useNavigate();
    const { user, loading, error, refetch } = UseApi({
        url: 'Auth/logout/?username=${usernameProp}',
        method: "POST",
        autoFetch: false,
    });
    console.log(usernameProp);

    const handleLogout = async (e) => {
        e.preventDefault();
        console.log(usernameProp);
        if (!usernameProp) {
            alert("No username found in session");
            return;
        }

        try {
            const response = await refetch();;

            if (!response || response.error) {
                alert("Logout failed: " + (response?.error || "Unknown error"));
                return;
            }

            alert(response.result || "Logged out successfully!");

            // تنظيف كل البيانات
            sessionStorage.clear();
            setToken(null);
            setSharedData({});

            // توجيه بعد تسجيل الخروج
            if (sharedData.roleName === "client") {
                navigate("/WHome");
            } else {
                navigate("/login&sign");
            }
        } catch (err) {
            console.error("Logout failed:", err);
            alert("Something went wrong while logging out");
        }
    };

    return (
        <button
            onClick={handleLogout}
            disabled={loading}
            className="btn btn-danger"
            style={{ margin: "10px", padding: "8px 16px" }}
        >
            {loading ? "Logging out..." : "Logout"}
        </button>
    );
}

export default LogoutBtn;
