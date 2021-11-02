import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { getYears } from "../../functions/year";

const YearList = () => {
  const [yaers, setYears] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
    getYears().then((c) => {
      setYears(c.data);
      setLoading(false);
    });
  }, []);

  const showYears = () =>
    years.map((c) => (
      <div
        key={c._id}
        className="col btn btn-outlined-primary btn-lg btn-block btn-raised m-3"
      >
        <Link to={`/year/${c.slug}`}>{c.name}</Link>
      </div>
    ));

  return (
    <div className="container">
      <div className="row">
        {loading ? (
          <h4 className="text-center">Loading...</h4>
        ) : (
          showYears()
        )}
      </div>
    </div>
  );
};

export default YearList;
