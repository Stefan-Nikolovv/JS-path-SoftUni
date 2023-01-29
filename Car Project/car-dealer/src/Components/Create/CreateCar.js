import { useContext, useEffect, useState } from "react";
import { CarContext } from "../../contexts/carContext";
import { useNavigate } from "react-router-dom";
import * as carService from '../../services/carService'


export const CreateCar = () => {
  const navigate = useNavigate()
  const { currentCar } = useContext(CarContext);
  const [isSubmit,setSubmit] = useState(false);
  const [error, setError] = useState({});
  const[createCar, setCreatedCar] = useState({
    brand:"",
    model:"",
    description:"",
    year:"",
    imageUrl:"",
    price:"",
  });


  const onSubmitHandler = (e) => {
    e.preventDefault();
    setSubmit(true);
    
  };

  const onChangeHandler = (e) => {
    const target = e.target;
    setCreatedCar({
      ...createCar,
      [target.name]: target.value
    });
  };

 const onBlurHandler = () => {
  setError(validate(createCar));
 }

 useEffect(() => {
  if(Object.keys(error).length === 0 && isSubmit ){
    const{brand, model, description, year, imageUrl, price} = createCar;
    
    carService.createCar(brand, model ,description, year, imageUrl, price)
    .then(response =>{
      currentCar(response);
      navigate('/catalog')
    })
    .catch((err) => {
      console.error(err);
    })
  }
 },[setError])

 const validate = (carData) => {
  const errors = {};
  if(!carData.brand){
    errors.brand = 'Brand is required!';
  }else if (carData.brand >= 3){
    errors.brand = 'Brand must be at least 3 characters!'
  }

  if(!carData.model){
    errors.model = 'Model is required!'
  }else if (carData.model >= 2 ){
    errors.model = 'Model must be at least 2 characters!'
  }
  else if (carData.model <= 12 ){
    errors.model = 'Model must be shorter then 12 characters!'
  }

  if(!carData.description){
    errors.description = 'Description is required!'
  }else if (carData.description >= 10) {
    errors.description = 'Description must be at least 10 characters!'
  }else if (carData.description <= 50){
    errors.description = 'Description must be shorter then 50 characters!'
  }

  if(!carData.year){
    errors.year = 'Year is required!'
  }

  if(!carData.imageUrl){
    errors.imageUrl = 'Brand is required!'
  } else if (!carData.imageUrl.startsWith('http')){
    errors.imageUrl = 'Image should starts with HTTP or HTTPS'
  }

  if(!carData.price){
    errors.price = 'Price is required!'
  };
  return errors;
 };



  return (
    <section id="create-listing">
      <div className="container">
        <form id="create-form" onSubmit={onSubmitHandler}>
          <h1>Create Car Listing</h1>
          <p>Please fill in this form to create an listing.</p>
          <hr />
          <label>Car Brand</label>
          <input type="text" placeholder="Enter Car Brand" name="brand" onChange={onChangeHandler} onBlur={onBlurHandler}/>
          <p>{error.brand}</p>
          <label>Car Model</label>
          <input type="text" placeholder="Enter Car Model" name="model" onChange={onChangeHandler} onBlur={onBlurHandler}/>
          <p>{error.model}</p>
          <label>Description</label>
          <input
            type="text"
            placeholder="Enter Description"
            name="description"
            onChange={onChangeHandler}
            onBlur={onBlurHandler}
          />
          <p>{error.description}</p>
          <label>Car Year</label>
          <input type="number" placeholder="Enter Car Year" name="year" onChange={onChangeHandler} onBlur={onBlurHandler}/>
          <p>{error.year}</p>
          <label>Car Image</label>
          <input type="text" placeholder="Enter Car Image" name="imageUrl" onChange={onChangeHandler} onBlur={onBlurHandler}/>
          <p>{error.imageUrl}</p>
          <label>Car Price</label>
          <input type="number" placeholder="Enter Car Price" name="price" onChange={onChangeHandler} onBlur={onBlurHandler}/>
          <p>{error.price}</p>
          <hr />
          <input
            type="submit"
            className="registerbtn"
            defaultValue="Create Listing"
          />
        </form>
      </div>
    </section>
  );
};
