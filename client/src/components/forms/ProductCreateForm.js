import React from "react";
import { Select } from "antd";

const { Option } = Select;

const ProductCreateForm = ({
  handleSubmit,
  handleChange,
  setValues,
  values,
  handleCatagoryChange,
  handleModelChange,
  modelOptions,
  subOptions,
  yearOptions,
  showSub,
  showYear
}) => {
  // destructure
  const {
    title,
    titleshort,
    articul,
    description,
    metadescription,
    metakeyword,
    price,
    categories,
    category,
    subs,
    years,
    modeles,
    model,
    numberorigional,
    numberproduser,
    shipping,
    quantity,
    wait,
    images,
    materials,
    colors,
    brands,
    material,
    color,
    brand,
  } = values;

  return (
    <form onSubmit={handleSubmit}>

      <div className="form-group">
        <label>Заголовок</label>
        <input
          type="text"
          name="title"
          className="form-control"
          value={title}
          onChange={handleChange}
        />
      </div>

      <div className="form-group">
        <label>Короткий заголовок</label>
        <input
          type="text"
          name="titleshort"
          className="form-control"
          value={titleshort}
          onChange={handleChange}
        />
      </div>

      <div className="form-group">
        <label>Артикул</label>
        <input
          type="text"
          name="articul"
          className="form-control"
          value={articul}
          onChange={handleChange}
        />
      </div>

      <div className="form-group">
        <label>Описание</label>
        <input
          type="text"
          name="description"
          className="form-control"
          value={description}
          onChange={handleChange}
        />
      </div>

      <div className="form-group">
        <label>Мета Описание</label>
        <input
          type="text"
          name="metadescription"
          className="form-control"
          value={metadescription}
          onChange={handleChange}
        />
      </div>

      <div className="form-group">
        <label>Мета Ключевые слова</label>
        <input
          type="text"
          name="metakeyword"
          className="form-control"
          value={metakeyword}
          onChange={handleChange}
        />
      </div>

      <div className="form-group">
        <label>Цена</label>
        <input
          type="number"
          name="price"
          className="form-control"
          value={price}
          onChange={handleChange}
        />
      </div>

      <div className="form-group">
        <label>Модель</label>
        <select
          name="model"
          className="form-control"
          onChange={handleModelChange}
        >
          <option>Выберете</option>
          {modelOptions.length > 0 &&
            modelOptions.map((m) => (
              <option key={m._id} value={m._id}>
                {m.name}
              </option>
            ))}
        </select>
      </div>


      {showYear && (
        <div>
          <label>Года</label>
          <Select
            mode="multiple"
            style={{ width: "100%" }}
            placeholder="Выберете"

            value={years}

            onChange={(value) => setValues({ ...values, years: value })}
          >
            {yearOptions.length &&
              yearOptions.map((s) => (
                <Option key={s._id} value={s._id}>
                  {s.name}
                </Option>
              
              ))}
          </Select>
        </div>
      )}


      <div className="form-group">
        <label>Марка</label>
        <select name="brand" className="form-control" onChange={handleChange}>
          <option>Выберете</option>
          {brands.map((b) => (
            <option key={b} value={b}>
              {b}
            </option>
          ))}
        </select>
      </div>

      <div className="form-group">
        <label>Категория</label>
        <select
          name="category"
          className="form-control"
          onChange={handleCatagoryChange}
        >
          <option>Выберете</option>
          {categories.length > 0 &&
            categories.map((c) => (
              <option key={c._id} value={c._id}>
                {c.name}
              </option>
            ))}
        </select>
      </div>

      {showSub && (
        <div>
          <label>Подкатегории</label>
          <Select
            mode="multiple"
            style={{ width: "100%" }}
            placeholder="Выберете"
            value={subs}
            onChange={(value) => setValues({ ...values, subs: value })}
          >
            {subOptions.length &&
              subOptions.map((s) => (
                <Option key={s._id} value={s._id}>
                  {s.name}
                </Option>
              ))}
          </Select>
        </div>
      )}

      <div className="form-group">
        <label>Номер Оригинальный</label>
        <input
          type="text"
          name="numberorigional"
          className="form-control"
          value={numberorigional}
          onChange={handleChange}
        />
      </div>

      <div className="form-group">
        <label>Номер Производителя</label>
        <input
          type="text"
          name="numberproduser"
          className="form-control"
          value={numberproduser}
          onChange={handleChange}
        />
      </div>

      <div className="form-group">
        <label>Доставляем</label>
        <select
          name="shipping"
          className="form-control"
          onChange={handleChange}
        >
          <option>Выберете</option>
          <option value="No">No</option>
          <option value="Yes">Yes</option>
        </select>
      </div>

      <div className="form-group">
        <label>Количество</label>
        <input
          type="number"
          name="quantity"
          className="form-control"
          value={quantity}
          onChange={handleChange}
        />
      </div>

      <div className="form-group">
        <label>Ожидание</label>
        <input
          type="number"
          name="wait"
          className="form-control"
          value={wait}
          onChange={handleChange}
        />
      </div>

      <div className="form-group">
        <label>Цвет</label>
        <select name="color" className="form-control" onChange={handleChange}>
          <option>Please select</option>
          {colors.map((c) => (
            <option key={c} value={c}>
              {c}
            </option>
          ))}
        </select>
      </div>

      <div className="form-group">
        <label>Материал</label>
        <select name="material:" className="form-control" onChange={handleChange}>
          <option>Please select</option>
          {materials.map((c) => (
            <option key={c} value={c}>
              {c}
            </option>
          ))}
        </select>
      </div>

      <br />
      <button className="btn btn-outline-info">Save</button>
    </form>
  );
};

export default ProductCreateForm;
