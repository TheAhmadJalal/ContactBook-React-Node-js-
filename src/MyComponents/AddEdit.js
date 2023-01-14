import React from 'react'
import { useState,useEffect } from 'react'
import { useNavigate, useParams } from 'react-router-dom';

import {  toast } from 'react-toastify';


import './AddEdit.css'
import axios from 'axios'
import 'react-toastify/dist/ReactToastify.css'
import { Link } from 'react-router-dom'

const initialState={
    Name:"",
    Email:"",
    contact:""
};
const AddEdit = () => {
  const [state,setState]=useState(initialState);
  const {Name,Email,contact}=state;
  const navigate = useNavigate();

  const {id}=useParams();
  useEffect(()=>{
    axios.get(`http://localhost:5000/get/${id}`)
    .then((response)=>setState({...response.data[0]}));

  },[id]);



  const handleSubmit=(e)=>{
    //to prevent refreshing the page by default
    e.preventDefault(); 
    if(!Name || !Email || !contact){
        toast.error("Please provide all fields");
    }
    else{
      if(!id)
      { 
        axios.post("http://localhost:5000/post",{
          Name,
          Email,
          contact
        })
        .then(()=>{
          setState({Name:"",Email:"",contact:""});
        })
        .catch((err)=>toast.error(err.response.data));
        
        toast.success("Contact Saved");
      }
      else{
        axios.put(`http://localhost:5000/put/${id}`,{
          Name,
          Email,
          contact
        })
        .then(()=>{
          setState({Name:"",Email:"",contact:""});
        })
        .catch((err)=>toast.error(err.response.data));
        
        toast.success("Contact Updated Sucessfully");
      }
      setTimeout(()=>navigate('/'),500);

    }
  };
  /////////////
  const handleInputChange=(e)=>{
    const {name,value}=e.target;
    // console.log(name);
    setState({...state,[name]:value});
  };
  ////////////
    return (
    <div style={{marginTop:"100px"}}>
        <form className="form" onSubmit={handleSubmit}>
            <label htmlFor="Name">Name</label>
            {/* name||"" this is for update function  */}
            <input type="text" id="Name" name='Name' placeholder='Enter Name' value={Name || ""}  onChange={handleInputChange}/>

            <label htmlFor="Email">Email</label>
            <input type="email" id="Email" name='Email' placeholder='Enter Email'value={Email || ""}  onChange={handleInputChange}/>
           
            <label htmlFor="contact">contact</label>
            <input type="number" id="contact" name='contact' placeholder='Enter contact' value={contact || ""}  onChange={handleInputChange}/>
 
 
         
            <input type="submit" value={id?"Update":"Save"}  />
            
 
            <Link to="/">
            <input type="button" value="go back" />
            </Link>

        </form>
    </div>
  )
}

export default AddEdit
