import Navbar from "../Components/Navbar";
import UseApi from "../../hooks/main";
import { useParams } from "react-router-dom";
import React, { useState } from "react";
import SideNav from "../Components/SideNav";




function ReviewSample() {
    const { id } = useParams();   // 🔥 GET ID from URL

    const { data: sampleTestDetails, loading1, error1, refetch1 } = UseApi({
        url: `Sample/${id}`,

    });
    const [Approve, setApprove] = useState(false);
    const [ApproveAt, setApproveAt] = useState();
    const [ApproveBy, setApproveBy] = useState("");

    const { sample, loading5, error5, refetch } = UseApi({
        url: `Sample/Approve/${id}`,
        method: "PUT",
        autoFetch: false,
    });

    const handleClick = async (e) => {
        e.preventDefault();

        const response = await refetch({
            approveTime: ApproveAt,
            approveBy: ApproveBy,
            approve: Approve,
            id: id
        })

        if (response?.error) {
            alert(response.error.message);
        } else {
            alert(response?.message || response?.data?.message || "add Approved successfully");
        }

    }

    return (
        <div className="">
            <SideNav/>
            <div className="container m-5 bg-white" >
           
                {sampleTestDetails && (
                    <div className="row container m-auto px-3 pt-5">
                        <h2 className="text-center title mb-5">Review {sampleTestDetails.sampleDesc} Sample</h2>
                        <p className="col-6 text-center">
                            <span className="p-3">Customer Name :</span>
                            {sampleTestDetails.client.clientName}
                        </p>
                        {/*<p className="col-4 text-center">*/}
                        {/*    <span className="p-3">Sample Description :</span>*/}
                        {/*    {sampleTestDetails.sampleDesc}*/}
                        {/*</p>*/}

                        <p className="col-6 text-center">
                            <span className="p-3">Date of Receving :</span>
                            {new Date(sampleTestDetails.createdAt).toLocaleString()}
                        </p>
                        <table className="table table-hover table-bordered rounded p-5 my-5 ">
                            <thead>
                                <tr className="">
                                    <th scope="col">#</th>
                                    <th scope="col">Test name </th>
                                    <th scope="col">Result</th>
                                    <th scope="col">Tested By</th>
                                    <th scope="col">Tested At</th>
                                    <th scope="col">Test method</th>
                                    {sampleTestDetails.uncertaintyValue ?
                                        <th scope="col">Uncertainty</th>
                                        : ""}
                                    {sampleTestDetails.conformityStatement ?
                                        <th scope="col">Confirmed/Not</th>
                                        : ""}

                                </tr>
                            </thead>
                            <tbody>
                                {sampleTestDetails.sampleTestsResults?.map((item, index) => (
                                    <tr key={index}>
                                        <th scope="row">{index + 1}</th>

                                        <td>{item.req?.name}</td>

                                        <td>
                                            {item.result ? item.result : item.result2 ? "Detected " : "Not detected"}
                                        </td>

                                        <td>
                                            {item.testedBy}
                                        </td>

                                        <td>
                                            {item.testedAt}
                                        </td>

                                        <td>{item.method?.name}</td>
                                        {sampleTestDetails.uncertaintyValue ?
                                            <td>{item.u_expended}</td>
                                            : ""}
                                        {sampleTestDetails.conformityStatement ?
                                            <td>{sampleTestDetails.conformityStatement ? "Confirmed" : "Not Confirmed"}</td>
                                            : ""}

                                    </tr>
                                ))}
                            </tbody>

                        </table>


                    </div>
                )}
                <div className="bg">
                    <br></br>
                </div>
                <div className="row p-2">
                    <div className="col-4 text-center">
                        <p>Approved by</p>
                        <input type="text"
                            value={ApproveBy}
                            onChange={(e) => setApproveBy(e.target.value)}
                            class="form-control" placeholder="approveby" aria-label="approveby" aria-describedby="approveby" />
                    </div>
                    <div className="col-4 text-center">
                        <p>Approved At</p>
                        <input
                            class="form-control"
                            type="datetime-local"
                            value={ApproveAt}
                            onChange={(e) =>
                                setApproveAt(e.target.value)
                            }
                        />
                    </div>
                    <div className="col-4 text-center">
                        <p>Approved </p>
                        <label className="checkbox_container">
                            <input
                                type="checkbox"
                                onChange={(e) => setApprove(e.target.checked)}
                          />
                            <div className="checkmark"></div>
                        </label>
                    </div>
                </div>
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


        </div >

    )
}

export default ReviewSample