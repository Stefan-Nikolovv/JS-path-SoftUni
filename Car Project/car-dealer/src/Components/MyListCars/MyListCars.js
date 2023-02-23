import { useEffect } from "react";
import * as carService from '../../services/carService'
import { useContext } from "react";
import { UserContext } from "../../contexts/authContext";
import { ListCar } from "./ListCar";
import { CarContext } from "../../contexts/carContext";

export const MyList = () => {

const {currentCar, car} = useContext(CarContext);
const {user} = useContext(UserContext);

useEffect(() => {
  carService.getAll()
  .then(result => {
    currentCar(result.filter(x => x._ownerId === user._id))
  });
  return () => currentCar([]);
},[]);
  
  return (
    <section id="my-listings" data-testid = 'MyListCarID'>
      <h1>My car listings</h1>
      <div className="listings">
        {/* Display all records */}
        {car.length > 0 
        ?
        car.map(x => <ListCar key={x._id} car={x}/>)
        :
        <p className="no-cars" data-testid = 'listCarError'>You haven't listed any cars yet.</p>
        }
      </div>
    </section>
  );
};
