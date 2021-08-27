import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { getEngines } from "../../functions/engine";

const EngimeList = () => {
  const [enginees, setEngines] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
    getEngines().then((c) => {
      setEngines(c.data);
      setLoading(false);
    });
  }, []);

  const showEngines = () =>
    engines.map((c) => (
      <div
        key={c._id}
        className="col btn btn-outlined-primary btn-lg btn-block btn-raised m-3"
      >
        <Link to={`/engine/${c.slug}`}>{c.name}</Link>
      </div>
    ));

  return (
    <div className="container">
      <div className="row">
        {loading ? (
          <h4 className="text-center">Loading...</h4>
        ) : (
          showEngines()
        )}
      </div>
    </div>
  );
};

export default EngineList;
