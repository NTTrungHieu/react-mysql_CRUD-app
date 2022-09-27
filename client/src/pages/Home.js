import { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

function Home() {
  const [books, setBooks] = useState([]);

  useEffect(() => {
    const fetchAllBooks = async () => {
      try {
        const res = await axios.get("http://localhost:8800/books");
        setBooks(res.data);
        console.log(books);
      } catch (err) {
        console.log(err);
      }
    };
    fetchAllBooks();
  }, []);
  async function handleClick(bookId) {
    try {
      await axios.delete("http://localhost:8800/books/" + bookId);
      window.location.reload();
    } catch (err) {
      console.log(err);
    }
  }

  return (
    <div className="home">
      <div className="books">
        {books.map((book) => {
          return (
            <div className="book" key={book.id}>
              {book.cover && <img src={book.cover} alt="" />}
              <h2>{book.title}</h2>
              <p>{book.desc}</p>
              <span>{book.price}</span>
              <button className="update">
                <Link to={`/update/${book.id}`}>Update</Link>
              </button>
              <button
                className="delete"
                onClick={(e) => {
                  handleClick(book.id);
                }}
              >
                Delete
              </button>
            </div>
          );
        })}
      </div>
      <button>
        <Link to="/add">Add new book</Link>
      </button>
    </div>
  );
}

export default Home;
