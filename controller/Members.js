import Member from "../models/MemberModel.js";

export const getMember = async(req,res)=>{
    try {
        const response = await Member.findAll({
            attributes : ['id','name','borrowedBook','returnDatePreviously','penalty']
        })
        res.status(200).json(response);
    } catch (error) {
        res.status(500).json({msg : error});
    }
} 



export const createMember = async(req,res)=>{
    const{name} = req.body 
    try {
        await Member.create({
            name : name
        })
        res.status(201).json({msg: "Member Created"})
    } catch (error) {
        res.status(400).json({msg : error})
    }
}



export const deleteMember = async(req,res)=>{
    const member = await Member.findOne({
        where : {
            id : req.params.id,
            borrowedBook : 0
        }
    })
    if(!member) return res.status(404).json({msg: "Member Not Found / Please return Book first"})
    try {

        await Member.destroy({
            where:{
                id : member.id
            }
        })
        res.status(200).json({msg: "Member Deleted"})
    } catch (error) {
        res.status(400).json({msg: error})
    }
}