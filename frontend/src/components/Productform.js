import React, { useState, useEffect } from "react";
import axios from "axios";

export default function ProductForm({ selectedProduct }) {

  const [formData, setFormData] = useState({
    name: "",
    sku: "",
    price: "",
    quantity: "",
    category: ""
  });

  useEffect(() => {

    if (selectedProduct) {

      setFormData({
        name: selectedProduct.name || "",
        sku: selectedProduct.sku || "",
        price: selectedProduct.price || "",
        quantity: selectedProduct.quantity || "",
        category: selectedProduct.category || ""
      });

    }

  }, [selectedProduct]);

  const handleChange = (e) => {

    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });

  };

  const handleSubmit = async (e) => {

    e.preventDefault();

    try {

      if (selectedProduct) {

        await axios.put(
          `https://product-bza3.onrender.com/api/${selectedProduct._id}`,
          formData
        );

      } else {

        await axios.post(
          "https://product-bza3.onrender.com/api",
          formData
        );

      }

      setFormData({
        name: "",
        sku: "",
        price: "",
        quantity: "",
        category: ""
      });

      window.location.reload();

    } catch (err) {

      console.log(err);

    }

  };

  return (

    <div>

      <h2>{selectedProduct ? "Edit Product" : "Add Product"}</h2>

      <form onSubmit={handleSubmit}>

        <input
          name="name"
          placeholder="Name"
          value={formData.name}
          onChange={handleChange}
        />

        <input
          name="sku"
          placeholder="SKU"
          value={formData.sku}
          onChange={handleChange}
        />

        <input
          type="number"
          name="price"
          placeholder="Price"
          value={formData.price}
          onChange={handleChange}
        />

        <input
          type="number"
          name="quantity"
          placeholder="Quantity"
          value={formData.quantity}
          onChange={handleChange}
        />

        <input
          name="category"
          placeholder="Category"
          value={formData.category}
          onChange={handleChange}
        />

        <button type="submit">
          {selectedProduct ? "Update Product" : "Add Product"}
        </button>

      </form>

    </div>

  );

}
