
import SideNav from "../../Components/SideNav";
import React, { useState } from "react";
import UseApi from "../../../hooks/main";
import ClientContent from "../../Components/addSample/ClientContent";
import Ch_SampleInfo from "../../Components/addSample/Ch_SampleInfo";
import Ch_SampleTests from "../../Components/addSample/Ch_SampleTests";
import OldClientContent from "../../Components/addSample/OldClientContent";



function AddCh_TestsForOldClient() {


    const [childData, setChildData] = useState({});
    const { sample, loading, error, refetch } = UseApi({
        url: "Client/add-client-sample",
        method: "POST",
        autoFetch: false,
    });


    const handleDataFromChild = (data) => {
        setChildData((prevData) => {
            const merged = { ...prevData, ...data };
            console.log("🔹 Merged Data:", merged);
            return merged;
        });
    };


    const sendSampleData = async (e) => {
        e.preventDefault();
        const response = await refetch(childData);
        console.log(childData);

        if (response?.error) {
            alert("Error adding sample: " + response.error);
        } else {
            alert("Sample added successfully!");
            console.log("Server Response:", response);
        }
    }
    return (
        <div className="body">
            <SideNav />
            <h1 className="text-center title"> Chemistry Tests</h1>
            <h2 className="text-center title"> Add New Sample For Old Client </h2>


            <div className="row container  mx-auto my-4" id="accordionExample">
                <div className="col-3">
                    <p className="accordion-header">
                        <button className="" type="button" data-bs-toggle="collapse" data-bs-target="#ClientContent" aria-expanded="true" aria-controls="ClientContent">
                            Client Content
                        </button>
                    </p>
                    <p className="accordion-header">
                        <button className=" collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#SampleInfo" aria-expanded="false" aria-controls="SampleInfo">
                            Sample Information
                        </button>
                    </p>
                    <p className="accordion-header">
                        <button className=" collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#SampleTests" aria-expanded="false" aria-controls="SampleTests">
                            Sample Tests
                        </button>
                    </p>
                    <p className="accordion-header">
                        <button className=" collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#Add_sample" aria-expanded="false" aria-controls="Add_sample">
                            Add Sample
                        </button>
                    </p>

                </div>
                <div className="col-9">

                    <OldClientContent onDataSend={handleDataFromChild} />
                    <Ch_SampleInfo onDataSend={handleDataFromChild} />
                    <Ch_SampleTests />
                  
                    <div id="Add_sample" class="accordion-collapse collapse pb-5" data-bs-parent="#accordionExample">
                        <div class="accordion-body mb-5 pb-5">
                            <button className="btn" onClick={sendSampleData}>Add Sample</button>
                        </div>
                      
                    </div>

                </div>

            </div>
        </div>
    )

}
export default AddCh_TestsForOldClient;