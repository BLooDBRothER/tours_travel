const express=require("express");
const app=express();
const userRoutes=require('./routes/user');
const packageRoutes = require("./routes/package");
const imageRoutes=require("./routes/image");
const path=require('path');
const cors=require('cors');


//middleware
app.use(cors());
app.use(express.json());

//routes
app.use('/photos',express.static(path.join(__dirname,"/../uploads")));
app.use('/user',userRoutes);
app.use('/package',packageRoutes);
app.use('/image',imageRoutes);
//server
app.listen(3000,()=>{
    console.log("Server running at port 3000");
})