const express = require("express");
const { connect } = require("./config/db.config");
const app = express();
app.use(express.json());

require("dotenv").config();
const PORT = process.env.PORT;

const authRoutes = require("./routes/auth.routes");
app.use("/auth", authRoutes);

const boardRouter = require("./routes/board.routes");
app.use("/board", boardRouter);

app.listen(PORT, (err) => { 
    if (err) throw new Error(err);
    console.log(`Server is listining on port ${PORT}`);
    connect();
});