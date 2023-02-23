import { Link } from "react-router-dom";

export const ListCar = ({car}) => {
    return(
        <div className="listing">
        <div className="preview">
          <img src={car.imageUrl} alt={car.brand} />
        </div>
        <h2>{car.brand}</h2>
        <div className="info">
          <div className="data-info">
            <h3>Year: {car.year}</h3>
            <h3>Price: {car.price} $</h3>
          </div>
          <div className="data-buttons">
            <Link type="click" to={`/details/${car._id}`} className="button-carDetails">
              Details
            </Link>
          </div>
        </div>
      </div>
    );
};