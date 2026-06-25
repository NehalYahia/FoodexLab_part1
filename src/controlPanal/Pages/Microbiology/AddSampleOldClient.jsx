import Responsible from "../../Components/addSample/Responsible";
import SampleInfo from "../../Components/addSample/SampleInfo.1";
import SampleTests from "../../Components/addSample/SampleTests";
import Test_Report_Requirment from "../../Components/addSample/Test_Report_Requirment";
import React, { use, useState } from "react";
import UseApi from "../../../hooks/main";
import SideNav from "../../Components/SideNav";
import OldClientContent from "../../Components/addSample/OldClientContent";
import { Link } from 'react-router-dom';


function AddSampleOldClient() {
    const [activeBtn, setActiveBtn] = useState(false);
    const [shareData, setShareData] = useState({});
    const [childData, setChildData] = useState({});
    const [sampleTypedata, setSampleTypedata] = useState();
    const { sample, loading, error, refetch } = UseApi({
        url: "Client/add-oldclient-sample",
        method: "POST",
        autoFetch: false,
    });


    const SampleTypeDataChange = (newData) => {
        setSampleTypedata(newData);
    };

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
            setActiveBtn(true);
            console.log("Server Response:", response);
        }
    }

    return (
        <div className="body">
            <SideNav />
            <h2 className="text-center title"> Add New Sample</h2>
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
                        <button className=" collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#Responsible" aria-expanded="false" aria-controls="Responsible">
                            Responsible
                        </button>
                    </p>
                    <p className="accordion-header">
                        <button className=" collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#SampleTests" aria-expanded="false" aria-controls="SampleTests">
                            Sample Tests
                        </button>
                    </p>
                    <p className="accordion-header">
                        <button className=" collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#Test_Report_Requirment" aria-expanded="false" aria-controls="Test_Report_Requirment">
                            Test Report Requirment
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
                    <SampleInfo onDataChange={SampleTypeDataChange} onDataSend={handleDataFromChild} shareSampleLab={setShareData} />
                    <Responsible onDataSend={handleDataFromChild} />
                    <SampleTests sampleType={sampleTypedata} onDataSend={handleDataFromChild} sampleLab={shareData} />
                    <Test_Report_Requirment onDataSend={handleDataFromChild} />
                    <div id="Add_sample" class="accordion-collapse collapse pb-5" data-bs-parent="#accordionExample">
                        <div class="accordion-body mb-5 pb-5">
                            <button className="btn" onClick={sendSampleData}>Add Sample</button>
                        </div>
                        <div className="wrap mt-5 pt-5"
                            style={{
                                pointerEvents: activeBtn ? "auto" : "none",
                                opacity: activeBtn ? 1 : 0.5
                            }}>

                            <Link className="Ch_btn text-decoration-none" to="/addSample/Ch/oldClient">Chemistry Tests</Link>
                        </div>
                    </div>
                    
                </div>

            </div>
        </div>
    )
}
export default AddSampleOldClient;