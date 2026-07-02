import { createBrowserRouter } from 'react-router-dom';
import App from '../App.jsx';
import ContactPage from "../pages/ContactPage.jsx";
import HomePage from '../pages/HomePage.jsx';
import ProductsPage from "../pages/ProductsPage.jsx";
import TeamsPage from "../pages/TeamsPage.jsx";

export const router = createBrowserRouter(
  [
    {
      path: "/",
      Component: App,
      children: [
        { index: true, Component: HomePage },
        { path: "products", Component: ProductsPage },
        { path: "teams", Component: TeamsPage },
        { path: "contact", Component: ContactPage }
      ]
    }
  ]
);