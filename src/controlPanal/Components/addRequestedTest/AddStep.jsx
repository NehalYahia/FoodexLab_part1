
import UseApi from "../../../hooks/main";
import React, { useState } from "react";
import { useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";


function AddStep({ onSuccess }) {

    const { id } = useParams();
    const [code, setCode] = useState("");
    const [name, setName] = useState("");
    const [PositiveResults, setPositiveResults] = useState("");
    const [NegativeResults, setNegativeResults] = useState("");

    const { newsteps, loading, error, refetch } = UseApi({
        url: `DetectionSteps/${id}`,
        method: "POST",
        autoFetch: false,
    });


    const handleSubmit = async (e) => {
        e.preventDefault();

        const response = await refetch({
            stepCode: code,
            stepName: name,
            createdAt: new Date(),
            createdBy: "mm",
            updatedAt: null,
            updatedBy: null
        });


        if (response?.error) {
            alert(response.error.message);
        } else {
            alert(response?.message || response?.data?.message || "Added successfully");
            onSuccess();
        }

    }


    return (
        <div className="container">
            <h4 className="mb-4 pb-3">Add Step </h4>
            <form onSubmit={handleSubmit}>
                <div className="form-group">

                    <input type="text"
                        className="form-style"
                        placeholder="Step Code"
                        autocomplete="none"
                        value={code}
                        onChange={(e) => setCode(e.target.value)}
                    />
                    <i className="input-icon fa fa-user"></i>
                </div>
                <div className="form-group mt-2">
                    <input type="text"
                        className="form-style"
                        placeholder="Step Name"
                        autocomplete="none"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                    />
                    <i className="input-icon fa fa-lock"></i>
                </div>
                <div className="form-group mt-2">
                    <input type="text"
                        className="form-style"
                        placeholder="Step PositiveResults"
                        autocomplete="none"
                        value={PositiveResults}
                        onChange={(e) => setPositiveResults(e.target.value)}
                    />
                    <i className="input-icon fa fa-lock"></i>
                </div>
                <div className="form-group mt-2">
                    <input type="text"
                        className="form-style"
                        placeholder="Step PositiveResults"
                        autocomplete="none"
                        value={NegativeResults}
                        onChange={(e) => setNegativeResults(e.target.value)}
                    />
                    <i className="input-icon fa fa-lock"></i>
                </div>

                <button className="btn mt-4" type="submit" disabled={loading}>
                    {loading ? "Sending..." : "add"}
                </button>
            </form>

        </div>



    )


}
export default AddStep