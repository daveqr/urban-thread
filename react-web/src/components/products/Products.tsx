import { useParams } from "react-router-dom";

const Products = () => {
  const { productId } = useParams();

  return <div>in products ${productId}</div>;
};

export default Products;
