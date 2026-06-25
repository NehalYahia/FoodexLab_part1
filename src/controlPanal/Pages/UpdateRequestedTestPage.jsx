import Navbar from "../Components/Navbar";
import UseApi from "../../hooks/main";
import React, { useState } from "react";
import { useParams } from "react-router-dom";
import Methods from "../Components/AllRequestedTests/Methods";
import Steps from "../Components/AllRequestedTests/Steps";
import SideNav from "../Components/SideNav";

function UpdateRequestedTests() {

    const { id } = useParams();
    
    const { data: request, loading1, error1, refetch } = UseApi({
        url: `RequestedTest/${id}`,
    });


    return (
    
        <div className="">
            <SideNav/>
            <div className="row container m-auto text-center">
                <div className="col-12 ">
                    <Methods methods={request?.testRequestedMethodDto } />
                </div>
                <div className={`${request?.equation?.toLowerCase().includes("detection") ?"visible col-12 ": "invisible" }`}>
                    <Steps steps={request?.requestedTestDetectionStepsDto} />
                </div>
            </div>

            </div>
    
    )
}

export default UpdateRequestedTests