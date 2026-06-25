import React, { useState } from "react";
import { UseApi } from "../../../hooks/main";

function SampleTests({ sampleType, onDataSend }) {

    // حالة الـ checkbox لكل method
    const [checkedMethods, setCheckedMethods] = useState({});

    // حالة الـ unit لكل method
    const [methodUnits, setMethodUnits] = useState({});

    function handleMethodCheck(testCode, requestedTestcode, methodCode, checked) {
        setCheckedMethods((prev) => ({
            ...prev,
            [testCode]: {
                ...(prev[testCode] || {}),
                [requestedTestcode]: {
                    ...(prev[testCode]?.[requestedTestcode] || {}),
                    [methodCode]: checked
                }
            }
        }));
    }

    function handleUnitChange(testCode, requestedTestcode, methodCode, value) {
        setMethodUnits((prev) => ({
            ...prev,
            [testCode]: {
                ...(prev[testCode] || {}),
                [requestedTestcode]: {
                    ...(prev[testCode]?.[requestedTestcode] || {}),
                    [methodCode]: value
                }
            }
        }));
    }

    const { data: tests, loading, error } = UseApi({
        url: "Test/allD",
    });

    if (loading) return <p>Loading tests...</p>;
    if (error) return <p style={{ color: "red" }}>{error}</p>;

    function handleSaveSelections() {
        const selected = [];

        Object.entries(checkedMethods).forEach(([testCode, reqs]) => {
            Object.entries(reqs).forEach(([requestedTestcode, methodsObj]) => {
                Object.entries(methodsObj).forEach(([methodCode, isChecked]) => {
                    if (isChecked) {
                        selected.push({
                            testCode,
                            requestedTestcode,
                            methodCode,
                            unit:
                                methodUnits[testCode]?.[requestedTestcode]?.[methodCode] || ""
                        });
                    }
                });
            });
        });

        onDataSend({ testData: { methods: selected } });
        console.log(selected);
    }

    return (
        <div
            id="SampleTests"
            className="accordion-collapse collapse"
            data-bs-parent="#accordionExample"
        >
            <div className="accordion-body">
                {tests?.map((t) => (
                    t.testCode === sampleType ?
                    <div key={t.testCode} className="mb-5">
                        <h2 className="mt-3 mb-2">{t.testName} Tests</h2>
                        <p>{t.desc}</p>

                        <table className="table table-bordered align-middle">
                            <thead className="table-light">
                                <tr>
                                    <th>No</th>
                                    <th>Requested Test</th>
                                    <th>Method</th>
                                    <th>Unit</th>
                                    <th>Select</th>
                                </tr>
                            </thead>

                            <tbody>
                                {t.requestedTests?.flatMap((r, rIndex) =>
                                    r.methods && r.methods.length > 0
                                        ? r.methods.map((m, mIndex) => (
                                            <tr key={`${r.requestedTestcode}-${m.methodCode}`}>
                                                <td>{`${rIndex + 1}.${mIndex + 1}`}</td>
                                                <td>{mIndex === 0 ? r.requestTestName : ""}</td>
                                                <td>{m.methodName}</td>

                                                <td>
                                                    <input
                                                        type="text"
                                                        className={`form-control ${r.equation.toLowerCase().includes("detection") ? "border border-danger " : ""}`}
                                                        value={
                                                            methodUnits[t.testCode]?.[r.requestedTestcode]?.[m.methodCode] || ""
                                                        }
                                                        onChange={(e) =>
                                                            handleUnitChange(
                                                                t.testCode,
                                                                r.requestedTestcode,
                                                                m.methodCode,
                                                                e.target.value
                                                            )
                                                        }
                                                    />
                                                </td>

                                                <td>
                                                    <label className="checkbox_container">
                                                        <input
                                                            type="checkbox"
                                                            checked={
                                                                !!checkedMethods[t.testCode]?.[r.requestedTestcode]?.[m.methodCode]
                                                            }
                                                            onChange={(e) =>
                                                                handleMethodCheck(
                                                                    t.testCode,
                                                                    r.requestedTestcode,
                                                                    m.methodCode,
                                                                    e.target.checked
                                                                )
                                                            }
                                                        />
                                                        <div className="checkmark"></div>
                                                    </label>
                                                </td>
                                            </tr>
                                        ))
                                        : (
                                            <tr key={r.requestedTestcode}>
                                                <td>{rIndex + 1}</td>
                                                <td>{r.requestTestName}</td>
                                                <td colSpan="3" className="text-muted">
                                                    No methods available
                                                </td>
                                            </tr>
                                        )
                                )}
                            </tbody>
                        </table>
                        </div>

                        :""
                ))}

                <p className="accordion-header">
                    <button
                        onClick={handleSaveSelections}
                        className="collapsed"
                        type="button"
                        data-bs-toggle="collapse"
                        data-bs-target="#Test_Report_Requirment"
                        aria-expanded="false"
                        aria-controls="Test_Report_Requirment"
                    >
                        Next
                    </button>
                </p>
            </div>
        </div>
    );
}

export default SampleTests;
