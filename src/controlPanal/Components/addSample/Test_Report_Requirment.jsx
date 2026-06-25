import React, { useState } from "react";



function Test_Report_Requirment({ onDataSend }) {
    const [uncertainty, setUncertainty] = useState(false);
    const [conformity, setConformity] = useState(false);
    const [ILAC, setILAC] = useState(false);
    const [reference, setReference] = useState("");
    const [AccILAC, setAccILAC] = useState("");

    const handleClick = () => {
        const dataToSend = {
            uncertaintyValue: uncertainty,
            conformityStatement: conformity,
            reference: reference,
            ilac: ILAC,
            accILAC: AccILAC
        };
        onDataSend(dataToSend); // Call the parent's callback with data
    };


    return (
        <div id="Test_Report_Requirment" className="accordion-collapse collapse" data-bs-parent="#accordionExample">
            <div className="accordion-body">

                <div className = "row">
                    <p className="col-8 d-flex align-items-center">Uncertainty value</p>
                    <label class="rocker rocker-small col-4">
                        <input type="checkbox" onChange={(e) => setUncertainty(e.target.checked)} />
                        <span class="switch-left">Yes</span>
                        <span class="switch-right">No</span>
                    </label>
                </div>
                <div className="row">
                    <p className="col-8 d-flex align-items-center">Conformity statement</p>
                    <label class="rocker rocker-small col-4">
                        <input type="checkbox" onChange={(e) => setConformity(e.target.checked)}/>
                        <span class="switch-left">Yes</span>
                        <span class="switch-right">No</span>
                    </label>
                </div>
                <div class={`mb-3 ${conformity ? "visible" : "invisible"}`}>
                    <label for="" class="form-label">incase of yes please mention the specs reference according to</label>
                    <input type="text"
                        className="form-control"
                        id="reference"
                        value={reference}
                        onChange={(e) => setReference(e.target.value)}/>
                </div> 
                <div className="row">
                    <p className="col-8 d-flex align-items-center">Decision rule used is simple acceptanceas defined at ILAC G8</p>
                    <label class="rocker rocker-small col-4">
                        <input type="checkbox" onChange={(e) => setILAC(e.target.checked)} />
                        <span class="switch-left">Yes</span>
                        <span class="switch-right">No</span>
                    </label>
                </div>
                <div class={`mb-3 ${ILAC ? "invisible" : "visible"}`}>




                    <label for="" class="form-label">incase of no please mention which type of decision you chose ,according to ILAC G8</label>
                    <input type="text"
                        className="form-control"
                        id="setAccILAC"
                        value={AccILAC}
                        onChange={(e) => setAccILAC(e.target.value)}
                    />
                </div> 




            </div>
            <p className="accordion-header">
                <button onClick={handleClick}
                    type="button"
                    className="collapsed"
                    data-bs-toggle="collapse"
                    data-bs-target="#Add_sample"
                    aria-expanded="false"
                    aria-controls="Add_sample"
                >
                    Next
                </button>
            </p>
        </div>
    )
}
export default Test_Report_Requirment;