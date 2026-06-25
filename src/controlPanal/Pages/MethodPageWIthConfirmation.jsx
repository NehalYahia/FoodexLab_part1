import { useParams } from "react-router-dom";
import React, { useState, useEffect, setSum } from "react";
import UseApi from "../../hooks/main";
import Navbar from "../Components/Navbar";
import SideNav from "../Components/SideNav";


function MethodPageWIth() {
    const { id } = useParams();   // 🔥 GET ID from URL
    const [rowsData, setRowsData] = useState({});
    const [TBy, setTBy] = useState("");
    const [time, setTime] = useState();
    const units = [
        {
            id: 1,
            name: "cfu/g"
        },
        {
            id: 2,
            name: "cfu/ml"
        },
        {
            id: 3,
            name: "cfu/swab"
        },
    ];

    const Dilutions = [
        {
            id: 1,
            name: "10^-1"
        },
        {
            id: 2,
            name: "10^-2"
        },
        {
            id: 3,
            name: "10^-3"
        },
        {
            id: 4,
            name: "10^-4"
        },
        {
            id: 5,
            name: "10^-5"
        },
        {
            id: 6,
            name: "10^-6"
        },
    ];


    const { data: sampleTestDetails, loading1, error1, refetch1 } = UseApi({
        url: `SampleRequestedTestMethod?id=${id}`,

    });


    useEffect(() => {
        if (sampleTestDetails) {
            setRowsData(prev => ({
                ...prev,
                Dilution1: sampleTestDetails.d1 ?? "",
                Dilution2: sampleTestDetails.d2 ?? "",
                Counting1: sampleTestDetails.c1 ?? "",
                Counting2: sampleTestDetails.c2 ?? "",
                Counting3: sampleTestDetails.c3 ?? "",
                Counting4: sampleTestDetails.c4 ?? "",
                n1: sampleTestDetails.n1 ?? "",
                n2: sampleTestDetails.n2 ?? "",
                volume: sampleTestDetails.v ?? 0,
                sum: sampleTestDetails.sum ?? 0,
                result: sampleTestDetails.result ?? 0,
                a: sampleTestDetails.a ?? 0,
                b: sampleTestDetails.b ?? 0,
                result: sampleTestDetails.result ?? 0,
                Uexpand: sampleTestDetails.u_expended ?? 0,
                exp: sampleTestDetails.u_expression ?? 0,
                time: sampleTestDetails.testedAt ?? new Date().toISOString().slice(0, 16),
                testedBy: sampleTestDetails.testedBy ?? "",

            }));
        }
    }, [sampleTestDetails]);

    const tech = sampleTestDetails?.sampleDetailsBYTestsDto?.categoryDto.value;
    const matrix= sampleTestDetails?.sampleDetailsBYTestsDto?.categoryDto.matrix;

    const [pois, setPois] = useState(0);
    const [conf, setConf] = useState(0);
    const [U, setU] = useState(0);
 
    function convertPower(power) {
        if (typeof power !== "string") return power;

        if (!power.includes("^")) return Number(power);

        const [base, exponent] = power.split("^");

        const b = Number(base);
        const e = Number(exponent);

        if (isNaN(b) || isNaN(e)) return null;

        return Math.pow(b, e);
    }


    useEffect(() => {
        const sum =
            (Number(rowsData.b || 0) / Number(rowsData.a || 0) * Number(rowsData.Counting1 || 0)) +
            (Number(rowsData.b || 0) / Number(rowsData.a || 0) * Number(rowsData.Counting2 || 0)) +
            (Number(rowsData.b || 0) / Number(rowsData.a || 0) * Number(rowsData.Counting3 || 0)) +
            (Number(rowsData.b || 0) / Number(rowsData.a || 0) * Number(rowsData.Counting4 || 0));

        setRowsData(prev => ({
            ...prev,
            sum,
        }));
    }, [
        rowsData.a,
        rowsData.b,
        rowsData.Counting1,
        rowsData.Counting2,
        rowsData.Counting3,
        rowsData.Counting4,
    ]);

    useEffect(() => {
        const result =
            Number(rowsData.sum || 0) /
            (
                Number(rowsData.volume || 0) *
                convertPower(rowsData.Dilution1 || 0) *
                (
                    Number(rowsData.n1 || 0) + (0.1 * Number(rowsData.n2 || 0))
                )
            );

        setRowsData(prev => ({
            ...prev,
            result,
        }));
    }, [
        rowsData.sum,
        rowsData.volume,
        rowsData.Dilution1,
        rowsData.n1,
        rowsData.n2,
    ]);

    useEffect(() => {
        setPois(0.4343 / Math.sqrt(rowsData.sum));
    }, [rowsData.sum]);


    useEffect(() => {
        setConf((1 / 2.303) * Math.sqrt(((rowsData.b + 0.5) * (rowsData.a - rowsData.b + 0.5) * (rowsData.a ^ 2)) / (((rowsData.a + 1) ^ 2) * (rowsData.a + 2) * rowsData.b)));
    }, [rowsData.a, rowsData.b]);

    useEffect(() => {
        setU(Math.sqrt(
            ((tech * tech) + (matrix * matrix) + (pois * pois) + (conf * conf))
        ));
    }, [tech, matrix, pois, conf]);


    //console.log(tech * tech);
    //console.log(matrix * matrix);
    //console.log(pois * pois);
    //console.log(conf * conf);


    useEffect(() => {
        const Uexpand = U * 2;
        setRowsData(prev => ({
            ...prev,
            Uexpand,
        }));
    }, [U]);


    useEffect(() => {
        const exp = Math.log(rowsData.result);
        setRowsData(prev => ({
            ...prev,
            exp,
        }));
    }, [rowsData.result]);

   


    const { sampleResult, loading, error, refetch } = UseApi({
        url: `SampleRequestedTestMethod/${id}`,
        method: "PUT",
        autoFetch: false,
    });
    const handleSubmit = async (e) => {
        e.preventDefault();
        const row = rowsData;

        const dto = {
            d1: row.Dilution1,
            d2: row.Dilution2,
            c1: Number(row.Counting1),
            c2: Number(row.Counting2),
            c3: Number(row.Counting3),
            c4: Number(row.Counting4),
            n1: Number(row.n1),
            n2: Number(row.n2),
            v: Number(row.volume),
            sum: Number(row.sum),
            result: Number(row.result),
            unit: row.unit,
            a: Number(row.a),
            b: Number(row.b),
            u_expended: row.Uexpand ?? 0,
            u_expression: row.exp ?? 0,
            testedAt: row.time,
            testedBy: row.testedBy
        };

        const response = await refetch(dto);



        if (!response || response.error) {
            alert(JSON.stringify(response.error));
            return;
        }


        alert(JSON.stringify(response) || "Welcome!");


    }


    return (
        <div className="">
            <SideNav/>
            <div className="">

                {sampleTestDetails && (
                    <div className="row container m-auto">
                        <h3 className="text-center m-3 text-decoration-underline title">
                            {sampleTestDetails.sampleDetailsBYTestsDto.sampleDesc}
                        </h3>
                        <p className="col-4">
                            <span className="p-3">Date of Receving :</span>
                            {sampleTestDetails.sampleDetailsBYTestsDto.createdAt}
                        </p>
                        <p className="col-4">
                            <span className="p-3">Sample Code :</span>
                            {sampleTestDetails.sampleDetailsBYTestsDto.sampleCode}
                        </p>
                        <p className="col-4">
                            <span className="p-3">Sample Type :</span>
                            {sampleTestDetails.sampleDetailsBYTestsDto.typeDto.typeName}
                        </p>
                        <p className="col-4">
                            <span className="p-3">Sample Category :</span>
                            {sampleTestDetails.sampleDetailsBYTestsDto.categoryDto.categoryDesc}
                        </p>



                        <div className="row container m-auto mt-5">
                            <div class=" mb-3 col-1">
                                <span class="input-group-text " id="Dilution1">Dilution 1</span>
                                <select class="form-select " value={rowsData.Dilution1 || sampleTestDetails.d1 || ""}
                                    onChange={(e) => setRowsData(prev => ({
                                        ...prev,
                                        Dilution1: e.target.value,
                                    }))
                                    } aria-label="Default select example">
                                    <option selected>Dilution 1 </option>
                                    {Dilutions?.map((d) => (
                                        <option key={d.id} value={d.name}>{d.name}</option>
                                    ))}
                                </select>
                                {/*<input type="text"*/}
                                {/*    value={Dilution1}*/}
                                {/*    onChange={(e) => setDilution1(e.target.value)}*/}
                                {/*    class="form-control" placeholder="Dilution1" aria-label="Dilution1" aria-describedby="Dilution1" />*/}
                            </div>
                            <div class=" mb-3 col-1">
                                <span class="input-group-text " id="Counting1">Plate 1</span>
                                <input type="number"
                                    value={rowsData.Counting1 || sampleTestDetails.c1 || ""}
                                    onChange={(e) =>
                                        setRowsData(prev => ({
                                            ...prev,
                                            Counting1: e.target.value,
                                        }))
                                    }
                                    class="form-control" placeholder="Counting1" aria-label="Counting1" aria-describedby="Counting1" />
                            </div>
                            <div class=" mb-3 col-1">
                                <span class="input-group-text " id="Counting2">Plate 2</span>
                                <input type="number"
                                    value={rowsData.Counting2 || sampleTestDetails.c2 || ""}
                                    onChange={(e) => {
                                        setRowsData(prev => ({
                                            ...prev,
                                            Counting2: e.target.value,
                                        }))
                                    }
                                    }
                                    class="form-control" placeholder="Counting2" aria-label="Counting2" aria-describedby="Counting2" />
                            </div>
                            <div class="col-1 mb-3">
                                <span class="input-group-text " id="n1">n1</span>
                                <input type="number"
                                    value={rowsData.n1 || sampleTestDetails.n1 || ""}
                                    onChange={(e) =>
                                        setRowsData(prev => ({
                                            ...prev,
                                            n1: e.target.value,
                                        }))
                                    }
                                    class="form-control" placeholder="n1" aria-label="n1" aria-describedby="n2" />
                            </div>
                            <div className="col-1">
                                <span class="input-group-text  p-4 " id="volume">Volume</span>

                            </div>
                            <div className="col-1"></div>
                            <div class="col-2 mb-3">
                                <span class="input-group-text " id="a1">Tested colonies</span>
                                <input type="number"
                                    value={rowsData.a || sampleTestDetails.a || ""}
                                    onChange={(e) => setRowsData(prev => ({
                                        ...prev,
                                        a: e.target.value,
                                    }))
                                    }
                                    class="form-control" placeholder="A" aria-label="a1" aria-describedby="a1" />
                            </div>

                            <div className="col-1"></div>

                            <div class="col-3 mb-3">
                                <span class="input-group-text " id="Result">Final Result</span>
                                <input type="number"
                                    value={rowsData.result || sampleTestDetails.result || ""}
                                    onChange={(e) =>
                                        setRowsData(prev => ({
                                            ...prev,
                                            result: e.target.value,
                                        }))
                                    }
                                    class="form-control" placeholder="Result" aria-label="Result" aria-describedby="Result" readOnly />
                            </div>
                            <div class="col-1 mb-3">
                                <span class="input-group-text " id="Dilution2">Dilution 2</span>
                                <select class="form-select " value={rowsData.Dilution2 || sampleTestDetails.d2 || ""}
                                    onChange={(e) => setRowsData(prev => ({
                                        ...prev,
                                        Dilution2: e.target.value,
                                    }))
                                    } aria-label="Default select example">
                                    <option selected>Dilution 2 </option>
                                    {Dilutions?.map((d) => (
                                        <option key={d.id} value={d.name}>{d.name}</option>
                                    ))}
                                </select>
                                {/*<input type="text"*/}
                                {/*    value={Dilution2}*/}
                                {/*    onChange={(e) => setDilution2(e.target.value)}*/}
                                {/*    class="form-control" placeholder="Dilution2" aria-label="Dilution2" aria-describedby="Dilution2" />*/}
                            </div>
                            <div class="col-1 mb-3">
                                <span class="input-group-text " id="Counting3">Plate 3</span>
                                <input type="number"
                                    value={rowsData.Counting3 || sampleTestDetails.c3 || ""}
                                    onChange={(e) =>
                                        setRowsData(prev => ({
                                            ...prev,
                                            Counting3: e.target.value,
                                        }))
                                    }
                                    class="form-control" placeholder="Counting3" aria-label="Counting3" aria-describedby="Counting3" />
                            </div>
                            <div class="col-1 mb-3">
                                <span class="input-group-text " id="Counting4">Plate 4</span>
                                <input type="number"
                                    value={rowsData.Counting4 || sampleTestDetails.c4 || ""}
                                    onChange={(e) =>
                                        setRowsData(prev => ({
                                            ...prev,
                                            Counting4: e.target.value,
                                        }))
                                    }
                                    class="form-control" placeholder="Counting4" aria-label="Counting4" aria-describedby="Counting4" />
                            </div>
                            <div class="col-1 mb-3">
                                <span class="input-group-text " id="n2">n2</span>
                                <input type="number"
                                    value={rowsData.n2 || sampleTestDetails.n2 || ""}
                                    onChange={(e) =>
                                        setRowsData(prev => ({
                                            ...prev,
                                            n2: e.target.value,
                                        }))
                                    }
                                    class="form-control" placeholder="n2" aria-label="n2" aria-describedby="n2" />
                            </div>
                            <div class="col-1 mb-3">
                                {/*<span class="input-group-text" id="volume">volume</span>*/}
                                <input type="number"
                                    value={rowsData.volume || sampleTestDetails.v || ""}
                                    onChange={(e) =>
                                        setRowsData(prev => ({
                                            ...prev,
                                            volume: e.target.value,
                                        }))
                                    }
                                    class="form-control p-4" placeholder="volume" aria-labelvolum="volume" aria-describedby="volume" />
                            </div>
                            <div className="col-1"></div>

                            <div class="col-2 mb-3">
                                <span class="input-group-text " id="a2">positive colonies</span>
                                <input type="number"
                                    value={rowsData.b || sampleTestDetails.b || ""}
                                    onChange={(e) => setRowsData(prev => ({
                                        ...prev,
                                        b: e.target.value,
                                    }))
                                    }
                                    class="form-control" placeholder="B" aria-label="a2" aria-describedby="a2" />
                            </div>

                            {/*<div class=" mb-3">*/}
                            {/*<span class="input-group-text" id="sum">Sum</span>*/}
                            <input type="number"
                                value={rowsData.sum || sampleTestDetails.sum || ""}
                                onChange={(e) =>
                                    setRowsData(prev => ({
                                        ...prev,
                                        sum: e.target.value,
                                    }))
                                }
                                class="form-control" type="hidden" placeholder="sum" aria-label="sum" aria-describedby="sum" readOnly />
                            {/*</div>*/}

                            <div className="col-1"></div>

                            <div class="col-3 mb-3">
                                <span class="input-group-text " id="unit">unit</span>
                                <select class="form-select " value={rowsData.unit || sampleTestDetails.unit || ""}
                                    onChange={(e) => setRowsData(prev => ({
                                        ...prev,
                                        unit: e.target.value,
                                    }))
                                    }
                                    aria-label="Default select example">
                                    <option selected>Unit </option>
                                    {units?.map((u) => (
                                        <option key={u.id} value={u.name}>{u.name}</option>
                                    ))}
                                </select>

                            </div>

                            <div className="col-1 mb-3">
                                <span class="input-group-text " id="tech">U<sub>tech</sub></span>
                                <input type="number"
                                    value={sampleTestDetails.sampleDetailsBYTestsDto.categoryDto.value}
                                    /*onChange={(e) => setTech(e.target.value)}*/
                                    class="form-control" placeholder="" aria-label="tech" aria-describedby="tech" readOnly />

                            </div>
                            <div className="col-1 mb-3">
                                <span class="input-group-text " id="matrix">U<sub>matrix</sub></span>
                                <input type="number"
                                    value={sampleTestDetails.sampleDetailsBYTestsDto.categoryDto.matrix}
                                    /*onChange={(e) => setMatrix(e.target.value)}*/
                                    class="form-control" placeholder="" aria-label="matrix" aria-describedby="matrix" readOnly />

                            </div>
                            <div className="col-1 mb-3">
                                <span class="input-group-text  " id="pois">U<sub>pois</sub></span>
                                <input type="number"
                                    value={pois.toFixed(3)}
                                    onChange={(e) => setPois(e.target.value)}
                                    class="form-control" placeholder="" aria-label="pois" aria-describedby="pois" readOnly />

                            </div>
                            <div className="col-1 mb-3">
                                <span class="input-group-text " id="conf">U<sub>conf</sub></span>
                                <input type="number"
                                    value={conf.toFixed(3)}
                                    onChange={(e) => setConf(e.target.value)}
                                    class="form-control" placeholder="" aria-label="conf" aria-describedby="conf" readOnly />

                            </div>


                            <div className="col-1 mb-3">
                                <span class="input-group-text " id="U">U<sub>c</sub></span>
                                <input type="number"
                                    value={U.toFixed(3)}
                                    onChange={(e) => setU(e.target.value)}
                                    class="form-control" placeholder="" aria-label="U" aria-describedby="U" readOnly />

                            </div>
                            <div className="col-1"></div>

                            <div className="col-2 mb-3">
                                <span class="input-group-text " id="U2">U<sub>expanded</sub></span>
                                <input type="number"
                                    value={rowsData.Uexpand.toFixed(3) || sampleTestDetails.u_expended.toFixed(3) || ""}
                                    onChange={(e) =>
                                        setRowsData(prev => ({
                                            ...prev,
                                            Uexpand: e.target.value.toFixed(3),
                                        }))
                                    }
                                    /*value={U2.toFixed(3)}*/
                                    /*onChange={(e) => setU2(e.target.value)}*/
                                    class="form-control" placeholder="" aria-label="U2" aria-describedby="U2" readOnly />

                            </div>
                            <div className="col-1"></div>
                            <div className="col-3 mb-3 ">
                                <span class="input-group-text " id="exp">U<sub>expression</sub></span>
                                <div className="row">
                                    <div className="col-6">
                                    <input type="number"
                                        value={rowsData.exp.toFixed(3) || sampleTestDetails.u_expression.toFixed(3) || ""}
                                        onChange={(e) =>
                                            setRowsData(prev => ({
                                                ...prev,
                                                exp: e.target.value.toFixed(3),
                                            }))
                                        }
                                        /*value={exp}*/
                                        /*onChange={(e) => setExp(e.target.value)}*/
                                        class="form-control" placeholder="" aria-label="exp" aria-describedby="exp" readOnly />
                                    </div>
                                    <div className="col-6">
                                        <p className="form-control">
                                            Log<sub>10</sub>
                                        </p>
                                    </div>
                                </div>
                            </div>
                            <div className="col-6"></div>
                            <div class="col-2 mb-3">
                                <span class="input-group-text" id="testby">Tested By</span>
                                <input type="text"
                                    value={rowsData.testedBy || sampleTestDetails.testedBy || ""}

                                    onChange={(e) => setRowsData(prev => ({
                                        ...prev,
                                        testedBy: e.target.value,
                                    }))
                                    }
                                    class="form-control" placeholder="testby" aria-label="testby" aria-describedby="testby" />
                            </div>
                            <div className="col-1"></div>

                            <div class="col-3 mb-3">
                                <span class="input-group-text" id="time">Tested At</span>
                                <input
                                    class="form-control"
                                    type="datetime-local"
                                    value={rowsData.time || sampleTestDetails.time || new Date().toISOString().slice(0, 16)}

                                    onChange={(e) => setRowsData(prev => ({
                                        ...prev,
                                        time: e.target.value,
                                    }))
                                    }
                                />
                            </div>
                            <div class="accordion-body mt-3">
                                <button className="btn" onClick={handleSubmit}>Record Result</button>
                            </div>

                        </div>



                    </div>

                )}
            </div>
        </div>

    )
}

export default MethodPageWIth;