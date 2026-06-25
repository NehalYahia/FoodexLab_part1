import RollingGallery from "../../ShareComponent/ReactBits/RollingGallery ";
import RotatingText from "../../ShareComponent/ReactBits/RotatingText";
import TextType from "../../ShareComponent/ReactBits/TextType";
import CardService from "../Components/CardService";
import WNavbar from "../Components/WNavbar";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { library } from '@fortawesome/fontawesome-svg-core'
import { useSelector } from "react-redux";
import { fas } from '@fortawesome/free-solid-svg-icons'
import { far } from '@fortawesome/free-regular-svg-icons'
import { fab } from '@fortawesome/free-brands-svg-icons'
import WaddSampleBtn from "../Components/WaddSampleBtn";

library.add(fas, far, fab)

function WHome() {
    const user = useSelector((state) => state.auth.user);

    const services_name = [
        {
            id: 1, name: "Microbilogy",
            Decs: "Our accredited Food Testing and Food Analysis services empower you to adhere to safety regulations, uphold best practices",
            link: ""
        },
        {
            id: 2, name: "Chemistry",
            Decs: "Our comprehensive Food Chemistry Analysis services encompass a wide spectrum of tests. We offer both standard Time rates and expedited",
            link: ""
        },
        { id: 3, name: "PT Providing", Decs: "", link: "" },
        { id: 4, name: "Traning", Decs: "", link: "" },
      ]

    const handleOpenPdf1 = () => {
        const pdfPath = "/pdf/Scope.pdf";
        window.open(pdfPath, "_blank");
    };

    return (
        <div className="WHome" id="home">
            <WaddSampleBtn />
            <WNavbar/>
            {/*<FacebookFeed />*/}
            <section className="header">
                <img src="https://res.cloudinary.com/dlmfgaa0n/image/upload/v1761108492/2e3ff3058b17cf604dc9a202afd1bcb4_kquijj.jpg" />
                <div className="head_content d-flex align-items-center">
                    <div className="ps-5 ms-5 text-white">
                        <h1 className="d-inline">FoodEx</h1>
                        <p className="ps-3 d-inline">Laboratory</p>
                        <div class="bref">
                            <p>FROM FARM TO FORK</p>
                            <div class="bref-btn">
                                <TextType
                                    text={["we gurate your healthy safety"]}
                                    typingSpeed={75}
                                    pauseDuration={1500}
                                    showCursor={true}
                                    cursorCharacter="|"
                                />
                            </div>
                        </div>
                    </div>
                </div> 
               
            </section>
            <section class="about-section" id="about">
                    <div class="container">
                        <div class="row clearfix">
                            <div class="content-column col-md-6 col-sm-12 col-xs-12">
                                <div class="inner-column">
                                    <div class="sec-title">
                                        <div class="title">About Us</div>
                                        <h2>we gurate your healthy safety</h2>
                                    </div>
                                <div class="text">
                                    Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries
                                </div>
                        
                                </div>
                            </div>

                            <div class="image-column col-md-6 col-sm-12 col-xs-12">
                                <div class="inner-column">
                                    <div class="image">
                                    <img src="https://res.cloudinary.com/dlmfgaa0n/image/upload/v1760775860/b549924886a85296e350d50ce12f7b11_vwg5aa.jpg" alt=""/>
                                            <div class="overlay-box">
                                        <div class="year-box"><span class="number">1</span>Years Experience Working</div>
                                                </div>
                                            </div>
                                    </div>
                                </div>

                            </div>
                        </div>
                    
            </section>
            <section>
                <div className="row container">
                    <div class="accordion-item col-6">
                        <h2 class="accordion-header">
                            <button class="accordion-button" type="button" data-bs-toggle="collapse" data-bs-target="#collapseOne" aria-expanded="true" aria-controls="collapseOne">
                                Accordion Item #1
                            </button>
                        </h2>
                        <div id="collapseOne" class="accordion-collapse collapse show" data-bs-parent="#accordionExample">
                            <div class="accordion-body">
                                <strong>This is the first item’s accordion body.</strong> It is shown by default, until the collapse plugin adds the appropriate classes that we use to style each element. These classes control the overall appearance, as well as the showing and hiding via CSS transitions. You can modify any of this with custom CSS or overriding our default variables. It’s also worth noting that just about any HTML can go within the <code>.accordion-body</code>, though the transition does limit overflow.
                            </div>
                        </div>
                    </div>
                </div>

            </section>
            <section className="service " id="service">
                <div className="service_header p-5 d-flex justify-content-center">
                    <h2 className="title">Our Service</h2>
                    <RotatingText
                        texts={['Chemistry', 'Microbilogy', 'PT-Providing', 'Traning!']}
                        mainClassName="px-2 sm:px-2 md:px-3 bg-cyan-300 text-black overflow-hidden py-0.5 sm:py-1 md:py-2 justify-center rounded-lg"
                        staggerFrom={"last"}
                        initial={{ y: "100%" }}
                        animate={{ y: 0 }}
                        exit={{ y: "-120%" }}
                        staggerDuration={0.025}
                        splitLevelClassName="overflow-hidden pb-0.5 sm:pb-1 md:pb-1"
                        transition={{ type: "spring", damping: 30, stiffness: 400 }}
                        rotationInterval={2000}
                    />
                </div>
                <div className="container ">
                    <div className="row d-flex justify-content-center">
                        {services_name.map((service) =>
                            <CardService id={service.id} name={service.name} Decs={service.Decs} link={service.link} />
                        )}
                    </div>
                </div>
            </section>
            <section className="Our_Scope container-fluid p-5 my-5 d-flex justify-content-center">
                <h2 className="text-white mx-3">Our Scope</h2>
                <button className="Scope_btn egac " onClick={handleOpenPdf1}>EGAC</button>
                <button className="Scope_btn " onClick={handleOpenPdf1}>Open PDF</button>

            </section>
            <section>
                <RollingGallery autoplay={true} pauseOnHover={true} />

            </section>
            <section className="footer " id="contact">
                <div class="container my-5">
                    <footer class="text-white text-center text-lg-start" >
                        <div class="container p-4">
                            <div class="row mt-4">
                                <div class="col-lg-4 col-md-12 mb-4 mb-md-0">
                                    <h5 class="text-uppercase mb-4">About company</h5>

                                    <p>
                                        At vero eos et accusamus et iusto odio dignissimos ducimus qui blanditiis praesentium
                                        voluptatum deleniti atque corrupti.
                                    </p>

                                    <p>
                                        Blanditiis praesentium voluptatum deleniti atque corrupti quos dolores et quas
                                        molestias.
                                    </p>

                                    <div class="mt-4">
                                        {/*<a class="btn btn-floating btn-warning btn-lg"><i class="fab fa-facebook-f"></i></a>*/}
                                     
                                    </div>
                                </div>
                            
                                <div class="col-lg-4 col-md-6 mb-4 mb-md-0 ps-5">

                                     
                                    <ul class="fa-ul ms-2">
                                        <li class="mb-3">
                                            <span class="ms-2">New York, NY 10012, US</span>
                                        </li>
                                        <li class="mb-3">
                                            <span class="ms-2">info@example.com</span>
                                        </li>
                                        <li class="mb-3">
                                            <span class="ms-2">01004126417</span>
                                        </li>
                                        <li class="mb-3">
                                            <a href="#" className="me-2 fs-5">
                                                <FontAwesomeIcon icon="fa-brands fa-facebook-f"/>
                                            </a>
                                            <a href="https://wa.me/qr/5SVFU3HNHHJIL1" className="me-2 fs-4">
                                                <FontAwesomeIcon icon="fa-brands fa-square-whatsapp" color="#075E54" />
                                            </a>
                                            <a href="https://m.me/omnia.light.7?hash=AbbQ3dxr3CmZ5jcT&source=qr_link_share" className="me-2 fs-5">
                                                <FontAwesomeIcon icon="fa-brands fa-facebook-messenger" />
                                            </a>
                                        </li>
                                    </ul>
                              </div>

                                <div class="col-lg-4 col-md-6 mb-4 mb-md-0">
                                    <iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3451.7295006190425!2d31.3064795!3d30.101932400000003!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x14581500124d8eeb%3A0xc0f0f5957821ed44!2sFoodEx%20Laboratory!5e0!3m2!1sar!2seg!4v1761580068920!5m2!1sar!2seg"
                                        width="450" height="350" allowfullscreen="" loading="lazy"
                                        referrerpolicy="no-referrer-when-downgrade">
                                    </iframe>
                                </div>
                            </div>
                        </div>

                        <div class="text-center p-3">
                            © 2020 Copyright:
                            <a class="text-white" href="https://mdbootstrap.com/">MDBootstrap.com</a>
                        </div>
                    </footer>

                </div>
            </section>
        </div>
    )
}
export default WHome;