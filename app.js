require("dotenv").config()
const connectDB = require("./db/connections")
const express = require("express")
const app = express()
const authRouter = require("./routes/users")
const port = process.env.PORT || 5000;

app.get("/", (req, res)=> {
    res.send("Home")
})

app.use(express.json())
app.use("/api/v1/auth", authRouter)

const start = async () => {
    try {
        await connectDB(process.env.MONGO_URI)
        app.listen(port, () => {
            console.log(`listening to port ${port}`);
    });
    } catch(error) {
        console.log(error)
    }
}

start()