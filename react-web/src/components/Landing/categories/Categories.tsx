import React, { useState, useEffect } from "react";
import Category from "../../../models/Category";

const tempCats: Category[] = [
  {
    id: "64f37a6038d4bb6edd24a07e",
    name: "Silk Dresses",
    description: "Collection of silk dresses for Pre-fall season.",
    editionName: "Pre-fall",
    editionDescription: "Collection for the fall season.",
  },
  {
    id: "64f37a6038d4bb6edd24a081",
    name: "Suits",
    description: "Collection of designer suits.",
    editionName: "Designer",
    editionDescription: "Designer collection.",
  },
  {
    id: "64f37a6038d4bb6edd24a085",
    name: "Festival",
    description: "Collection of suits for the summer season.",
    editionName: "Summer",
    editionDescription: "Collection for the summer season.",
  },
  {
    id: "64f37a6038d4bb6edd24a08a",
    name: "Showroom",
    description: "Collection of clothing on sale in our showroom.",
    editionName: "Sale",
    editionDescription: "Collection for the sale season.",
  },
];

function Categories() {
  // TODO replace with redux
  const [categories, setCategories] = useState<Category[]>([]);

  useEffect(() => {
    setCategories(tempCats);
  }, []);

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
                  <a
                    href="https://demos.creative-tim.com/astro-ecommerce/landing/#"
                    className="text-white text-sm font-weight-semibold mb-0"
                  >
                    See products &gt;
                  </a>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Categories;
