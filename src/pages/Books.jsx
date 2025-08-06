import BookCard from "../components/BookCard";
import Header from "../components/Header";
import { useState, useEffect } from "react";
import axios from "axios";
import { ThreeDot } from "react-loading-indicators";
import "./Books.css";


function Books() {
    const [books, setBooks] = useState([]);
    const [loading, setLoading] = useState(false);
  const  [ input,setinput]= useState("")
    const [search, setSearch] = useState("");
    const handleSearch = (e) => {
        setSearch(input);
    };
  const handleinput =(e)=>{

                setinput(e.target.value);
  }
  console.log(search);
    useEffect(() => {
        setLoading(true);
    axios
            .get(search ? `https://openlibrary.org/search.json?q=${search}` : "https://openlibrary.org/search.json?q=physics")
            .then((res) => {
                setBooks(res.data.docs);
                setLoading(false);
            })
            .catch((err) => {
                console.error(err);
                setLoading(false);
            });
    }, [search]);

    const filteredBooks = books.filter((book) => book.cover_i);

    return (
        <div className="bg-[#18addf]">
            <Header />
            <div className="flex justify-center items-center mb-3 mt-3 gap-3 ">
                <input type="text" placeholder="Search for books..." className="w-2xl h-2xl bg-white outline-none px-4 mb-2 hover:border-b-2 border-b-2 border-transparent focus:border-b-2 focus:border-blue-500" onChange={handleinput} />
                <button onClick={handleSearch} className="bg-blue-400 hover:bg-blue-400 focus:ring-2 focus:ring-blue-500 text-white px-4 py-2 rounded">Search</button>
            </div>

            {loading ? (
                <div style={{
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    height: "100vh"
                }}>
                    <ThreeDot variant="bounce" color="#6832cdff" size="medium" />
                </div>

            ) : filteredBooks.length === 0 ? (
                <p className="info-text">No books found.</p>
            ) : (
                <div>
                    
                    <div className="cont">
                        <div className="book-grid">
                            {filteredBooks.map((book, index) => (
                                <BookCard
                                    key={index}
                                    id={book.cover_i}

                                    title={book.title}
                                    author={book.author_name?.[0]}
                                    year={book.first_publish_year}
                                    image={`https://covers.openlibrary.org/b/id/${book.cover_i}-M.jpg`}
                                />

                            ))}
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}

export default Books;
