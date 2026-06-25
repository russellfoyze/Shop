import React, { useContext, useEffect, useState } from "react";
import { ShopContext } from "../context/shopContext";
import Title from "./title";
import ProductItem from "./productItem";

const LatestCollection = () => {
  const { products } = useContext(ShopContext);
  const [latestProducts, setLatestProducts] = useState([]);

  useEffect(() => {
    setLatestProducts(products.slice(0, 10));
  }, [products]);

  return (
    <div className="my-10">
      <div className="text-center py-8 text-3xl">
        <Title text1={"LATEST"} text2={"COLLECTION"} />
      </div>
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6 gap-y-6">
        {latestProducts.map((item, index) => (
          <ProductItem
            key={index}
            id={item._id}
            name={item.name}
            image={item.image}
            price={item.price}
            discount={item.discount}
          />
        ))}
      </div>
    </div>
  );
};

export default LatestCollection;
