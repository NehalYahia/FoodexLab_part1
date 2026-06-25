
import React, { useState } from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { UseApi } from "../../../hooks/main";


function Steps({ steps }) {
    const [rowsData, setRowsData] = useState({});
    const { Test, loading5, error5, refetch } = UseApi({
        url: `DetectionSteps/Update`,
        method: "PUT",
        autoFetch: false,
    });



    const handleClick = async (code) => {
        const editedRow = rowsData[code];

        const originalRow = steps.find(
            x => x.detectionStepsDto.stepCode === code
        )?.detectionStepsDto;


        const payload = {
            stepCode: code,
            stepName: editedRow?.stepName ?? originalRow.stepName,
            positiveResults: editedRow?.positiveResults ?? originalRow.positiveResults,

            negativeResults: editedRow?.negativeResults ?? originalRow.negativeResults,
            createdAt: originalRow.createdAt,
            createdBy: originalRow.createdBy,
            updatedAt: new Date().toISOString().slice(0, 16),
            updatedBy: "m,"
        };

        const response = await refetch(payload);

        if (response?.error) {
            alert(response.error.message);
        } else {
            alert("Updated successfully ");


        }
        console.log(response);
        console.log(rowsData);
        console.log(payload);




    };

    return (

        <table className="table border">
            <thead>
                <tr>
                    <th scope="col">#</th>
                    <th scope="col">Step Name</th>
                    <th scope="col">positive Results</th>
                    <th scope="col">negative Results</th>
                    <th scope="col"></th>
                    <th scope="col"></th>
                </tr>
            </thead>
            <tbody>
                {steps?.map((item, index) => (
                    <tr key={index}>
                        <td>{index + 1}</td>
                        <td>
                            <input
                                className="form-control"
                                type="text"
                                value={rowsData[item.detectionStepsDto.stepCode]?.stepName || item?.detectionStepsDto.stepName || ""}
                                onChange={(e) =>
                                    setRowsData(prev => ({
                                        ...prev,
                                        [item.detectionStepsDto.stepCode]: {
                                            ...prev[item.detectionStepsDto.stepCode],
                                            stepName: e.target.value
                                        }
                                    }))
                                }
                            />

                        </td>
                        <td>
                            <input
                                className="form-control"
                                type="text"
                                value={rowsData[item.detectionStepsDto.stepCode]?.positiveResults || item?.detectionStepsDto.positiveResults || ""}
                                onChange={(e) =>
                                    setRowsData(prev => ({
                                        ...prev,
                                        [item.detectionStepsDto.stepCode]: {
                                            ...prev[item.detectionStepsDto.stepCode],
                                            positiveResults: e.target.value
                                        }
                                    }))
                                }
                            />

                        </td>
                        <td>
                            <input
                                className="form-control"
                                type="text"
                                value={rowsData[item.detectionStepsDto.stepCode]?.negativeResults || item?.detectionStepsDto.negativeResults || ""}
                                onChange={(e) =>
                                    setRowsData(prev => ({
                                        ...prev,
                                        [item.detectionStepsDto.stepCode]: {
                                            ...prev[item.detectionStepsDto.stepCode],
                                            negativeResults: e.target.value
                                        }
                                    }))
                                }
                            />

                        </td>
                        <td>
                            <button
                                onClick={() => handleClick(item.detectionStepsDto.stepCode)}
                                className="bg-warning text-white fw-bold rounded border p-2 w-75 "
                                type="button"
                            >
                                Update
                            </button>
                        </td>
                        <td>
                            <button
                                /*onClick={() => handleClick(id)}*/
                                className="btn p-2 w-75"
                                type="button"
                                data-bs-toggle="modal" data-bs-target={`#${item.detectionStepsDto.stepCode}`}
                            >

                                <FontAwesomeIcon icon="fa-solid fa-trash" />
                            </button>
                            <div class="modal fade" id={item.detectionStepsDto.stepCode} tabindex="-1" aria-labelledby="deleteModalLabel" aria-hidden="true">
                                <div class="modal-dialog">
                                    <div class="modal-content">
                                        <div class="modal-header">
                                            <h1 class="modal-title fs-5" id="exampleModalLabel">Delete Alert</h1>
                                            <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                                        </div>
                                        <div class="modal-body">
                                            Are you sure you want to delete this test ({rowsData[item.detectionStepsDto.stepCode]?.stepName || item?.detectionStepsDto.stepName || ""})?
                                        </div>
                                        <div class="modal-footer">
                                            <button type="button" class="btn btn-secondary" >Delete</button>
                                            <button type="button" class="bg-secondary text-white border rounded p-2 w-100 " data-bs-dismiss="modal">Cancel</button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </td>
                    </tr>
                ))}

            </tbody>
        </table>
    )

}
export default Steps