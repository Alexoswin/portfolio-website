import "./SkillCard.css";

export default function SkillCard({ Image, Name}) {

    return(
        <div className="cards" style={{maxwidth: "540px"}}>
            <div>
                <img src={Image} className="card-img" alt={Name} />
            </div>
            <div className="Title">
                <h5 className="card-title">{Name}</h5>
            </div>
        </div>
    );
}