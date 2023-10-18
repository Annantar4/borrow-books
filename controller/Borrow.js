import Borrow from "../models/BorrowModel.js";
import Books from "../models/BookModel.js";
import Member from "../models/MemberModel.js";
import { Sequelize } from "sequelize";


export const getBorrow = async(req,res)=>{
    try {
        const borrow = await Borrow.findAll({
            attributes : ['id','borrowedDate'],
            include: [{
                model : Member,
                attributes : ['name']
            },{
                model : Books,
                attributes : ['title','author']
            }]
        })
        res.status(200).json(borrow)
    } catch (error) {
        res.status(500).json({msg : error})
    }
} 



export const createBorrow = async(req,res)=>{
    try {
        const {name, title, borrowedDate} = req.body;
        const member = await Member.findOne({
            where:{name}
        })
        if (!member) return res.status(404).json({error:"Member Not Found"})
        if (member.borrowedBook >= 2) return res.status(400).json({msg:"Member borrowed maximum"});
        if (member.penalty === true){
            const returnDP = member.returnDatePreviously
            const date = new Date(returnDP)
            const date2 = new Date(borrowedDate)
            const time = date.getTime()
            const time2 = date2.getTime()
            const selisih = (time2/(1000 * 60 * 60 *24))-(time/(1000 * 60 * 60 *24))
            if (selisih <= 3) {
                return res.status(400).json({msg:"cant borrow book"})
            }
            await member.update({penalty: false})
        }
        const book = await Books.findOne({
            where:{title}
        })
        if (!book) return res.status(404).json({msg : "Book Not Found"})
        if (!book.stock||book.stock === false) return res.status(400).json({msg:"Book is borrowed"});

        const borrow = await Borrow.create({
            memberId : member.id,
            bookId : book.id,
            borrowedDate : borrowedDate,
        })
        await member.increment('borrowedBook');
        await book.update({stock: false});
        res.status(201).json({msg : "Borrow Success"})
    } catch (error) {
        res.status(400).json({msg: error})
    }
}

export const updateBorrow = async(req,res)=>{
    try {
        const{name, title, returnDate} = req.body
        const member = await Member.findOne({
            where:{name}
        }) 
        if (!member) return res.status(404).json({msg:"Member Not Found"})
        const book = await Books.findOne({
            where:{title}
        })
        if (!book) return res.status(404).json({msg : "Book Not Found"})
        const borrow = await Borrow.findOne({
            where:{
                memberId : member.id,
                bookId : book.id,
                returnDate : null
            }
        }) 
        if (!borrow) return res.status(404).json({msg : "You not borrow this book"})
        const borrowdb = borrow.borrowedDate
        const date = new Date(returnDate)
        const date2 = new Date(borrowdb)
        const time = date.getTime()
        const time2 = date2.getTime()
        const selisih = (time/(1000 * 60 * 60 *24))-(time2/(1000 * 60 * 60 *24))
        if(selisih > 7){
            await member.update({penalty : true})
            res.status(200).json({msg : "You Get Penalty"})
        }else {
            await member.update({penalty:false})
        } 

        await borrow.destroy();
        await member.decrement('borrowedBook');
        await member.update({returnDatePreviously: returnDate})
        await book.update({stock: true});

        res.status(200).json({msg: "Book Returned"})

    } catch (error) {
        
    }
}

