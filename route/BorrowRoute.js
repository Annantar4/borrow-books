import express from "express";
import { getBorrow,createBorrow,updateBorrow } from "../controller/Borrow.js";
const router = express.Router();

router.get('/Borrow', getBorrow);
router.post('/Borrow', createBorrow);
router.post('/Return', updateBorrow);

export default router;