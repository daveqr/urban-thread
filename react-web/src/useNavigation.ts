import { useNavigate } from "react-router-dom";

export function useNavigation() {
    const navigate = useNavigate();

    const goHome = () => {
        navigate("/");
    };

    const goToCheckout = () => {
        navigate("/checkout");
    };

    const goToCart = () => {
        navigate("/cart");
    };

    return {
        goHome,
        goToCheckout,
        goToCart
    };
}
