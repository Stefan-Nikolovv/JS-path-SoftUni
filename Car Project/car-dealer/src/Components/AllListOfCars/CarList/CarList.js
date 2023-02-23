import { Link } from "react-router-dom";

export const CarList = ({car}) => {
    
    return(
        <div className="listing">
          <div className="preview">
            <img src={car.imageUrl} alt={car.title} />
          </div>
          <h2>{car.brand}</h2>
          <div className="info">
            <div className="data-info">
              <h3 data-testid = 'yearCarList' >Year: {car.year}</h3>
              <h3 data-testid = 'priceCarList'>Price: {car.price} $</h3>
            </div>
            <div className="data-buttons">
              <Link to={`/details/${car._id}`} className="button-carDetails">
                Details
              </Link>
            </div>
          </div>
        </div>
    );
};