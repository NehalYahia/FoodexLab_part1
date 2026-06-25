import { useParams } from "react-router-dom";
import React, { useState, useEffect } from "react";
import UseApi from "../../hooks/main";
import Navbar from "../Components/Navbar";
import SideNav from "../Components/SideNav";

function UpdateSample() {
    const { id } = useParams();

    const [rowsData, setRowsData] = useState({});
    const [checkedMethods, setCheckedMethods] = useState({});
    const [methodUnits, setMethodUnits] = useState({});
    const [methodIds, setMethodIds] = useState({});

    // جلب بيانات العينة
    const { data: sampleTestDetails, loading6, error6, refetch:sampleRefetch } = UseApi({
        url: `Sample/${id}`,
    });

    // جلب القوائم
    const { data: SampleCategory, loading, error } = UseApi({ url: "SampleCategory/all" });
    const { data: SampleType, loading2, error2 } = UseApi({ url: "SampleType/all" });
    const { data: SampleLaboratory, loading1, error1 } = UseApi({ url: "SampleLaboratory/all" });
    const { data: tests, loading4, error4 } = UseApi({ url: "Test/allD" });

    // تحديث البيانات الرئيسية
    useEffect(() => {
        if (!sampleTestDetails) return;

        setRowsData({
            sampleCode: sampleTestDetails.sampleCode ?? "",
            certCode: sampleTestDetails.certCode ?? "",
            sampleTemp: sampleTestDetails.sampleTemp ?? "",
            categoryCode: sampleTestDetails.categoryCode ?? "",
            notes: sampleTestDetails.notes ?? "",
            updatedBy: sampleTestDetails.updatedBy ?? "",
            updatedAt: sampleTestDetails.updatedAt ?? new Date().toISOString().slice(0, 16),
            sampleDesc: sampleTestDetails.sampleDesc ?? "",
            lotNum: sampleTestDetails.lotNumber ?? "",
            typeCode: sampleTestDetails.typeCode ?? "",
            sampleLabCode: sampleTestDetails.sampleLabCode ?? "",
            respkBy: sampleTestDetails.respkBy ?? "",
            uncertaintyValue: sampleTestDetails.uncertaintyValue ?? false,
            conformityStatement: sampleTestDetails.conformityStatement ?? false,
            reference: sampleTestDetails.reference ?? "",
            ilac: sampleTestDetails.ilac ?? false,
            accILAC: sampleTestDetails.accILAC ?? "",
            testData: sampleTestDetails.testData ?? []
        });
    }, [sampleTestDetails]);

    // ملء checkboxes والـ units من بيانات API
    useEffect(() => {
        if (!sampleTestDetails?.sampleTestsResults?.length || !tests?.length) return;

        const checked = {};
        const units = {};
        const ids = {};

        sampleTestDetails.sampleTestsResults.forEach(item => {
            const testCode = String(item.test?.id);
            const requestedTestcode = String(item.req?.id);
            const methodCode = String(item.method?.id);

            // checkbox
            checked[testCode] = checked[testCode] || {};
            checked[testCode][requestedTestcode] = checked[testCode][requestedTestcode] || {};
            checked[testCode][requestedTestcode][methodCode] = true;

            // unit
            units[testCode] = units[testCode] || {};
            units[testCode][requestedTestcode] = units[testCode][requestedTestcode] || {};
            units[testCode][requestedTestcode][methodCode] = item.unit || "";

            // ⭐ id بتاع SampleTestsResults
            ids[testCode] = ids[testCode] || {};
            ids[testCode][requestedTestcode] = ids[testCode][requestedTestcode] || {};
            ids[testCode][requestedTestcode][methodCode] = item.id;
        });

        setCheckedMethods(checked);
        setMethodUnits(units);
        setMethodIds(ids);

    }, [sampleTestDetails, tests]);


    // تعديل checkboxes
    const handleMethodCheck = (testCode, requestedTestcode, methodCode, checked) => {
        setCheckedMethods(prev => ({
            ...prev,
            [testCode]: {
                ...(prev[testCode] || {}),
                [requestedTestcode]: {
                    ...(prev[testCode]?.[requestedTestcode] || {}),
                    [methodCode]: checked
                }
            }
        }));
    };

    // تعديل units
    const handleUnitChange = (testCode, requestedTestcode, methodCode, value) => {
        setMethodUnits(prev => ({
            ...prev,
            [testCode]: {
                ...(prev[testCode] || {}),
                [requestedTestcode]: {
                    ...(prev[testCode]?.[requestedTestcode] || {}),
                    [methodCode]: value
                }
            }
        }));
    };



    const { sample, loading5, error5, refetch } = UseApi({
        url: `Sample/${id}`,
        method: "PUT",
        autoFetch: false,
    });

    const handleClick = async (e) => {
        e.preventDefault();
        const selected = [];

        Object.entries(checkedMethods).forEach(([testCode, reqs]) => {
            Object.entries(reqs).forEach(([requestedTestcode, methodsObj]) => {
                Object.entries(methodsObj).forEach(([methodCode, isChecked]) => {
                    if (isChecked) {
                        selected.push({
                            id:
                                methodIds?.[testCode]?.[requestedTestcode]?.[methodCode] || 0, // ⭐
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

        const row = rowsData;

        const response = await refetch({
            sampleCode: row.sampleCode,
            certCode: row.certCode,
            sampleTemp: row.sampleTemp,
            categoryCode: row.categoryCode,
            notes: row.notes,
            updatedBy: row.updatedBy,
            updatedAt: row.updatedAt,
            sampleDesc: row.sampleDesc,
            lotNumber: row.lotNum,
            typeCode: row.typeCode,
            sampleLabCode: row.sampleLabCode,
            respkBy: row.respkBy,
            uncertaintyValue: row.uncertaintyValue,
            conformityStatement: row.conformityStatement,
            reference: row.reference,
            ilac: row.ilac,
            accILAC: row.accILAC,
            testData: {
                methods: selected
            }
        });
        if (response?.error) {
            alert(response.error.message);
        } else {
            alert(response?.message || response?.data?.message || "Updated successfully");
            sampleRefetch();
        }
        console.log(selected);


        console.log(response);

    };


    if (loading || loading1 || loading2 || loading4) return <p>Loading...</p>;
    if (error || error1 || error2 || error4) return <p style={{ color: "red" }}>Error loading data</p>;

    return (
        <div className="body">
            <SideNav/>
            <h2 className="text-center title">Update Sample</h2>

            {sampleTestDetails && (
                <div className="container my-4">
                    {/* البيانات الأساسية */}
                    <div className="col-9 mx-auto">
                        <div className="mb-3">
                            <label className="form-label">Sample Description</label>
                            <input
                                type="text"
                                className="form-control"
                                value={rowsData.sampleDesc || sampleTestDetails?.sampleDesc || ""}
                                onChange={e => setRowsData(prev => ({ ...prev, sampleDesc: e.target.value }))}
                            />
                        </div>
                        <div className="mb-3">
                            <label className="form-label">Lot Number</label>
                            <input
                                type="text"
                                className="form-control"
                                value={rowsData.lotNum || sampleTestDetails?.lotNumber || ""}
                                onChange={e => setRowsData(prev => ({ ...prev, lotNum: e.target.value }))}
                            />
                        </div>
                        <div class="mb-3">
                            <label for="SampleCode" class="form-label">Sample Code</label>
                            <input type="text"
                                className="form-control"
                                id="SampleCode"
                                value={rowsData.sampleCode || sampleTestDetails?.sampleCode || "" }
                                onChange={(e) =>
                                    setRowsData(prev => ({
                                        ...prev,
                                        sampleCode: e.target.value,
                                    }))
                                }

                            />
                        </div>
                        <div class="mb-3">
                            <label for="CertificateCode" class="form-label">Certificate Code</label>
                            <input type="text"
                                className="form-control"
                                id="CertificateCode"
                                value={rowsData.certCode || sampleTestDetails?.certCode || ""}
                                onChange={(e) =>
                                    setRowsData(prev => ({
                                        ...prev,
                                        certCode: e.target.value,
                                    }))
                                }

                            />
                        </div>
                        <div class="mb-3">
                            <label for="SampleTemperature" class="form-label">Sample Temperature at receipt</label>
                            <input type="text"
                                className="form-control"
                                id="SampleTemperature"
                                value={rowsData.sampleTemp || sampleTestDetails?.sampleTemp || ""}
                                onChange={(e) =>
                                    setRowsData(prev => ({
                                        ...prev,
                                        sampleTemp: e.target.value,
                                    }))
                                }

                            />
                        </div>
                        <select className="form-select mb-3"
                            aria-label="Default select example"
                            value={rowsData.categoryCode || sampleTestDetails?.categoryCode || ""}
                            onChange={(e) =>
                                setRowsData(prev => ({
                                    ...prev,
                                    categoryCode: e.target.value,
                                }))
                            }


                        >
                            <option selected>Sample Category</option>
                            {SampleCategory?.map((c) => (
                                <option value={c.categoryCode}>{c.categoryDesc}</option>
                            ))}
                        </select>
                        <div class="mb-3">
                            <label for="notes" class="form-label">Comment</label>
                            <input type="text"
                                className="form-control"
                                id="notes"
                                value={rowsData.notes || sampleTestDetails?.notes || ""}
                                onChange={(e) =>
                                    setRowsData(prev => ({
                                        ...prev,
                                        notes: e.target.value,
                                    }))
                                }


                            />
                        </div>
                        <div class="mb-3">
                            <label for="updatedBy" class="form-label">Updated By</label>
                            <input type="text"
                                className="form-control"
                                id="updatedBy"
                                value={rowsData.updatedBy || sampleTestDetails?.updatedBy || ""}
                                onChange={(e) =>
                                    setRowsData(prev => ({
                                        ...prev,
                                        updatedBy: e.target.value,
                                    }))
                                }
                                readonly
                            />
                        </div>
                        <input type="datetime-local"
                            className="form-control"
                            value={rowsData.updatedAt || sampleTestDetails?.updatedAt || new Date().toISOString().slice(0, 16)}
                            onChange={(e) =>
                                setRowsData(prev => ({
                                    ...prev,
                                    updatedAt: e.target.value,
                                }))
                            }
                            hidden

                        />
                        <select
                            className="form-select mb-3"
                            value={rowsData.sampleLabCode || sampleTestDetails.sampleLabCode || ""}
                            onChange={e => setRowsData(prev => ({ ...prev, sampleLabCode: e.target.value }))}
                        >
                            <option>Sample Laboratory</option>
                            {SampleLaboratory?.map(l => (
                                <option key={l.sampleLabCode} value={l.sampleLabCode}>{l.sampleLabName}</option>
                            ))}
                        </select>
                        <select
                            className="form-select mb-3"
                            value={rowsData.typeCode || sampleTestDetails.typeCode || ""}
                            onChange={e => setRowsData(prev => ({ ...prev, typeCode: e.target.value }))}
                        >
                            <option>Sample Type</option>
                            {SampleType?.map(t => (
                                <option key={t.typeCode} value={t.typeCode}>{t.typeName}</option>
                            ))}
                        </select>
                        <div className="row">
                            <p className="col-8 d-flex align-items-center">Uncertainty value</p>
                            <label class="rocker rocker-small col-4">
                                <input type="checkbox"
                                    checked={rowsData.uncertaintyValue ?? sampleTestDetails?.uncertaintyValue ?? false}
                                    onChange={(e) =>
                                        setRowsData(prev => ({
                                            ...prev,
                                            uncertaintyValue: e.target.checked

                                        }))}


                                />
                                <span class="switch-left">Yes</span>
                                <span class="switch-right">No</span>
                            </label>
                        </div>
                        <div className="row">
                            <p className="col-8 d-flex align-items-center">Conformity statement</p>
                            <label class="rocker rocker-small col-4">
                                <input type="checkbox"
                                    checked={rowsData.conformityStatement ?? sampleTestDetails?.conformityStatement ?? false}
                                    onChange={(e) =>
                                        setRowsData(prev => ({
                                            ...prev,
                                            conformityStatement: e.target.checked

                                        }))}

                                />
                                <span class="switch-left">Yes</span>
                                <span class="switch-right">No</span>
                            </label>
                        </div>
                        <div class={`mb-3 ${rowsData.conformityStatement ? "visible" : "invisible"}`}>
                            <label for="" class="form-label">incase of yes please mention the specs reference according to</label>
                            <input type="text" class="form-control" id=""
                                value={rowsData.reference || sampleTestDetails?.reference || ""}
                                onChange={(e) =>
                                    setRowsData(prev => ({
                                        ...prev,
                                        reference: e.target.value,
                                    }))
                                }
                            />
                        </div>
                        <div className="row">
                            <p className="col-8 d-flex align-items-center">Decision rule used is simple acceptanceas defined at ILAC G8</p>
                            <label class="rocker rocker-small col-4">
                                <input type="checkbox"
                                    checked={rowsData.ILAC ?? sampleTestDetails?.ILAC ?? false}
                                    onChange={(e) =>
                                        setRowsData(prev => ({
                                            ...prev,
                                            ILAC: e.target.checked

                                        }))}
                                />
                                <span class="switch-left">Yes</span>
                                <span class="switch-right">No</span>
                            </label>
                        </div>
                        <div class={`mb-3 ${rowsData.ILAC ? "invisible" : "visible"}`}>
                            <label for="" class="form-label">incase of no please mention which type of decision you chose ,according to ILAC G8</label>
                            <input type="text" class="form-control" id=""
                                value={rowsData.accILAC || sampleTestDetails?.accILAC || ""}
                                onChange={(e) =>
                                    setRowsData(prev => ({
                                        ...prev,
                                        accILAC: e.target.value,
                                    }))
                                }
                            />
                        </div>

                </div>

                   
                    <div className="col-12">
                        {tests?.map(t =>
                            String(t.testCode) === String(sampleTestDetails.typeCode) ? (
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
                                                    ? r.methods.map((m, mIndex) => {
                                                        const testCode = String(t.testCode);
                                                        const requestedTestcode = String(r.requestedTestcode);
                                                        const methodCode = String(m.methodCode);
                                                        return (
                                                            <tr key={`${r.requestedTestcode}-${m.methodCode}`}>
                                                                <td>{`${rIndex + 1}.${mIndex + 1}`}</td>
                                                                <td>{mIndex === 0 ? r.requestTestName : ""}</td>
                                                                <td>{m.methodName}</td>
                                                                <td>
                                                                    <input
                                                                        type="text"
                                                                        className="form-control"
                                                                        value={methodUnits[testCode]?.[requestedTestcode]?.[methodCode] || ""}
                                                                        onChange={e => handleUnitChange(testCode, requestedTestcode, methodCode, e.target.value)}
                                                                    />
                                                                </td>
                                                                <td>
                                                                    <label className="checkbox_container">
                                                                        <input
                                                                            type="checkbox"
                                                                            checked={!!checkedMethods[testCode]?.[requestedTestcode]?.[methodCode]}
                                                                            onChange={e => handleMethodCheck(testCode, requestedTestcode, methodCode, e.target.checked)}
                                                                        />
                                                                        <div className="checkmark"></div>
                                                                    </label>
                                                                </td>
                                                            </tr>
                                                        );
                                                    })
                                                    : (
                                                        <tr key={r.requestedTestcode}>
                                                            <td>{rIndex + 1}</td>
                                                            <td>{r.requestTestName}</td>
                                                            <td colSpan="3" className="text-muted">No methods available</td>
                                                        </tr>
                                                    )
                                            )}
                                        </tbody>
                                    </table>
                                </div>
                            ) : null
                        )}
                    </div>
                </div>
            )}
            <div className="text-center">
                <button
                    onClick={handleClick}
                    type="button"
                    className="bg rounded border p-3 px-5 text-white mt-2"
                >
                    update
                </button>

            </div>
            


        </div>
    );
}

export default UpdateSample;

