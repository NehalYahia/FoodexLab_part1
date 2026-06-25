import React, { useState } from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { UseApi } from "../../../hooks/main";



function Methods({ methods }) {

    const [rowsData, setRowsData] = useState({});
    const { Test, loading5, error5, refetch } = UseApi({
        url: `Method/Update`,
        method: "PUT",
        autoFetch: false,
    });



    const handleClick = async (code) => {
        const editedRow = rowsData[code];

        const originalRow = methods.find(
            x => x.methodDto.methodCode === code
        )?.methodDto;


        const payload = {
            methodCode: code,
            methodName: editedRow?.methodName ?? originalRow.methodName,
            time: editedRow?.time ?? originalRow.time,
            time2: editedRow?.time2 ?? originalRow.time2,
            createdAt: originalRow.createdAt,
            createdBy: originalRow.createdBy,
            updatedAt: new Date().toISOString().slice(0, 16),
            updatedBy: "m,"
        };

        const response = await refetch(payload);

        if (response?.error) {
            alert(response.error.message);
        } else {
            alert("Updated successfully ✅");


        }
        console.log(response);
        console.log(rowsData);
        console.log(payload);




    };



    return (

        <table className="table border ">
            <thead>
                <tr>
                    <th scope="col">#</th>
                    <th scope="col">Method Name</th>
                    <th scope="col">Time for negative result</th>
                    <th scope="col">Time for positive result</th>
                    <th scope="col"></th>
                    <th scope="col"></th>
                </tr>
            </thead>
            <tbody>
                {methods?.map((item, index) => (
                    <tr key={index}>
                        <td>{index + 1}</td>
                        <td>
                            <input
                                className="form-control"
                                type="text"
                                value={rowsData[item.methodDto.methodCode]?.methodName || item?.methodDto.methodName || ""}
                                onChange={(e) =>
                                    setRowsData(prev => ({
                                        ...prev,
                                        [item.methodDto.methodCode]: {
                                            ...prev[item.methodDto.methodCode],
                                            methodName: e.target.value
                                        }
                                    }))
                                }
                            />

                        </td>
                        <td>
                            <input type="number"
                                class="form-control"
                                placeholder="time for negative result"
                                value={rowsData[item.methodDto.methodCode]?.time || item?.methodDto.time || ""}
                                aria-describedby="basic-addon1"
                                onChange={(e) =>
                                    setRowsData(prev => ({
                                        ...prev,
                                        [item.methodDto.methodCode]: {
                                            ...prev[item.methodDto.methodCode],
                                            time: e.target.value
                                        }
                                    }))
                                }
                             />
                        </td>
                        <td>
                            <input type="number"
                                class="form-control"
                                placeholder="time for positive result"
                                value={rowsData[item.methodDto.methodCode]?.time2 || item?.methodDto.time2 || ""}
                                aria-describedby="basic-addon1"
                                onChange={(e) =>
                                    setRowsData(prev => ({
                                        ...prev,
                                        [item.methodDto.methodCode]: {
                                            ...prev[item.methodDto.methodCode],
                                            time2: e.target.value
                                        }
                                    }))
                                }
                            />
                        </td>
                        <td>
                            <button
                                onClick={() => handleClick(item.methodDto.methodCode)}
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
                                data-bs-toggle="modal" data-bs-target={`#${item.methodDto.methodCode}`}
                            >

                                <FontAwesomeIcon icon="fa-solid fa-trash" />
                            </button>
                            <div class="modal fade" id={item.methodDto.methodCode} tabindex="-1" aria-labelledby="deleteModalLabel" aria-hidden="true">
                                <div class="modal-dialog">
                                    <div class="modal-content">
                                        <div class="modal-header">
                                            <h1 class="modal-title fs-5" id="exampleModalLabel">Delete Alert</h1>
                                            <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                                        </div>
                                        <div class="modal-body">
                                            Are you sure you want to delete this test ({rowsData[item.methodDto.methodCode]?.methodName || item?.methodDto.methodName || ""})?
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
export default Methods