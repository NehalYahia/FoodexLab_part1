
import UseApi from "../../hooks/main";
import React, { useState } from "react";
import { useParams } from "react-router-dom";
import AddStep from "../Components/addRequestedTest/AddStep";
import AddMethod from "../Components/addRequestedTest/AddMethod";
import Navbar from "../Components/Navbar";
import SideNav from "../Components/SideNav";


function RequestedTestPage() {

    const { id } = useParams();

    const { data: request, loading1, error1, refetch } = UseApi({
        url: `RequestedTest/${id}`,
    });
    //Sفلتر العناصر المكررة
    const uniqueItems = request?.testRequestedMethodDto?.filter((item, index, self) =>
        index === self.findIndex((t) => t.testCategoriesDto.testCode === item.testCategoriesDto.testCode)
    );



    return (
        <div className="">
            <SideNav/>
            <div className="container w-75 m-auto">
                <h3 className="title" > {request?.requestTestName}</h3>
                <p> {request?.equation}</p>
                <table className="table border">
                    <thead>
                        <tr>
                            <th scope="col">#</th>
                            <th scope="col">Classification Code</th>
                            <th scope="col">Classification Name</th>
                        </tr>
                    </thead>
                    <tbody>
                        {uniqueItems?.map((item, index) => (
                            <tr key={item.testCategoriesDto.testCode}>
                                <td>{index + 1}</td>
                                <td>{item.testCategoriesDto.testCode}</td>
                                <td>{item.testCategoriesDto.testName}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
                <div className="row my-5">
                    <div className={`${request?.equation.toLowerCase().includes("detection") ? "col-lg-6 col-md-12" : "invisible col-0"}`}>
                        <AddStep onSuccess={refetch} />
                    </div>
                    <div className={`${request?.equation.toLowerCase().includes("detection") ? "col-lg-6 col-md-12" : "col-lg-12 col-md-12 "}`}>
                        <AddMethod onSuccess={refetch} request={request} />
                    </div>
                </div>
                <div className="row">
                    <div className={`${request?.equation.toLowerCase().includes("detection") ? "col-lg-6 col-md-12 " :"invisible col-0" }`}>
                        <table className="table border">
                            <thead>
                                <tr>
                                    <th scope="col">#</th>
                                    <th scope="col">Step Code</th>
                                    <th scope="col">Step Name</th>
                                </tr>
                            </thead>
                            <tbody>
                                {request?.requestedTestDetectionStepsDto?.map((item, index) => (
                                    <tr key={index}>
                                        <td>{index + 1}</td>
                                        <td>{item.detectionStepsDto.stepCode}</td>
                                        <td>{item.detectionStepsDto.stepName}</td>
                                    </tr>
                                ))}

                            </tbody>
                        </table>
                    </div>
                <div className={`${request?.equation.toLowerCase().includes("detection") ? "col-lg-6 col-md-12" : "col-lg-12 col-md-12"}`}>
                        <table className="table border ">
                            <thead>
                                <tr>
                                    <th scope="col">#</th>
                                    <th scope="col">Method Code</th>
                                    <th scope="col">Method Name</th>
                                </tr>
                            </thead>
                            <tbody>
                                {request?.testRequestedMethodDto?.map((item, index) => (
                                    <tr key={index}>
                                        <td>{index + 1}</td>
                                        <td>{item.methodDto.methodCode}</td>
                                        <td>{item.methodDto.methodName}</td>

                                    </tr>
                                ))}

                            </tbody>
                        </table>
                    </div>
                </div>
                {/*))}*/}
            </div>
        </div>
    )


}
export default RequestedTestPage