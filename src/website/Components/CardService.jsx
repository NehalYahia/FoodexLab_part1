function CardService({ id, name, Decs, link }) {
    return (
        <div className="col-lg-3 col-md-6 col-sm-12" key={id }>
            <div className="card">
                <h3 className="d-flex justify-content-center p-3">  {name} </h3>
                <div className="card-description-bk"></div>
                <div className="card-logo">
                    <img src="https://res.cloudinary.com/dlmfgaa0n/image/upload/v1761108492/2e3ff3058b17cf604dc9a202afd1bcb4_kquijj.jpg" alt=""/>
                </div>
                <div className="card-description ">
                    <p className="px-2">{Decs}</p>
                </div>
               
                <div className="card-btn">
                    <a href={link }>Learn More</a>
                </div>
            </div>

        </div>
    )
}
export default CardService;