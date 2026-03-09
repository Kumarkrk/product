import React from "react";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import ProductForm from "./components/Productform";
import Producttable from "./components/Producttable";
import Csvupload from "./components/Csvupload";
import "./App.css";

function App() {
  return (
    <Router>

      <div className="container">

        <h1 className="title">Product Management System</h1>

        <nav className="navbar">

          <Link to="/">
            <button className="nav-btn">Products</button>
          </Link>

          <Link to="/add-product">
            <button className="nav-btn">Add Product</button>
          </Link>

          <Link to="/upload-csv">
            <button className="nav-btn">Upload CSV</button>
          </Link>

        </nav>

        <div className="page">

          <Routes>

            <Route path="/" element={<Producttable />} />

            <Route path="/add-product" element={<ProductForm />} />

            <Route path="/upload-csv" element={<Csvupload />} />

          </Routes>

        </div>

      </div>

    </Router>
  );
}

export default App;