import { BrowserRouter, Routes, Route } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Navigate } from "react-router-dom";
import Books from "./pages/Books";
import Home from "./pages/Home";
import Search from "./pages/Search";
import Login from "./pages/Auth/Login";
import Register from "./pages/Auth/Register";
import Notes from "./pages/Notes";
import Tasks from "./pages/Tasks";
// import BookDetails from "./pages/BookDetails";

import "./App.css";
import ParamPage from "./pages/ParamPage";

function App() {
  return (
    <BrowserRouter>
      <ToastContainer position="top-left" autoClose={2000} />

      <Routes>
        <Route path="/" element={<Navigate to="/login" />} />
        <Route path="/register" element={<Register />} />
        <Route path="/Home" element={<Home />} />
        <Route path="/books" element={<Books />} />
        
        <Route path="/parampage/:cover_id" element={<ParamPage />} />
        <Route path="/search" element={<Search />} />
        <Route path="/login" element={<Login />} />
        <Route path="/notes" element={<Notes />} />
        <Route path="/tasks" element={<Tasks />} />
        {/* <Route path="/bookmarks" element={<Bookmarks />} /> */}
      {/* <Route path='*' element={<Errorpage/>}></Route> */}
      </Routes>
    </BrowserRouter>
  );
}

export default App;
