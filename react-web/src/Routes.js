import { createBrowserRouter } from "react-router-dom";

import Landing from './components/landing/Landing';
import Categories from './components/categories.tsx/Categories';
import Error from "./Error";
import Cart from "./components/cart/Cart";

const router = createBrowserRouter([
    {
        path: "/",
        element: <Landing />,
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
