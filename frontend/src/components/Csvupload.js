import React, { useState } from "react";
import axios from "axios";

function Csvupload() {

  const [file, setFile] = useState(null);

  const handleUpload = async () => {

    if (!file) {

      alert("Select CSV file");

      return;

    }

    const formData = new FormData();

    formData.append("file", file);

    try {

      await axios.post(
        "https://product-bza3.onrender.com/api/bulk-upload",
        formData
      );

      alert("CSV Uploaded Successfully");

      window.location.reload();

    } catch (err) {

      console.log(err);

    }

  };

  return (

    <div>

      <h2>Upload CSV</h2>

      <input
        type="file"
        accept=".csv"
        onChange={(e) => setFile(e.target.files[0])}
      />

      <button onClick={handleUpload}>
        Upload
      </button>

    </div>

  );

}

export default Csvupload;
