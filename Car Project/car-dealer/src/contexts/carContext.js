import { createContext, useState } from "react";

export const CarContext = createContext();

export const CarConponent = ({children}) => {

    const[car, setCar] = useState([]);


    const currentCar = (carData) => {
        setCar(carData)
    };


    return <CarContext.Provider value={{car, currentCar}}>
        {children}
           </CarContext.Provider>
};
