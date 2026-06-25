import React, { useState } from "react";
import { UseApi } from "../../../hooks/main";
import { useSelector } from "react-redux";


function Ch_SampleInfo({ onDataSend }) {

    const desc = useSelector((state) => state.sampleInfo.samoleDesc);
    const type = useSelector((state) => state.sampleInfo.sampleType);
    const code = useSelector((state) => state.sampleInfo.sampleCode);
    const note = useSelector((state) => state.sampleInfo.notes);
    const responsible = useSelector((state) => state.sampleInfo.sampleResponsible);





    const [sampleDesc, setSampleDesc] = useState(desc);
    const [sampleType, setSampleType] = useState(type);
    const [sampleLaboratory, setSampleLaboratory] = useState("2");
    const [Responsible, setResponsible] = useState(responsible);
    const [sampleCode, setSampleCode] = useState(code);
    const [notes, setNotes] = useState(note);
    const [createdAt, setcreatedAt] = useState(new Date().toISOString().slice(0, 16));
    const user = useSelector((state) => state.auth.user);

    const handleClick = () => {
        const dataToSend = {
            sampleDesc: sampleDesc,
            typeCode: sampleType,
            sampleLabCode: sampleLaboratory,
            respkBy: Responsible,
            sampleCode: sampleCode,
            notes: notes,
            createdBy: user,
            createdAt: createdAt// receving date

        };
        onDataSend(dataToSend); // Call the parent's callback with data
    };


    const { data: SampleType, loading, error } = UseApi({
        url: "SampleType/all",
    });

    const { data: SampleLaboratory, loading1, error1 } = UseApi({
        url: "SampleLaboratory/all",
    });
    if (loading) return <p>Loading Sample Types...</p>;
    if (error) return <p style={{ color: "red" }}>{error}</p>;

    return (
        <div id="SampleInfo" className="accordion-collapse collapse" data-bs-parent="#accordionExample">
            <div className="accordion-body">
                <div class="mb-3">
                    <label for="SampleDesc" class="form-label">Sample Description</label>
                    <input type="text"
                        className="form-control"
                        id="SampleDesc"
                        value={sampleDesc}
                        onChange={(e) => setSampleDesc(e.target.value)} />
                </div>
               
                <div class="mb-3 visually-hidden">
                    <label for="SampleLaboratory" class="form-label">Sample Laboratory</label>
                    <select class="form-select mb-3" value={sampleLaboratory}
                        onChange={(e) => setSampleLaboratory(e.target.value)} aria-label="Default select example">
                        <option selected>Sample Laboratory</option>
                        {SampleLaboratory?.map((l) => (
                            <option key={l.sampleLabCode} value={l.sampleLabCode}>{l.sampleLabName}</option>
                        ))}
                    </select>
                </div>
                <div class="mb-3">
                    <label for="SampleType" class="form-label">Sample Type</label>
                    <select className="form-select mb-3" value={sampleType}
                        onChange={(e) => { setSampleType(e.target.value)}} aria-label="Default select example">
                        <option selected>Sample Type</option>
                        {SampleType?.map((t) => (
                            <option key={t.typeCode} value={t.typeCode}>{t.typeName}</option>
                        ))}
                    </select>
                </div>
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
                    <label for="responsible" class="form-label">Sample Responsible</label>
                    <input type="text"
                        className="form-control"
                        id="responsible"
                        value={Responsible}
                        onChange={(e) => setResponsible(e.target.value)}

                    />
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
                <button onClick={handleClick} className=" collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#SampleTests" aria-expanded="false" aria-controls="SampleTests">
                    Next
                </button>
            </p>
        </div>
    );
}
export default Ch_SampleInfo  