import { Link, useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";

import { Product } from "../../models/Product";
import { useGetCategoryQuery } from "../../apiSlice";

const ProductList = () => {
  const { categoryId } = useParams();
  const navigate = useNavigate();

  let content;
  const { data: category, isError } = useGetCategoryQuery(categoryId);

  if (isError) {
    navigate("/error");
  }

  return (
    <div>
      {content}
      <h3>Product List</h3>
      <p>Cards with full details</p>
      <div className="row">
        {category &&
          category._embedded &&
          category._embedded.products.map((product: Product) => (
            <div className="col-md-6 col-lg-3" key={product.id}>
              <div className="card card-product border mb-5 shadow-xs border-radius-lg">
                <Link to={`/products/${product.id}`}>
                  <div className="height-350">
                    <img
                      className="w-100 h-100 p-4 rounded-top"
                      src={product.imageSrc}
                      alt={product.name}
                    />
                  </div>
                  <div className="card-body text-left">
                    <h6 className="text-md mb-1 text-body">{product.rel}</h6>
                    <h4 className="font-weight-bold">{product.name}</h4>
                    <p className="text-body">{product.description}</p>
                    <h4 className="mb-0 text-lg mt-1 mb-3">${product.price}</h4>
                  </div>
                </Link>
              </div>
            </div>
          ))}
      </div>
    </div>
  );
};

export default ProductList;
