import Axios from "axios";
import React, {useState, useEffect} from "react";
import {Link} from "react-router-dom";
import { getModeles } from "../../functions/model";
import { getYears } from "../../functions/year";

const ModelsGrid = () => {

    const[models, setModels] = useState([])
    const[years, setYears] = useState([])

    useEffect(() => {
            getModeles().then((res) => {
                console.log(res.data)
            setModels(res.data)
            
            })
    }, []) 

    useEffect(() => {
            getYears().then((res) => {
                console.log(res.data)
            setYears(res.data)
       
            })  
    }, []) 


    return (
        <div className="models-grid">
            
            {models.map((model)=>(
                <div className="models-grid__square ">
                    <div className="card noshadow">   

                        <img className="models-grid__square--img front "src="/cars/new/wra1.jpg" alt="" />
                        <div className="back ">     
                            <div className="back-content ">       
                            {years.map((year)=> (year.parent==model._id && <a className="block font5" href="#">{year.name}</a>) 
                            )}
                                   
                            </div>
                        </div>

                    </div>
                    <div>
                            <Link className="font5" to={`/car/${model.slug}`}>Jeep {model.name}</Link>
                    </div>
                </div>
            ))}
        
        </div>
    )
}
export default ModelsGrid