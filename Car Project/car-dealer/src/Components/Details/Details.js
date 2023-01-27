import * as carService from "../../services/carService";    
import { Link, useNavigate, useParams } from "react-router-dom";
import { useContext, useEffect } from "react";
import { CarContext } from '../../contexts/carContext'
import { UserContext } from '../../contexts/authContext'
export const Details = () => {
  const navigate = useNavigate()
  const { user } = useContext(UserContext);
  const {currentCar, car} = useContext(CarContext);
  const param = useParams();
  useEffect(()=> {
      carService.getOne(param.carId)
      .then(searchedCar => {
        currentCar(searchedCar);
      });
  
  },[]);

  
      const isOwner = user._id === car._ownerId
   
      const onDeleteHandler = () => {
        const conf = window.confirm("Are you sure want to delete this car?");
        console.log(conf);
        if(conf === true) {
            carService.deleteOne(param.carId)
            .then(res => {
                currentCar(res);
                navigate('/catalog')
            })
        };
      };

   
  return (
    <section id="listing-details">
      <h1>Details</h1>
      <div className="details-info">
        <img src={car.imageUrl}  alt={car.brand}/>
        <hr />
        <ul className="listing-props">
          <li>
            <span>Brand:</span>{car.brand}
          </li>
          <li>
            <span>Model:</span>{car.model}
          </li>
          <li>
            <span>Year:</span>{car.year}
          </li>
          <li>
            <span>Price:</span>{car.price}$
          </li>
        </ul>
        <p className="description-para">
          {car.description}
        </p>
        {isOwner && 
        <div className="listings-buttons">
        <Link to={`/edit/${car._id}`} className="button-list">
          Edit
        </Link>
        <button onClick={onDeleteHandler} className="button-list">
          Delete
        </button>
        </div>
        }
        
      </div>
    </section>
  );
};
