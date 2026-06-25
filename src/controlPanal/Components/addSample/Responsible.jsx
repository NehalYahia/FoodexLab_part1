import React, { useState } from "react";
import { UseApi } from "../../../hooks/main";
import { useSelector } from "react-redux";

function Responsible({ onDataSend }) {
    const [sampleCode, setSampleCode] = useState("");
    const [certificateCode, setCertificateCode] = useState("");
    const [sampleTemperature, setSampleTemperature] = useState("");
    const [sampleCategory, setSampleCategory] = useState("");
    const [notes, setNotes] = useState("");
    const [createdAt, setcreatedAt] = useState(new Date().toISOString().slice(0, 16));
    const user = useSelector((state) => state.auth.user);


    const handleClick = () => {
        const dataToSend = {
            sampleCode: sampleCode,
            certCode: certificateCode,
            sampleTemp: sampleTemperature,
            categoryCode: sampleCategory,
            notes: notes,
            createdBy: user,
            createdAt: createdAt// receving date
        };
        onDataSend(dataToSend);
    };


    const { data: SampleCategory, loading, error } = UseApi({
        url: "SampleCategory/all",
    });

    if (loading) return <p>Loading Sample Types...</p>;
    if (error) return <p style={{ color: "red" }}>{error}</p>;

    return (
        <div id="Responsible" className="accordion-collapse collapse" data-bs-parent="#accordionExample">
            <div className="accordion-body">
                <div class="mb-3">
                    <label for="SampleCode" class="form-label">Sample Code</label>
                    <input type="text"
                        className="form-control"
                        id="SampleCode"
                        value={sampleCode}
                        onChange={(e) => setSampleCode(e.target.value)}

                    />
                </div>
                <div class="mb-3">
                    <label for="CertificateCode" class="form-label">Certificate Code</label>
                    <input type="text"
                        className="form-control"
                        id="CertificateCode"
                        value={certificateCode}
                        onChange={(e) => setCertificateCode(e.target.value)}

                    />
                </div>
                <div class="mb-3">
                    <label for="SampleTemperature" class="form-label">Sample Temperature at receipt</label>
                    <input type="text"
                        className="form-control"
                        id="SampleTemperature"
                        value={sampleTemperature}
                        onChange={(e) => setSampleTemperature(e.target.value)}
                    />
                </div>
                <div class="mb-3">
                    <label for="SampleCategory" class="form-label">Sample Category</label>
                    <select className="form-select mb-3"
                        aria-label="Default select example"
                        value={sampleCategory}
                        onChange={(e) => setSampleCategory(e.target.value)}
                    >
                        <option selected>Sample Category</option>
                        {SampleCategory?.map((c) => (
                            <option value={c.categoryCode}>{c.categoryDesc}</option>
                        ))}
                    </select>
                </div>
                <div class="mb-3">
                    <label for="notes" class="form-label">Comment</label>
                    <input type="text"
                        className="form-control"
                        id="notes"
                        value={notes}
                        onChange={(e) => setNotes(e.target.value)}

                    />
                </div>
                <div class="mb-3">
                    <label for="responsible" class="form-label">Created By</label>
                    <input type="text"
                        className="form-control"
                        id="responsible"
                        /*value= "mohamed"*/
                        value={user}
                        readonly
                    />
                </div>
                <input type="datetime-local"
                    className="form-control"
                    value={new Date().toISOString().slice(0, 16)}
                    onChange={(e) => setcreatedAt(e.target.value)}
                    hidden

                />
            </div>
            <p className="accordion-header">
                <button onClick={handleClick} className="collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#SampleTests" aria-expanded="true" aria-controls="SampleTests">
                    Next
                </button>
            </p>
        </div>


    )
}
export default Responsible;