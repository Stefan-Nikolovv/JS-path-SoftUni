import { useContext, useEffect, useState } from "react";
import { CarContext } from "../../contexts/carContext";
import * as request from '../../services/carService'
import { useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";
export const EditCar = () => {
  const navigate = useNavigate()
  const {currentCar, car} = useContext(CarContext);
  const param = useParams();
  const[error, setError] = useState({});
  const[isSubmit,setSubmit] = useState(false);
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
    setSubmit(true);
   
  }
  const onChangeHandler = (e) => {
    const target = e.target;
    currentCar({
      ...car,
      [target.name]: target.value
    });
  };

 if(Object.keys(error).length === 0 && isSubmit){
  console.log('fetching')
  request.editOne(param.carId, car)
  .then( edittedCar => {
    currentCar(edittedCar)
    navigate(`/details/${param.carId}`)
  })
  .catch((err) => {
    console.error(err);
  })
 };
 const onBlurHandler = () => {
  setError(validate(car));
 };
 
  const validate = (car) => {
    const errors = {};
  if(!car.brand){
    errors.brand = 'Brand is required!';
  }else if (car.brand >= 3){
    errors.brand = 'Brand must be at least 3 characters!'
  }

  if(!car.model){
    errors.model = 'Model is required!'
  }else if (car.model >= 2 ){
    errors.model = 'Model must be at least 2 characters!'
  }
  else if (car.model <= 12 ){
    errors.model = 'Model must be shorter then 12 characters!'
  }

  if(!car.description){
    errors.description = 'Description is required!'
  }else if (car.description >= 10) {
    errors.description = 'Description must be at least 10 characters!'
  }else if (car.description <= 50){
    errors.description = 'Description must be shorter then 50 characters!'
  }

  if(!car.year){
    errors.year = 'Year is required!'
  }

  if(!car.imageUrl){
    errors.imageUrl = 'Brand is required!'
  } else if (!car.imageUrl.startsWith('http')){
    errors.imageUrl = 'Image should starts with HTTP or HTTPS'
  }

  if(!car.price){
    errors.price = 'Price is required!'
  };
  return errors;
  }

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
            onBlur={onBlurHandler}
          />
          <p>{error.brand}</p>
          <p>Car Model</p>
          <input
            type="text"
            placeholder="Enter Car Model"
            name="model"
            onChange={onChangeHandler}
            defaultValue={car.model}
            onBlur={onBlurHandler}
          />
          <p>{error.model}</p>
          <p>Description</p>
          <input
            type="text"
            placeholder="Enter Description"
            name="description"
            onChange={onChangeHandler}
            defaultValue={car.description}
            onBlur={onBlurHandler}
          />
          <p>{error.description}</p>
          <p>Car Year</p>
          <input
            type="number"
            placeholder="Enter Car Year"
            name="year"
            onChange={onChangeHandler}
            defaultValue={car.year}
            onBlur={onBlurHandler}
          />
          <p>{error.year}</p>
          <p>Car Image</p>
          <input
            type="text"
            placeholder="Enter Car Image"
            name="imageUrl"
            onChange={onChangeHandler}
            defaultValue={car.imageUrl}
            onBlur={onBlurHandler}
          />
          <p>{error.imageUrl}</p>
          <p>Car Price</p>
          <input
            type="number"
            placeholder="Enter Car Price"
            name="price"
            onChange={onChangeHandler}
            defaultValue={car.price}
            onBlur={onBlurHandler}
          />
          <p>{error.price}</p>
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
