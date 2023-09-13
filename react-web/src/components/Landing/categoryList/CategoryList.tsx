import { FC } from "react";
import { List } from "immutable";

import Category from "../../../models/Category";
import { Link } from "react-router-dom";

interface CategoryListProps {
  categories: List<Category>;
}

const CategoryList: FC<CategoryListProps> = ({ categories }) => {
  return (
    <div className="container my-5">
      <div className="d-block text-center mb-5">
        <h3>Shop by category</h3>
        <a
          className="text-dark font-weight-bold"
          href="https://demos.creative-tim.com/astro-ecommerce/landing/#"
        >
          Browse all categories &gt;
        </a>
      </div>
      <div className="row mb-5">
        {categories.map((category) => (
          <div className="col-md-6 col-lg-3">
            <a href="https://demos.creative-tim.com/astro-ecommerce/landing/#"></a>
            <div className="card card-background align-items-start mb-4 mb-lg-0 undefined">
              <a href="https://demos.creative-tim.com/astro-ecommerce/landing/#">
                <div
                  className="full-background"
                  style={{
                    backgroundImage: `url(${require("../images/category1.jpg")})`,
                    backgroundSize: "cover",
                  }}
                ></div>
              </a>
              <div className="card-body text-center w-100 pt-8">
                <a href="https://demos.creative-tim.com/astro-ecommerce/landing/#"></a>
                <div className="d-block mt-10">
                  <a href="https://demos.creative-tim.com/astro-ecommerce/landing/#">
                    <p className="text-white font-weight-bold mb-1">
                      {category.editionName}
                    </p>
                    <h4 className="text-white font-weight-bolder">
                      {category.name}
                    </h4>
                  </a>
                  {/* <a
                    href="https://demos.creative-tim.com/astro-ecommerce/landing/#"
                    className="text-white text-sm font-weight-semibold mb-0"
                  >
                    See products &gt;
                  </a> */}
                  <Link to={`/categories/${category.id}`} className="text-white text-sm font-weight-semibold mb-0">See products &gt;</Link>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CategoryList;
