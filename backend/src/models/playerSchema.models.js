import mongoose from "mongoose";
import bcrypt from "bcrypt"

const playerSchema =new mongoose.Schema(
    
    {
        username : {
            type : String,
            required : [true, "Username Field is empty !!"],
            unique : true ,
        },
        email : {
            type : String ,
            required : [true , "Email not found"],
            unique : true ,
        },
        password : {
            type : String ,
            required : [true , "Password not found"],
        }

    },{
        timestamps : true
    }
)

playerSchema.pre("save", async function (next) {
    if(!this.isModified("password")) return next();

    this.password = await bcrypt.hash(this.password, 10)
    next()
})

playerSchema.methods.isPasswordCorrect = async function(password){
    return await bcrypt.compare(password, this.password)
}


export const Player = mongoose.model("Player",playerSchema);