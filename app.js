require("dotenv").config();
const express = require("express");
const app = express();
const userRouter = require("./api/users/user.router");
const elderRouter = require("./api/elders/elder.router");

const agentRouter = require("./api/agent/agent.routers");
const gramaDivisionRouters = require("./api/grama-division/grama-division.routers");

app.use(express.json());

app.use("/api/users", userRouter);
app.use("/api/elders", elderRouter);

app.use("/api/agent", agentRouter);
app.use("/api/gramadivision", gramaDivisionRouters);

/*
app.get("/api" , (req , res) => {
  res.json({
    success: 1 ,
    message: "This api is working"
  });
});  
*/
app.listen(process.env.APP_PORT, () => {
  console.log("Server up and running " + process.env.APP_PORT);
});
