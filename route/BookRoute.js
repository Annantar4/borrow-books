import express from "express";
import { getBook,createBook,deleteBook } from "../controller/Books.js";
const router = express.Router();

router.get('/Book', getBook);
router.post('/Book', createBook);
router.delete('/Book/:id', deleteBook); 

export default router;