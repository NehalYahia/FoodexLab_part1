import React, { useState } from "react";
import { UseApi } from "../../../hooks/main";

function Ch_SampleTests({ onDataSend }) {
    const { data: ChemistryTests, loading, error } = UseApi({
        url: "ChemistryTests/all",
    });
    const { data: ChemistryLabs, loading: labsLoading, error: labsError } = UseApi({
        url: "ChemistryLabs/all",
    });

   
    const [rows, setRows] = useState([
        {
            testName: "",
            labName: "",
            sendTime: "",
            expectedTime: ""
        }
    ]);

    const handleAddRow = () => {
        setRows([
            ...rows,
            {
                testName: "",
                labName: "",
                sendTime: "",
                expectedTime: ""
            }
        ]);
        console.log(rows);

    };
    const handleDeleteRow = (indexToDelete) => {
        const updated = rows.filter((_, index) => index !== indexToDelete);
        setRows(updated);
    };



    function handleSaveSelections() {
        const selected = [rows];

       

        onDataSend({ testData: { tests: selected } });
        console.log(selected);
    }

    return (
        <div
            id="SampleTests"
            className="accordion-collapse collapse"
            data-bs-parent="#accordionExample"
        >
            <div className="accordion-body">


                <table className="table table-bordered align-middle">
                    <thead className="table-light">
                        <tr>
                            <th>No</th>
                            <th>Test Name</th>
                            <th>Lab Name</th>
                            <th>Send Time</th>
                            <th>Expected Received Time</th>
                            <th></th>
                        </tr>
                    </thead>
                    <tbody>
                        {rows.map((row, index) => (
                            <tr key={index}>
                                <td>{index + 1}</td>

                                <td>
                                    <div className="form-floating">
                                        <select
                                            className="form-select"
                                            value={row.testName}
                                            onChange={(e) => {
                                                const updated = [...rows];
                                                updated[index].testName = e.target.value;
                                                setRows(updated);
                                            }}
                                        >
                                            <option selected>Test Name</option>
                                            {ChemistryTests?.map((c) => (
                                                <option value={c.ch_TestCode}>{c.ch_TestName}</option>
                                            ))}
                                        </select>
                                    </div>
                                </td>
                                <td>
                                    <div className="form-floating">
                                        <select
                                            className="form-select"
                                            value={row.labName}
                                            onChange={(e) => {
                                                const updated = [...rows];
                                                updated[index].labName = e.target.value;
                                                setRows(updated);
                                            }}
                                        >
                                            <option selected>Lab Name</option>
                                            {ChemistryLabs?.map((c) => (
                                                <option value={c.ch_LabCode}>{c.ch_LabName}</option>
                                            ))}
                                        </select>
                                    </div>
                                </td>

                                <td>
                                    <input
                                        className="form-control"
                                        type="datetime-local"
                                        value={row.sendTime}
                                        onChange={(e) => {
                                            const updated = [...rows];
                                            updated[index].sendTime = e.target.value;
                                            setRows(updated);
                                        }}
                                    />
                                </td>

                                <td>
                                    <input
                                        className="form-control"
                                        type="datetime-local"
                                        value={row.expectedTime}
                                        onChange={(e) => {
                                            const updated = [...rows];
                                            updated[index].expectedTime = e.target.value;
                                            setRows(updated);
                                        }}
                                    />
                                </td>
                                <td>
                                    <button type="button" onClick={handleAddRow}>
                                        add
                                    </button>

                                    <button
                                        type="button"
                                        onClick={() => handleDeleteRow(index)}
                                        style={{ marginLeft: "5px", color: "red" }}
                                    >
                                        delete
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>                </table>
            </div>


            <p className="accordion-header">
                <button
                    onClick={handleSaveSelections}
                    className="collapsed"
                    type="button"
                    data-bs-toggle="collapse"
                    data-bs-target="#Add_sample"
                    aria-expanded="false"
                    aria-controls="Add_sample"
                >
                    Next
                </button>
            </p>
        </div>
    );
}

export default Ch_SampleTests;
