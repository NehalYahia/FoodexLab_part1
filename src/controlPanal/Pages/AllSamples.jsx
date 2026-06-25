
import { UseApi } from "../../hooks/main";
import Navbar from "../Components/Navbar";
import { Link } from 'react-router-dom';
import SideNav from "../Components/SideNav";


function AllSamples() {
    const { data: samples, loading, error } = UseApi({
        url: "Sample",
    });

    return (
        <div className="body">

            <SideNav/>
            <h2 className="text-center m-3 title">All Samples Ordered by Receiving Date</h2>

            <div className="container d-flex justify-content-center glass">
                <table className="table table-hover table-bordered rounded p-5 my-5 ">
                    <thead>
                        <tr className="">
                            <th scope="col">#</th>
                            <th scope="col">Customer Name</th>
                            <th scope="col">Sample Desc</th>
                            <th scope="col">Date of Receiving</th>
                            <th scope="col">Code Sample</th>
                            <th scope="col">Sampling Responsible</th>
                            <th scope="col">Certificate </th>
                            <th scope="col">Tests</th>
                            <th scope="col">Revision</th>
                            <th scope="col"></th>


                        </tr>
                    </thead>
                    <tbody >

                        {samples?.map((s, index) => (
                            <tr key={s.id} className="face face2">
                                <th scope="row">{index + 1}</th>

                                <td>{s.client.clientName}</td>
                                <td>{s.sampleDesc}</td>
                                <td>{new Date(s.createdAt).toLocaleString()}</td>

                                <td>{s.sampleCode}</td>

                                <td>{s.respkBy}</td>
                                <td>
                                    <Link className="text-decoration-none" to={`/Certifecate/${s.id}`}
                                        style={{
                                            color: s.approve
                                                ? "green"
                                                : "gray",
                                            fontWeight: "bold",
                                            pointerEvents: s.approve
                                                ? "auto"
                                                : "none"
                                        }}
                                    > Get Certificate </Link>
                                </td>
                                <td>
                                    {(s.testData || []).map((t, i) => (
                                        <ul key={i} className="list-group rounded-0  p-1" >
                                            <li className="list-group-item" key={t.test.id}>
                                                Test Cls:
                                                <span className="fw-bold"> {t.test.name} </span>
                                            </li>
                                            <li className="list-group-item" key={t.req.id}>
                                                Test:
                                                <span className="fw-bold"> {t.req.name}</span>
                                            </li>
                                            {t.req.equation === "confirmation" ?
                                                (
                                                    <li className="list-group-item" key={t.method.id}>
                                                        Method:
                                                        {
                                                            (() => {
                                                                const d = new Date(t.startAt);
                                                                d.setHours(d.getHours() + t.method.time);
                                                                const isExpired = new Date() < d;
                                                                const d2 = new Date(t.startAt);
                                                                d2.setHours(d2.getHours() + t.method.time2);
                                                                const isExpired2 = new Date() < d2;
                                                                return (
                                                                    //<td style={{ color: isExpired ? "red" : "green" }}>
                                                                    //    {isExpired ? "منتهي" : d.toLocaleString()}
                                                                    //</td>
                                                                    <Link className="text-decoration-none" to={`/Sample/${t.id}`}
                                                                        style={
                                                                            {
                                                                                color:
                                                                                    t.startAt == null ?
                                                                                        "#ebab34"
                                                                                        :
                                                                                        t.result !== null || t.result2 !== null ?
                                                                                            "green"
                                                                                            :
                                                                                            isExpired ?
                                                                                                "blue"
                                                                                                :
                                                                                                t.a == null || t.a == 0 ?
                                                                                                    "red"
                                                                                                    :
                                                                                                    isExpired2 ? "blue" : "red",
                                                                                fontWeight: "bold"

                                                                            }
                                                                        }


                                                                    > {t.method.name} -----{new Date(t.startAt).toLocaleString()}------ {d.toLocaleString()}----------- {d2.toLocaleString()}{t.method.time2} </Link>


                                                                );
                                                            })()
                                                        }
                                                    </li>
                                                )
                                                :
                                                (
                                                    t.req.equation.toLowerCase().includes("detection") ? (
                                                        <li className="list-group-item" key={t.method.id}>
                                                            Method ID:


                                                            {
                                                                (() => {
                                                                    const d = new Date(t.startAt);
                                                                    d.setHours(d.getHours() + t.method.time);
                                                                    const isExpired = new Date() < d;
                                                                    const d2 = new Date(t.startAt);
                                                                    d2.setHours(d2.getHours() + t.method.time2);
                                                                    const isExpired2 = new Date() < d2;
                                                                    return (
                                                                        //<td style={{ color: isExpired ? "red" : "green" }}>
                                                                        //    {isExpired ? "منتهي" : d.toLocaleString()}
                                                                        //</td>
                                                                        <Link className="text-decoration-none" to={`/Sample/detection/${t.id}/${t.sampleId}/${t.req.id}`}
                                                                            style={
                                                                                {
                                                                                    color:
                                                                                        t.startAt == null ?
                                                                                            "#ebab34"
                                                                                            :
                                                                                            t.result !== null || t.result2 !== null ?
                                                                                                "green"
                                                                                                :
                                                                                                isExpired ?
                                                                                                    "blue"
                                                                                                    :
                                                                                                    t.a == null || t.a == 0 ?
                                                                                                        "red"
                                                                                                        :
                                                                                                        isExpired2 ? "blue" : "red",
                                                                                    fontWeight: "bold"

                                                                                }
                                                                            }

                                                                        > {t.method.name} ----------- {d.toLocaleString()} </Link>


                                                                    );
                                                                })()}


                                                        </li>
                                                    )
                                                        :
                                                        (
                                                            <li className="list-group-item " key={t.method.id}>
                                                                Method ID:
                                                                {
                                                                    (() => {
                                                                        const d = new Date(t.startAt);
                                                                        d.setHours(d.getHours() + t.method.time);
                                                                        const isExpired = new Date() < d;
                                                                        const d2 = new Date(t.startAt);
                                                                        d2.setHours(d2.getHours() + t.method.time2);
                                                                        const isExpired2 = new Date() < d2;
                                                                        return (
                                                                            //<td style={{ color: isExpired ? "red" : "green" }}>
                                                                            //    {isExpired ? "منتهي" : d.toLocaleString()}
                                                                            //</td>
                                                                            <Link className="text-decoration-none" to={`/Sample/without/${t.id}`}
                                                                                style={
                                                                                    {
                                                                                        color:
                                                                                            t.startAt == null ?
                                                                                                "#ebab34"
                                                                                                :
                                                                                                t.result !== null || t.result2 !== null ?
                                                                                                    "green"
                                                                                                    :
                                                                                                    isExpired ?
                                                                                                        "blue"
                                                                                                        :
                                                                                                        t.a == null || t.a == 0 ?
                                                                                                            "red"
                                                                                                            :
                                                                                                            isExpired2 ? "blue" : "red",
                                                                                        fontWeight: "bold"

                                                                                    }
                                                                                }
                                                                            > {t.method.name} ----------- {d.toLocaleString()} </Link>


                                                                        );
                                                                    })()
                                                                }

                                                            </li>
                                                        )
                                                )}
                                        </ul>
                                    ))}
                                </td>
                                <td>
                                    <Link className="text-decoration-none" to={`/ReviewSample/${s.id}`}> Review </Link>
                                </td>
                                <td>
                                    <button className="bg rounded border p-2 mt-2 ">
                                        <Link className="text-white text-decoration-none" to={`/UpdateSample/${s.id}`}> Update </Link>
                                    </button>

                                </td>

                            </tr>
                        ))}

                    </tbody>
                </table>


            </div>
        </div>

    )
}

export default AllSamples;