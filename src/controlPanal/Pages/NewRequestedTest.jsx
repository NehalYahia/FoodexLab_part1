import React, { useState } from "react";
import { useNavigate } from 'react-router-dom';
import UseApi from "../../hooks/main";
import Navbar from "../Components/Navbar";
import SideNav from "../Components/SideNav";

function NewRequestedTest() {

    const [code, setCode] = useState("");
    const [name, setName] = useState("");
    const [equation, setEquation] = useState("");
    const navigate = useNavigate();


    const types = [
        {
            id: 1,
            name: "confirmation"
        },
        {
            id: 2,
            name: "without confirmation"
        },
        {
            id: 3,
            name: "detection"
        },
    ];

    const { requestTest, loading, error, refetch } = UseApi({
        url: "RequestedTest",
        method: "POST",
        autoFetch: false,
    });



    const handleClick = async (e) => {
        e.preventDefault();
        
        const response = await refetch({
            requestedTestcode: code,
            requestTestName: name,
            equation: equation,
            createdAt: new Date().toISOString().slice(0, 16),
            createdBy: "mm",
            updatedAt: null,
            updatedBy : null
        });
      
        if (response?.error) {
            alert(response.error.message);
        } else {
            alert(response?.message || response?.data?.message || "Added successfully");
            navigate(`/Test/${code}`);

        }
        //if (response.error.message) 
        //    alert(response.error.message);

        //alert(response.message);

        console.log(response);

    };


    return (

        <div className="">
            <SideNav/>
            <div className="container">
                <div className=" text-center">
                    <h2 className="m-4 title">Add New Test</h2>
                    <form className="glass p-5 w-75 m-auto" >
                        <div className="form-group">
                            <input type="text"
                                className="form-style"
                                placeholder="Test Code"
                                autocomplete="none"
                                value={code}
                                onChange={(e) => setCode(e.target.value)} />
                            <i className="input-icon fa fa-user"></i>
                        </div>
                        <div className="form-group mt-2">
                            <input type="text"
                                className="form-style"
                                placeholder="Test Name"
                                autocomplete="none"
                                value={name}
                                onChange={(e) => setName(e.target.value)} />
                            <i className="input-icon fa fa-lock"></i>
                        </div>

                        <div className="form-group mt-2">
                            <select className="form-select mb-3" value={equation}
                                onChange={(e) => setEquation(e.target.value)} aria-label="Default select example">
                                <option selected>Type</option>
                                {types?.map((t) => (
                                    <option key={t.id} value={t.name} >{t.name}</option>
                                ))}

                            </select>

                        </div>

                        <button className="btn mt-4" type="submit" onClick={handleClick}>
                            {loading ? "Sending..." : "Add Test"}
                        </button>
                    </form>

                </div>
            </div>
        </div>



    );
}
export default NewRequestedTest;
