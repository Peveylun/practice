import "../../styles/homepage.css";
import "bootstrap";

const Homepage = () => {
    return (
        <div className="d-flex flex-column justify-content-center align-items-center container">
            <h2>Система відслідковування дефектів у готелях, не знаю що тут має бути, але нехай буде ця GIF-ка:</h2>
            <iframe src="https://giphy.com/embed/qiiPQiIThL6hi" width="480" height="270" frameBorder="0"
                    className="giphy-embed" allowFullScreen></iframe>
        </div>
    )
}

export default Homepage;