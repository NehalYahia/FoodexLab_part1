import LogoutBtn from "../../ShareComponent/LogoutBtn";
import { Link } from 'react-router-dom';


function Navbar() {


    return (
        <nav className="navbar navbar-expand-lg glass sticky-lg-top">
           
            <div className="container-fluid fw-bold">

                <a className="navbar-brand px-5" href="#">
                    <img src="https://res.cloudinary.com/dlmfgaa0n/image/upload/v1761594245/photo_6035155880065567791_x-removebg-preview_mnm3nl_c_crop_ar_16_9_g5mq1z.png"
                        alt="Logo" width="150" height="80" class="d-inline-block align-text-top" />
                {/*    FoodEx*/}
                </a>
                <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>
                <div className="collapse navbar-collapse justify-content-center" id="navbarNav">

                    <ul className="navbar-nav ">

                       
                        <li class="nav-item px-3 ">
                            <Link to="/home" className="nav-link text-white" >Home</Link>                            
                        </li>
                        <li class="nav-item px-3">
                            <a class="nav-link text-white" href="#">Clints</a>
                        </li>
                        <li class="nav-item px-3">
                            <div class="dropdown p-2">
                                <a className="text-white dropdown-toggle" href="#" data-bs-toggle="dropdown" aria-expanded="false">
                                    Samples
                                </a>

                                <ul class="dropdown-menu">
                                    <li>
                                        <Link to="/addAllSamples" className="nav-link " >All Samples</Link>
                                    </li>
                                    <li>
                                        <Link to="/addSample" className="nav-link " >Add New Sample</Link>
                                    </li>
                                </ul>
                            </div>
                            
                        </li>
                        <li class="nav-item px-3">
                            <div class="dropdown p-2">
                                <a className="dropdown-toggle text-white" href="#" data-bs-toggle="dropdown" aria-expanded="false">
                                    Tests
                                </a>

                                <ul class="dropdown-menu">
                                    <li>
                                        <Link to="/allRequestedTest" className="nav-link" >all Test</Link>
                                    </li>
                                    <li>
                                        <Link to="/addRequestedTest" className="nav-link" >Add New Test</Link>
                                    </li>
                                </ul>
                            </div>
                        </li>
                        <li class="nav-item px-3">
                            <div class="dropdown p-2">
                                <a className="text-white dropdown-toggle" href="#" data-bs-toggle="dropdown" aria-expanded="false">
                                    Users
                                </a>

                                <ul class="dropdown-menu tab-pane fade">
                                    <li>
                                        <Link to="/allUsers" className="nav-link" >all Users</Link>
                                    </li>
                                    <li>
                                        <Link to="/addNewUser" className="nav-link" >Add New User</Link>
                                    </li>
                                </ul>
                            </div>
                        </li>
                        <li>
                            <LogoutBtn  />
                        </li>
                    </ul>
                </div>
            </div>




        </nav>

    );

}

export default Navbar;
