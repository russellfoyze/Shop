import React, { useContext } from "react";
import { ShopContext } from "../context/shopContext";
import ProductItem from "../components/productItem";
import Title from "../components/title";

const RandomProducts = () => {
  const { products } = useContext(ShopContext);

  const shuffleArray = (array) => {
    const newArray = [...array];
    for (let i = newArray.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [newArray[i], newArray[j]] = [newArray[j], newArray[i]];
    }
    return newArray;
  };

  const randomProducts = shuffleArray(products).slice(0, 8);

  return (
    <div className="py-10">
      <div className="text-center text-3xl py-8">
        <Title text1="Random" text2="Selection" />
      </div>
      <div className="grid gap-4 grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-y-6 mt-6">
        {randomProducts.map((item) => (
          <ProductItem
            key={item._id}
            name={item.name}
            id={item._id}
            price={item.price}
            discount={item.discount}
            image={item.image}
          />
        ))}
      </div>
    </div>
  );
};

export default RandomProducts;
