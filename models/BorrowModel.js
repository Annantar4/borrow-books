import { Sequelize } from "sequelize";
import db from "../config/Database.js"; 
import Member from "./MemberModel.js";
import Books from "./BookModel.js"; 

const {DataTypes} = Sequelize;

const Borrow = db.define('borrow',{
    memberId : {
        type : DataTypes.INTEGER,
        allowNull : false,
        validate : {
            notEmpty : true
        }
    },
    bookId : {
        type : DataTypes.INTEGER,
        allowNull : false,
        validate : {
            notEmpty : true
        }
    },
    borrowedDate : {
        type : DataTypes.DATE,
        allowNull : false,
        validate : {
            notEmpty : true
        }
    },
    returnDate : {
        type : DataTypes.DATE,
        allowNull : true,
        validate : {
            notEmpty : false
        }
    }
},{
    freezeTableName : true
}); 
Member.hasMany(Borrow);
Borrow.belongsTo(Member,{foreignKey:"memberId"});
Books.hasOne(Borrow);
Borrow.belongsTo(Books,{foreignKey:"bookId"});

export default Borrow;