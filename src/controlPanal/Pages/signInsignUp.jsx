import Register from "../../ShareComponent/Register";
import Login from "../../ShareComponent/login";

function SignInsignUp() {
    return (
        <div className="SignInsignUp container-fluid">
                    <div className="row full-height justify-content-center">
                <div className="col-6 text-center align-self-center py-5">
                    <h2 className="text-white">welcome To The FoodEX Lab  </h2>
                            <div className="section pb-5 pt-5 pt-sm-2 text-center">
                                <h6 className="mb-0 pb-3">
                                    <span>Log In </span>
                                    <span>Sign Up</span>
                                </h6>
                                <input className="checkbox" type="checkbox" id="reg-log" name="reg-log" />
                                <label for="reg-log"></label>
                                <div className="card-3d-wrap mx-auto">
                                    <div className="card-3d-wrapper">
                                        <Login />
                                        <Register />
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="col-6 logo_side d-flex align-items-center justify-content-center shadow-lg bg-body-tertiary"  >
                    <img className="d-block" src="https://res.cloudinary.com/dlmfgaa0n/image/upload/v1761594245/photo_6035155880065567791_x-removebg-preview_mnm3nl_c_crop_ar_16_9_g5mq1z.png" />
                        </div>
                    </div>
        </div>

    )
}

export default SignInsignUp;
