import express from "express";
import { getMember,createMember,deleteMember } from "../controller/Members.js"; 

const router = express.Router();

router.get('/Member', getMember);
router.post('/Member', createMember);
router.delete('/Member/:id', deleteMember); 

export default router;