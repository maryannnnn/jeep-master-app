import React, { useState, useEffect } from "react";
import AdminNav from "../../../components/nav/AdminNav";
import { toast } from "react-toastify";
import { useSelector } from "react-redux";
import { getModeles } from "../../../functions/model";
import {
  createYear,
  getYears,
  removeYear,
} from "../../../functions/year";
import { Link } from "react-router-dom";
import { EditOutlined, DeleteOutlined } from "@ant-design/icons";
import YearForm from "../../../components/forms/YearForm";
import LocalSearch from "../../../components/forms/LocalSearch";

const YearCreate = () => {
  const { user } = useSelector((state) => ({ ...state }));

  const [name, setName] = useState("");
  const [loading, setLoading] = useState(false);
  const [modeles, setModeles] = useState([]);
  const [model, setModel] = useState("");
  const [years, setYears] = useState([]);
  // step 1
  const [keyword, setKeyword] = useState("");

  useEffect(() => {
    loadModeles();
    loadYears();
  }, []);

  const loadModeles = () =>
    getModeles().then((c) => setModeles(c.data));

  const loadYears = () => getYears().then((s) => setYears(s.data));

  const handleSubmit = (e) => {
    e.preventDefault();
    // console.log(name);
    setLoading(true);
    createYear({ name, parent: model }, user.token)
      .then((res) => {
        // console.log(res)
        setLoading(false);
        setName("");
        toast.success(`"${res.data.name}" is created`);
        loadYears();
      })
      .catch((err) => {
        console.log(err);
        setLoading(false);
        if (err.response.status === 400) toast.error(err.response.data);
      });
  };

  const handleRemove = async (slug) => {
    // let answer = window.confirm("Delete?");
    // console.log(answer, slug);
    if (window.confirm("Delete?")) {
      setLoading(true);
      removeYear(slug, user.token)
        .then((res) => {
          setLoading(false);
          toast.error(`${res.data.name} deleted`);
          loadYears();
        })
        .catch((err) => {
          if (err.response.status === 400) {
            setLoading(false);
            toast.error(err.response.data);
          }
        });
    }
  };

  // step 4
  const searched = (keyword) => (c) => c.name.toLowerCase().includes(keyword);

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
            <h4>Create year</h4>
          )}

          <div className="form-group">
            <label>Parent year-model</label>
            <select
              name="model"
              className="form-control"
              onChange={(e) => setModel(e.target.value)}
            >
              <option>Please select</option>
              {modeles.length > 0 &&
                modeles.map((m) => (
                  <option key={m._id} value={m._id}>
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

          {/* step 2 and step 3 */}
          <LocalSearch keyword={keyword} setKeyword={setKeyword} />

          {/* step 5 */}
          {years.filter(searched(keyword)).map((s) => (
            <div className="alert alert-secondary" key={s._id}>
              {s.name}
              <span
                onClick={() => handleRemove(s.slug)}
                className="btn btn-sm float-right"
              >
                <DeleteOutlined className="text-danger" />
              </span>
              <Link to={`/admin/year/${s.slug}`}>
                <span className="btn btn-sm float-right">
                  <EditOutlined className="text-warning" />
                </span>
              </Link>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default YearCreate;
