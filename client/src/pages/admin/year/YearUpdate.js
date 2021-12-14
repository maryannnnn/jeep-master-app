import React, { useState, useEffect } from "react";
import AdminNav from "../../../components/nav/AdminNav";
import { toast } from "react-toastify";
import { useSelector } from "react-redux";
import { getModeles } from "../../../functions/model";
import { getYear, updateYear } from "../../../functions/year";
import YearForm from "../../../components/forms/YearForm";

const YearUpdate = ({ history, match }) => {
  const { user } = useSelector((state) => ({ ...state }));

  const [name, setName] = useState("");
  const [loading, setLoading] = useState(false);
  const [modeles, setModeles] = useState([]);
  const [parent, setParent] = useState("");

  useEffect(() => {
    loadModeles();
    loadYear();
  }, []);

  const loadModeles = () =>
    getModeles().then((c) => setModeles(c.data));

  const loadYear = () =>
    getYear(match.params.slug).then((s) => {
      setName(s.data.name);
      setParent(s.data.parent);
    });

  const handleSubmit = (e) => {
    e.preventDefault();
    // console.log(name);
    setLoading(true);
    updateYear(match.params.slug, { name, parent }, user.token)
      .then((res) => {
        // console.log(res)
        setLoading(false);
        setName("");
        toast.success(`"${res.data.name}" is updated`);
        history.push("/admin/year");
      })
      .catch((err) => {
        console.log(err);
        setLoading(false);
        if (err.response.status === 400) toast.error(err.response.data);
      });
  };

  return (
    <div className="container-fluid">
      <div className="row">
        <div className="col-md-2">
          <AdminNav />
        </div>
        <div className="col">
          {loading ? (
            <h4 className="text-danger">Loading..</h4>
          ) : (
            <h4>Update year</h4>
          )}

          <div className="form-group">
            <label>Parent model</label>
            <select
              name="model"
              className="form-control"
              onChange={(e) => setParent(e.target.value)}
            >
              <option>Please select</option>
              {modeles.length > 0 &&
                modeles.map((m) => (
                  <option key={m._id} value={m._id} selected={m._id === parent}>
                    {m.name}
                  </option>
                ))}
            </select>
          </div>

          <YearForm
            handleSubmit={handleSubmit}
            name={name}
            setName={setName}
          />
        </div>
      </div>
    </div>
  );
};

export default YearUpdate;
