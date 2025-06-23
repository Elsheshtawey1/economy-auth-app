import { Link } from "react-router-dom";
import '../Style/NotFound.css'; 
const NotFound = () => (
  <>
    <main className="notfound-container" role="main" aria-label="404 Not Found">
      <div className="notfound-content">
        <h1 className="notfound-title" tabIndex={-1}>
          404
        </h1>
        <h2 className="notfound-subtitle">Oops! Page Not Found</h2>
        <p className="notfound-message">
          The page you're looking for doesn't exist or has been moved.
          <br />
          Let's get you back to deliciousness!
        </p>
        <Link to="/profile" className="notfound-btn" aria-label="Back to Home" tabIndex={0}>
          Back to Home
        </Link>
      </div>
      {/* <div className="notfound-illustration">
        <img src="/img/undraw_page-not-found_6wni.svg" alt="Empty plate illustration" loading="lazy" />
      </div> */}
    </main>
  </>
);

export default NotFound;
