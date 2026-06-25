import React, { useContext, useEffect, useState } from "react";
import { ShopContext } from "../context/shopContext";
import { assets } from "../assets/assets";
import Title from "../components/title";
import ProductItem from "../components/productItem";

const collection = () => {
  const { products, search, showSearch } = useContext(ShopContext);
  const [showFilter, setShowFilter] = useState(true);
  const [fileterProduct, setFilterProduct] = useState([]);
  const [category, setCategory] = useState([]);
  const [subCategory, setSubCategory] = useState([]);
  const [sortType, setSortType] = useState('relavent');

  const toggleCategory = (e) => {
    if (category.includes(e.target.value)) {
      setCategory((prev) => prev.filter((item) => item !== e.target.value));
    } else {
      setCategory((prev) => [...prev, e.target.value]);
    }
  };

  const toggleSubCategory = (e) => {
    if (subCategory.includes(e.target.value)) {
      setSubCategory((prev) => prev.filter((item) => item !== e.target.value));
    } else {
      setSubCategory((prev) => [...prev, e.target.value]);
    }
  };

  const applyFilter = () => {
    let productsCopy = products.slice();

    if (search && search.trim()) {
      const searchLower = search.toLowerCase().trim();
      productsCopy = productsCopy.filter((item) => {
        const nameMatch = item.name?.toLowerCase().includes(searchLower);
        const categoryMatch = item.category?.toLowerCase().includes(searchLower);
        const subCategoryMatch = item.subCategory?.toLowerCase().includes(searchLower);
        const descMatch = item.description?.toLowerCase().includes(searchLower);
        return nameMatch || categoryMatch || subCategoryMatch || descMatch;
      });
    }

    if (category.length > 0) {
      productsCopy = productsCopy.filter((item) => category.includes(item.category));
    }
    if (subCategory.length > 0) {
      productsCopy = productsCopy.filter((item) => subCategory.includes(item.subCategory));
    }
    setFilterProduct(productsCopy);
  };

  const sortProduct = () => {
    let fpCopy = fileterProduct.slice();

    switch (sortType) {
      case 'low-high':
        setFilterProduct(fpCopy.sort((a, b) => a.price - b.price));
        break;
      case 'high-low':
        setFilterProduct(fpCopy.sort((a, b) => b.price - a.price));
        break;
      default:
        applyFilter();
        break;
    }
  };

  useEffect(() => {
    applyFilter();
  }, [category, subCategory, search, showSearch, products]);

  useEffect(() => {
    sortProduct();
  }, [sortType]);

  return (
    <div className="flex flex-col sm:flex-row gap-1 sm:gap-10 pt-10">
      <div className="min-w-60">
        <p
          onClick={() => setShowFilter(!showFilter)}
          className="my-2 text-xl flex item-center cursor-pointer gap-2"
        >
          Filters
          <img
            src={assets.dropdown_icon}
            className={`h-3 mt-2 sm:hidden ${showFilter ? "rotate-90" : ""}`}
            alt=""
          />
        </p>

        <div className={`border border-gray-300 pl-5 py-3 mt-6 ${showFilter ? "" : "hidden"} sm:block`}>
          <p className="mb-3 text-sm font-medium">CATEGORIES</p>
          <div className="flex flex-col gap-2 text-sm font-light text-gray-700">
            {['Men', 'Women', 'Kids'].map((cat) => (
              <p key={cat} className="flex gap-2">
                <input className="w-3" type="checkbox" value={cat} onChange={toggleCategory} />
                {cat}
              </p>
            ))}
          </div>
        </div>

        <div className={`border border-gray-300 pl-5 py-5 mt-6 ${showFilter ? "" : "hidden"} sm:block`}>
          <p className="mb-3 text-sm font-medium">Type</p>
          <div className="flex flex-col gap-2 text-sm font-light text-gray-700">
            {[...new Set(products.map((product) => product.subCategory))].filter(Boolean).map((subCat) => (
              <p key={subCat} className="flex gap-2">
                <input className="w-3" type="checkbox" value={subCat} onChange={toggleSubCategory} />
                {subCat}
              </p>
            ))}
          </div>
        </div>
      </div>

      <div className="flex-1">
        <div className="flex justify-between text-base sm:text-2xl mb-4">
          <Title text1={"All"} text2={"Collection"} />
          <select onChange={(e) => setSortType(e.target.value)} className="border-2 border-gray-300 text-sm px-2">
            <option value="relavent">Sort by: Relevant</option>
            <option value="low-high">Sort by: Low to High</option>
            <option value="high-low">Sort by: High to Low</option>
          </select>
        </div>

        <div className="grid gap-6 grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-y-6">
          {fileterProduct.map((item, index) => (
            <ProductItem
              key={index}
              id={item._id}
              name={item.name}
              discount={item.discount}
              price={item.price}
              image={item.image}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default collection;
