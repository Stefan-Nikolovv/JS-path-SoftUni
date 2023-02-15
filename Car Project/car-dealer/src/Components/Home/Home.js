import { Link } from "react-router-dom";

export const Home = () => {

      

    return (
        <section data-testid='homepage' id="main">
          <div id="welcome-container">
            <h1>Welcome To Car Tube</h1>
            <img className="hero" src="/images/car-png.webp" alt="carIntro" />
            <h2>To see all the listings click the link below:</h2>
            <div>
              <Link to={"/catalog"} data-testid ='catalog' className="button" >
                All Cars
              </Link>
            </div>
          </div>
        </section>
    );

};