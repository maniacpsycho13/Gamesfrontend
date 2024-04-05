import { Progress } from "../models/playerProgress.models.js";
import { Player } from "../models/playerSchema.models.js";
import { asyncHandler } from "../utils/asyncHandler.js";


export const progressUser= asyncHandler(async (req, res) => {
    const {username , levels}=req.body

    const user = await Player.findOne({username})
    if(!user){
        throw new apiError(404, "User Not Found")
    }
    console.log(user);
    
    await Progress.updateOne({userId : user._id}, {$set : {levels}})
    
    res.status(200).send("Progress Updated")
    
})
