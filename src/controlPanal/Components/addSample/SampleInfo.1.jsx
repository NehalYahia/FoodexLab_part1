import React, { useState } from "react";
import { UseApi } from "../../../hooks/main";

export function SampleInfo({ onDataChange, onDataSend, shareSampleType }) {
    const [sampleDesc, setSampleDesc] = useState("");
    const [lotNum, setLotNum] = useState("");
    const [sampleType, setSampleType] = useState("");
    const [sampleLaboratory, setSampleLaboratory] = useState("1");
    const [Responsible, setResponsible] = useState("");

    const handleClick = () => {
        const dataToSend = {
            sampleDesc: sampleDesc,
            lotNumber: lotNum,
            typeCode: sampleType,
            sampleLabCode: sampleLaboratory,
            respkBy: Responsible

        };
        onDataSend(dataToSend); // Call the parent's callback with data
        shareSampleType(sampleType)
    };




    const changeData = (value) => {
        onDataChange(value);
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
                <div class="mb-3">
                    <label for="lotNum" class="form-label">Lot Number</label>
                    <input type="text"
                        className="form-control"
                        id="lotNum"
                        value={lotNum}
                        onChange={(e) => setLotNum(e.target.value)} />
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
                    onChange={(e) => { setSampleType(e.target.value); changeData(e.target.value); }} aria-label="Default select example">
                    <option selected>Sample Type</option>
                    {SampleType?.map((t) => (
                        <option key={t.typeCode} value={t.typeCode}>{t.typeName}</option>
                    ))}
                    </select>
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

              
            </div>
            <p className="accordion-header">
                <button onClick={handleClick} className=" collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#Responsible" aria-expanded="false" aria-controls="Responsible">
                    Next
                </button>
            </p>
        </div>
    );
}
export default SampleInfo;