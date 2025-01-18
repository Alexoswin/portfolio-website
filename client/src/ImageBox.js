import './ImageBox.css';

function ImageBox({ Image }) {
    return (
        <>
        <div className="Simage">
            <img src={Image} alt="Skill" id="skillimage" className="SImage" />
        </div>
        </>
    );
}

export default ImageBox;
