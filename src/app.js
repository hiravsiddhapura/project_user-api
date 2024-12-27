const express = require('express')
const dotenv = require("dotenv");
const app = express()
const user = require("../src/routes/userRoute")
require("../src/db/conn")
dotenv.config({ path: ".env", });
const port = process.env.PORT || 8000
app.use(express.json())
app.use(user)


app.listen(port, () => {
    console.log(`app listening on port ${port}!`)
})