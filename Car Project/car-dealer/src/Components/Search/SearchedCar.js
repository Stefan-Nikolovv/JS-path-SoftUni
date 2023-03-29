import { Link } from "react-router-dom";


export const SearchedCar = ({car}) => {
  
    return(
        <div className="listing">
          <div className="preview">
            <img src={car.imageUrl} />
          </div>
          <h2>{car.brand}</h2>
          <div className="info">
            <div className="data-info">
              <h3 data-testid = 'yearSearchCar'>Year:{car.year}</h3>
              <h3 data-testid = 'priceSearchCar'>Price: {car.price} $</h3>
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