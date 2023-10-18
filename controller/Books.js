import Books from "../models/BookModel.js";

export const getBook = async(req,res)=>{
    try {
        const response = await Books.findAll({
            where : {stock : true},
            attributes : ['id','title','author','stock']
        })
        res.status(200).json(response);
    } catch (error) {
        res.status(500).json({msg : error});
    }
} 


export const createBook = async(req,res)=>{
    const{title, author, stock} = req.body 
    try {
        await Books.create({
            title : title, 
            author : author,
            stock : stock
        })
        res.status(201).json({msg: "Book Created"})
    } catch (error) {
        res.status(400).json({msg : error})
    }
}


export const deleteBook = async(req,res)=>{
    const book = await Books.findOne({
        where : {
            id : req.params.id,
            stock : true
        }
    })
    if(!book) return res.status(404).json({msg: "Book Not Found / Book borrowed "})
    try {

        await Books.destroy({
            where:{
                id : book.id
            }
        })
        res.status(200).json({msg: "Book Deleted"})
    } catch (error) {
        res.status(400).json({msg: error})
    }
}