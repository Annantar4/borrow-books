import express from "express";
import cors from "cors";
import db from "./config/Database.js";
import MemberRoute from "./route/MemberRoute.js";
import BookRoute from "./route/BookRoute.js";
import BorrowRoute from "./route/BorrowRoute.js"; 
const app = express();
// import swaggerUi from "swagger-ui-express"
// import apidoc from "./apidocs.json" assert {type : "json"}
// app.use('/api-docs', swaggerUi.serve,swaggerUi.setup(apidoc))
import dotenv from "dotenv"
dotenv.config()
// (async()=>{
//     await db.sync();
// })()

app.use(cors({
    Credential : false,
    origin : '*'
}))

app.use(express.json());
app.use(MemberRoute);
app.use(BookRoute);
app.use(BorrowRoute);


app.listen(process.env.SECRET_PORT,()=>{
    console.log('Server Running')
})