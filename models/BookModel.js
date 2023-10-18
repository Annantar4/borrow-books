import { Sequelize } from "sequelize";
import db from "../config/Database.js"; 

const {DataTypes} = Sequelize;

const Books = db.define('books',{
    title : {
        type : DataTypes.STRING,
        allowNull : false,
        validate : {
            notEmpty : true
        }
    },
    author : {
        type : DataTypes.STRING,
        allowNull : false,
        validate : {
            notEmpty : true
        }
    },
    stock : {
        type : DataTypes.BOOLEAN,
        allowNull : false,
        validate : {
            notEmpty : true
        }
    }
},{
    freezeTableName : true
}); 

export default Books;