import { Link } from 'react-router-dom';
import LogoutBtn from '../../ShareComponent/LogoutBtn';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useSelector } from "react-redux";
function WNavbar() {
    const user = useSelector((state) => state.auth.user);
    const role = useSelector((state) => state.auth.roles);


    return (
        <nav className="navbar navbar-expand-lg bg-body-tertiary sticky-top">
            <div className="container-fluid">
                <a className="navbar-brand px-5" href="#home">
                    <img src="https://res.cloudinary.com/dlmfgaa0n/image/upload/v1761594245/photo_6035155880065567791_x-removebg-preview_mnm3nl_c_crop_ar_16_9_g5mq1z.png"
                        alt="Logo" width="150" height="80" class="d-inline-block align-text-top" />
                    {/*    FoodEx*/}
                </a>
                <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>
                <div className="collapse navbar-collapse justify-content-end " id="navbarNav">
                    <ul className="navbar-nav">
                        <li class="nav-item px-3 align-self-center">
                            <a class="nav-link active" aria-current="page" href="#home">Home</a>
                        </li>
                        <li class="nav-item px-3 align-self-center">
                            <a class="nav-link" href="#about">about Us</a>
                        </li>
                        <li class="nav-item px-3 align-self-center">
                            <a class="nav-link" href="#service">Services</a>
                        </li>
                        <li class="nav-item px-3 align-self-center">
                            <a class="nav-link" href="#contact">contact Us</a>
                        </li>
                        <li class="nav-item px-3 pe-5 align-self-center">
                            <div class="dropdown position-relative">
                                <button class=" dropdown-toggle border border-0 bg-transparent" data-bs-toggle="dropdown" aria-expanded="false">
                                    <FontAwesomeIcon icon="fa-regular fa-circle-user" size="2x" />
                                </button>
                                {user ?
                                    <ul class="dropdown-menu position-absolute top-100 start-50 translate-middle">
                                        <li> <FontAwesomeIcon icon="fa-solid fa-user" /> {user} </li>
                                        <li> <FontAwesomeIcon icon="fa-solid fa-right-from-bracket" /> logout</li>
                                        {role != "client" ?
                                            <li>
                                                <Link to="/home" className="nav-link" >
                                                    <FontAwesomeIcon icon="fa-solid fa-microscope" /> Laboratory
                                                </Link>
                                            </li>
                                            : ""}
                                    </ul>
                                    :
                                    <ul class="dropdown-menu position-absolute top-100 start-50 translate-middle">
                                        <li> <Link to="/login&sign/client">LogIn</Link> </li>
                                    </ul>
                                }
                            </div>

                        </li>
                        <li class="nav-item ps-5 align-self-center">
                            <img src="https://res.cloudinary.com/dlmfgaa0n/image/upload/v1761591952/e74537b5-297e-4e13-9d10-0de118e08497-removebg-preview_lc9fru.png" />
                        </li>
                        <li class="nav-item  align-self-center">
                            <img src="https://res.cloudinary.com/dlmfgaa0n/image/upload/v1761591952/071403d4-5de4-40c1-bed0-8d4785f07e56-removebg-preview_rattb0.png" />
                        </li>

                    </ul>
                </div>

            </div>




        </nav>

    );

}

export default WNavbar;
