import { useNavigate } from "react-router-dom";

export const Home = () => {
  const navigate = useNavigate();
      const clickHnadler = (e) => {
        e.preventDefault();
        navigate('/catalog');
      }

    return (
        <section id="main">
          <div id="welcome-container">
            <h1>Welcome To Car Tube</h1>
            <img className="hero" src="/images/car-png.webp" alt="carIntro" />
            <h2>To see all the listings click the link below:</h2>
            <div>
              <a href="/catalog" className="button" onClick={clickHnadler}>
                Listings
              </a>
            </div>
          </div>
        </section>
    );

};