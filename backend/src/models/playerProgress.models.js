import mongoose from 'mongoose'

const playerProgressSchema=new mongoose.Schema(
    {
        userId:{
            type:mongoose.Schema.Types.ObjectId,
            ref:'Player'
        },
        levels:{
            type:Number,
            default:0,
        },
        completed:{
            type:Boolean,
            default:false
        }

    },{timestamps:true}
)

export const Progress=mongoose.model('Progress',playerProgressSchema)