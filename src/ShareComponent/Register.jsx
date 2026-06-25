import UseApi from "../hooks/main";
import React, { useState } from "react";
import { useNavigate, useLocation } from 'react-router-dom'
function Register() {
    const location = useLocation();
    const pathname = location.pathname;
    const lastSegment = pathname.substring(pathname.lastIndexOf('/') + 1);


    const [name, setName] = useState("");
    const [password, setpassword] = useState("");
    const [RoleId, setRoleId] = useState("");

        const { user, loading, error, refetch } = UseApi({
            url: "Auth/register",    
            method: "POST",  
            autoFetch: false,  
        });
        const navigate = useNavigate()

   
   
    const handleSubmit = async (e) => {
        e.preventDefault();
    
        if (lastSegment === "client") {
            setRoleId("2")
        }
        else {
            setRoleId("1")

        }
        const response = await refetch({
            userName: name,
            password: password,
            roleId: RoleId,

        });

        if (!response || response.error) {
            alert("Register failed: " + (response?.error || "Unknown error"));
            return;
        }
        const result = response.result || response;
        if (!result.accessToken) {
            alert(result.message);
            return;
        }

        localStorage.setItem("token", result.accessToken);
        localStorage.setItem("refreshToken", result.refreshToken || "");
        localStorage.setItem("expireAt", result.expireAt || "");
        localStorage.setItem("message", result.message || "");

        alert(result.message || "Welcome!");
        navigate("/WHome");


    };
    return (
        <div className="card-back">
            <div className="center-wrap">
                <div className="section text-center">
                    <h4 className="mb-4 pb-3">Create an acount</h4>
                    <form onSubmit={handleSubmit}>
                        <div className="form-group">
                            <input type="text"
                                className="form-style"
                                placeholder="Your Full Name"
                                autocomplete="none"
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                            />
                            <i className="input-icon fa fa-user"></i>
                        </div>
                        <div className="form-group mt-2">
                            <input type="password"
                                className="form-style"
                                placeholder="Your Password"
                                autocomplete="none"
                                value={password}
                                onChange={(e) => setpassword(e.target.value)}
                            />
                            <i className="input-icon fa fa-lock"></i>
                        </div>

                        <button className="btn mt-4" type="submit" disabled={loading}>
                            {loading ? "Sending..." : "SingUp"}
                        </button>
                    </form>
                    {/*{error && <p style={{ color: "red" }}>Error: {error}</p>}*/}
                {/*    {user && <p style={{ color: "green" }}>User added successfully!</p>}*/}
                </div>
            </div>
        </div>
    )
}

export default Register;
