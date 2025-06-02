import "./SkillCard.css";

export default function SkillCard({ Image, Name}) {

    return(
        <div className="card mb-3" style={{maxwidth: "540px"}}>
            <div className="row g-0">
                <div className="col-md-4">
                <img src={Image} class="img-fluid rounded-start" alt="..."/>
                </div>
                <div className="col-md-8">
                <div className="card-body">
                    <h5 className="card-title">{Name}</h5>
                   
                   
                </div>
                </div>
            </div>
        </div>
    );
}