import React, { useState, useEffect } from "react";
import AdminNav from "../../../components/nav/AdminNav";
import { toast } from "react-toastify";
import { useSelector } from "react-redux";
import { createProduct } from "../../../functions/product";
import ProductCreateForm from "../../../components/forms/ProductCreateForm";
import { getCategories, getCategorySubs } from "../../../functions/category";
import { getModeles } from "../../../functions/model";
import { getYear } from "../../../functions/year";
import FileUpload from "../../../components/forms/FileUpload";
import { LoadingOutlined } from "@ant-design/icons";

const initialState = {
  title: "Macbook Pro long",
  titleshort: "Macbook Pro",
  articul: "",
  description: "This is the best Apple product",
  metadescription: "This is the best Apple product",
  metakeyword: "Macbook Pro",
  price: "45000",
  categories: [],
  category: "",
  subs: [],
  modeles: [],
  model: "",
  years: [],
  numberorigional: "",
  numberproduser: "",
  shipping: "Yes",
  quantity: "50",
  wait: "0",
  images: [
    /*      {
           public_id: "jwrzeubemmypod99e8lz",
           url:
           "https://res.cloudinary.com/dcqjrwaoi/image/upload/v1599480909/jwrzeubemmypod99e8lz.jpg",
         } */
  ],
  materials: ["Сталь", "Пластмасса", "Стекло", "Войлок", "Керамика"],
  colors: ["Черный", "Коричневый", "Silver", "Белый", "Голубой", "Серый металлик", "Гранитно-серый металлик", "Хром"],
  brands: ["Jeep", "Chrysler", "Dodge"],
  material: "Сталь",
  color: "Черный",
  brand: "Jeep",
};

const ProductCreate = () => {
  const [values, setValues] = useState(initialState);
  const [modelOptions, setModelOptions] = useState([]);
  const [categoryOptions, setCategoryOptions] = useState([]);

  const [subOptions, setSubOptions] = useState([]);
  const [showSub, setShowSub] = useState(false);

  const [yearOptions, setYearOptions] = useState([]);
  const [showYear, setShowYear] = useState(false);

  const [loading, setLoading] = useState(false);

  // redux
  const { user } = useSelector((state) => ({ ...state }));

  useEffect(() => {
    loadModeles();
    loadCategories();
/*     loadProductOptions(); */
  }, []);

  const loadModeles = () => getModeles().then((m) => setModelOptions( m.data ));
 
  const loadCategories = () => getCategories().then((c) => 
  setValues({ ...values, categories: c.data }));

/*   const loadProductOptions = () =>
    setValues({ ...values, categories: categoryOptions, modeles: modelOptions }); */

  const handleSubmit = (e) => {
    e.preventDefault();
    createProduct(values, user.token)
      .then((res) => {
        console.log(res);
        window.alert(`"${res.data.title}" is created`);
        window.location.reload();
      })
      .catch((err) => {
        console.log(err);
        // if (err.response.status === 400) toast.error(err.response.data);
        toast.error(err.response.data.err);
      });
  };

  const handleChange = (e) => {
    setValues({ ...values, [e.target.name]: e.target.value });
    // console.log(e.target.name, " ----- ", e.target.value);
  };

  const handleCatagoryChange = (e) => {
    e.preventDefault();
    console.log("CLICKED CATEGORY", e.target.value);
    setValues({ ...values, subs: [], category: e.target.value });

    getCategorySubs(e.target.value).then((res) => {
      console.log("SUB OPTIONS ON CATGORY CLICK", res);
      setSubOptions(res.data);
      console.log('КАТ')
      console.log(subOptions)
    });

   
    setShowSub(true);
  };

  const handleModelChange = (e) => {
    e.preventDefault();
    console.log("CLICKED MODEL", e.target.value);
   

    setValues({ ...values, years: [], model: e.target.value });

    getYear(e.target.value).then((res) => {
      console.log("SUB OPTIONS ON YEAR CLICK", res);
      console.log('МОД')
      setYearOptions(res.data);

     console.log(yearOptions)

    });
   
    setShowYear(true);
  };

  return (
    <div className="container-fluid">
      <div className="row">
        <div className="col-md-2">
          <AdminNav />
        </div>

        <div className="col-md-10">
          {loading ? (
            <LoadingOutlined className="text-danger h1" />
          ) : (
              <h4>Product create</h4>
            )}
          <hr />
          {console.log("modelOptions return ", modelOptions)}
          {/* {JSON.stringify(values.images)} */}
          <div className="p-3">
            <FileUpload
              values={values}
              setValues={setValues}
              setLoading={setLoading}
            />
          </div>
    {/*       {console.log("ccategories return ", categories)} */}
          
          <ProductCreateForm
            handleSubmit={handleSubmit}
            handleChange={handleChange}
            setValues={setValues}
            values={values}
            handleCatagoryChange={handleCatagoryChange}
            handleModelChange={handleModelChange}
            modelOptions={modelOptions}
            subOptions={subOptions}
            yearOptions={yearOptions}
            showSub={showSub}
            showYear = {showYear}
            // setYears = {setYears}
          />
        </div>
      </div>
    </div>
  );
};

export default ProductCreate;
