import './preloader.css'
import letter from "../assets/letter.svg"

const Preloader: React.FC = () => {
    return(
        <div className="preloader">
            <div className="letters">
                <div className="d">
                    <img src={letter} alt="Loading"/>
                </div>
                <div className="p">
                    <img src={letter} alt="Loading"/>
                </div>
            </div>
        </div>
    )
}

export default Preloader;