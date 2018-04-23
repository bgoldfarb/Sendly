const mongoose = require('mongoose')
const { Schema } = mongoose //Schema = mongoose.Schema, destructuring 

//Schema will describe what every record will look like
//Can freely add or remove properties
const userSchema = new Schema({
    googleId: String
})

//Creating a new collection in mongoDB called users, will not overwrite existing collections
mongoose.model('users', userSchema)