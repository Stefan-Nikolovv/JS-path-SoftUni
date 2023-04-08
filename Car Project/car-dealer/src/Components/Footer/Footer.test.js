import { render, waitFor } from "@testing-library/react";
import { rest } from "msw";
import { setupServer } from "msw/node";
import { BrowserRouter as Router } from "react-router-dom";
import * as router from "react-router";
import { Footer } from "./Footer";
import { AuthComponent } from "../../contexts/authContext";
import { CarConponent } from "../../contexts/carContext";


describe("Test Footer", () => {
    test('Footer to be loaded', async() => {
        const component = render(
            <Router>
            <AuthComponent >
              <CarConponent  >
                <Footer  />
              </CarConponent>
              </AuthComponent>
          </Router>
        );
        const footerId = component.getByTestId('footerID');
        await waitFor(() => expect(footerId).toBeInTheDocument());
    });

    test('Footer to be with right text', async() => {
        const component = render(
            <Router>
            <AuthComponent >
              <CarConponent  >
                <Footer  />
              </CarConponent>
              </AuthComponent>
          </Router>
        );
        const footerId = component.getByTestId('footerID');
        await waitFor(() => expect(footerId.textContent).toBe('© All rights by Car Dealer.'));
    });

})