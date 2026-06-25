import React, { useState } from "react";
import { useNavigate } from 'react-router-dom';
import UseApi from "../../hooks/main";
import Navbar from "../Components/Navbar";
import SideNav from "../Components/SideNav";

function AddLabUser() {

    const [name, setName] = useState("");
    const [password, setpassword] = useState("");
    const [RoleId, setRoleId] = useState("");

    const { user, loading, error, refetch } = UseApi({
        url: "Auth/addUser",
        method: "POST",
        autoFetch: false,
    });

    const { data: Role, loading1, error1 } = UseApi({
        url: "Role/all",
    });

    if (loading1) return <p>Loading Roles...</p>;
    if (error1) return <p style={{ color: "red" }}>{error1}</p>;


    const handleSubmit = async (e) => {
        e.preventDefault();

        const response = await refetch({
            userName: name,
            password: password,
            roleCode: RoleId,
            createdAt: new Date().toISOString().slice(0, 16),
            createdBy: ""
        });

        if (response?.error)
            console.log("added failed: " + response.error.message);
        else
           { alert(response?.message || response?.data?.message || "Added successfully");
}
            
    };


    return (

        <div className="body">
            <SideNav/>
            <div className="container d-flex justify-content-center">
                <div className=" text-center w-50 mt-5">
                    <h4 className="mb-4 pb-3">Add New User</h4>
                    <p></p>
                    <form onSubmit={handleSubmit} className= "glass p-5">
                        <div className="form-group">
                            <input type="text"
                                className="form-style"
                                placeholder="Your Full Name"
                                autocomplete="none"
                                value={name}
                                onChange={(e) => setName(e.target.value)} />
                            <i className="input-icon fa fa-user"></i>
                        </div>
                        <div className="form-group mt-2">
                            <input type="password"
                                className="form-style"
                                placeholder="Your Password"
                                autocomplete="none"
                                value={password}
                                onChange={(e) => setpassword(e.target.value)} />
                            <i className="input-icon fa fa-lock"></i>
                        </div>

                        <div className="form-group mt-2">
                            <select className="form-select mb-3" value={RoleId}
                                onChange={(e) => setRoleId(e.target.value)} aria-label="Default select example">
                                <option selected>Role</option>
                                {Role?.map((r) => (
                                    <option key={r.roleCode} value={r.roleCode} onChange={(e) => setRoleId(e.target.value)} >{r.roleName}</option>
                                ))}

                            </select>

                        </div>

                        <button className="btn mt-4" type="submit" disabled={loading}>
                            {loading ? "Sending..." : "Add User"}
                        </button>
                    </form>
                  
                </div>
            </div>
        </div>



    );
}
export default AddLabUser;
