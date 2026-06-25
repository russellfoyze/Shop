import React, { useContext, useEffect, useState } from "react";
import { ShopContext } from "../context/shopContext";
import Title from "./title";
import ProductItem from "./productItem";

const bestSeller = () => {
  const { products } = useContext(ShopContext);
  const [bestSeller, setBestSeller] = useState([]);

  useEffect(() => {
    const bestProduct = products.filter((item) => item.bestseller === true);
    setBestSeller(bestProduct.slice(0, 5));
  }, [products]);

  return (
    <div className="my-10">
      <div className="text-center text-3xl py-8">
        <Title text1={"Best"} text2={"Sellers"} />
      </div>
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6 gap-y-6">
        {bestSeller.map((item, index) => (
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

export default bestSeller;
