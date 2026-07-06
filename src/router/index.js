import { createBrowserRouter } from 'react-router-dom';
import App from '../App.jsx';
import ContactPage from "../pages/ContactPage.jsx";
import HomePage from '../pages/HomePage.jsx';
import ProductsPage from "../pages/ProductsPage.jsx";
import SingleProductPage from "../pages/SingleProductPage.jsx";
import TeamsPage from "../pages/TeamsPage.jsx";

export const router = createBrowserRouter(
  [
    {
      path: "/",
      Component: App,
      children: [
        { index: true, Component: HomePage },
        { path: "products", Component: ProductsPage },
        { path: "products/:productId", Component: SingleProductPage },
        { path: "teams", Component: TeamsPage },
        { path: "contact", Component: ContactPage }
      ]
    }
  ]
);