import axios from "axios";
import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";

function Update() {
  const [book,setBook] = useState({
    title: '',
    desc: '',
    cover: '',
    price: null
  })
  const navigate = useNavigate();
  const location = useLocation();
  const bookId = location.pathname.split('/')[2];
useEffect(()=>{
  const fetchBook = async ()=>{
    try{
      const b = await axios.get('http://localhost:8800/books/'+bookId);
      setBook(b.data[0]);
    }catch(err){
      console.log(err);
    }
  }
  fetchBook();
},[])

function handleChange(e) {
  setBook((prev)=>({...prev, [e.target.name]: e.target.value }))
}
async function handleClick(e) {
  e.preventDefault();
  try{
    await axios.put("http://localhost:8800/books/"+bookId,book);
    navigate("/")
  }catch(err){
    console.log(err);
  }
}
return ( <div className="update form">
  <h1>Update the book</h1>
  <input type="text" placeholder="title" name="title" onChange={handleChange} />
  <input type="text" placeholder="desc" name="desc" onChange={handleChange} />
  <input type="text" placeholder="cover" name="cover" onChange={handleChange} />
  <input type="number" placeholder="price" name="price"onChange={handleChange}  />
  <button className="formBtn" onClick={handleClick}>Update</button>
  </div> );
}

export default Update;