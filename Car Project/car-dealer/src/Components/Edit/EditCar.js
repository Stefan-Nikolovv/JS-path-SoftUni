import { useContext, useEffect, useState } from "react";
import { CarContext } from "../../contexts/carContext";
import * as request from "../../services/carService";
import { useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";
export const EditCar = () => {
  const navigate = useNavigate();
  const { currentCar, car } = useContext(CarContext);
  const params = useParams();
  const [error, setError] = useState({
    brand: undefined,
    model: undefined,
    description: undefined,
    year: undefined,
    imageUrl: undefined,
    price: undefined,
  });
  const [isSubmit, setSubmit] = useState(false);

  const onSubmitHandler = (e) => {
    e.preventDefault();
    brandValidation(car.brand);
    modelValidation(car.model);
    desciptionValidate(car.description);
    yearValidation(car.year);
    imageUrlValidation(car.imageUrl);
    priceValidation(car.price)
    const resultOfErrors =  Object.values(error).filter(x => x === undefined).length
    const resultOfCarErrors = Object.values(car).filter(x => x === undefined).length
    if(resultOfErrors === 6 && resultOfCarErrors === 0 ){
      setSubmit(true);
    };
  };
 
  useEffect(() => {
    
    request.getOne(params.carId)
      .then((searchedCar) => {
        currentCar(searchedCar);
      })
      .catch((err) => {
        console.error(err);
      });
      return () => currentCar([]);
  }, []);

  

  const onChangeHandler = (e) => {
    const target = e.target;
    currentCar({
      ...car,
      [target.name]: target.value,
    });
  };

  
    
    useEffect(() => {
      if(isSubmit){
        request.editOne(params.carId, car)
        .then((edittedCar) => {
          currentCar(edittedCar);
          navigate(`/details/${params.carId}`);
        })
        .catch((err) => {
          console.error(err);
        });
      };
    },[isSubmit])

  
  function brandValidation(carData) {
    if (!carData || carData === undefined) {
         error.brand = "Brand is required!";
       } else if (carData.length <= 3) {
         error.brand = "Brand must be at least 3 characters!";
       } else {
         error.brand = undefined
         setError({ ...error });
       };
       setError({ ...error, brand: error.brand });
     };


  

    function modelValidation(carData) {
      if (!carData || carData === undefined) {
        error.model = "Model is required!";
      } else if (carData.length <= 2) {
        error.model = "Model must be at least 3 characters!";
      } else if (carData.length >= 12) {
        error.model = "Model must be shorter then 12 characters!";
      } else {
        error.model = undefined
        setError({ ...error });
      };
      setError({ ...error, model: error.model });
}
  

  
    function desciptionValidate(carData) {
        if (!carData || carData === undefined) {
        error.description = "Description is required!";
      } else if (carData.length <= 10) {
        error.description = "Description must be at least 10 characters!";
      } else if (carData.length >= 150) {
        error.description = "Description must be shorter then 50 characters!";
      } else {
        error.description = undefined
        setError({ ...error });
      };
      setError({ ...error, description: error.description });
      }
 

  
  function yearValidation(carData) {
  if (carData === "" || carData === undefined) {
        error.year = "Year is required!";
      } else if (carData <= 0) {
        error.year = "Year should be a postive Number.";
      } else {
        error.year = undefined;
        setError({ ...error });
      };
      setError({ ...error, year: error.year });
}


  
    function imageUrlValidation(carData) {
if (!carData || carData === undefined) {
        error.imageUrl = "Image is required!";
      } else if (!carData.startsWith("http")) {
        error.imageUrl = "Image should starts with HTTP or HTTPS.";
      } else {
       error.imageUrl = undefined;
        setError({ ...error });
      };
      setError({ ...error, imageUrl: error.imageUrl });
}


  
   function priceValidation(carData) {
    if (carData === "" || carData === undefined) {
        error.price = "Price is required!";
      } else if (carData <= 0) {
        error.price = "Price cant be a negative number or Zero.";
      } else {
        error.price = undefined;
        setError({ ...error });
      };
      setError({ ...error, price: error.price });
};


  
  return (
    <section id="edit-listing" data-testid={"editCarPage"}>
      <div className="container">
        <form id="edit-form" onSubmit={onSubmitHandler}>
          <h1>Edit Car Listing</h1>
          <p>Please fill in this form to edit an listing.</p>
          <hr />
          <label htmlFor="brand">Car Brand</label>
          <input
            type="text"
            id="brand"
            placeholder="Enter Car Brand"
            name="brand"
            onChange={onChangeHandler}
            defaultValue={car.brand}
            onBlur={(e) => brandValidation(e.target.value)}
          />
          <p className="error" data-testid={"brandError"}>{error.brand}</p>
          <label htmlFor="model">Car Model</label>
          <input
            type="text"
            id="model"
            placeholder="Enter Car Model"
            name="model"
            onChange={onChangeHandler}
            defaultValue={car.model}
            onBlur={(e) => modelValidation(e.target.value)}
          />
          <p className="error" data-testid={"modelError"}>{error.model}</p>
          <label htmlFor="description">Description</label>
          <input
            type="text"
            id="description"
            placeholder="Enter Description"
            name="description"
            onChange={onChangeHandler}
            defaultValue={car.description}
            onBlur={(e) => desciptionValidate(e.target.value)}
          />
          <p className="error" data-testid={"descriptionError"}>{error.description}</p>
          <label htmlFor="year">Car Year</label>
          <input
            type="number"
            id="year"
            placeholder="Enter Car Year"
            name="year"
            onChange={onChangeHandler}
            defaultValue={car.year}
            onBlur={(e) => yearValidation(e.target.value)}
          />
          <p className="error" data-testid={"yearError"}>{error.year}</p>
          <label htmlFor="imageUrl">Car Image</label>
          <input
            type="text"
            id="imageUrl"
            placeholder="Enter Car Image"
            name="imageUrl"
            onChange={onChangeHandler}
            defaultValue={car.imageUrl}
            onBlur={(e) => imageUrlValidation(e.target.value)}
          />
          <p className="error" data-testid={"imageUrlError"}>{error.imageUrl}</p>
          <label htmlFor="price">Car Price</label>
          <input
            type="number"
            id="price"
            placeholder="Enter Car Price"
            name="price"
            onChange={onChangeHandler}
            defaultValue={car.price}
            onBlur={(e) => priceValidation(e.target.value)}
          />
          <p className="error" data-testid={"priceError"}>{error.price}</p>
          <hr />
          <button data-testid="submit" type="click" className="registerbtn" defaultValue="Submit">
          Submit
          </button>
        </form>
      </div>
    </section>
  );
};
