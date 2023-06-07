import React, { useEffect } from "react";
import { CarList } from "./CarList/CarList";
import { useContext } from "react";
import { CarContext } from "../../contexts/carContext";
import * as carService from '../../services/carService';

export const AllCars = () => {
const {currentCar,car} = useContext(CarContext);


useEffect(() =>   {
 carService.getAll()
 .then(result => {
  currentCar(result);
 })
 .catch((err) => {
  console.log(err)
 })
return () => currentCar([]);
},[])
 
  return (
    <section id="car-listings" data-testid='carList'>
      <h1>Car Listings</h1>
      <div className="listings">
        {car.length > 0 
        ?
        car.map(x => <CarList key={x._id} car={x}/>) 
        :
        <p className="no-cars" data-testid='carMessage'>No cars in database.</p>
        }
        
      </div>
    </section>
  );
};


// export class AllCars extends React.Component {
//   state = {car: []}
//   constructor(props){
//      super(props);
    
//   }
//   componentDidMount() {

//     carService.getAll()
//     .then(result => {
//       this.setState( 
//       this.state.car = result
//       );
//     })
//     .catch((err) => {
//       console.log(err)
//     })
//   }

//   render(){ 
    
//  return( 
//   <section id="car-listings" data-testid='carList'>
//   <h1>Car Listings</h1>
//   <div className="listings">
//     {this.state.car.length > 0 
//     ?
//     this.state.car.map(x => <CarList key={x._id} car={x}/>) 
//     :
//     <p className="no-cars" data-testid='carMessage'>No cars in database.</p>
//     }
    
//   </div>
// </section>)
//   }
// }
