import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useSelector } from "react-redux";

function SideNav() {
    const user = useSelector((state) => state.auth.user);

    return (
        <div>
            <nav class="navbar glass sticky-top flex-md-nowrap p-1 shadow">
                <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                    <span class="navbar-toggler-icon"></span>
                </button>
                <a className="navbar-brand px-5" href="#">
                    <img src="https://res.cloudinary.com/dlmfgaa0n/image/upload/v1761594245/photo_6035155880065567791_x-removebg-preview_mnm3nl_c_crop_ar_16_9_g5mq1z.png"
                        alt="Logo" width="150" height="80" class="d-inline-block align-text-top" />
                    {/*    FoodEx*/}
                </a>
                <ul class="navbar-nav px-4">
                    <li class="nav-item text-nowrap ">
                        <div class="dropdown position-relative">
                            <button class="btn btn-secondary dropdown-toggle" type="button" data-bs-toggle="dropdown" aria-expanded="false">
                                <FontAwesomeIcon icon="fa-solid fa-circle-user" size="2x"/>
                            </button>
                            <ul class="dropdown-menu position-absolute top-100 start-50 translate-middle">
                                <li> <FontAwesomeIcon icon="fa-solid fa-user" /> {user} </li>
                                <li> <FontAwesomeIcon icon="fa-solid fa-right-from-bracket" /> logout</li>
                            </ul>
                        </div>
                    </li>
                </ul>
            </nav>
            <div class="container-fluid collapse navbar-collapse" id="navbarSupportedContent">
                <div class="row">
                    {/*<nav class="col-md-2 d-none d-md-block glass sidebar bottom-0 top-0 left-0 py-5 px-2">*/}
                    <div class="sidebar-sticky position-relative col-md-2 bottom-0 top-0 left-0 glass overflow-auto vh-100 pt-1" >
                        <ul class="nav flex-column">
                            <li class="nav-item px-1 fw-bold">
                                <Link to="/home" className="nav-link text-white" >Home</Link>
                            </li>
                        </ul>
                        <h6 class="sidebar-heading d-flex justify-content-between align-items-center px-1 mt-4 mb-1 text-light bg">
                            <span>Tests</span>
                        </h6>
                        <ul class="nav flex-column mb-2">
                            <li class="nav-item ">
                                <Link to="/allRequestedTest" className="nav-link main_color" >all Test</Link>
                            </li>
                            <li class="nav-item">
                                <Link to="/addRequestedTest" className="nav-link main_color" >Add New Test</Link>
                            </li>
                        </ul>
                        <h6 class="sidebar-heading d-flex justify-content-between align-items-center px-1 mt-4 mb-1 text-light bg">
                            <span>Samples</span>
                        </h6>
                        <ul class="nav flex-column mb-2">
                            <li class="nav-item">
                                <Link to="/addAllSamples" className="nav-link main_color" >All Samples</Link>
                            </li>
                            <li class="nav-item">
                                <span className="px-3 text-white fw-bold">Add New Sample</span>
                                <span className="px-4 py-3 text-white d-block fw-bold">Microbiology</span>

                                <ul class="nav flex-column mb-2">
                                    <li class="nav-item px-3">
                                        <Link to="/addSample/oldClient" className="nav-link main_color" >For old Client</Link>
                                    </li>
                                    <li class="nav-item px-3">
                                        <Link to="/addSample/newClient" className="nav-link main_color" >For New Client</Link>
                                    </li>
                                </ul>
                                <span className="px-4 text-white d-block fw-bold">Chemistry</span>

                                <ul class="nav flex-column mb-2">
                                    <li class="nav-item px-3">
                                        <Link to="/addSample/Ch/oldClient" className="nav-link main_color" >For old Client</Link>
                                    </li>
                                    <li class="nav-item px-3">
                                        <Link to="/addSample/Ch/newClient" className="nav-link main_color" >For New Client</Link>
                                    </li>
                                </ul>
                            </li>
                        </ul>
                        <h6 class="sidebar-heading d-flex justify-content-between align-items-center px-1 mt-4 mb-1 text-light bg">
                            <span>Users</span>
                        </h6>
                        <ul class="nav flex-column mb-2">
                            <li class="nav-item">
                                <Link to="/allUsers" className="nav-link main_color" >all Users</Link>
                            </li>
                            <li class="nav-item">
                                <Link to="/addNewUser" className="nav-link main_color" >Add New User</Link>
                            </li>
                        </ul>
                    </div>
                    {/*</nav>*/}




                </div>
            </div>
        </div>

    )
}

export default SideNav;