import Navbar from "../Components/Navbar";
import UseApi from "../../hooks/main";
import { useParams } from "react-router-dom";
import jsPDF from "jspdf";
import html2canvas from "html2canvas";
import SideNav from "../Components/SideNav";


function Certifecate() {
    const { id } = useParams();   // 🔥 GET ID from URL

    const { data: sampleTestDetails, loading1, error1, refetch1 } = UseApi({
        url: `Sample/${id}`,

    });




    const generatePDF = () => {
        const input = document.getElementById("pdfDiv"); // العنصر اللي عايزة تحولي
        html2canvas(input).then((canvas) => {
            const imgData = canvas.toDataURL("image/png");
            const pdf = new jsPDF("1", "mm", "a4");
            const imgProps = pdf.getImageProperties(imgData);
            const pdfWidth = pdf.internal.pageSize.getWidth();
            const pdfHeight = (imgProps.height * pdfWidth) / imgProps.width;
            pdf.addImage(imgData, "PNG", 0, 0, pdfWidth, pdfHeight);
            pdf.save("download.pdf");
        });
    };


    return (

        <div className="">
            <SideNav/>
            <div className="container m-5 bg-white" id="pdfDiv">
                <div className="row p-4">
                    <img src="/imgs/logo.png"
                        alt="Logo" class="col-3" alt="logo" />
                    <p class="col-7"></p>
                    <img class="col-1" src="/imgs/egac.png" alt="egac" />
                    <img class="col-1" src="/imgs/ilac.png" alt="ilac" />


                </div>
                <div className="row bg text-white py-2">
                    <h1 className="col-6 text-center">
                        Test Report
                    </h1>
                    <p className="col-6 text-center fs-5">
                        <span className="p-3">Issue Date :</span>
                        {new Date().toISOString().slice(0, 10)}
                    </p>

                </div>
                {sampleTestDetails && (
                    <div className="row container m-auto px-3 pt-5">

                        <p className="col-6">
                            <span className="p-3">Certificate No :</span>
                            {sampleTestDetails.certCode}
                        </p>
                        <p className="col-6">
                            <span className="p-3">Sample Code :</span>
                            {sampleTestDetails.sampleCode}
                        </p>
                        <p className="col-6">
                            <span className="p-3">Customer Name :</span>
                            {sampleTestDetails.client.clientName}
                        </p>
                        <p className="col-6">
                            <span className="p-3">Sample Description :</span>
                            {sampleTestDetails.sampleDesc}
                        </p>
                        <p className="col-6">
                            <span className="p-3">Customer Address :</span>
                            {sampleTestDetails.client.address}
                        </p>

                        <p className="col-6">
                            <span className="p-3">Date of Receving :</span>
                            {sampleTestDetails.createdAt}
                        </p>
                        <table className="table table-hover table-bordered rounded p-5 my-5 ">
                            <thead>
                                <tr className="">
                                    <th scope="col">#</th>
                                    <th scope="col">Test name </th>
                                    <th scope="col">Result</th>
                                    <th scope="col">Unit</th>
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

                                        <td>{item.unit}</td>

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
                        <p>Environmental conditions: Temperature ............C</p>
                        {sampleTestDetails.conformityStatement ?
                            <p>The evaluation and conformity statement according to {sampleTestDetails.reference}.</p>
                            : ""}
                        <p>This Test Certificate Shall not be Reproduced Without Written Approval From The Lab.</p>
                        <p>The Results Represent The Sample Only.</p>

                    </div>
                )}
                <div className="bg">
                    <br></br>
                </div>
                <div className="row p-2">
                    <div className="col-4 text-center">
                        <p>Prepared by</p>
                        <p>Microbiology Supervisor </p>
                        <p>........................</p>
                    </div>
                    <div className="col-4 text-center">
                        <p>Reviewed by</p>
                        <p>Microbiology Supervisor </p>
                        <p>........................</p>
                    </div>
                    <div className="col-4 text-center">
                        <p>Approved by</p>
                        <p>Microbiology Technical Manager </p>
                        <p>........................</p>
                    </div>
                </div>
                <div className="row bg p-2">
                    <p className="fs-5">
                        <span className="fw-bold">Address :  </span>
                        Fawzy Street,Building No 4,ground floor ,Saraya El-Qobba.
                    </p>
                    <p className="fs-5">
                        <span className="fw-bold">Contact :  </span>
                        01061201408 / Mohamed.Khalifa@foodexlabs.com
                    </p>
                </div>


            </div>

            <button className="bg p-3 mx-5 text-white rounded border" onClick={generatePDF}>Download PDF</button>

        </div >

    )

}
export default Certifecate;