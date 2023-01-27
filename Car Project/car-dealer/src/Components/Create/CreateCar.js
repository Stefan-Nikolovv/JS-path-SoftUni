import { useContext, useState } from "react";
import { CarContext } from "../../contexts/carContext";
import { useNavigate } from "react-router-dom";
import * as carService from '../../services/carService'


export const CreateCar = () => {
  const navigate = useNavigate()
  const { currentCar } = useContext(CarContext);
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

  const onChangeHandler = (e) => {
    const target = e.target;
    setCreatedCar({
      ...createCar,
      [target.name]: target.value
    });

  }


  return (
    <section id="create-listing">
      <div className="container">
        <form id="create-form" onSubmit={onSubmitHandler}>
          <h1>Create Car Listing</h1>
          <p>Please fill in this form to create an listing.</p>
          <hr />
          <label>Car Brand</label>
          <input type="text" placeholder="Enter Car Brand" name="brand" onChange={onChangeHandler}/>
          <label>Car Model</label>
          <input type="text" placeholder="Enter Car Model" name="model" onChange={onChangeHandler}/>
          <label>Description</label>
          <input
            type="text"
            placeholder="Enter Description"
            name="description"
            onChange={onChangeHandler}
          />
          <label>Car Year</label>
          <input type="number" placeholder="Enter Car Year" name="year" onChange={onChangeHandler}/>
          <label>Car Image</label>
          <input type="text" placeholder="Enter Car Image" name="imageUrl" onChange={onChangeHandler}/>
          <label>Car Price</label>
          <input type="number" placeholder="Enter Car Price" name="price" onChange={onChangeHandler}/>
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
