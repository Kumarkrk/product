import express from 'express';
import { getAllProducts,getProductById,createProduct,deleteProduct ,updateProduct,bulkUpload,upload} from '../router/router.js';
const route=express.Router();

route.get("/", getAllProducts);
route.post("/", createProduct);
route.delete("/:id", deleteProduct);
route.put("/:id", updateProduct);
route.get("/:id", getProductById);
route.post("/bulk-upload", upload.single("file"), bulkUpload);
export default route;
