import {asyncHandler} from "../utils/asyncHandler.js";
import apiError from "../utils/apiError.js";
import {Player} from "../models/playerSchema.models.js";
import apiResponse from "../utils/apiResponse.js";
import { Progress } from "../models/playerProgress.models.js";

const registerUser = asyncHandler(async (req, res) => {


    const {username, email, password} = req.body
    console.log(username, email, password);

    if(!username || !email || !password){
        throw new apiError(400, "Please Provide All Fields")
    }

    const userExists = await Player.findOne({
        $or:[{username}, {email}]
    })

    if(userExists){
        throw new apiError(409, "User Already Exists")
    }
    const user = await Player.create(
        {
            username,
            email,
            password
        }
    )
    await Progress.create(
        {
            userId : user._id,
            levels : 0,
            completed : false
        }
    )
    
    const createdUser = await Player.findById(user._id).select("-password");

    if(!createdUser){
        throw new apiError(500, "User Not Created")
    }

    return res.status(201).json(
        new apiResponse(createdUser, 201, "User Created")
    )
})

export {registerUser}