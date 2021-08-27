import React from "react";
import { Link } from "react-router-dom";

const ProductListItems = ({ product }) => {
  const {
    price,
    category,
    subs,
    model,
    shipping,
    color,
    brand,
    quantity,
    wait,
    sold,
  } = product;

  return (
    <ul className="list-group">
      <li className="list-group-item">
        Цена{" "}
        <span className="label label-default label-pill pull-xs-right">
         {price}  руб. 
        </span>
      </li>

      {category && (
        <li className="list-group-item">
          Категория{" "}
          <Link
            to={`/category/${category.slug}`}
            className="label label-default label-pill pull-xs-right"
          >
            {category.name}
          </Link>
        </li>
      )}

      {subs && (
        <li className="list-group-item">
          Подкатегории
          {console.log("model In Subs", subs)}
          {subs.map((s) => (
            <Link
              key={s._id}
              to={`/sub/${s.slug}`}
              className="label label-default label-pill pull-xs-right"
            >
              {s.name}
            </Link>
          ))}
        </li>
      )}

      <li className="list-group-item">
        Марка{" "}
        <span className="label label-default label-pill pull-xs-right">
          {brand}
        </span>
      </li>
      {console.log("model ProductListItems", model)}
      {model && (
        <li className="list-group-item">
          Модель{" "}
          {console.log("model In Modeles", model)}
          {model.map((m) => (
            <Link
              key={m._id}
              to={`/car/${m.slug}`}
              className="label label-default label-pill pull-xs-right"
            >
              {m.name}
            </Link>
          ))}
        </li>
      )}

      <li className="list-group-item">
        Доставляем{" "}
        <span className="label label-default label-pill pull-xs-right">
          {shipping}
        </span>
      </li>

      <li className="list-group-item">
        Цвет{" "}
        <span className="label label-default label-pill pull-xs-right">
          {color}
        </span>
      </li>

      {quantity > 0 ? (
        <li className="list-group-item">
          В наличии{" "}
          <span className="label label-default label-pill pull-xs-right">
            {quantity}
          </span>
        </li>
      ) : (
          <li className="list-group-item">
            Нет в наличии. Ожидание{" "}
            <span className="label label-default label-pill pull-xs-right">
              {wait}{" дн."}
            </span>
          </li>
        )
      }

      {/*       <li className="list-group-item">
        Sold{" "}
        <span className="label label-default label-pill pull-xs-right">
          {sold}
        </span>
      </li> */}
    </ul>
  );
};

export default ProductListItems;
