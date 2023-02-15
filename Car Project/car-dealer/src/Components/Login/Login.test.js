import {
  fireEvent,
  render,
  screen,
  waitFor,
} from "@testing-library/react";

import "@testing-library/jest-dom";
import { rest } from "msw";
import { setupServer } from "msw/node";
import { BrowserRouter as Router } from "react-router-dom";
import { AuthComponent } from "../../contexts/authContext";
import { Login } from "./Login";
import * as router from "react-router";

describe("Testin LoginPage", () => {
  const navigate = jest.fn();

  beforeEach(() => {
    jest.spyOn(router, "useNavigate").mockImplementation(() => navigate);
  });
  const server = setupServer();
  beforeAll(() => server.listen());
  afterEach(() => server.resetHandlers());
  afterAll(() => server.close());

  test("Login is in the document", () => {
    render(
      <Router>
        <AuthComponent>
          <Login />
        </AuthComponent>
      </Router>
    );
    const loginElement = screen.getByTestId("login");
    expect(loginElement).toBeInTheDocument();
  });

  test("LoginPage has link to register", () => {
    render(
      <Router>
        <AuthComponent>
          <Login />
        </AuthComponent>
      </Router>
    );
    const linkElement = screen.getByRole("link", { name: "Sign up" });
    expect(linkElement).toHaveAttribute("href", "/register");
  });
  // test('submits username and password', async() => {
  //     const username = 'peter@abv.bg'
  //     const password = '123456'
  //     const mockLogin = jest.fn()
  //     render(<Router>
  //         <AuthComponent>
  //         <Login onSubmitHandler={mockLogin(username, password)}/>
  //         </AuthComponent>
  //         </Router>)
  //     const usernameInput = screen.getByLabelText('Email:')
  //     userEvent.type(usernameInput, 'peter@abv.bg');
  //     const passwordInput = screen.getByLabelText('Password');
  //     userEvent.type(passwordInput, '123456');
  //     const loginButton = screen.getByRole('button', {name: Login});
  //     expect(loginButton).not.toBeDisabled();

  //     userEvent.click(loginButton);

  //     await expect(mockLogin).toHaveBeenCalled();
  //     await expect(mockLogin).toHaveBeenCalledTimes(1);
  //     await expect(mockLogin).toHaveBeenCalledWith("peter@abv.bg", "123456");

  // });

  test("Email field have label and atribute name", () => {
    const component = render(
      <Router>
        <AuthComponent>
          <Login />
        </AuthComponent>
      </Router>
    );

    const emailElement = component.getByLabelText("Email:");
    expect(emailElement.getAttribute("name")).toBe("email");
  });
  test("Email imput should start as a Empty String", () => {
    const component = render(
      <Router>
        <AuthComponent>
          <Login />
        </AuthComponent>
      </Router>
    );
    const emilaElemenet = component.getByLabelText("Email:");
    expect(emilaElemenet.value).toBe("");
  });

  test("Email accept test", async () => {
    const component = render(
      <Router>
        <AuthComponent>
          <Login />
        </AuthComponent>
      </Router>
    );

    const emialElement = component.getByLabelText("Email:");
    
      fireEvent.change(emialElement, { target: { value: "testEmail.bg" } });

    expect(emialElement.value).toMatch("testEmail.bg");
  });

  test("Email is a valid one", (done) => {
    const component = render(
      <Router>
        <AuthComponent>
          <Login />
        </AuthComponent>
      </Router>
    );

    const emialElement = component.getByLabelText("Email:");
   
      fireEvent.change(emialElement, { target: { value: "test.abv.bg" } });
      fireEvent.blur(emialElement);
   

    setTimeout(() => {
      const errorMessage = component.getByTestId("emailError");

      expect(errorMessage.textContent).toBe(
        "This is not a valid email format!"
      );
      done();
    }, 500);
  });

  test("Unsuccessfull login", async () => {
    server.use(
      rest.post("http://localhost:3030/users/login", (req, res, ctx) => {
        return res(
          ctx.status(403),
          ctx.json({ code: 403, message: "Login or password don't match" })
        );
      })
    );

    const component = render(
      <Router>
        <AuthComponent>
          <Login url="http://localhost:3030/users/login" />
        </AuthComponent>
      </Router>
    );

    const emialElement = screen.getByLabelText("Email:");
    const passwordElement = screen.getByLabelText("Password:");
    const loginButton = screen.getByRole("button");

    fireEvent.change(emialElement, { target: { value: "peter@abv.bg" } });
    fireEvent.change(passwordElement, { target: { value: "123456" } });
    fireEvent.click(loginButton, { name: "Login" });

    await waitFor(() =>
      expect(component.getByTestId("loginError").textContent).toBe(
        "Login or password don't match"
      )
    );
  });
  test("Successfull login", async () => {
    server.use(
      rest.post("http://localhost:3030/users/login", (req, res, ctx) => {
        return res(
          ctx.status(200),
          ctx.json({ email: "", _id: "", accessToken: "" })
        );
      })
    );

    render(
      <Router>
        <AuthComponent>
          <Login url="http://localhost:3030/users/login" />
        </AuthComponent>
      </Router>
    );
    const emialElement = screen.getByLabelText("Email:");
    const passwordElement = screen.getByLabelText("Password:");
    const loginButton = screen.getByRole("button");

    fireEvent.change(emialElement, { target: { value: "peter@abv.bg" } });
    fireEvent.change(passwordElement, { target: { value: "123456" } });
    fireEvent.click(loginButton, { name: "Login" });

    await waitFor(() => expect(navigate).toHaveBeenCalledWith('/'));
  });

  test('Link to Register Page',  () => {
    render(
      <Router>
        <AuthComponent>
          <Login
          />
        </AuthComponent>
      </Router>
    );
     const linkElement = screen.getByRole('link', { name: 'Sign up' });
     expect(linkElement).toHaveAttribute('href', '/register');
  });
});
