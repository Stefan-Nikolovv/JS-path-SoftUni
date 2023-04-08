import { Link } from "react-router-dom";

export const Home = () => {

      

    return (
        <section data-testid='homepage' id="main">
          <div id="welcome-container">
            <h1>Welcome To Car Dealer</h1>
            <img className="hero" src="/images/exitc.jpeg" alt="carImage"/>
            <h2>Want to see all offers click the link:</h2>
            <div>
              <Link to={"/catalog"} data-testid ='catalog' className="button">
                All Cars
              </Link>
            </div>
          </div>
        </section>
    );

};