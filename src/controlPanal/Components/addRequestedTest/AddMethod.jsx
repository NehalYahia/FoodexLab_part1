
import UseApi from "../../../hooks/main";
import React, { useState } from "react";
import { useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";


function AddMethod({ onSuccess, request }) {

    const { id } = useParams();

    const [methodCode, setMethodCode] = useState("");
    const [methodName, setMethodName] = useState("");
    const [MethodTime, setMethodTime] = useState(0);
    const [MethodTime2, setMethodTime2] = useState(0);

    const [test, setTest] = useState("");
    const { data: tests, loading, error } = UseApi({
        url: "Test/all",
    });
    const { newMethod, loading2, error2, refetch } = UseApi({
        url: `Method/${id}/${test}`,
        method: "POST",
        autoFetch: false,
    });


    const handleSubmit2 = async (e) => {
        e.preventDefault();

        const response2 = await refetch({
            methodCode: methodCode,
            methodName: methodName,
            time: MethodTime,
            createdAt: new Date(),
            time2: MethodTime2,
            createdBy: "mm",
            updatedAt: null,
            updatedBy: null

        });
        if (response2?.error) {
            alert(response2.error.message);
        } else {
            alert(response2?.message || response2?.data?.message || "Added successfully");
            onSuccess(); 
        }

    }


    return (
        <div className="container">
            <h4 className="mb-4 pb-3">Add Method</h4>
            <form onSubmit={handleSubmit2}>
                <div className="form-group">

                    <input type="text"
                        className="form-style"
                        placeholder="Method Code"
                        autocomplete="none"
                        value={methodCode}
                        onChange={(e) => setMethodCode(e.target.value)}
                    />
                    <i className="input-icon fa fa-user"></i>
                </div>
                <div className="form-group mt-2">
                    <input type="text"
                        className="form-style"
                        placeholder="Method Name"
                        autocomplete="none"
                        value={methodName}
                        onChange={(e) => setMethodName(e.target.value)}
                    />
                    <i className="input-icon fa fa-lock"></i>
                </div>
                <div className="form-group mt-2">
                    <input type="number"
                        onChange={(e) => setMethodTime(e.target.value)}
                        class="form-control"
                        placeholder="time for negative result"
                        aria-describedby="basic-addon1"
                    />
                </div>
                <div className="form-group mt-2">
                    <input type="number"
                        onChange={(e) => setMethodTime2(e.target.value)}
                        class="form-control"
                        placeholder="time for positive result"
                        aria-describedby="basic-addon1"
                    />
                </div>
                <div class="mb-3">
                    <label for="responsible" class="form-label">Test Classification</label>
                    <select className="form-select mb-3" value={test}
                        onChange={(e) => { setTest(e.target.value); }} aria-label="Default select example">
                        <option selected>Classification</option>
                        {tests?.map((item, index) => (
                            <option key={item.testCode} value={item.testCode}>{item.testName}</option>
                        ))}
                    </select>
                   
                  
                </div>
                <button className="btn mt-4" type="submit" disabled={loading2}>
                    {loading2 ? "Sending..." : "add"}
                </button>
            </form>

        </div>



    )


}
export default AddMethod