import axios from "axios";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

function Add() {
  const [book,setBook] = useState({
    title: '',
    desc: '',
    cover: '',
    price: null
  })
  const navigate = useNavigate();

function handleChange(e) {
  setBook((prev)=>({...prev, [e.target.name]: e.target.value }))
}
async function handleClick(e) {
  e.preventDefault();
  try{
    await axios.post("http://localhost:8800/books",book);
    navigate("/")
  }catch(err){
    console.log(err);
  }
}
return ( <div className="add form">
  <h1>Add new book</h1>
  <input type="text" placeholder="title" name="title" onChange={handleChange} />
  <input type="text" placeholder="desc" name="desc" onChange={handleChange}/>
  <input type="text" placeholder="cover" name="cover" onChange={handleChange}/>
  <input type="number" placeholder="price" name="price" onChange={handleChange}/>
  <button className="formBtn" onClick={handleClick}>Add</button>
  </div> );
}

export default Add;