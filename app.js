require("dotenv").config()
const express = require("express")
const app = express()
const port = process.env.PORT || 5000;

app.use("/", (req, res)=> {
    res.send("Home")
})


const start = async () => {
    try {
        app.listen(port, () => {
            console.log(`listening to ${port}`);
    });
    } catch(error) {
        console.log(error)
    }
}


start()

// TODO: connect mongoose, start buildng models, building routes.


