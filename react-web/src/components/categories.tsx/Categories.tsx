import { useParams } from "react-router-dom";

const Categories = () => {
  const { categoryId } = useParams();

  return (
    <div>
      <h2>Category Details</h2>
      <p>ID: {categoryId}</p>
    </div>
  );
};

export default Categories;
