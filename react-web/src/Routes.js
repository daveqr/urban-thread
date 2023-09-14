import { createBrowserRouter } from "react-router-dom";

import Home from './components/home/Home';
import ProductList from "./components/productList/ProductList";
import ProductDetail from "./components/productDetail/ProductDetail";
import Error from "./components/Error";
import Cart from "./components/cart/Cart";

const router = createBrowserRouter([
    {
        path: "/",
        element: <Home />,
        errorElement: <Error />,
    },
    {
        path: "/categories/:categoryId",
        element: <ProductList />,
    },
    {
        path: "/cart",
        element: <Cart />,
    },
    {
        path: "products/:productId",
        element: <ProductDetail />,
    },
]);

export default router
