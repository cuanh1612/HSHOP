const mongoose = require('mongoose')
const dotenv = require('dotenv')

dotenv.config()

const connectDatabase = () =>{
    mongoose.connect(process.env.DB_LOCAL_URI, 
        {
            useNewUrlParser: true,
        }
    )
    .then(doc=>{console.log('success');})
    .catch(err=>{console.log("error")})
}

module.exports = connectDatabase
