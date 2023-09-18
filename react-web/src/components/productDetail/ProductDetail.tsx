import { useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";

import { fetchProductById } from "../../services/apiService";
import { Product } from "../../models/Product";
import { CartItem } from "../../models/CartItem";
import { cartSlice } from "../../state/cartSlice";
import { useAppDispatch } from "../../state/hooks";

const ProductDetail = () => {
  const { productId } = useParams();
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const [product, setProduct] = useState<Product | null>(null);

  useEffect(() => {
    if (productId) {
      fetchProductData(productId);
    }
  }, [productId]);

  const fetchProductData = async (productId: string) => {
    try {
      const productData = await fetchProductById(productId);
      setProduct(productData);
    } catch (error) {
      console.error("Error fetching product data:", error);
    }
  };

  const handleAddToCart = (product: Product) => {
    const cartItem: CartItem = new CartItem(
      product.id,
      product.name,
      product.price
    );

    dispatch(cartSlice.actions.addItemToCart(cartItem));
    navigate("/cart");
  };

  return (
    <div>
      <h2>Product Detail</h2>
      {product ? (
        <div>
          <div>Product ID: {product.id}</div>
          <div>Name: {product.name}</div>
          <div>Description: {product.description}</div>
          <div>Price: ${product.price}</div>
          <button onClick={() => handleAddToCart(product)}>Add to Cart</button>
        </div>
      ) : (
        <div>Product not found</div>
      )}
    </div>
  );
};

export default ProductDetail;
