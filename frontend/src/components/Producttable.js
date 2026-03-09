import React, { useEffect, useState } from "react";
import axios from "axios";

export default function Producttable({ setSelectedProduct }) {

  const [products, setProducts] = useState([]);

  const fetchProducts = async () => {

    try {

      const res = await axios.get("http://localhost:4000/api");

      setProducts(res.data);

    } catch (err) {

      console.log(err);

    }

  };

  useEffect(() => {

    fetchProducts();

  }, []);

  const deleteProduct = async (id) => {

    try {

      await axios.delete(`http://localhost:4000/api/${id}`);

      fetchProducts();

    } catch (err) {

      console.log(err);

    }

  };

  const editProduct = (product) => {

    setSelectedProduct(product);

  };

  return (

    <div>

      <h2>Product Table</h2>

      <table border="1">

        <thead>

          <tr>

            <th>Name</th>
            <th>SKU</th>
            <th>Price</th>
            <th>Qty</th>
            <th>Category</th>
            <th>Actions</th>

          </tr>

        </thead>

        <tbody>

          {products.map((product) => (

            <tr key={product._id}>

              <td>{product.name}</td>
              <td>{product.sku}</td>
              <td>{product.price}</td>
              <td>{product.quantity}</td>
              <td>{product.category}</td>

              <td>

                <button onClick={() => editProduct(product)}>
                  Edit
                </button>

                <button onClick={() => deleteProduct(product._id)}>
                  Delete
                </button>

              </td>

            </tr>

          ))}

        </tbody>

      </table>

    </div>

  );

}