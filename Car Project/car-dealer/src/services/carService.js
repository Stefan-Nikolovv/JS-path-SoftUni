import * as request from "./requester";

const baseUrl = 'http://localhost:3030/data';


export const createCar = (brand, model, description, year, imageUrl, price) => 
    request.post(`${baseUrl}/carDealer`, {brand, model, description, year, imageUrl, price});


export const getOne = (carId) => request.get(`${baseUrl}/carDealer/${carId}`);

export const getAll = () => request.get(`${baseUrl}/carDealer`);

export const editOne = (carId, carData) => request.put(`${baseUrl}/carDealer/${carId}`, carData);

export const deleteOne = (carId) => request.del(`${baseUrl}/carDealer/${carId}`);

