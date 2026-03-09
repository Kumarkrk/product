import csv from "csv-parser";
import fs from "fs";
import Product from "../data/Schema1.js";
import multer from "multer";

export const upload = multer({ dest: "uploads/" });
export const bulkUpload = async (req, res) => {

  const results = [];

  fs.createReadStream(req.file.path)
    .pipe(csv())
    .on("data", (data) => results.push(data))
    .on("end", async () => {

      try {

        const products = results.map((row) => ({
          name: row.name,
          sku: row.sku,
          price: Number(row.price),
          quantity: Number(row.quantity),
          category: row.category
        }));

        await Product.insertMany(products);

        res.json({
          message: "CSV uploaded successfully",
          inserted: products.length
        });

      } catch (err) {

        res.status(500).json({ message: err.message });

      }

    });

};
export const getAllProducts=async(req,res)=>
{
    try{
        const products=await Product.find({});
        res.status(200).json(products);
    }
    catch(err){
        res.status(500).json({message:err.message});
    }
}
export const updateProduct = async (req, res) => {
  try {

    const product = await Product.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );

    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }

    res.status(200).json(product);

  } catch (err) {

    res.status(500).json({ message: err.message });

  }
};
export const createProduct=async(req,res)=>
{
    try{  
        const product=await Product.create(req.body);
        console.log(req.body);
        res.status(201).json(product);
    }
    catch(err){
        res.status(500).json({message:err.message});
    }
}
export const deleteProduct=async(req,res)=>
{
    try{
        const product=await Product.findByIdAndDelete(req.params.id);
        if(!product){
            return res.status(404).json({message:"Product not found"});
        }       res.status(200).json({message:"Product deleted successfully"});
    }
    catch(err){
        res.status(500).json({message:err.message});
    } 
}
export const getProductById=async(req,res)=>
{
    try{
        const product=await Product.findById(req.params.id);
        if(!product){
            return res.status(404).json({message:"Product not found"});
        }
        res.status(200).json(product);
    }
    catch(err){
        res.status(500).json({message:err.message});
    }
}