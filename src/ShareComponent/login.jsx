import UseApi from "../hooks/main";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { login } from "../Store/userSlice";
import { useDispatch } from "react-redux";

//import { useData } from "../DataContext";


function Login() {
    //const { setSharedData } = useData();
    //const { setToken } = useData();
    const navigate = useNavigate();
    const [name, setName] = useState("");
    const [password, setpassword] = useState("");
    const dispatch = useDispatch();
    const { user, loading, error, refetch } = UseApi({
        url: "Auth/login",      
        method: "POST",    
        autoFetch: false,  
    });

    const handleSubmit = async (e) => {
        e.preventDefault();

        const response = await refetch({
            userName: name,
            password: password,
        });
        //console.log("Login response:", response);
        if (!response || response.error) {
            alert("Login failed: " + (response?.error || "Unknown error"));
            return;
        }
        const result = response.result || response;

        if (!result.accessToken) {
            alert(result.message || "Invalid username or password!");
            return;
        }

    

        alert(result.message || "Welcome!");
        //if (result.roleName === "client") {
          
            dispatch(login({
                user: result.name,
                token: result.accessToken,
                refreshToken: result.refreshToken,
                expireAt: result.expireAt,
                message: result.message,
                roles: JSON.stringify(result.roleName),
            }))
            navigate("/");

        //}
        //else {
        //    console.log(result);
           
        //    dispatch(login({
        //        user: result.name,
        //        token: result.accessToken,
        //        refreshToken: result.refreshToken,
        //        expireAt: result.expireAt,
        //        message: result.message,
        //        roles: JSON.stringify(result.roleName),
        //    }))
           

        //    navigate("/home");

        //}

    }
    return (

        <div className="card-front">
            <div className="center-wrap">
                <div className="section text-center">
                    <h4 className="mb-4 pb-3">Log In</h4>
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
                           {loading ? "Sending..." : "Login"}
                        </button>
                    </form>

                    {/*{user.message && <p style={{ color: "red" }}>Error: {error}</p>}*/}
                {/*    {user.message && <p style={{ color: "green" }}> welcome back!</p>}*/}
                </div>
            </div>
        </div>
    )
}
export default Login;
