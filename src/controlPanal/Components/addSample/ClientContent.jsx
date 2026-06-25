import React, { useState } from "react";


function ClientContent({ onDataSend }) {

    const [clientName, setName] = useState("");
    const [contact, setContact] = useState("");
    const [address, setAddress] = useState("");
    const [email, setEmail] = useState("");
    const [phone, setPhone] = useState("");
    const handleClick = (e) => {
        e.preventDefault();

        const dataToSend = {
            clientName: clientName,
            contactName: contact,
            address: address,
            email: email,
            phone: phone, 
            userId : null
        };
        onDataSend(dataToSend); // Call the parent's callback with data
        };


    return (

        <div id="ClientContent" className="accordion-collapse collapse show" data-bs-parent="#accordionExample">
            <div className="accordion-body">
                <div class="mb-3">
                    <label for="CompanyName" class="form-label">Company Name</label>
                    <input
                        type="text"
                        className="form-control"
                        id="CompanyName"
                        value={clientName}
                        onChange={(e) => setName(e.target.value)}
                    />
                </div>
                <div class="mb-3">
                    <label for="ContactName" class="form-label">Contact Name</label>
                    <input type="text"
                        className="form-control"
                        id="ContactName"
                        value={contact}
                        onChange={(e) => setContact(e.target.value)}

                    />
                </div>
                <div class="mb-3">
                    <label for="Address" class="form-label">Address</label>
                    <input type="text"
                        className="form-control"
                        id="Address"
                        value={address}
                        onChange={(e) => setAddress(e.target.value)}
                    />
                </div>
                <div class="mb-3">
                    <label for="Email" class="form-label">Email</label>
                    <input type="email"
                        className="form-control"
                        id="Email"
                        placeholder="name@example.com"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                    />
                </div>
                <div class="mb-3">
                    <label for="Phone" class="form-label">Phone</label>
                    <input type="text"
                        className="form-control"
                        id="Phone"
                        value={phone}
                        onChange={(e) => setPhone(e.target.value)}
                    />
                </div>
            </div>
            <p className="accordion-header">
                <button onClick={handleClick} className=" collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#SampleInfo" aria-expanded="false" aria-controls="SampleInfo">
                    Next
                </button>
            </p>
        </div>
    )
}
export default ClientContent;