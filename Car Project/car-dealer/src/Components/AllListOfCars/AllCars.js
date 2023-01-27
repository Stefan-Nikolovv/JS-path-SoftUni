import { useEffect } from "react";
import { CarList } from "./CarList/CarList";
import { useContext } from "react";
import { CarContext } from "../../contexts/carContext";
import * as carService from '../../services/carService';

export const AllCars = () => {
const {currentCar,car} = useContext(CarContext);


useEffect(() =>   {
 carService.getAll()
 .then(result => {
  console.log(result)
  currentCar(result);
 })
 .catch((err) => {
  console.log(err)
 })
return () => currentCar([]);
},[])

// useEffect(() => () => {
//   currentCar([]);
//  },[])


//  carService.getAll()
//   .then(allCars => {
//     console.log(allCars);
//    return currentCar(allCars);
//   })
//   .catch((err) => {
//     console.error(err)
//   })

  
  return (
    <section id="car-listings">
      <h1>Car Listings</h1>
      <div className="listings">
        {car.length > 0 
        ?
        car.map(x => <CarList key={x._id} car={x}/>) 
        :
        <p className="no-cars">No cars in database.</p>
        }
        
      </div>
    </section>
  );
};
