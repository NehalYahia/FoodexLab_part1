
import { UseApi } from "../../../hooks/main";
import React, { useState } from "react";
import { useSelector } from "react-redux";


function OldClientContent({ onDataSend }) {
    const ClientId = useSelector((state) => state.sampleInfo.clintId);
    const [client, setClient] = useState(ClientId);
    const { data: Clients, loading, error } = UseApi({
        url: "Client/names",
    });

    const handleClick = (e) => {
        e.preventDefault();

        const dataToSend = {
            clientId: client
        };
        onDataSend(dataToSend); // Call the parent's callback with data
    };


    if (loading) return <p>Loading Clients...</p>;
    if (error) return <p style={{ color: "red" }}>{error}</p>;
    return (
        <div className="accordion-collapse collapse show mb-3" id="ClientContent" data-bs-parent="#accordionExample">
            <label for="Clients" class="form-label">Clients</label>
            <select class="form-select mb-3" value={client}
                onChange={(e) => setClient(e.target.value)} aria-label="Default select example">
                <option selected>Clients</option>
                {Clients?.map((c) => (
                    <option key={c.id} value={c.id}>{c.clientName}</option>
                ))}
            </select>

            <p className="accordion-header">
                <button onClick={handleClick} className=" collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#SampleInfo" aria-expanded="false" aria-controls="SampleInfo">
                    Next
                </button>
            </p>
        </div>


    )
}
export default OldClientContent