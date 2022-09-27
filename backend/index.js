import express from 'express';
import mysql from "mysql2";
import cors from 'cors'

const app = express();
app.use(express.json())
app.use(cors());
const config = {
  host: 'localhost',
  user: 'root',
  password: 'root',
  database:'test',  
}
const db = mysql.createConnection(config)

app.get('/',(req,res)=>{
  res.json('Hello, here is the backend');
})

app.get('/books',(req,res)=>{
  const q = "SELECT * FROM books";
  db.query(q, (err, data)=>{
    if(err) return res.json(err);
    return res.json(data);
  })
})
app.get('/books/:id',(req,res)=>{
  const q = "SELECT * FROM books WHERE id = ?";
  const id = req.params.id;
  db.query(q,[id], (err, data)=>{
    if(err) return res.json(err);
    return res.json(data);
  })
})

app.post('/books',(req,res)=>{
  const q = "INSERT INTO books (`title`,`desc`,`cover`,`price`) VALUES (?)";
  const values = [
    req.body.title,
    req.body.desc,
    req.body.cover,
    req.body.price
  ]

  db.query(q,[values], (err, data)=>{
    return err?res.json(err):res.json('Your book has been created successfully')
  })
})

app.delete("/books/:id",(req,res)=>{
  const bookId = req.params.id;
  const q = 'DELETE FROM BOOKS WHERE id = ?';
  db.query(q,[bookId],(err,data)=>{
    return err?res.json(err):res.json('Your book has been deleted successfully')
  })
})
app.put("/books/:id",(req,res)=>{
  const bookId = req.params.id;
  const q = 'UPDATE BOOKS SET `title` = ?, `desc` = ?, `cover` = ?, `price` = ? WHERE id = ?';

  const values = [
    req.body.title,
    req.body.desc,
    req.body.cover,
    req.body.price,
  ]

  db.query(q,[...values,bookId],(err,data)=>{
    return err?res.json(err):res.json('Your book has been updated successfully')
  })
})

app.listen(8800,()=>{
  
  console.log('Listening on port 8000');
})