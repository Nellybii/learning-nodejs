const mongoose = require('mongoose')
 const userSchema= mongoose.Schema(
    {
        user_id: {
             type: mongoose.Schema.Types.ObjectId,
             required: true,
             ref: 'User'
        },
        username: {
            type: String,
            required: [true, "Please enter a name"]
        },
        email: {
            type: String,
            required: [true, "Please enter a email"],
            unique: [true,  "Email already exists"]
        },
        password: {
            type: String,
            required: [true, "Please add your user password"]
        },
    },
    {
        timestamps: true
    }
 )

 module.exports = mongoose.model('User', userSchema)