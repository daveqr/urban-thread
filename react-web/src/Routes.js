import { createBrowserRouter } from "react-router-dom";

import Home from './components/home/Home';
import Categories from './components/categories.tsx/Categories';
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
        element: <Categories />,
    },
    {
        path: "/cart",
        element: <Cart />,
    },
    // {
    //     path: "products/:productId",
    //     element: <Products />,
    //   },    
]);

export default router
