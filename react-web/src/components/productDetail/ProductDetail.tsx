import { useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";

import { useCart } from "../../contexts/CartContext";
import { CartItem } from "../../models/CartItem";

const product = {
  id: "64f37a6038d4bb6edd24a07c",
  name: "Soap",
  description:
    "Boston's most advanced compression wear technology increases muscle oxygenation, stabilizes active muscles",
  price: 789,
  color: "pink",
  _links: {
    self: {
      href: "/api/store/products/64f37a6038d4bb6edd24a07c",
    },
  },
  _embedded: {
    categories: [
      {
        name: "Showroom",
        _links: {
          self: {
            href: "/categories/64f37a6038d4bb6edd24a08a",
          },
        },
      },
    ],
  },
  rel: "product",
  href: "/api/store/products/64f37a6038d4bb6edd24a07c",
};

const ProductDetail = () => {
  const { productId } = useParams();
  const { addToCart } = useCart();
  const navigate = useNavigate();

  const tempProductId: string = productId ? productId : "";
  const cartItem: CartItem = new CartItem(tempProductId, "Vest", 12.23, 1);

  const handleAddToCart = () => {
    if (cartItem) {
      addToCart(cartItem);
      navigate("/cart");
    }
  };

  return (
    <div>
      <h2>Product Detail</h2>
      <div>{product ? `Product ID: ${product.id}` : "Product not found"}</div>
      <button onClick={handleAddToCart}>Add to Cart</button>
    </div>
  );
};

export default ProductDetail;
