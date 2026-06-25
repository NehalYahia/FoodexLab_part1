import { UseApi } from "../../hooks/main";
import { useParams } from "react-router-dom";
import React, { useState, useEffect } from "react";
import Navbar from "../Components/Navbar";
import { format } from "date-fns";
import SideNav from "../Components/SideNav";
function MethodPageDetection() {
    const { req } = useParams();
    const { id } = useParams();
    const { sampleid } = useParams();
    //const [tepDate, setDate] = useState();

    const [rowsData, setRowsData] = useState({
        stepBy: "",
        data: new Date().toISOString().slice(0, 10),
        time: new Date().toTimeString().slice(0, 5),
        blank: false,
        positiveControl: false,
        negativeControl: false,
        result: false
    });
    //const [rowsData, setRowsData] = useState({});


    const [volume, setVolume] = useState(0);
    const [Result, setResult] = useState(false);
    const [TBy, setTBy] = useState("");
    const [time, setTime] = useState();


    const { data: Steps, loading1, error1 } = UseApi({
        url: `RequestedTest/Steps/${req}`,
    });
    //main sample information
    const { data: sampleTestDetails, loading2, error2 } = UseApi({
        url: `SampleRequestedTestMethod?id=${id}`,

    });


    //useEffect(() => {
    //    if (sampleTestDetails) {
    //        if (Steps) {
    //            setRowsData(prev => ({
    //                ...prev,
    //                [Steps.detectionStepsDto.stepCode]: {
    //                    stepBy: sampleTestDetails.stepBy ?? "",
    //                    date: sampleTestDetails.data ?? new Date().toISOString().slice(0, 16),
    //                    time: sampleTestDetails.time ?? new Date().toISOString().slice(0, 5),
    //                    result: sampleTestDetails.result ?? false
    //                }
    //            }));
    //        }
    //    }
    //}, [sampleTestDetails, Steps]);




    const { data: SampleRequestedTestDetectionSteps, loading3, error3 } = UseApi({
        url: `SampleRequestedTestDetectionSteps/?Sampleid=${sampleid}&RequestedTestCode=${req}`,

    });


    const { methodsteps, loading, error, refetch } = UseApi({
        url: `SampleRequestedTestDetectionSteps/${sampleid}`,
        method: "PUT",
        autoFetch: false,
    });

    const handleClick = async (stepCode) => {
        const row = rowsData[stepCode] || {};

        const oldRow = SampleRequestedTestDetectionSteps?.find(
            x => x.stepCode === stepCode
        );

        const response = await refetch({
            sampleId: sampleid,
            stepCode: stepCode,
            requestedTestCode: req,
            stepBy: row.testedBy ?? oldRow?.stepBy ?? "",
            data: row.data ?? oldRow?.data ?? new Date().toISOString().slice(0, 10),
            time: row.time ?? oldRow?.time ?? new Date().toTimeString().slice(0, 5),
            blank: row.blank ?? oldRow?.blank ?? false,
            positiveControl: row.positiveControl ?? oldRow?.positiveControl ?? false,
            negativeControl: row.negativeControl ?? oldRow?.negativeControl ?? false,
            result: row.result ?? oldRow?.result ?? false
        });

        alert(response);
    };


    const { DetectionResult, loading4, error4, refetch: sampleResultRefetch } = UseApi({
        url: `SampleRequestedTestMethod/DetectionResult/${id}`,
        method: "PUT",
        autoFetch: false,
    });
    const handleSubmit = async (e) => {
        e.preventDefault();

        const dto = {
            result2: Result,
            testedAt: time,
            testedBy: TBy
        };


        const response = await sampleResultRefetch(dto);



        if (!response || response.error) {
            alert(JSON.stringify(response.error));
            return;
        }


        alert(JSON.stringify(response) || "Welcome!");


    };

    return (
        <div className="">
            <SideNav/>
            <div className=" ">


                {sampleTestDetails && (
                    <div className="row container m-auto">
                        <h3 className="text-center m-3 text-decoration-underline title">
                            {sampleTestDetails.sampleDetailsBYTestsDto.sampleDesc}
                        </h3>
                        <p className="col-4">
                            <span className="p-3">Date of Receving :</span>
                            {sampleTestDetails.sampleDetailsBYTestsDto.createdAt}
                        </p>
                        <p className="col-4">
                            <span className="p-3">Sample Code :</span>
                            {sampleTestDetails.sampleDetailsBYTestsDto.sampleCode}
                        </p>
                        <p className="col-4">
                            <span className="p-3">Sample Type :</span>
                            {sampleTestDetails.sampleDetailsBYTestsDto.typeDto.typeName}
                        </p>
                        <p className="col-4">
                            <span className="p-3">Sample Category :</span>
                            {sampleTestDetails.sampleDetailsBYTestsDto.categoryDto.categoryDesc}
                        </p>





                        <table class="table container my-5 rounded-4">
                            <thead>
                                <tr className=" border border-5 text-center">
                                    <th scope="col">#</th>
                                    <th scope="col">Step Name</th>
                                    <th scope="col">Date</th>
                                    <th scope="col">Time</th>
                                    <th scope="col">Tested By</th>
                                    <th scope="col">Blank</th>
                                    <th scope="col">Positive Control</th>
                                    <th scope="col">Negative Control</th>
                                    <th scope="col">Result</th>
                                    <th scope="col"></th>
                                </tr>
                            </thead>
                            <tbody>
                                {Steps?.map((s, index) => {
                                    const stepCode = s.detectionStepsDto.stepCode;

                                    const ts = SampleRequestedTestDetectionSteps?.find(
                                        x => x.stepCode === stepCode
                                    );

                                    return (
                                        <tr key={stepCode} className="rounded-4 border border-5 text-center">
                                            <th scope="row">{index + 1}</th>

                                            <td>{s.detectionStepsDto?.stepName}</td>

                                            <td>
                                                <input
                                                    className="form-control"
                                                    type="date"
                                                    value={rowsData[stepCode]?.data || ts?.data || new Date().toISOString().slice(0, 10)}
                                                    onChange={(e) =>
                                                        setRowsData(prev => ({
                                                            ...prev,
                                                            [stepCode]: {
                                                                ...prev[stepCode],
                                                                data: e.target.value
                                                            }
                                                        }))
                                                    }
                                                />
                                            </td>

                                            <td>
                                                <input
                                                    className="form-control"
                                                    type="time"
                                                    value={rowsData[stepCode]?.time || ts?.time || new Date().toTimeString().slice(0, 5)}
                                                    onChange={(e) =>
                                                        setRowsData(prev => ({
                                                            ...prev,
                                                            [stepCode]: {
                                                                ...prev[stepCode],
                                                                time: e.target.value
                                                            }
                                                        }))
                                                    }
                                                />
                                            </td>

                                            <td>
                                                <input
                                                    className="form-control"
                                                    type="text"
                                                    value={rowsData[stepCode]?.testedBy || ts?.stepBy || ""}
                                                    onChange={(e) =>
                                                        setRowsData(prev => ({
                                                            ...prev,
                                                            [stepCode]: {
                                                                ...prev[stepCode],
                                                                testedBy: e.target.value
                                                            }
                                                        }))
                                                    }
                                                />
                                            </td>
                                            <td>
                                                <label className="rocker rocker-small mt-0">
                                                    <input
                                                        type="checkbox"
                                                        checked={rowsData[stepCode]?.blank ?? ts?.blank ?? false}
                                                        onChange={(e) =>
                                                            setRowsData(prev => ({
                                                                ...prev,
                                                                [stepCode]: {
                                                                    ...prev[stepCode],
                                                                    blank: e.target.checked
                                                                }
                                                            }))
                                                        }
                                                    />
                                                    {s.detectionStepsDto.positiveResults === "NA" ?

                                                        <span className="switch-left">yes</span>
                                                        :
                                                        <span className="switch-left">+ve</span>

                                                    }
                                                    {s.detectionStepsDto.positiveResults === "NA" ?
                                                        <span className="switch-right">no</span>
                                                        :
                                                        <span className="switch-right">-ve</span>
                                                    }
                                                </label>
                                            </td>
                                            <td>
                                                <label className="rocker rocker-small mt-0">
                                                    <input
                                                        type="checkbox"
                                                        checked={rowsData[stepCode]?.positiveControl ?? ts?.positiveControl ?? false}
                                                        onChange={(e) =>
                                                            setRowsData(prev => ({
                                                                ...prev,
                                                                [stepCode]: {
                                                                    ...prev[stepCode],
                                                                    positiveControl: e.target.checked
                                                                }
                                                            }))
                                                        }
                                                    />
                                                    {s.detectionStepsDto.positiveResults === "NA" ?

                                                        <span className="switch-left">yes</span>
                                                        :
                                                        <span className="switch-left">+ve</span>

                                                    }
                                                    {s.detectionStepsDto.positiveResults === "NA" ?
                                                        <span className="switch-right">no</span>
                                                        :
                                                        <span className="switch-right">-ve</span>
                                                    }
                                                </label>
                                            </td>
                                            <td>
                                                <label className="rocker rocker-small mt-0">
                                                    <input
                                                        type="checkbox"
                                                        checked={rowsData[stepCode]?.negativeControl ?? ts?.negativeControl ?? false}
                                                        onChange={(e) =>
                                                            setRowsData(prev => ({
                                                                ...prev,
                                                                [stepCode]: {
                                                                    ...prev[stepCode],
                                                                    negativeControl: e.target.checked
                                                                }
                                                            }))
                                                        }
                                                    />
                                                    {s.detectionStepsDto.positiveResults === "NA" ?

                                                        <span className="switch-left">yes</span>
                                                        :
                                                        <span className="switch-left">+ve</span>

                                                    }
                                                    {s.detectionStepsDto.positiveResults === "NA" ?
                                                        <span className="switch-right">no</span>
                                                        :
                                                        <span className="switch-right">-ve</span>
                                                    }
                                                </label>
                                            </td>

                                            <td>
                                                <label className="rocker rocker-small mt-0">
                                                    <input
                                                        type="checkbox"
                                                        checked={rowsData[stepCode]?.result ?? ts?.result ?? false}
                                                        onChange={(e) =>
                                                            setRowsData(prev => ({
                                                                ...prev,
                                                                [stepCode]: {
                                                                    ...prev[stepCode],
                                                                    result: e.target.checked
                                                                }
                                                            }))
                                                        }
                                                    />
                                                    {s.detectionStepsDto.positiveResults === "NA" ?

                                                        <span className="switch-left">yes</span>
                                                        :
                                                        <span className="switch-left">+ve</span>

                                                    }
                                                    {s.detectionStepsDto.positiveResults === "NA" ?
                                                        <span className="switch-right">no</span>
                                                        :
                                                        <span className="switch-right">-ve</span>
                                                    }
                                                </label>
                                                <p>
                                                    {
                                                        (rowsData[stepCode]?.result ?? false)
                                                            ? s.detectionStepsDto.positiveResults
                                                            : s.detectionStepsDto.negativeResults
                                                    }
                                                </p>
                                            </td>

                                            <td>
                                                <button
                                                    onClick={() => handleClick(stepCode)}
                                                    className="btn w-75"
                                                    type="button"
                                                >
                                                    Add / Update
                                                </button>
                                            </td>
                                        </tr>
                                    );
                                })}


                            </tbody>
                        </table>

                        <div className="row container m-auto mt-5">
                            <div class="col-1 mb-3">
                                <span class="input-group-text" id="volume">volume</span>
                                <input type="text"
                                    value={sampleTestDetails.unit}
                                    class="form-control" aria-label="volume" aria-describedby="volume" readonly />
                            </div>
                            <div class="col-3 mb-3">
                                <span class="input-group-text" id="time">Tested At</span>
                                <input
                                    class="form-control"
                                    type="datetime-local"
                                    value={time}
                                    onChange={(e) =>
                                        setTime(e.target.value)
                                    }
                                />
                            </div>
                            <div class="col-3 mb-3">
                                <span class="input-group-text" id="testby">Tested By</span>
                                <input type="text"
                                    value={TBy}
                                    onChange={(e) => setTBy(e.target.value)}
                                    class="form-control" placeholder="testby" aria-label="testby" aria-describedby="testby" />
                            </div>
                            <div class="col-2 mb-3 text-center">
                                <span class="input-group-text" id="Result">Final Result</span>
                                <label class="rocker rocker-small">
                                    <input type="checkbox" onChange={(e) => setResult(e.target.checked)} />
                                    <span class="switch-left">+VE</span>
                                    <span class="switch-right">-ve</span>
                                </label>
                            </div>
                            <div class="col-3 mb-3">
                                <button onClick={handleSubmit} className="btn py-5" type="button">
                                    add final Rusult
                                </button>
                            </div>
                        </div>
                    </div>

                )}
            </div>
        </div>
    )

}
export default MethodPageDetection