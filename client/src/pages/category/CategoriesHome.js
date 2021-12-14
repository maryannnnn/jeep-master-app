import React, { useState, useEffect } from "react";
import { getCategory } from "../../functions/category";
import ProductCard from "../../components/cards/ProductCard";
import  Shop from "../Shop.js";
import {CategoryContent} from "../../components/category/CategoryContent"
import { getCategories, getCategoriesByYear } from "../../functions/category";
import { getYearAndProducts } from "../../functions/year";

const CategoryHome = ({ match }) => {
  const [categories, setCategories] = useState({});
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [model, setModel] = useState({});

  const { slug } = match.params;

  useEffect(() => {
   
    setLoading(true);
    getYearAndProducts(slug).then((res) => {
      // console.log(JSON.stringify(res.data, null, 4));
      console.log('11111111')
      console.log(res.data.products)
      setCategories(res.data.category);
      setProducts(res.data.products);
      setLoading(false);
    });
  }, []);


  const categoryContent = () =>(
    <div className="container-model__head-content">
          <h2 className="font6 container-model__heading1"> Категории товаров для Jeep {'111'}</h2>
          
    </div>
  )
  

  return (
    <div className="container-fluid">
      <div className="row">
        {/* {slug} */}
        <Shop slug={slug.parent} slugYear={slug} content={categoryContent} productsBeforeFiltre={products} />
        {/* <div className="col">
          {loading ? (
            <h4 className="text-center p-3 mt-5 mb-5 display-4 jumbotron">
              Loading...
            </h4>
          ) : (
            <h4 className="text-center p-3 mt-5 mb-5 display-4 jumbotron">
              {products.length} Products in "{category.name}" category
            </h4>
          )}
        </div>
      </div>

      <div className="row">
        {products.map((p) => (
          <div className="col" key={p._id}>
            <ProductCard product={p} />
          </div>
        ))} */}
      </div>
    </div>
  );
};

export default CategoryHome;
