import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import { AllCars } from "./AllCars";
import "@testing-library/jest-dom";
import { rest } from "msw";
import { setupServer } from "msw/node";
import { BrowserRouter as Router } from "react-router-dom";
import * as router from "react-router";
import { CarConponent } from "../../contexts/carContext";
import { CarList } from "./CarList/CarList";

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
  

  
});
