require("dotenv").config()
const express = require("express")
const app = express()


// User authentication
const authentication = require("./middleware/authentication")

// Routes
const authRouter = require("./routes/users")

// Middleware


// Error Handler
const notFound = require("./middleware/not-found")
const errorHandler = require("./middleware/error-handler")

app.get("/", (req, res)=> {
    res.send("Home")
})

app.use(express.json())
app.use("/api/v1/auth", authRouter)

app.use(notFound)
app.use(errorHandler)

//MongoDB connect
const connectDB = require("./db/connect")
const errorHandlers = require("./middleware/error-handler")

const port = process.env.PORT || 5000;
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