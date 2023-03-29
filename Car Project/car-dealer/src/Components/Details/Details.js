import * as carService from "../../services/carService";    
import { Link, useNavigate, useParams } from "react-router-dom";
import { useContext, useEffect } from "react";
import { CarContext } from '../../contexts/carContext'
import { UserContext } from '../../contexts/authContext'
export const Details = () => {
  const navigate = useNavigate()
  const { user } = useContext(UserContext);
  const {currentCar, car} = useContext(CarContext);
  const params = useParams();
  
  useEffect(()=> {
      
      carService.getOne(params.carId)
      .then(searchedCar => {
        currentCar(searchedCar);
      });
      
  },[]);
  
  
       const isOwner = user._id === car._ownerId;
       console.log(car);
      const onDeleteHandler = () => {
        const conf = window.confirm("Are you sure want to delete this car?");
       
        if(conf === true) {
            carService.deleteOne(params.carId)
            .then(res => {
                currentCar(res);
                navigate('/catalog')
            })
        };
      };
    
   
  return (
    <section id="listing-details" data-testid="detailsPage">
      <h1>Details</h1>
      <div className="details-info">
        <img src={car.imageUrl}  alt={car.brand} data-testid="imageUrlId"/>
        <hr />
        <ul className="listing-props">
          <li data-testid={"brandDetails"}>
            <span>Brand:</span>{car.brand}
          </li>
          <li data-testid={"modelDetails"}>
            <span>Model:</span>{car.model}
          </li>
          <li data-testid={"yearDetails"}>
            <span>Year:</span>{car.year}
          </li>
          <li data-testid={"priceDetails"}>
            <span >Price:</span>{car.price}$
          </li>
          <li className="description-para" data-testid={"descriptionDetails"}>
          <span>Description:{car.description}</span>
        </li>
        </ul>
        
        {isOwner && 
        <div className="listings-buttons">
        <Link to={`/edit/${car._id}`} className="button-list" data-testid="editButton" >
          Edit
        </Link>
        <button onClick={onDeleteHandler} className="button-list" data-testid="deleteButton">
          Delete
        </button>
        </div>
        }
        
      </div>
    </section>
  );
};
