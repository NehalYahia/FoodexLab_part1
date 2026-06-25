
import { UseApi } from "../../hooks/main";
import Navbar from "../Components/Navbar";
import { Link } from 'react-router-dom';
import React, { useState, useEffect } from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { useParams } from "react-router-dom";
import SideNav from "../Components/SideNav";


function AllRequestedTests() {
    const { id } = useParams();
    const [rowsData, setRowsData] = useState({});
    const types = [
        {
            id: 1,
            name: "confirmation"
        },
        {
            id: 2,
            name: "without confirmation"
        },
        {
            id: 3,
            name: "detection"
        },
    ];

    const { data: RequestedTest, loading, error } = UseApi({
        url: "RequestedTest/all",
    });

    const { Test, loading5, error5, refetch } = UseApi({
        url: `RequestedTest/Update`,
        method: "PUT",
        autoFetch: false,
    });



    const handleClick = async (code) => {
        const editedRow = rowsData[code]; 

        const originalRow = RequestedTest.find(
            x => x.requestedTestcode === code
        );

        const payload = {
            requestedTestcode: code,
            requestTestName: editedRow?.requestTestName ?? originalRow.requestTestName,
            equation: editedRow?.equation ?? originalRow.equation,
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
        //console.log(response);
        //console.log(rowsData);
        //console.log(payload);



       
    };



    return (
        <div className="body">
            <SideNav/>
            <h2 className="text-center m-3">All Tests </h2>
            <table className="table container my-5 text-center">
                <thead>
                    <tr className="">
                        <th scope="col">#</th>
                        <th scope="col">Test Name</th>
                        <th scope="col">Test Type</th>
                        <th scope="col"></th>
                        <th scope="col"></th>


                    </tr>
                </thead>
                <tbody >

                    {RequestedTest?.map((t, index) => (

                        <tr key={t.requestedTestcode} className="face face2">

                            <th scope="row">
                                <Link to={`/updateRequestedTest/${t.requestedTestcode}`} className="d-block row" >

                                    {index + 1}
                                </Link>
                            </th>

                            <td>
                                <input
                                    className="form-control"
                                    type="text"
                                    value={rowsData[t.requestedTestcode]?.requestTestName || t?.requestTestName || ""}
                                    onChange={(e) =>
                                        setRowsData(prev => ({
                                            ...prev,
                                            [t.requestedTestcode]: {
                                                ...prev[t.requestedTestcode],
                                                requestTestName: e.target.value
                                            }
                                        }))
                                    }
                                />

                            </td>
                            <td>
                                <select class="form-select " value={rowsData[t.requestedTestcode]?.equation || t?.equation || ""}
                                    onChange={(e) =>
                                        setRowsData(prev => ({
                                            ...prev,
                                            [t.requestedTestcode]: {
                                                ...prev[t.requestedTestcode],
                                                equation: e.target.value
                                            }
                                        }))
                                    }
                                    aria-label="Default select example">
                                    <option selected>no selection </option>
                                    {types?.map((d) => (
                                        <option key={d.id} value={d.name}>{d.name}</option>
                                    ))}
                                </select>
                              
                            </td>
                            <td>
                                
                                <button
                                    onClick={() => handleClick(t.requestedTestcode)}
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
                                    data-bs-toggle="modal" data-bs-target={`#${t.requestedTestcode}` }
                                >
                                  
                                    <FontAwesomeIcon icon="fa-solid fa-trash" />
                                </button>
                                <div class="modal fade" id={t.requestedTestcode} tabindex="-1" aria-labelledby="deleteModalLabel" aria-hidden="true">
                                    <div class="modal-dialog">
                                        <div class="modal-content">
                                            <div class="modal-header">
                                                <h1 class="modal-title fs-5" id="exampleModalLabel">Delete Alert</h1>
                                                <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                                            </div>
                                            <div class="modal-body">
                                                Are you sure you want to delete this test ({rowsData[t.requestedTestcode]?.requestTestName || t?.requestTestName || ""})?
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



        </div>

    )
}

export default AllRequestedTests;