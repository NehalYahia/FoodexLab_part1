
import SideNav from "../../Components/SideNav";
import React, { useState } from "react";
import UseApi from "../../../hooks/main";
import ClientContent from "../../Components/addSample/ClientContent";
import Ch_SampleInfo from "../../Components/addSample/Ch_SampleInfo";
import Ch_SampleTests from "../../Components/addSample/Ch_SampleTests";


function AddCh_TestsForNewClient() {


    const [childData, setChildData] = useState({});
    const { sample, loading, error, refetch } = UseApi({
        url: "Client/CH-add-NewClient-sample",
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
        const status = Number(response?.status);
        if (response?.error) {
            let msg = "Something went wrong";

            if (response.status === 400) {
                msg = "❌ Bad Request - Check your input data";
            } else if (response.status === 401) {
                msg = "🔐 Unauthorized - Login required";
            } else if (response.status === 500) {
                msg = "🔥 Server error - try again later";
            }

            alert(`${msg}\n Details: ${response.error}`);
        }
       
        }
    


    return (
        <div className="body">
            <SideNav />
            <h1 className="text-center title"> Chemistry Tests</h1>
            <h2 className="text-center title"> Add New Sample For New Client</h2>


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

                    <ClientContent onDataSend={handleDataFromChild} />
                    <Ch_SampleInfo onDataSend={handleDataFromChild} />
                    <Ch_SampleTests onDataSend={handleDataFromChild} />
                    {/*<SampleInfo onDataChange={SampleTypeDataChange} onDataSend={handleDataFromChild} shareSampleType={setSampleTypedata} />*/}
                    {/*<Responsible onDataSend={handleDataFromChild} />*/}
                    {/*<SampleTests sampleType={sampleTypedata} onDataSend={handleDataFromChild} />*/}
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
export default AddCh_TestsForNewClient;



