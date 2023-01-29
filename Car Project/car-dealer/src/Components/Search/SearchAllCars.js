import { useState } from "react";
import { CarContext } from "../../contexts/carContext";
import { useContext } from "react";
import * as carService from '../../services/carService';
import { SearchedCar } from "./SearchedCar";

export const SearchAllCars = () => {
  const [searchField, setSearchField] = useState("");
  const [searchShow, setSearchShow] = useState(false); 
  const {car, currentCar} = useContext(CarContext);
   const onSearchHandler = (e) => {
      e.preventDefault();
      setSearchShow(true);
    
  };
        if(searchShow){
          setSearchShow(false);
          carService.getAll()
          .then(result => {
            currentCar(
              result.filter(x => (x.brand).toLowerCase() === (searchField.search).toLowerCase())
            )
          });
        };
        
        

  const onChangeHandler = (e) => {
    const target = e.target;
    setSearchField({
      [target.name]: target.value
    });

  };


  return (
    <section id="search-cars">
      <h1>Filter by Brand</h1>
      <div className="container">
        <input
          id="search-input"
          type="text"
          name="search"
          placeholder="Enter desired production year"
          onChange={onChangeHandler}
        />
        <button className="button-list" onClick={onSearchHandler} >Search</button>
      </div>
      <h2>Results:</h2>
      <div className="listings">
       
        
        {
          car.length > 0 
          ?
          car.map(x => <SearchedCar key={x._id} car={x}/>)
          :
           <p className="no-cars"> No results.</p>
        }
        
       
      </div>
    </section>
  );
};
