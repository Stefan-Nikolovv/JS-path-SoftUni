import { SearchAllCars } from "./SearchAllCars";
import { AuthComponent } from "../../contexts/authContext";
import { CarConponent, CarContext } from "../../contexts/carContext";
import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import { rest } from "msw";
import { setupServer } from "msw/node";
import { BrowserRouter as Router } from "react-router-dom";
import * as router from "react-router";


describe('Test Search Component', () => {
    const navigate = jest.fn();
    jest.mock("react-router", () => ({
      ...jest.requireActual("react-router"),
      useParams: jest.fn(),
    }));
    beforeEach(() => {
      jest.spyOn(router, "useNavigate").mockImplementation(() => navigate);
      jest.spyOn(router, "useParams").mockReturnValue({ carId: "1" });
    });

  const server = setupServer();
  beforeAll(() => server.listen());
  afterEach(() => server.resetHandlers());
  afterAll(() => server.close());


  test('Page to be loaded', async() => {

    const component = render(
        <Router>
        <AuthComponent >
          <CarConponent  >
            <SearchAllCars url={"http://localhost:3030/data/carDealer"} />
          </CarConponent>
          </AuthComponent>
      </Router>
    );

    const pageId = component.getByTestId('searchButtonID');
    await waitFor(() => expect(pageId).toBeInTheDocument())
  });

  test('to dont have already searched element', async() => {
    server.use(
        rest.get("http://localhost:3030/data/carDealer", (req, res, ctx) => {
          return res(ctx.status(200), ctx.json([]));
        })
      );
      const component = render(
        <Router>
        <AuthComponent >
          <CarConponent  >
            <SearchAllCars url={"http://localhost:3030/data/carDealer"} />
          </CarConponent>
          </AuthComponent>
      </Router>
    );

    const searchElement = component.getByTestId('resultOfSearchID');
    await waitFor(() => expect(searchElement.textContent).toBe('No results.'))

  });

  test('to navigate to Details page', async() => {
    const car = [{
        _ownerId: "1",
        brand: "mercedes",
        model: "s600",
        description: "neshto si neshtop si nessadas",
        year: "1995",
        imageUrl: "https",
        price: "15700",
        _createdOn: 0,
        _id: "1",
      }]
      
    
       

    server.use(
        rest.get(
          "http://localhost:3030/data/carDealer",
          (req, res, ctx) => {
            return res(
              ctx.status(200),
              ctx.json([{
                _ownerId: "1",
                brand: "mercedes",
                model: "s600",
                description: "neshto si neshtop si nessadas",
                year: "1995",
                imageUrl: "https",
                price: "15700",
                _createdOn: 0,
                _id: "1",
              }])
            );
          }
        )
      );

     
          const currentCar = () => {}
      const component = render(
        <Router>
        <AuthComponent >
          <CarContext.Provider value={{car, currentCar}} >
            <SearchAllCars url={"http://localhost:3030/data/carDealer"} />
          </CarContext.Provider>
          </AuthComponent>
      </Router>
    );
          const buttonDetails = component.getByRole('link', {name: "Details"});

          fireEvent.click(buttonDetails)
          await waitFor(() => expect(buttonDetails).toHaveAttribute('href', '/details/1'));
  });

  test('to have right Price', async() => {
    const car = [{
        _ownerId: "1",
        brand: "mercedes",
        model: "s600",
        description: "neshto si neshtop si nessadas",
        year: "1995",
        imageUrl: "https",
        price: "15700",
        _createdOn: 0,
        _id: "1",
      }]
      
    
       

    server.use(
        rest.get(
          "http://localhost:3030/data/carDealer",
          (req, res, ctx) => {
            return res(
              ctx.status(200),
              ctx.json([{
                _ownerId: "1",
                brand: "mercedes",
                model: "s600",
                description: "neshto si neshtop si nessadas",
                year: "1995",
                imageUrl: "https",
                price: "15700",
                _createdOn: 0,
                _id: "1",
              }])
            );
          }
        )
      );
          const currentCar = () => {}
      const component = render(
        <Router>
        <AuthComponent >
          <CarContext.Provider value={{car, currentCar}} >
            <SearchAllCars url={"http://localhost:3030/data/carDealer"} />
          </CarContext.Provider>
          </AuthComponent>
      </Router>
    );
          const priceSearchYear = component.getByTestId('priceSearchCar');

          
          await waitFor(() => expect(priceSearchYear.textContent).toBe('Price: 15700 $'));
  });

  test('to have right Year', async() => {
    const car = [{
        _ownerId: "1",
        brand: "mercedes",
        model: "s600",
        description: "neshto si neshtop si nessadas",
        year: "1995",
        imageUrl: "https",
        price: "15700",
        _createdOn: 0,
        _id: "1",
      }]
      
    
       

    server.use(
        rest.get(
          "http://localhost:3030/data/carDealer",
          (req, res, ctx) => {
            return res(
              ctx.status(200),
              ctx.json([{
                _ownerId: "1",
                brand: "mercedes",
                model: "s600",
                description: "neshto si neshtop si nessadas",
                year: "1995",
                imageUrl: "https",
                price: "15700",
                _createdOn: 0,
                _id: "1",
              }])
            );
          }
        )
      );
          const currentCar = () => {}
      const component = render(
        <Router>
        <AuthComponent >
          <CarContext.Provider value={{car, currentCar}} >
            <SearchAllCars url={"http://localhost:3030/data/carDealer"} />
          </CarContext.Provider>
          </AuthComponent>
      </Router>
    );
          const yearSearchCar = component.getByTestId('yearSearchCar');

          
          await waitFor(() => expect(yearSearchCar.textContent).toBe('Year:1995'));
  });

  


})