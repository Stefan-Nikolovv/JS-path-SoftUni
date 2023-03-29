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
  import { AuthComponent, UserContext } from "../../contexts/authContext";
  import { Logout } from "./Logout";
  import * as router from "react-router";

  describe("Logout Component",  () => {
    const navigate = jest.fn();
    const localStorageMock = {
        getItem: jest.fn(),
        setItem: jest.fn(),
        clear: jest.fn()
      };
      global.localStorage = localStorageMock;
  beforeEach(() => {
    jest.spyOn(router, "useNavigate").mockImplementation(() => navigate);
  });
  const server = setupServer();
  beforeAll(() => server.listen());
  afterEach(() => server.resetHandlers());
  afterAll(() => server.close());


    test('logout to clear localStorage and to navigate', async() => {

        const user = {email: 'peshoko@abv.bg', _id: '1', accessToken:'1'}

        const loggedUser = () => {}
        render(
            <Router>
                <UserContext.Provider value={{user, loggedUser}}>
                    <Logout />
                </UserContext.Provider>
            </Router>
        );
            localStorage.clear();
            await waitFor(() => expect(navigate).toHaveBeenCalledWith('/'))



    })
  })