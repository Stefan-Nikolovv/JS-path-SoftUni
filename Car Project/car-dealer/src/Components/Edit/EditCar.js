import { useContext, useEffect } from "react";
import { CarContext } from "../../contexts/carContext";
import * as request from '../../services/carService'
import { useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";
export const EditCar = () => {
  const navigate = useNavigate()
  const {currentCar, car} = useContext(CarContext);
  const param = useParams();
  useEffect(() => {
    request.getOne(param.carId)
    .then(searchedCar => {
     
      currentCar(searchedCar);
    })
    .catch((err) => {
      console.error(err);
    })
  },[]);

  const onSubmitHandler = (e) => {
    e.preventDefault();
    request.editOne(param.carId, car)
    .then( edittedCar => {
      currentCar(edittedCar)
      navigate(`/details/${param.carId}`)
    })
    .catch((err) => {
      console.error(err);
    })
  }
  const onChangeHandler = (e) => {
    const target = e.target;
    currentCar({
      ...car,
      [target.name]: target.value
    });
  };
 
  

  return (
    <section id="edit-listing">
      <div className="container">
        <form id="edit-form" onSubmit={onSubmitHandler}>
          <h1>Edit Car Listing</h1>
          <p>Please fill in this form to edit an listing.</p>
          <hr />
          <p>Car Brand</p>
          <input
            type="text"
            placeholder="Enter Car Brand"
            name="brand"
            onChange={onChangeHandler}
            defaultValue={car.brand}
          />
          <p>Car Model</p>
          <input
            type="text"
            placeholder="Enter Car Model"
            name="model"
            onChange={onChangeHandler}
            defaultValue={car.model}
          />
          <p>Description</p>
          <input
            type="text"
            placeholder="Enter Description"
            name="description"
            onChange={onChangeHandler}
            defaultValue={car.description}
          />
          <p>Car Year</p>
          <input
            type="number"
            placeholder="Enter Car Year"
            name="year"
            onChange={onChangeHandler}
            defaultValue={car.year}
          />
          <p>Car Image</p>
          <input
            type="text"
            placeholder="Enter Car Image"
            name="imageUrl"
            onChange={onChangeHandler}
            defaultValue={car.imageUrl}
          />
          <p>Car Price</p>
          <input
            type="number"
            placeholder="Enter Car Price"
            name="price"
            onChange={onChangeHandler}
            defaultValue={car.price}
          />
          <hr />
          <input
            type="submit"
            className="registerbtn"
            defaultValue="Edit Listing"
          />
        </form>
      </div>
    </section>
  );
};
