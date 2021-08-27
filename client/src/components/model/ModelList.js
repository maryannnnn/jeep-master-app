import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { getModeles } from "../../functions/model";

const ModelList = () => {
  const [modeles, setModeles] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
    getModeles().then((c) => {
      setModeles(c.data);
      setLoading(false);
    });
  }, []);

  const showModeles = () =>
    modeles.map((c) => (
      <div
        key={c._id}
        className="col btn btn-outlined-primary btn-lg btn-block btn-raised m-3"
      >
        <Link to={`/model/${c.slug}`}>{c.name}</Link>
      </div>
    ));

  return (
    <div className="container">
      <div className="row">
        {loading ? (
          <h4 className="text-center">Loading...</h4>
        ) : (
          showModeles()
        )}
      </div>
    </div>
  );
};

export default ModelList;
