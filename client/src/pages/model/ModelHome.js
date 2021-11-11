import React, { useState, useEffect } from "react";
import {getYear} from "../../functions/year";
import { getModel } from "../../functions/model";
import ProductCard from "../../components/cards/ProductCard";
import {getProducts} from "../../functions/product";
import { useSelector, useDispatch } from "react-redux";
import "react-toastify/dist/ReactToastify.css";
import { Link } from "react-router-dom";

import {
  getProductsByCount,
  fetchProductsByFilter,
} from "../../functions/product";
import { getCategories } from "../../functions/category";
import { getSubs } from "../../functions/sub";
import { Menu, Slider, Checkbox, Radio } from "antd";
import {
  DollarOutlined,
  DownSquareOutlined,
  StarOutlined,
} from "@ant-design/icons";
import Star from "../../components/forms/Star";
import  Shop from "../Shop.js";


const ModelHome = ({match}) => {

  let { search } = useSelector((state) => ({ ...state }));
  const { text } = search;

////////////////////////////////////////////////////////

    const [model, setModel] = useState({});
    const [years, setYears] = useState([]);
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(false);

    const {slug} = match.params;

    useEffect(() => {
        // setLoading(true);
        getModel(slug).then((res) => {
          // console.log(JSON.stringify(res.data, null, 4));
          // console.log(res.data.model)
          // console.log(res.data.products)
          setModel(res.data.model);
          setProducts(res.data.products);
          // setLoading(false);
        });
      }, []);
    
    useEffect(() => {
        setLoading(true)
        getYear(model._id).then((res) => {  
            setYears(res.data)
            setLoading(false)
        })
    },[model]);

    const modelContent = () =>(
      <div className="container-model__head-content">
            <h2 className="font6 container-model__heading1">Автозапчасти для Jeep {model.name}</h2>
            <div className="model-years">
                {years.length && years.map((year)=>(
                <div className="model-years__box">
                  <Link className="model-years__link" to={`/category/${year.name}`} > {model.name} {year.name}</Link>
                </div>
                    ))}

            </div>
      </div>
    )

    return (

        <div className="container-fluid">
            <h2 className="modelName">Jeep {model.name}</h2>

        <div className="row">
          {/* <div className="col-md-3 pt-2"> */}
           <Shop slug={slug} content={modelContent} productsBeforeFiltre={products}/>
        
        </div>
      </div>
    
    );
};

export default ModelHome;
