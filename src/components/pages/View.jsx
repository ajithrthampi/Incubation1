import React from 'react'
import { useState, useEffect } from 'react'
import { db } from "../../firebase" 
import {  useParams, Link } from "react-router-dom";
import "./View.css"
import { Button } from 'react-bootstrap';


const View = () => {
    const [companies, setCompany] = useState({});
    const { id } = useParams();

    useEffect(() => {
        db.child(`company/${id}`).get().then((snapshot) => {
            if (snapshot.exists()) {
                setCompany({ ...snapshot.val() });
            } else {
                setCompany({});
            }
        })
    }, [id])

   

    console.log("companies", companies);

    return (
        <div style={{marginTop: "150px" }} >
            <div className='card' >
                <div className="card-header">
                    <p>Company Contact Details</p>
                </div>
                <div className="container">
                    <strong>ID:</strong>
                    <span> {id} </span>
                    <br/>
                    <br/>

                    <strong>Company</strong>
                    <span> {companies.name} </span>
                    <br/>
                    <br/>

                    <strong>Email:</strong>
                    <span> {companies.email} </span>
                    <br/>
                    <br/>

                    <strong>phone:</strong>
                    <span> {companies.phone} </span>
                    <br/>
                    <br/>
                    <Link to="/application" >
                        <Button className="btn btn-edit" >Go Back</Button>
                    </Link>
                </div>
            </div>
         
        </div>
    )
}

export default View