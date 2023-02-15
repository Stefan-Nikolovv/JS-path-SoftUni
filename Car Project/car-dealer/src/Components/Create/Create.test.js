import { CreateCar } from "./CreateCar";
import { BrowserRouter as Router } from "react-router-dom";
import { CarConponent } from "../../contexts/carContext";
import "@testing-library/jest-dom";
import { rest } from "msw";
import { setupServer } from "msw/node";
import * as router from "react-router";
import { fireEvent, render, screen, waitFor } from "@testing-library/react";

describe("Testing CeatePage", () => {
  const navigate = jest.fn();

  beforeEach(() => {
    jest.spyOn(router, "useNavigate").mockImplementation(() => navigate);
  });

  const server = setupServer();
  beforeAll(() => server.listen());
  afterEach(() => server.resetHandlers());
  afterAll(() => server.close());

  test("CarPage to be loaded", async () => {
    render(
      <Router>
        <CarConponent>
          <CreateCar />
        </CarConponent>
      </Router>
    );
    const carPageTestId = screen.getByTestId("createPage");
    await waitFor(() => expect(carPageTestId).toBeInTheDocument());
  });

  test("Test brand with empty string", async () => {
    render(
      <Router>
        <CarConponent>
          <CreateCar />
        </CarConponent>
      </Router>
    );

    const brandElement = screen.getByLabelText("Car Brand");
    fireEvent.change(brandElement, { target: { value: "" } });
    fireEvent.blur(brandElement);
    await waitFor(() => {
      expect(screen.getByTestId("brandError").textContent).toBe(
        "Brand is required!"
      );
    });
  });
  test("Test brand with smaller length", async () => {
    render(
      <Router>
        <CarConponent>
          <CreateCar />
        </CarConponent>
      </Router>
    );

    const brandElement = screen.getByLabelText("Car Brand");
    fireEvent.change(brandElement, { target: { value: "GT" } });
    fireEvent.blur(brandElement);
    await waitFor(() => {
      expect(screen.getByTestId("brandError").textContent).toBe(
        "Brand must be at least 3 characters!"
      );
    });
  });
  test("Test model empty string", async () => {
    render(
      <Router>
        <CarConponent>
          <CreateCar />
        </CarConponent>
      </Router>
    );

    const modelElement = screen.getByLabelText("Car Model");
    fireEvent.change(modelElement, { target: { value: "" } });
    fireEvent.blur(modelElement);
    await waitFor(() => {
      expect(screen.getByTestId("modelError").textContent).toBe(
        "Model is required!"
      );
    });
  });
  test("Test model with smaller length", async () => {
    render(
      <Router>
        <CarConponent>
          <CreateCar />
        </CarConponent>
      </Router>
    );

    const modelElement = screen.getByLabelText("Car Model");
    fireEvent.change(modelElement, { target: { value: "GT" } });
    fireEvent.blur(modelElement);
    await waitFor(() => {
      expect(screen.getByTestId("modelError").textContent).toBe(
        "Model must be at least 3 characters!"
      );
    });
  });
  test("Test model with smaller length", async () => {
    render(
      <Router>
        <CarConponent>
          <CreateCar />
        </CarConponent>
      </Router>
    );

    const modelElement = screen.getByLabelText("Car Model");
    fireEvent.change(modelElement, {
      target: { value: "GTasdasdasdghadshjkajk" },
    });
    fireEvent.blur(modelElement);
    await waitFor(() => {
      expect(screen.getByTestId("modelError").textContent).toBe(
        "Model must be shorter then 12 characters!"
      );
    });
  });
  test("Test description empty string", async () => {
    render(
      <Router>
        <CarConponent>
          <CreateCar />
        </CarConponent>
      </Router>
    );

    const descriptionElement = screen.getByLabelText("Description");
    fireEvent.change(descriptionElement, { target: { value: "" } });
    fireEvent.blur(descriptionElement);
    await waitFor(() => {
      expect(screen.getByTestId("descriptionError").textContent).toBe(
        "Description is required!"
      );
    });
  });
  test("Test description smaler length than required!", async () => {
    render(
      <Router>
        <CarConponent>
          <CreateCar />
        </CarConponent>
      </Router>
    );

    const descriptionElement = screen.getByLabelText("Description");
    fireEvent.change(descriptionElement, { target: { value: "bla bla" } });
    fireEvent.blur(descriptionElement);
    await waitFor(() => {
      expect(screen.getByTestId("descriptionError").textContent).toBe(
        "Description must be at least 10 characters!"
      );
    });
  });
  test("Test description with higher length than required!", async () => {
    render(
      <Router>
        <CarConponent>
          <CreateCar />
        </CarConponent>
      </Router>
    );

    const descriptionElement = screen.getByLabelText("Description");
    fireEvent.change(descriptionElement, {
      target: {
        value:
          "bla bla bla bla bla bla bla bla bla bla bla bla bla bla bla bla bla bla bla bla bla bla bla bla bla bla bla bla bla",
      },
    });
    fireEvent.blur(descriptionElement);
    await waitFor(() => {
      expect(screen.getByTestId("descriptionError").textContent).toBe(
        "Description must be shorter then 50 characters!"
      );
    });
  });
  test("Test year with empry string", async () => {
    render(
      <Router>
        <CarConponent>
          <CreateCar />
        </CarConponent>
      </Router>
    );

    const yearElement = screen.getByLabelText("Car Year");
    fireEvent.change(yearElement, { target: { value: "" } });
    fireEvent.blur(yearElement);
    await waitFor(() => {
      expect(screen.getByTestId("yearError").textContent).toBe(
        "Year is required!"
      );
    });
  });
  test("Test year with zero", async () => {
    render(
      <Router>
        <CarConponent>
          <CreateCar />
        </CarConponent>
      </Router>
    );

    const yearElement = screen.getByLabelText("Car Year");
    fireEvent.change(yearElement, { target: { value: 0 } });
    fireEvent.blur(yearElement);
    await waitFor(() => {
      expect(screen.getByTestId("yearError").textContent).toBe(
        "Year should be a postive Number."
      );
    });
  });
  test("Test year with negative number", async () => {
    render(
      <Router>
        <CarConponent>
          <CreateCar />
        </CarConponent>
      </Router>
    );

    const yearElement = screen.getByLabelText("Car Year");
    fireEvent.change(yearElement, { target: { value: -1 } });
    fireEvent.blur(yearElement);
    await waitFor(() => {
      expect(screen.getByTestId("yearError").textContent).toBe(
        "Year should be a postive Number."
      );
    });
  });

  test("Test imageUrl with empty string", async () => {
    render(
      <Router>
        <CarConponent>
          <CreateCar />
        </CarConponent>
      </Router>
    );

    const imageElement = screen.getByLabelText("Car Image");
    fireEvent.change(imageElement, { target: { value: "" } });
    fireEvent.blur(imageElement);
    await waitFor(() => {
      expect(screen.getByTestId("imageUrlError").textContent).toBe(
        "Image is required!"
      );
    });
  });
  test("Test imageUrl with not valid Link", async () => {
    render(
      <Router>
        <CarConponent>
          <CreateCar />
        </CarConponent>
      </Router>
    );

    const imageElement = screen.getByLabelText("Car Image");
    fireEvent.change(imageElement, { target: { value: "data.test.bg" } });
    fireEvent.blur(imageElement);
    await waitFor(() => {
      expect(screen.getByTestId("imageUrlError").textContent).toBe(
        "Image should starts with HTTP or HTTPS."
      );
    });
  });
  test("Test imageUrl with  valid Link", async () => {
    render(
      <Router>
        <CarConponent>
          <CreateCar />
        </CarConponent>
      </Router>
    );

    const imageElement = screen.getByLabelText("Car Image");
    fireEvent.change(imageElement, { target: { value: "https" } });
    fireEvent.blur(imageElement);
    await waitFor(() => {
      expect(screen.getByTestId("imageUrlError").textContent).toBe("");
    });
  });
  test("Test price with empry string", async () => {
    render(
      <Router>
        <CarConponent>
          <CreateCar />
        </CarConponent>
      </Router>
    );

    const priceElement = screen.getByLabelText("Car Price");
    fireEvent.change(priceElement, { target: { value: "" } });
    fireEvent.blur(priceElement);
    await waitFor(() => {
      expect(screen.getByTestId("priceError").textContent).toBe(
        "Price is required!"
      );
    });
  });
  test("Test price with zero", async () => {
    render(
      <Router>
        <CarConponent>
          <CreateCar />
        </CarConponent>
      </Router>
    );

    const priceElement = screen.getByLabelText("Car Price");
    fireEvent.change(priceElement, { target: { value: 0 } });
    fireEvent.blur(priceElement);
    await waitFor(() => {
      expect(screen.getByTestId("priceError").textContent).toBe(
        "Price cant be a negative number or Zero."
      );
    });
  });
  test("Test price with negative number", async () => {
    render(
      <Router>
        <CarConponent>
          <CreateCar />
        </CarConponent>
      </Router>
    );

    const priceElement = screen.getByLabelText("Car Price");
    fireEvent.change(priceElement, { target: { value: -1 } });
    fireEvent.blur(priceElement);
    await waitFor(() => {
      expect(screen.getByTestId("priceError").textContent).toBe(
        "Price cant be a negative number or Zero."
      );
    });
  });

  test("Can Create a publication of car",  async() => {
    server.use(
        rest.post("http://localhost:3030/data/carDealer/carId", (req, res, ctx) => {
          return res(
            ctx.status(200),
            ctx.json({
                _ownerId: "",
                brand: "",
                model: "",
                description: "",
                year: "",
                imageUrl: "",
                price: "",
                _createdOn: 0,
                _id: "",
              })
          );
        })
      );

    render(
      <Router>
        <CarConponent>
          <CreateCar url="http://localhost:3030/data/carDealer/carId" />
        </CarConponent>
      </Router>
    );

    const brandElement = screen.getByLabelText("Car Brand");
    const modelElement = screen.getByLabelText("Car Model");
    const descriptionElement = screen.getByLabelText("Description");
    const yearElement = screen.getByLabelText("Car Year");
    const imageUrlElement = screen.getByLabelText("Car Image");
    const priceElement = screen.getByLabelText("Car Price");
    const buttonSubmit = screen.getByRole("button", { name: "Submit" })

    fireEvent.change(brandElement, { target: { value: "Mercedes-Benz" }});
    fireEvent.change(modelElement, { target: { value: "s600" }});
    fireEvent.change(descriptionElement, {
      target: { value: "asdasdasdasdasdasd" },
    });
    fireEvent.change(yearElement, { target: { value: "1995" }});
    fireEvent.change(imageUrlElement, { target: { value: "https" }});
    fireEvent.change(priceElement, { target: { value: "15630" }});

    fireEvent.click(buttonSubmit);
   
   
      await waitFor(() => expect(navigate).toHaveBeenCalledWith("/catalog"))  
  });
});
