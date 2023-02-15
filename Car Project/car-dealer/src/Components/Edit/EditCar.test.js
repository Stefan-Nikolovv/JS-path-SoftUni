import { EditCar } from "./EditCar";
import { BrowserRouter as Router } from "react-router-dom";
import { CarConponent } from "../../contexts/carContext";
import "@testing-library/jest-dom";
import {  rest } from "msw";
import { setupServer } from "msw/node";
import * as router from "react-router";

import {
  fireEvent,
  render,
  screen,
  waitFor,
} from "@testing-library/react";




describe("EditPage Tests", () => {
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

  test("Test EditCarPage to be loaded", async () => {
    server.use(
      rest.get("http://localhost:3030/data/carDealer/:id", (req, res, ctx) => {
        return res(
          ctx.status(200),
          ctx.json({
            _ownerId: "1",
            brand: "mercedes",
            model: "s600",
            description: "neshto si neshtop si nessadas",
            year: "1995",
            imageUrl: "https",
            price: "15960",
            _createdOn: 0,
            _id: "",
          })
        );
      })
    );
    render(
      <Router>
        <CarConponent>
          <EditCar url="http://localhost:3030/data/carDealer/:id" />
        </CarConponent>
      </Router>
    );

    const testId = screen.getByTestId("editCarPage");
    await waitFor(() => expect(testId).toBeInTheDocument());
  });

  test("Brand Label to be with right information", async () => {
    server.use(
      rest.get("http://localhost:3030/data/carDealer/:id", (req, res, ctx) => {
        return res(
          ctx.status(200),
          ctx.json({
            _ownerId: "1",
            brand: "mercedes",
            model: "s600",
            description: "neshto si neshtop si nessadas",
            year: "1995",
            imageUrl: "https",
            price: "15960",
            _createdOn: 0,
            _id: "",
          })
        );
      })
    );
    render(
      <Router>
        <CarConponent>
          <EditCar url="http://localhost:3030/data/carDealer/:id" />
        </CarConponent>
      </Router>
    );

    const brandElement = screen.getByLabelText("Car Brand");
    await waitFor(() => expect(brandElement.value).toMatch("mercedes"));
  });
  test("Test Model Label getted with right information", async () => {
    server.use(
      rest.get("http://localhost:3030/data/carDealer/:id", (req, res, ctx) => {
        return res(
          ctx.status(200),
          ctx.json({
            _ownerId: "1",
            brand: "mercedes",
            model: "s600",
            description: "neshto si neshtop si nessadas",
            year: "1995",
            imageUrl: "https",
            price: "15960",
            _createdOn: 0,
            _id: "",
          })
        );
      })
    );
    render(
      <Router>
        <CarConponent>
          <EditCar url="http://localhost:3030/data/carDealer/:id" />
        </CarConponent>
      </Router>
    );

    const modelElement = screen.getByLabelText("Car Model");
    await waitFor(() => expect(modelElement.value).toMatch("s600"));
  });
  test("Description Label to be getted with right information", async () => {
    server.use(
      rest.get("http://localhost:3030/data/carDealer/:id", (req, res, ctx) => {
        return res(
          ctx.status(200),
          ctx.json({
            _ownerId: "1",
            brand: "mercedes",
            model: "s600",
            description: "neshto si neshtop si nessadas",
            year: "1995",
            imageUrl: "https",
            price: "15960",
            _createdOn: 0,
            _id: "",
          })
        );
      })
    );
    render(
      <Router>
        <CarConponent>
          <EditCar url="http://localhost:3030/data/carDealer/:id" />
        </CarConponent>
      </Router>
    );

    const descriptionElement = screen.getByLabelText("Description");
    await waitFor(() =>
      expect(descriptionElement.value).toMatch("neshto si neshtop si nessadas")
    );
  });
  test("Year Label to be getted with right information", async () => {
    server.use(
      rest.get("http://localhost:3030/data/carDealer/:id", (req, res, ctx) => {
        return res(
          ctx.status(200),
          ctx.json({
            _ownerId: "1",
            brand: "mercedes",
            model: "s600",
            description: "neshto si neshtop si nessadas",
            year: "1995",
            imageUrl: "https",
            price: "15960",
            _createdOn: 0,
            _id: "",
          })
        );
      })
    );
    render(
      <Router>
        <CarConponent>
          <EditCar url="http://localhost:3030/data/carDealer/:id" />
        </CarConponent>
      </Router>
    );

    const yearElement = screen.getByLabelText("Car Year");
    await waitFor(() => expect(yearElement.value).toMatch("1995"));
  });
  test("Image to be getted with right information", async () => {
    server.use(
      rest.get("http://localhost:3030/data/carDealer/:id", (req, res, ctx) => {
        return res(
          ctx.status(200),
          ctx.json({
            _ownerId: "1",
            brand: "mercedes",
            model: "s600",
            description: "neshto si neshtop si nessadas",
            year: "1995",
            imageUrl: "https",
            price: "15960",
            _createdOn: 0,
            _id: "",
          })
        );
      })
    );
    render(
      <Router>
        <CarConponent>
          <EditCar url="http://localhost:3030/data/carDealer/:id" />
        </CarConponent>
      </Router>
    );

    const imageUrlElement = screen.getByLabelText("Car Image");
    await waitFor(() => expect(imageUrlElement.value).toMatch("https"));
  });
  test("Price Label to be getted with right information", async () => {
    server.use(
      rest.get("http://localhost:3030/data/carDealer/:id", (req, res, ctx) => {
        return res(
          ctx.status(200),
          ctx.json({
            _ownerId: "1",
            brand: "mercedes",
            model: "s600",
            description: "neshto si neshtop si nessadas",
            year: "1995",
            imageUrl: "https",
            price: "15960",
            _createdOn: 0,
            _id: "",
          })
        );
      })
    );
    render(
      <Router>
        <CarConponent>
          <EditCar url="http://localhost:3030/data/carDealer/:id" />
        </CarConponent>
      </Router>
    );

    const priceElement = screen.getByLabelText("Car Price");
    await waitFor(() => expect(priceElement.value).toMatch("15960"));
  });
  test("Test Brand Label validation with empty string", async () => {
    server.use(
      rest.get("http://localhost:3030/data/carDealer/:id", (req, res, ctx) => {
        return res(
          ctx.status(200),
          ctx.json({
            _ownerId: "1",
            brand: "mercedes",
            model: "s600",
            description: "neshto si neshtop si nessadas",
            year: "1995",
            imageUrl: "https",
            price: "15960",
            _createdOn: 0,
            _id: "",
          })
        );
      })
    );
    render(
      <Router>
        <CarConponent>
          <EditCar url="http://localhost:3030/data/carDealer/:id" />
        </CarConponent>
      </Router>
    );

    const brandElement = screen.getByLabelText("Car Brand");
    fireEvent.change(brandElement, { target: { value: "" } });
    fireEvent.blur(brandElement);
    const errrorMessage = screen.getByTestId("brandError");
    await waitFor(() =>
      expect(errrorMessage.textContent).toBe("Brand is required!")
    );
  });
  test("Brand Label validation with wrong min length", async () => {
    server.use(
      rest.get("http://localhost:3030/data/carDealer/:id", (req, res, ctx) => {
        return res(
          ctx.status(200),
          ctx.json({
            _ownerId: "1",
            brand: "mercedes",
            model: "s600",
            description: "neshto si neshtop si nessadas",
            year: "1995",
            imageUrl: "https",
            price: "15960",
            _createdOn: 0,
            _id: "",
          })
        );
      })
    );
    render(
      <Router>
        <CarConponent>
          <EditCar url="http://localhost:3030/data/carDealer/:id" />
        </CarConponent>
      </Router>
    );

    const brandElement = screen.getByLabelText("Car Brand");
    fireEvent.change(brandElement, { target: { value: "BMW" } });
    fireEvent.blur(brandElement);
    const errrorMessage = screen.getByTestId("brandError");
    await waitFor(() =>
      expect(errrorMessage.textContent).toBe(
        "Brand must be at least 3 characters!"
      )
    );
  });

  test("Model Label validation with empty string", async () => {
    server.use(
      rest.get("http://localhost:3030/data/carDealer/:id", (req, res, ctx) => {
        return res(
          ctx.status(200),
          ctx.json({
            _ownerId: "1",
            brand: "mercedes",
            model: "s600",
            description: "neshto si neshtop si nessadas",
            year: "1995",
            imageUrl: "https",
            price: "15960",
            _createdOn: 0,
            _id: "",
          })
        );
      })
    );
    render(
      <Router>
        <CarConponent>
          <EditCar url="http://localhost:3030/data/carDealer/:id" />
        </CarConponent>
      </Router>
    );

    const modelElement = screen.getByLabelText("Car Model");
    fireEvent.change(modelElement, { target: { value: "" } });
    fireEvent.blur(modelElement);
    const errrorMessage = screen.getByTestId("modelError");
    await waitFor(() =>
      expect(errrorMessage.textContent).toBe("Model is required!")
    );
  });
  test("Model Label validation with wrong min length", async () => {
    server.use(
      rest.get("http://localhost:3030/data/carDealer/:id", (req, res, ctx) => {
        return res(
          ctx.status(200),
          ctx.json({
            _ownerId: "1",
            brand: "mercedes",
            model: "s600",
            description: "neshto si neshtop si nessadas",
            year: "1995",
            imageUrl: "https",
            price: "15960",
            _createdOn: 0,
            _id: "",
          })
        );
      })
    );
    render(
      <Router>
        <CarConponent>
          <EditCar url="http://localhost:3030/data/carDealer/:id" />
        </CarConponent>
      </Router>
    );

    const modelElement = screen.getByLabelText("Car Model");
    fireEvent.change(modelElement, { target: { value: "BM" } });
    fireEvent.blur(modelElement);
    const errrorMessage = screen.getByTestId("modelError");
    await waitFor(() =>
      expect(errrorMessage.textContent).toBe(
        "Model must be at least 3 characters!"
      )
    );
  });

  test("Model Label validation with wrong max length", async () => {
    server.use(
      rest.get("http://localhost:3030/data/carDealer/:id", (req, res, ctx) => {
        return res(
          ctx.status(200),
          ctx.json({
            _ownerId: "1",
            brand: "mercedes",
            model: "s600",
            description: "neshto si neshtop si nessadas",
            year: "1995",
            imageUrl: "https",
            price: "15960",
            _createdOn: 0,
            _id: "",
          })
        );
      })
    );
    render(
      <Router>
        <CarConponent>
          <EditCar url="http://localhost:3030/data/carDealer/:id" />
        </CarConponent>
      </Router>
    );

    const modelElement = screen.getByLabelText("Car Model");
    fireEvent.change(modelElement, {
      target: { value: "BMWBMWBMWBMWBMWBMWBMWBMWBMWBMWBMW" },
    });
    fireEvent.blur(modelElement);
    const errrorMessage = screen.getByTestId("modelError");
    await waitFor(() =>
      expect(errrorMessage.textContent).toBe(
        "Model must be shorter then 12 characters!"
      )
    );
  });
  test("Descriptin Label validation with emptry string", async () => {
    server.use(
      rest.get("http://localhost:3030/data/carDealer/:id", (req, res, ctx) => {
        return res(
          ctx.status(200),
          ctx.json({
            _ownerId: "1",
            brand: "mercedes",
            model: "s600",
            description: "neshto si neshtop si nessadas",
            year: "1995",
            imageUrl: "https",
            price: "15960",
            _createdOn: 0,
            _id: "",
          })
        );
      })
    );
    render(
      <Router>
        <CarConponent>
          <EditCar url="http://localhost:3030/data/carDealer/:id" />
        </CarConponent>
      </Router>
    );

    const descriptionElement = screen.getByLabelText("Description");
    fireEvent.change(descriptionElement, { target: { value: "" } });
    fireEvent.blur(descriptionElement);
    const errrorMessage = screen.getByTestId("descriptionError");
    await waitFor(() =>
      expect(errrorMessage.textContent).toBe("Description is required!")
    );
  });
  test("Descriptin Label validation with emptry string", async () => {
    server.use(
      rest.get("http://localhost:3030/data/carDealer/:id", (req, res, ctx) => {
        return res(
          ctx.status(200),
          ctx.json({
            _ownerId: "1",
            brand: "mercedes",
            model: "s600",
            description: "neshto si neshtop si nessadas",
            year: "1995",
            imageUrl: "https",
            price: "15960",
            _createdOn: 0,
            _id: "",
          })
        );
      })
    );
    render(
      <Router>
        <CarConponent>
          <EditCar url="http://localhost:3030/data/carDealer/:id" />
        </CarConponent>
      </Router>
    );

    const descriptionElement = screen.getByLabelText("Description");
    fireEvent.change(descriptionElement, { target: { value: "asdasdasd" } });
    fireEvent.blur(descriptionElement);
    const errrorMessage = screen.getByTestId("descriptionError");
    await waitFor(() =>
      expect(errrorMessage.textContent).toBe(
        "Description must be at least 10 characters!"
      )
    );
  });
  test("Descriptin Label validation with emptry string", async () => {
    server.use(
      rest.get("http://localhost:3030/data/carDealer/:id", (req, res, ctx) => {
        return res(
          ctx.status(200),
          ctx.json({
            _ownerId: "1",
            brand: "mercedes",
            model: "s600",
            description: "neshto si neshtop si nessadas",
            year: "1995",
            imageUrl: "https",
            price: "15960",
            _createdOn: 0,
            _id: "",
          })
        );
      })
    );
    render(
      <Router>
        <CarConponent>
          <EditCar url="http://localhost:3030/data/carDealer/:id" />
        </CarConponent>
      </Router>
    );

    const descriptionElement = screen.getByLabelText("Description");
    fireEvent.change(descriptionElement, {
      target: {
        value:
          "asdasdasdasdasdasdasdasdasdasdasdasdasdasdasdasdasdasdasdasdasdasdasdasdasdasdasdasdasdasdasdasdasdasdasdasdasdasdasdasdasdasdasdasdasdasdasdasdasdasdasdasdasdasd",
      },
    });
    fireEvent.blur(descriptionElement);
    const errrorMessage = screen.getByTestId("descriptionError");
    await waitFor(() =>
      expect(errrorMessage.textContent).toBe(
        "Description must be shorter then 50 characters!"
      )
    );
  });
  test("Year Label validation with empty string", async () => {
    server.use(
      rest.get("http://localhost:3030/data/carDealer/:id", (req, res, ctx) => {
        return res(
          ctx.status(200),
          ctx.json({
            _ownerId: "1",
            brand: "mercedes",
            model: "s600",
            description: "neshto si neshtop si nessadas",
            year: "1995",
            imageUrl: "https",
            price: "15960",
            _createdOn: 0,
            _id: "",
          })
        );
      })
    );
    render(
      <Router>
        <CarConponent>
          <EditCar url="http://localhost:3030/data/carDealer/:id" />
        </CarConponent>
      </Router>
    );

    const yearElement = screen.getByLabelText("Car Year");
    fireEvent.change(yearElement, { target: { value: "" } });
    fireEvent.blur(yearElement);
    const errrorMessage = screen.getByTestId("yearError");
    await waitFor(() =>
      expect(errrorMessage.textContent).toBe("Year is required!")
    );
  });

  test("Year Label validation with zero", async () => {
    server.use(
      rest.get("http://localhost:3030/data/carDealer/:id", (req, res, ctx) => {
        return res(
          ctx.status(200),
          ctx.json({
            _ownerId: "1",
            brand: "mercedes",
            model: "s600",
            description: "neshto si neshtop si nessadas",
            year: "1995",
            imageUrl: "https",
            price: "15960",
            _createdOn: 0,
            _id: "",
          })
        );
      })
    );
    render(
      <Router>
        <CarConponent>
          <EditCar url="http://localhost:3030/data/carDealer/:id" />
        </CarConponent>
      </Router>
    );

    const yearElement = screen.getByLabelText("Car Year");
    fireEvent.change(yearElement, { target: { value: "0" } });
    fireEvent.blur(yearElement);
    const errrorMessage = screen.getByTestId("yearError");
    await waitFor(() =>
      expect(errrorMessage.textContent).toBe("Year should be a postive Number.")
    );
  });
  test("Year Label validation with negative number", async () => {
    server.use(
      rest.get("http://localhost:3030/data/carDealer/:id", (req, res, ctx) => {
        return res(
          ctx.status(200),
          ctx.json({
            _ownerId: "1",
            brand: "mercedes",
            model: "s600",
            description: "neshto si neshtop si nessadas",
            year: "1995",
            imageUrl: "https",
            price: "15960",
            _createdOn: 0,
            _id: "",
          })
        );
      })
    );
    render(
      <Router>
        <CarConponent>
          <EditCar url="http://localhost:3030/data/carDealer/:id" />
        </CarConponent>
      </Router>
    );

    const yearElement = screen.getByLabelText("Car Year");
    fireEvent.change(yearElement, { target: { value: "-1" } });
    fireEvent.blur(yearElement);
    const errrorMessage = screen.getByTestId("yearError");
    await waitFor(() =>
      expect(errrorMessage.textContent).toBe("Year should be a postive Number.")
    );
  });
  test("Image Label validation with empty string", async () => {
    server.use(
      rest.get("http://localhost:3030/data/carDealer/:id", (req, res, ctx) => {
        return res(
          ctx.status(200),
          ctx.json({
            _ownerId: "1",
            brand: "mercedes",
            model: "s600",
            description: "neshto si neshtop si nessadas",
            year: "1995",
            imageUrl: "https",
            price: "15960",
            _createdOn: 0,
            _id: "",
          })
        );
      })
    );
    render(
      <Router>
        <CarConponent>
          <EditCar url="http://localhost:3030/data/carDealer/:id" />
        </CarConponent>
      </Router>
    );

    const imageUrlElement = screen.getByLabelText("Car Image");
    fireEvent.change(imageUrlElement, { target: { value: "" } });
    fireEvent.blur(imageUrlElement);
    const errrorMessage = screen.getByTestId("imageUrlError");
    await waitFor(() =>
      expect(errrorMessage.textContent).toBe("Image is required!")
    );
  });
  test("Image Label validation with wrong link address", async () => {
    server.use(
      rest.get("http://localhost:3030/data/carDealer/:id", (req, res, ctx) => {
        return res(
          ctx.status(200),
          ctx.json({
            _ownerId: "1",
            brand: "mercedes",
            model: "s600",
            description: "neshto si neshtop si nessadas",
            year: "1995",
            imageUrl: "https",
            price: "15960",
            _createdOn: 0,
            _id: "",
          })
        );
      })
    );
    render(
      <Router>
        <CarConponent>
          <EditCar url="http://localhost:3030/data/carDealer/:id" />
        </CarConponent>
      </Router>
    );

    const imageUrlElement = screen.getByLabelText("Car Image");
    fireEvent.change(imageUrlElement, { target: { value: "wwww" } });
    fireEvent.blur(imageUrlElement);
    const errrorMessage = screen.getByTestId("imageUrlError");
    await waitFor(() =>
      expect(errrorMessage.textContent).toBe(
        "Image should starts with HTTP or HTTPS."
      )
    );
  });
  test("Price Label validation with empty string", async () => {
    server.use(
      rest.get("http://localhost:3030/data/carDealer/:id", (req, res, ctx) => {
        return res(
          ctx.status(200),
          ctx.json({
            _ownerId: "1",
            brand: "mercedes",
            model: "s600",
            description: "neshto si neshtop si nessadas",
            year: "1995",
            imageUrl: "https",
            price: "15960",
            _createdOn: 0,
            _id: "",
          })
        );
      })
    );
    render(
      <Router>
        <CarConponent>
          <EditCar url="http://localhost:3030/data/carDealer/:id" />
        </CarConponent>
      </Router>
    );

    const priceElement = screen.getByLabelText("Car Price");
    fireEvent.change(priceElement, { target: { value: "" } });
    fireEvent.blur(priceElement);
    const errrorMessage = screen.getByTestId("priceError");
    await waitFor(() =>
      expect(errrorMessage.textContent).toBe("Price is required!")
    );
  });
  test("Price Label validation with zero", async () => {
    server.use(
      rest.get("http://localhost:3030/data/carDealer/:id", (req, res, ctx) => {
        return res(
          ctx.status(200),
          ctx.json({
            _ownerId: "1",
            brand: "mercedes",
            model: "s600",
            description: "neshto si neshtop si nessadas",
            year: "1995",
            imageUrl: "https",
            price: "15960",
            _createdOn: 0,
            _id: "",
          })
        );
      })
    );
    render(
      <Router>
        <CarConponent>
          <EditCar url="http://localhost:3030/data/carDealer/:id" />
        </CarConponent>
      </Router>
    );

    const priceElement = screen.getByLabelText("Car Price");
    fireEvent.change(priceElement, { target: { value: "0" } });
    fireEvent.blur(priceElement);
    const errrorMessage = screen.getByTestId("priceError");
    await waitFor(() =>
      expect(errrorMessage.textContent).toBe(
        "Price cant be a negative number or Zero."
      )
    );
  });

  test("Price Label validation with negative number", async () => {
    server.use(
      rest.get("http://localhost:3030/data/carDealer/:id", (req, res, ctx) => {
        return res(
          ctx.status(200),
          ctx.json({
            _ownerId: "1",
            brand: "mercedes",
            model: "s600",
            description: "neshto si neshtop si nessadas",
            year: "1995",
            imageUrl: "https",
            price: "15960",
            _createdOn: 0,
            _id: "",
          })
        );
      })
    );
    render(
      <Router>
        <CarConponent>
          <EditCar url="http://localhost:3030/data/carDealer/:id" />
        </CarConponent>
      </Router>
    );

    const priceElement = screen.getByLabelText("Car Price");
    fireEvent.change(priceElement, { target: { value: "-1" } });
    fireEvent.blur(priceElement);
    const errrorMessage = screen.getByTestId("priceError");
    await waitFor(() =>
      expect(errrorMessage.textContent).toBe(
        "Price cant be a negative number or Zero."
      )
    );
  });

  test("PUT request to provide right data", async () => {
    server.use(
      rest.get(
        `http://localhost:3030/data/carDealer/:carId`,
        (req, res, ctx) => {
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
        }
      )
    );
    const component =  render(
      <Router>
        <CarConponent>
          <EditCar url="http://localhost:3030/data/carDealer/:carId" />
        </CarConponent>
      </Router>
    );
  
    

  

    const brandElement = component.getByLabelText("Car Brand");
    const modelElement = component.getByLabelText("Car Model");
    const descriptionElement = component.getByLabelText("Description");
    const yearElement = component.getByLabelText("Car Year");
    const imageUrlElement = component.getByLabelText("Car Image");
    const priceElement = component.getByLabelText("Car Price");
    const buttonSubmit = component.getByTestId('submit');

    fireEvent.change(brandElement, { target: { value: "mercedes" } });
   
    fireEvent.change(modelElement, { target: { value: "s600" } });

    fireEvent.change(descriptionElement, {
      target: { value: "neshto si neshtop si nessadas" },
    });
 
    fireEvent.change(yearElement, { target: { value: "1995" } });
;
    fireEvent.change(imageUrlElement, { target: { value: "https" } });
   
    fireEvent.change(priceElement, { target: { value: "15990" } });

    fireEvent.click(buttonSubmit)
   


        server.use(
          rest.put(
            `http://localhost:3030/data/carDealer/:carId`,
             (req, res, ctx) => {
              return res(
                ctx.status(200),
                ctx.json({
                  _ownerId: "1",
                  brand: "mercedes",
                  model: "s600",
                  description: "neshto si neshtop si nessadas",
                  year: "1995",
                  imageUrl: "https",
                  price: "15990",
                  _createdOn: 167,
                  _id: "1",
                  _updatedOn: 16,
                })
              );
            }
          )
        );
            
        await waitFor (() =>  expect(navigate).toHaveBeenCalledWith(`/details/1`))
       
        
    
    
  });
});
