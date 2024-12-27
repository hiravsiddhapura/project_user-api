const mongoose = require('mongoose')
const dotenv = require("dotenv");
dotenv.config({ path: ".env", });
mongoose.connect(`${process.env.MONGODB_URL}`)
    .then(() => console.log('Database Connection is Successful'))
    .catch((err) => console.log('No Connection'));
