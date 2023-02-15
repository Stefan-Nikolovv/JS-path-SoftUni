import { BrowserRouter as Router } from "react-router-dom";
import { CarConponent } from "../../contexts/carContext";
import { AuthComponent } from "../../contexts/authContext";
import "@testing-library/jest-dom";
import { rest } from "msw";
import { setupServer } from "msw/node";
import * as router from "react-router";
import { Details } from "./Details";

import { fireEvent, render, screen, waitFor } from "@testing-library/react";


describe("Test DetailsPage", () => {
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

  test("DetailsPage to be loaded", async() => {


    render(
       <Router>
        <AuthComponent>
        <CarConponent>
            <Details/>
        </CarConponent>
        </AuthComponent>
       </Router> 
    );

    await waitFor(() => expect(screen.getByTestId('detailsPage')).toBeInTheDocument())
  });

  test("Test Brand Field is displayed", async() => {
    server.use(
        rest.get("http://localhost:3030/data/carDealer/:carId", (req, res, ctx) => {
            return res(
                ctx.status(200),
                ctx.json({
                  _ownerId: "1",
                  brand: "mercedes",
                  model: "s600",
                  description: "neshto si neshtop si nessadas",
                  year: "1995",
                  imageUrl: "https",
                  price: "15700",
                  _createdOn: 0,
                  _id: "1",
                })
              );
        })
    )

    const component = render (
        <Router>
        <AuthComponent>
        <CarConponent>
            <Details url={"http://localhost:3030/data/carDealer/:carId"}/>
            </CarConponent>
        </AuthComponent>
       </Router> 
    )

    const brandElement = component.getByTestId("brandDetails");
    

    await waitFor(() => expect(brandElement.textContent).toBe("Brand:mercedes"))

  });
  
  test("Test Model Field is displayed", async() => {
    server.use(
        rest.get("http://localhost:3030/data/carDealer/:carId", (req, res, ctx) => {
            return res(
                ctx.status(200),
                ctx.json({
                  _ownerId: "1",
                  brand: "mercedes",
                  model: "s600",
                  description: "neshto si neshtop si nessadas",
                  year: "1995",
                  imageUrl: "https",
                  price: "15700",
                  _createdOn: 0,
                  _id: "1",
                })
              );
        })
    )

    const component = render (
        <Router>
        <AuthComponent>
        <CarConponent>
            <Details url={"http://localhost:3030/data/carDealer/:carId"}/>
            </CarConponent>
        </AuthComponent>
       </Router> 
    )

    
    const modelElement = component.getByTestId("modelDetails");
    

    await waitFor(() => expect(modelElement.textContent).toBe("Model:s600"))

  });
  test("Test Year Field is displayed", async() => {
    server.use(
        rest.get("http://localhost:3030/data/carDealer/:carId", (req, res, ctx) => {
            return res(
                ctx.status(200),
                ctx.json({
                  _ownerId: "1",
                  brand: "mercedes",
                  model: "s600",
                  description: "neshto si neshtop si nessadas",
                  year: "1995",
                  imageUrl: "https",
                  price: "15700",
                  _createdOn: 0,
                  _id: "1",
                })
              );
        })
    )

    const component = render (
        <Router>
        <AuthComponent>
        <CarConponent>
            <Details url={"http://localhost:3030/data/carDealer/:carId"}/>
            </CarConponent>
        </AuthComponent>
       </Router> 
    )

    
   
     const yearElement = component.getByTestId("yearDetails");
    

    await waitFor(() => expect(yearElement.textContent).toBe("Year:1995"))

  });
  test("Test Price Field is displayed", async() => {
    server.use(
        rest.get("http://localhost:3030/data/carDealer/:carId", (req, res, ctx) => {
            return res(
                ctx.status(200),
                ctx.json({
                  _ownerId: "1",
                  brand: "mercedes",
                  model: "s600",
                  description: "neshto si neshtop si nessadas",
                  year: "1995",
                  imageUrl: "https",
                  price: "15700",
                  _createdOn: 0,
                  _id: "1",
                })
              );
        })
    )

    const component = render (
        <Router>
        <AuthComponent>
        <CarConponent>
            <Details url={"http://localhost:3030/data/carDealer/:carId"}/>
            </CarConponent>
        </AuthComponent>
       </Router> 
    )

    
   
    const priceElement = component.getByTestId("priceDetails");
  

    await waitFor(() => expect(priceElement.textContent).toBe("Price:15700$"))

  });
  test("Test Description Field is displayed", async() => {
    server.use(
        rest.get("http://localhost:3030/data/carDealer/:carId", (req, res, ctx) => {
            return res(
                ctx.status(200),
                ctx.json({
                  _ownerId: "1",
                  brand: "mercedes",
                  model: "s600",
                  description: "neshto si neshtop si nessadas",
                  year: "1995",
                  imageUrl: "https",
                  price: "15700",
                  _createdOn: 0,
                  _id: "1",
                })
              );
        })
    )

    const component = render (
        <Router>
        <AuthComponent>
        <CarConponent>
            <Details url={"http://localhost:3030/data/carDealer/:carId"}/>
            </CarConponent>
        </AuthComponent>
       </Router> 
    )

    
    
     const descriptionElement = component.getByTestId("descriptionDetails");
    
    await waitFor(() => expect(descriptionElement.textContent).toBe("Description:neshto si neshtop si nessadas"))

  });
  test("Test ImageURL Field is displayed", async() => {
    server.use(
        rest.get("http://localhost:3030/data/carDealer/:carId", (req, res, ctx) => {
            return res(
                ctx.status(200),
                ctx.json({
                  _ownerId: "1",
                  brand: "mercedes",
                  model: "s600",
                  description: "neshto si neshtop si nessadas",
                  year: "1995",
                  imageUrl: "https",
                  price: "15700",
                  _createdOn: 0,
                  _id: "1",
                })
              );
        })
    )

    const component = render (
        <Router>
        <AuthComponent>
        <CarConponent>
            <Details url={"http://localhost:3030/data/carDealer/:carId"}/>
            </CarConponent>
        </AuthComponent>
       </Router> 
    )

    
    
     const imageUrlElement = component.getByTestId("imageUrlId");

    await waitFor(() => expect(imageUrlElement).toBeInTheDocument())

  });
  //TODO is Owner of the Car to dispayed Edit and Delete buttons......
});
