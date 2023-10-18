import { Sequelize } from "sequelize";
import db from "../config/Database.js"; 

const {DataTypes} = Sequelize;

const Member = db.define('member',{
    name : {
        type : DataTypes.STRING,
        allowNull : false,
        validate : {
            notEmpty : true
        }
    },
    borrowedBook : {
        type : DataTypes.INTEGER,
        allowNull : true,
        defaultValue : 0,
        validate : {
            notEmpty : false
        }
    },
    returnDatePreviously : {
        type : DataTypes.DATE,
        allowNull : true,
        validate : {
            notEmpty : false
        }
    },
    penalty : {
        type : DataTypes.BOOLEAN,
        allowNull : true,
        defaultValue : false,
        validate : {
            notEmpty : false
        }
    }
},{
    freezeTableName : true
}); 

export default Member;