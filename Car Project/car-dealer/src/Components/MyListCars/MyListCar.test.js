import { BrowserRouter as Router } from "react-router-dom";
import { CarConponent, CarContext} from "../../contexts/carContext";
import { UserContext, AuthComponent } from "../../contexts/authContext";
import "@testing-library/jest-dom";
import { rest } from "msw";
import { setupServer } from "msw/node";
import * as router from "react-router";
import { MyList } from "./MyListCars";



import { fireEvent, render, screen, waitFor } from "@testing-library/react";


describe("Test MyList", () => {
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

  test('MyListCar component to be loaded', async() => {


    
    const component = render(
        <Router>
        <AuthComponent >
          <CarConponent >
            <MyList url={"http://localhost:3030/data/carDealer"} />
          </CarConponent>
          </AuthComponent>
      </Router>
    );
   
    const pageID = component.getByTestId('MyListCarID');
    await waitFor(() => expect(pageID).toBeInTheDocument());
  });

  test('No added items', async() => {

    const component = render(
        <Router>
        <AuthComponent >
          <CarConponent >
            <MyList url={"http://localhost:3030/data/carDealer"} />
          </CarConponent>
          </AuthComponent>
      </Router>
    );

      server.use(
        rest.get(
          "http://localhost:3030/data/carDealer",
          (req, res, ctx) => {
            return res(
              ctx.status(200),
              ctx.json([{}])
            );
          }
        )
      );

      const string = component.getByTestId('listCarError');

      await waitFor(() => expect(string.textContent).toBe(`You haven't listed any cars yet.`))
  });

  test('to have item', async() => {
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
            <MyList url={"http://localhost:3030/data/carDealer"} />
          </CarContext.Provider>
          </AuthComponent>
      </Router>
    );
          const buttonDetails = screen.getByRole('link', {name: "Details"});
          await waitFor(() => expect(buttonDetails).toBeInTheDocument());
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
            <MyList url={"http://localhost:3030/data/carDealer"} />
          </CarContext.Provider>
          </AuthComponent>
      </Router>
    );
          const buttonDetails = component.getByRole('link', {name: "Details"});

          fireEvent.click(buttonDetails)
          await waitFor(() => expect(buttonDetails).toHaveAttribute('href', '/details/1'));
  });


});