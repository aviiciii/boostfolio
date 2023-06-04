import { useNavigate } from "react-router-dom";
const Landing = () => {
    const history = useNavigate();
    return (
        <div className="landing">
            <div className="info-container">
                <h1 className="info"><b className="big">Create</b> with purpose<br></br>Aim for <b className="big">success</b>  </h1>
                <h3>
                    Empowering individuals by offering tailored portfolio analysis and <br></br> enhancement. Bridging the gap between skills and career aspirations.
                </h3>
                <button onClick={()=>history('/form')}>Try it</button>
            </div>
        </div>
    )
}
export default Landing;