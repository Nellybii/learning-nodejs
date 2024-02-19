const express = require('express');
const errorHandler = require('./middleware/errorHandler');
const connectDb = require('./config/dbconnection');
const dotenv = require('dotenv').config();
const userRoutes = require('./routes/userRoutes');

connectDb()
const app = express();

const port = process.env.PORT || 5000; 

app.use(express.json());
app.use("/api/contacts", require("./routes/contactsRoutes"))
app.use("/api/users", require("./routes/userRoutes.js"))
app.use(errorHandler)

app.listen(port, ()=>{
    console.log(`Server is running on port ${port}`);
});