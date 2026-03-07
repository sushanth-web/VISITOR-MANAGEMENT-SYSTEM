const express =require('express')
const mongoose =require('mongoose')
const app =express()
const cors =require('cors')
const bodyParser = require('body-parser')
require('dotenv').config()
const path = require("path");
const admin_route=require("./routes/AdminRoute.js");
const visitor_route=require("./routes/VisitorRoute.js");
const employee_route=require("./routes/EmployeeRoute.js");
const frontdesk_route=require("./routes/FrontdeskRoute.js");
const preregister_route=require("./routes/PreregisterRoute.js");

app.use(cors())
app.use(express.json());
app.use(bodyParser.urlencoded({extended:false}))
app.use(bodyParser.json())

app.use("/api/admin", admin_route);

app.use("/uploads",express.static(path.join(process.cwd(),"uploads")));

app.use("/api/register/visitor", visitor_route);
app.use("/api/get/visitors/details", visitor_route);
app.use("/api/update/visitors/details",visitor_route)
app.use("/api/delete/visitors/details",visitor_route)

app.use("/api/register/preregister", preregister_route)
app.use("/api/get/preregister/details",preregister_route)
app.use("/api/update/preregister/details",preregister_route)
app.use("/api/delete/preregister/details",preregister_route)

app.use("/api/register/employee", employee_route)
app.use("/api/get/employees/details",employee_route);
app.use("/api/update/employees/details", employee_route);
app.use("/api/delete/employees/details", employee_route);

app.use("/api/check/in/out", frontdesk_route);
app.use("/api/get/all/check/in/out/details", frontdesk_route);
app.use("/api/get/check/in/out/details", frontdesk_route)
app.use("/api/get/check/in/out",frontdesk_route)
app.use("/api/update/check/in/out/details",frontdesk_route);
app.use("/api/delete/check/in/out/details",frontdesk_route);

async function startServer(){
  try {
    // connect MongoDb swrver
    await mongoose.connect(process.env.MONGODB_URI);
    console.log('.........MongoDB Connected Successfully.........');
    // start server when Db connects
    app.listen(process.env.PORT, () => {
      console.log(`Server is running on port ${process.env.PORT}`);
    });
} catch(error){
  console.error('MongoDB connection failed ❌',error);
  }
}
startServer();

