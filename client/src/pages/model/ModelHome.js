import React, { useState, useEffect } from "react";
import {getYear} from "../../functions/year";
import { getModel } from "../../functions/model";
import ProductCard from "../../components/cards/ProductCard";
import {getProducts} from "../../functions/product";
import { useSelector, useDispatch } from "react-redux";

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



const { SubMenu, ItemGroup } = Menu;

const ModelHome = ({match}) => {

  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [price, setPrice] = useState([0, 0]);
  const [ok, setOk] = useState(false);
  const [categories, setCategories] = useState([]);
  const [categoryIds, setCategoryIds] = useState([]);
  const [star, setStar] = useState("");
  const [subs, setSubs] = useState([]);
  const [sub, setSub] = useState("");
  const [brands, setBrands] = useState([
    "Jeep", 
    "Chrysler", 
    "Dodge",
  ]);
  const [brand, setBrand] = useState("");
  const [colors, setColors] = useState([
    "Черный", "Коричневый", "Silver", "Белый", "Голубой", "Серый металлик", "Гранитно-серый металлик", "Хром",
  ]);
  const [color, setColor] = useState("");
  const [shipping, setShipping] = useState("");

  let dispatch = useDispatch();
  let { search } = useSelector((state) => ({ ...state }));
  const { text } = search;

  useEffect(() => {
    loadAllProducts();
    // fetch categories
    getCategories().then((res) => setCategories(res.data));
    // fetch subcategories
    getSubs().then((res) => setSubs(res.data));
  }, []);

  const fetchProducts = (arg) => {
    fetchProductsByFilter(arg).then((res) => {
      setProducts(res.data);
    });
  };

  // 1. load products by default on page load
  const loadAllProducts = () => {
    getProductsByCount(12).then((p) => {
      setProducts(p.data);
      setLoading(false);
    });
  };

  // 2. load products on user search input
  useEffect(() => {
    const delayed = setTimeout(() => {
      fetchProducts({ query: text });
      if (!text) {
        loadAllProducts();
      }
    }, 300);
    return () => clearTimeout(delayed);
  }, [text]);

  // 3. load products based on price range
  useEffect(() => {
    console.log("ok to request");
    fetchProducts({ price });
  }, [ok]);

  const handleSlider = (value) => {
    dispatch({
      type: "SEARCH_QUERY",
      payload: { text: "" },
    });

    // reset
    setCategoryIds([]);
    setPrice(value);
    setStar("");
    setSub("");
    setBrand("");
    setColor("");
    setShipping("");
    setTimeout(() => {
      setOk(!ok);
    }, 300);
  };

  // 4. load products based on category
  // show categories in a list of checkbox
  const showCategories = () =>
    categories.map((c) => (
      <div key={c._id}>
        <Checkbox
          onChange={handleCheck}
          className="pb-2 pl-4 pr-4"
          value={c._id}
          name="category"
          checked={categoryIds.includes(c._id)}
        >
          {c.name}
        </Checkbox>
        <br />
      </div>
    ));

  // handle check for categories
  const handleCheck = (e) => {
    // reset
    dispatch({
      type: "SEARCH_QUERY",
      payload: { text: "" },
    });
    setPrice([0, 0]);
    setStar("");
    setSub("");
    setBrand("");
    setColor("");
    setShipping("");
    // console.log(e.target.value);
    let inTheState = [...categoryIds];
    let justChecked = e.target.value;
    let foundInTheState = inTheState.indexOf(justChecked); // index or -1

    // indexOf method ?? if not found returns -1 else return index [1,2,3,4,5]
    if (foundInTheState === -1) {
      inTheState.push(justChecked);
    } else {
      // if found pull out one item from index
      inTheState.splice(foundInTheState, 1);
    }

    setCategoryIds(inTheState);
    // console.log(inTheState);
    fetchProducts({ category: inTheState });
  };

  // 5. show products by star rating
  const handleStarClick = (num) => {
    // console.log(num);
    dispatch({
      type: "SEARCH_QUERY",
      payload: { text: "" },
    });
    setPrice([0, 0]);
    setCategoryIds([]);
    setStar(num);
    setSub("");
    setBrand("");
    setColor("");
    setShipping("");
    fetchProducts({ stars: num });
  };

  const showStars = () => (
    <div className="pr-4 pl-4 pb-2">
      <Star starClick={handleStarClick} numberOfStars={5} />
      <Star starClick={handleStarClick} numberOfStars={4} />
      <Star starClick={handleStarClick} numberOfStars={3} />
      <Star starClick={handleStarClick} numberOfStars={2} />
      <Star starClick={handleStarClick} numberOfStars={1} />
    </div>
  );

  // 6. show products by sub category
  const showSubs = () =>
    subs.map((s) => (
      <div
        key={s._id}
        onClick={() => handleSub(s)}
        className="p-1 m-1 badge badge-secondary"
        style={{ cursor: "pointer" }}
      >
        {s.name}
      </div>
    ));

  const handleSub = (sub) => {
    // console.log("SUB", sub);
    setSub(sub);
    dispatch({
      type: "SEARCH_QUERY",
      payload: { text: "" },
    });
    setPrice([0, 0]);
    setCategoryIds([]);
    setStar("");
    setBrand("");
    setColor("");
    setShipping("");
    fetchProducts({ sub });
  };

  // 7. show products based on brand name
  const showBrands = () =>
    brands.map((b) => (
      <Radio
        key={b}
        value={b}
        name={b}
        checked={b === brand}
        onChange={handleBrand}
        className="pb-1 pl-4 pr-4"
      >
        {b}
      </Radio>
    ));

  const handleBrand = (e) => {
    setSub("");
    dispatch({
      type: "SEARCH_QUERY",
      payload: { text: "" },
    });
    setPrice([0, 0]);
    setCategoryIds([]);
    setStar("");
    setColor("");
    setBrand(e.target.value);
    setShipping("");
    fetchProducts({ brand: e.target.value });
  };

  // 8. show products based on color
  const showColors = () =>
    colors.map((c) => (
      <Radio
        key={c}
        value={c}
        name={c}
        checked={c === color}
        onChange={handleColor}
        className="pb-1 pl-4 pr-4"
      >
        {c}
      </Radio>
    ));

  const handleColor = (e) => {
    setSub("");
    dispatch({
      type: "SEARCH_QUERY",
      payload: { text: "" },
    });
    setPrice([0, 0]);
    setCategoryIds([]);
    setStar("");
    setBrand("");
    setColor(e.target.value);
    setShipping("");
    fetchProducts({ color: e.target.value });
  };

  // 9. show products based on shipping yes/no
  const showShipping = () => (
    <>
      <Checkbox
        className="pb-2 pl-4 pr-4"
        onChange={handleShippingchange}
        value="Yes"
        checked={shipping === "Yes"}
      >
        Yes
      </Checkbox>

      <Checkbox
        className="pb-2 pl-4 pr-4"
        onChange={handleShippingchange}
        value="No"
        checked={shipping === "No"}
      >
        No
      </Checkbox>
    </>
  );

  const handleShippingchange = (e) => {
    setSub("");
    dispatch({
      type: "SEARCH_QUERY",
      payload: { text: "" },
    });
    setPrice([0, 0]);
    setCategoryIds([]);
    setStar("");
    setBrand("");
    setColor("");
    setShipping(e.target.value);
    fetchProducts({ shipping: e.target.value });
  };








////////////////////////////////////////////////////////

    const [model, setModel] = useState({});
    const [years, setYears] = useState([]);
    // const [products, setProducts] = useState([]);
    // const [loading, setLoading] = useState(false);

    const {slug} = match.params;

    useEffect(() => {
        setLoading(true);
        getModel(slug).then((res) => {
          console.log(JSON.stringify(res.data, null, 4));
          setModel(res.data.model);
          setProducts(res.data.products);
          setLoading(false);
        });
      }, []);
    
    useEffect(() => {
        setLoading(true)
        getYear(model._id).then((res) => {  
            setYears(res.data)
            console.log(years)
            setLoading(false)
        })
    },[model]);

    return (

        <div className="container-fluid">
            <h2 className="modelName">Jeep {model.name}</h2>

        <div className="row">
          <div className="col-md-3 pt-2">
            <h4>Фильтр</h4>
            <hr />
  
            <Menu
              defaultOpenKeys={["1", "2", "3", "4", "5", "6", "7"]}
              mode="inline"
            >
              {/* price */}
              <SubMenu
                key="1"
                title={
                  <span className="h4">
                    Цена
                  </span>
                }
              >
                <div>
                  <Slider
                    className="ml-4 mr-4"
                    tipFormatter={(v) => `${v} руб`}
                    range
                    value={price}
                    onChange={handleSlider}
                    max="30000"
                  />
                </div>
              </SubMenu>
  
              {/* category */}
              <SubMenu
                key="2"
                title={
                  <span className="h4">
                    <DownSquareOutlined /> Категории
                  </span>
                }
              >
                <div style={{ maringTop: "-10px" }}>{showCategories()}</div>
              </SubMenu>
  
              {/* stars */}
              {/* <SubMenu
                key="3"
                title={
                  <span className="h6">
                    <StarOutlined /> Rating
                  </span>
                }
              >
                <div style={{ maringTop: "-10px" }}>{showStars()}</div>
              </SubMenu> */}
  
              {/* sub category */}
              <SubMenu
                key="4"
                title={
                  <span className="h4">
                    <DownSquareOutlined /> Подкатегории
                  </span>
                }
              >
                <div style={{ maringTop: "-10px" }} className="pl-4 pr-4">
                  {showSubs()}
                </div>
              </SubMenu>
  
              {/* brands */}
              {/* <SubMenu
                key="5"
                title={
                  <span className="h6">
                    <DownSquareOutlined /> Brands
                  </span>
                }
              >
                <div style={{ maringTop: "-10px" }} className="pr-5">
                  {showBrands()}
                </div>
              </SubMenu> */}
  
              {/* colors */}
              <SubMenu
                key="6"
                title={
                  <span className="h4">
                    <DownSquareOutlined /> Цвета
                  </span>
                }
              >
                <div style={{ maringTop: "-10px" }} className="pr-5">
                  {showColors()}
                </div>
              </SubMenu>
  
              {/* shipping */}
              <SubMenu
                key="7"
                title={
                  <span className="h6">
                    <DownSquareOutlined /> Shipping
                  </span>
                }
              >
                <div style={{ maringTop: "-10px" }} className="pr-5">
                  {showShipping()}
                </div>
              </SubMenu>
            </Menu>
          </div>
  
        <div className="col-md-9 pt-2 container-model" >
         
                <h2 className="font6 container-model__heading1">Автозапчасти для Jeep {model.name}</h2>
                

        <div className="model-years">
            {years.length && years.map((year)=>(
            <div className="model-years__box">
                        {model.name} {year.name}</div>
                ))}
        </div>

        {/* <hr className="brake-line"></hr> */}
                
                {products.length < 1 && <p>No products found</p>}
                <div className="row">
                    {products.map((p) => (
                        <div className="col" key={p._id}>
                            <ProductCard product={p}/>
                        </div>
                    ))}
                </div>
          </div>
        </div>
      </div>
    
    );
};

export default ModelHome;
