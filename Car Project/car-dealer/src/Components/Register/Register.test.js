import { Register } from "./Register";
import { BrowserRouter as Router } from "react-router-dom";
import { AuthComponent } from "../../contexts/authContext";
import "@testing-library/jest-dom";
import { rest } from "msw";
import { setupServer } from "msw/node";
import * as router from "react-router";
import { fireEvent, render, screen, waitFor } from "@testing-library/react";

describe("Test Register Page", () => {
  const navigate = jest.fn();

  beforeEach(() => {
    jest.spyOn(router, "useNavigate").mockImplementation(() => navigate);
  });
  const server = setupServer();
  beforeAll(() => server.listen());
  afterEach(() => server.resetHandlers());
  afterAll(() => server.close());
  
  test("Register testId", () => {
    render(
      <Router>
        <AuthComponent>
          <Register />
        </AuthComponent>
      </Router>
    );

    const registerPage = screen.getByTestId("register");
    expect(registerPage).toBeInTheDocument();
  });

  test("Email is invalid format", async() => {
   const component =  render(
        <Router>
          <AuthComponent>
            <Register />
          </AuthComponent>
        </Router>
      );

      const emialElement = component.getByLabelText("Email");
      fireEvent.change(emialElement, {target: {value: 'test.testov.bg'}});
      fireEvent.blur(emialElement);
      const errorMessage = screen.getByTestId('emailError');
      await waitFor(() => expect(errorMessage.textContent).toBe("This is not a valid email format!"));
  });

  test("Email is empty string", async() => {
    const component =  render(
         <Router>
           <AuthComponent>
             <Register />
           </AuthComponent>
         </Router>
       );
 
       const emialElement = component.getByLabelText("Email");
       fireEvent.change(emialElement, {target: {value: ''}});
       fireEvent.blur(emialElement);
       const errorMessage = screen.getByTestId('emailError');
       await waitFor(() => expect(errorMessage.textContent).toBe("Email is required!"));
   });


   test("Password is a empty string", async() => {
    const component =  render(
        <Router>
          <AuthComponent>
            <Register />
          </AuthComponent>
        </Router>
      );

      const passwordElement = component.getByLabelText("Password");
      fireEvent.change(passwordElement, {target: {value: ''}});
      fireEvent.blur(passwordElement);
      const errorMessage = screen.getByTestId('passError');
      await waitFor(() => expect(errorMessage.textContent).toBe("Password is required!"));
   });

   test("Password is with length of 3 characters", async() => {
    const component =  render(
        <Router>
          <AuthComponent>
            <Register />
          </AuthComponent>
        </Router>
      );

      const passwordElement = component.getByLabelText("Password");
      fireEvent.change(passwordElement, {target: {value: 'abv'}});
      fireEvent.blur(passwordElement);
      const errorMessage = screen.getByTestId('passError');
      await waitFor(() => expect(errorMessage.textContent).toBe("Password must be more than 4 characters"));
   });

   test("Password is with length of more than 10 characters", async() => {
    const component =  render(
        <Router>
          <AuthComponent>
            <Register />
          </AuthComponent>
        </Router>
      );

      const passwordElement = component.getByLabelText("Password");
      fireEvent.change(passwordElement, {target: {value: 'abv.abv.abv.bg'}});
      fireEvent.blur(passwordElement);
      const errorMessage = screen.getByTestId('passError');
      await waitFor(() => expect(errorMessage.textContent).toBe("Password must be less than 10 characters"));
   });

   test("Repeat password is empty string", async() => {
    const component =  render(
        <Router>
          <AuthComponent>
            <Register />
          </AuthComponent>
        </Router>
      );

      const repeatPassElement = component.getByLabelText("Repeat Password");
      fireEvent.change(repeatPassElement, {target: {value: ''}});
      fireEvent.blur(repeatPassElement);
      const errorMessage = screen.getByTestId('RePassError');
      await waitFor(() => expect(errorMessage.textContent).toBe("RePassword is required!"));
   });

   

   test("Repeat password missmatch ", async() => {

     render(
        <Router>
          <AuthComponent>
            <Register />
          </AuthComponent>
        </Router>
      );


      const emailElement = screen.getByLabelText("Email");
      const passwordElement = screen.getByLabelText("Password");  
      const repeatPassElement = screen.getByLabelText("Repeat Password");
      const buttonRegister = screen.getByRole("button", { name: "Register"});

      
      fireEvent.change(emailElement, {target: {value: "stef@abv.bg"}})  
      fireEvent.change(passwordElement, {target: {value: '123456'}})
      fireEvent.change(repeatPassElement, {target: {value: '12345'}});
      fireEvent.click(buttonRegister);

      const errorMessage = screen.getByTestId('missMatchError');
      
      await waitFor(() => expect(errorMessage.textContent).toBe("Passwords missmatch!"));
   });
   test("Successfull registered user", async () => {
    server.use(
      rest.post("http://localhost:3030/users/register", (req, res, ctx) => {
        return res(
          ctx.status(200),
          ctx.json({ email: "", _id: "", accessToken: "" })
        );
      })
    );

    render(
      <Router>
        <AuthComponent>
          <Register url="http://localhost:3030/users/register" />
        </AuthComponent>
      </Router>
    );
    const emialElement = screen.getByLabelText("Email");
    const passwordElement = screen.getByLabelText("Password");
    const repeatPassElement = screen.getByLabelText("Repeat Password")
    const registerButton = screen.getByRole("button", {name: "Register"});

    fireEvent.change(emialElement, { target: { value: "peter@abv.bg" } });
    fireEvent.change(passwordElement, { target: { value: "123456" } });
    fireEvent.change(repeatPassElement, { target: { value: "123456" }});
    fireEvent.click(registerButton);

    await waitFor(() => expect(navigate).toHaveBeenCalledWith('/'));
  });


  test('Register User trying to register again', async() => {
    server.use(
        rest.post("http://localhost:3030/users/register", (req, res, ctx) => {
          return res(
            ctx.status(409),
            ctx.json({code: 409, message: "A user with the same email already exists"})
          );
        })
      );

      render(
        <Router>
          <AuthComponent>
            <Register url="http://localhost:3030/users/register" />
          </AuthComponent>
        </Router>
      );


    const emialElement = screen.getByLabelText("Email");
    const passwordElement = screen.getByLabelText("Password");
    const repeatPassElement = screen.getByLabelText("Repeat Password")
    const registerButton = screen.getByRole("button", {name: "Register"});

    fireEvent.change(emialElement, { target: { value: "peter@abv.bg" } });
    fireEvent.change(passwordElement, { target: { value: "123456" } });
    fireEvent.change(repeatPassElement, { target: { value: "123456" }});
    fireEvent.click(registerButton);

    await waitFor(() => expect(screen.getByTestId("reRgisterError").textContent).toBe("A user with the same email already exists"));

  });

  test('Link to Register Page',  () => {
    render(
      <Router>
        <AuthComponent>
          <Register
          />
        </AuthComponent>
      </Router>
    );
     const linkElement = screen.getByRole('link', { name: 'Sign in' });
     expect(linkElement).toHaveAttribute('href', '/login');
  });

  test('localStorage to save user', async() => {
    const user = {email: 'peshoko@abv.bg', _id: '1', accessToken:'1'};
    localStorage.setItem('auth', JSON.stringify(user))
    expect(localStorage.getItem('auth')).toEqual(JSON.stringify(user));
  })
});
