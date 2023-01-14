import './Home.css'
import React from 'react'
import {useState,useEffect} from 'react'
import {  toast } from 'react-toastify';
import {Link} from 'react-router-dom'
// TO make a call to our backend API
import axios from 'axios'

const Home = () => {

   
    const [data,setData]=useState([]);
    // The purpose of async / await is to simplify the syntax necessary 
    // to consume promise-based APIs. The behavior of async / await is similar to combining 
    // generators and promises.Asnc functions always return a promise.
    const loadData= async()=>{
        try{

            const response=await axios.get('http://localhost:5000/view');
            setData(response.data);
        } 
        catch{

            return -1;
        }
    };

    useEffect(()=>{
        loadData();
    },[]);


    //delete  Function
    const deleteContact=(id)=>{
        if(window.confirm("Are you sure to delete this contact"))
        {
              console.log("id:",id);
            axios.delete(`http://localhost:5000/delete/${id}`);
            console.log("API after delete");

                       
                         toast.success("Successfully deleted");

        setTimeout(()=>loadData(),100);
        }
    }
  return (
    <div style={{marginTop:"150px"}}>
        <Link to="/addContact">
        <button className='btnAdd btn-contact'>Add Contact</button>
        </Link>
        <table className="tableStyle">
            <thead>

            <tr>
                <th style={{textAlign:"center"}}>No.</th>
                <th style={{textAlign:"center"}}>Name</th>
                <th style={{textAlign:"center"}}>Email</th>
                <th style={{textAlign:"center"}}>Contact</th>
                <th style={{textAlign:"center"}}>Actions</th>
            </tr>

            </thead>
            <tbody>
               {data.map((item,index)=>{
                return(
                    <>
                    <tr key={item.ID}>
                    <th scope="row">{index+1}</th>
                    <td>{item.Name}</td>
                    <td>{item.Email}</td>
                    <td>{item.contact}</td>
                    <td>
                    <Link to={`/update/${item.ID}`}>
                       <button className='btn btn-sm btn-success mx-3'>Edit</button>
                       
                     </Link> 
                      

                       <button className='btn btn-sm btn-danger mx-3' onClick={()=>deleteContact(item.ID)}>
                        Delete
                        </button>
                      
                   
                    <Link to={`/view/${item.ID}`}>
                       <button className='btn btn-sm btn-primary mx-3'>View</button>
                       
                    </Link> 
                        
                    </td>
                    </tr>
                    </>
                )
               })

               }
            </tbody>
        </table>
    </div>
  )
// return(
// <>
//  <div>
    
//     <h2>HI</h2>
    
//     </div>
// </>
// )
}

export default Home
