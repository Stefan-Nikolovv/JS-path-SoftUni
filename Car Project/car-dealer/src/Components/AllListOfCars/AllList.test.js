import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import { AllCars } from "./AllCars";
import "@testing-library/jest-dom";
import { rest } from "msw";
import { setupServer } from "msw/node";
import { BrowserRouter as Router } from "react-router-dom";
import * as router from "react-router";
import { CarConponent, CarContext } from "../../contexts/carContext";
import { AuthComponent } from "../../contexts/authContext";


describe("Test CatalogPage", () => {
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

  test("Test Page is loaded", async () => {
    const component = render(
        <Router>
        <CarConponent>
          <AllCars url="http://localhost:3030/data/carDealer" />
        </CarConponent>
      </Router>
    );

    const testId = component.getByTestId("carList");
    await waitFor(() => expect(testId).toBeInTheDocument());
  });

  test("Catalog dont have created publications", async () => {
   

    server.use(
      rest.get("http://localhost:3030/data/carDealer", (req, res, ctx) => {
        return res(ctx.status(200), ctx.json([]));
      })
    );
    const component = render(
        <Router>
        <CarConponent>
          <AllCars url="http://localhost:3030/data/carDealer" />
        </CarConponent>
      </Router>
    );

    const testId = component.getByTestId("carMessage");
    await waitFor(() =>
      expect(testId.textContent).toBe("No cars in database.")
    );
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
            <AllCars url={"http://localhost:3030/data/carDealer"} />
          </CarContext.Provider>
          </AuthComponent>
      </Router>
    );
          const buttonDetails = component.getByRole('link', {name: "Details"});

          fireEvent.click(buttonDetails)
          await waitFor(() => expect(buttonDetails).toHaveAttribute('href', '/details/1'));
  });


  test('Page to have right Year', async() => {
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
            <AllCars url={"http://localhost:3030/data/carDealer"} />
          </CarContext.Provider>
          </AuthComponent>
      </Router>
    );
          const yearElement = component.getByTestId("yearCarList");

          
          await waitFor(() => expect(yearElement.textContent).toBe('Year: 1995'));
  });

  test('Page to have right Price', async() => {
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
            <AllCars url={"http://localhost:3030/data/carDealer"} />
          </CarContext.Provider>
          </AuthComponent>
      </Router>
    );
          const priceElement = component.getByTestId("priceCarList");
          
          await waitFor(() => expect(priceElement.textContent).toBe('Price: 15700 $'));
  });

 
  
});
