import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";

import { fetchCategory } from "../../services/apiService";
import { Product } from "../../models/Product";

interface Data {
  _embedded: {
    products: Product[];
  };
}

const ProductList = () => {
  const { categoryId } = useParams();
  const navigate = useNavigate();
  const [data, setData] = useState<Data | null>(null);

  useEffect(() => {
    if (!categoryId) {
      navigate("/error");
      return;
    }

    const fetchData = async () => {
      try {
        const jsonData = await fetchCategory(categoryId);
        setData(jsonData);
        console.log(jsonData);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, [categoryId]);

  return (
    <div>
      <h3>Product List</h3>
      <p>Cards with full details</p>
      <div className="row">
        {data &&
          data._embedded &&
          data._embedded.products.map((product) => (
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
