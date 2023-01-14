
import React from 'react'
import { useState, useEffect } from 'react'
 
import { Link } from 'react-router-dom'
// To make a call to our backend API
import axios from 'axios'
import './View.css'  
import { useNavigate, useParams } from 'react-router-dom';
import {  toast } from 'react-toastify';
 

const initialState={
    Name:"",
    Email:"",
    contact:""
};

const View = () => {
    
  const [state,setState]=useState({initialState});
  const {Name,Email,contact}=state;
    
  const {id}=useParams();
  useEffect(()=>{
    axios.get(`http://localhost:5000/get/${id}`)
    .then((response)=>setState({...response.data[0]}));

  },[id]);

    return (
        <>
        <div style={{marginTop:"70px"}}>

        <div className='img'>
        </div>
            <div className="card" > 
                <div className="container"> 
                    <h4 ><b>Name:</b>{state.Name}</h4>
                    <h4 ><b>Email:</b>{state.Email}</h4>
                    <h4 ><b>Contact:</b>{state.contact}</h4>
                     
                </div>
               
            </div>
 
        </div>
        </>

    )
}

export default View
 