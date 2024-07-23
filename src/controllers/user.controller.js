import {asyncHandler} from "../utils/asyncHandler.js";
import {ApiError} from "../utils/ApiError.js";
import {User} from "../models/user.model.js";
import { uploadOnCloudinary} from "../utils/cloudinary.js";
import { ApiResponse} from "../utils/ApiResponse.js";

const registerUser = asyncHandler(async (req,res) =>{
   //get user details from frontend
   //validation - not empty
   //check if the user is already exists: username or email
   //check for images and avatar
   //upload them cloudnary,avatar
   // create user object - create entry in db
   //remove password and refresh token field from response
   //check for user creation successfully or not
   //return response

   const {fullname,email,username,password} = req.body;
   console.log("email: ",email);

   //if(fullname === ""){
      //throw new ApiError(400,"Full name is required");
  // }

  //user validation
   if(
      [fullname,email,username,password].some((field) => 
         field?.trim() === ""
      )
   ){
       throw new ApiError(400,"Full name is required");
   }

   //username,email exist ache naki check korar jonno
   const existedUser = User.findOne({
      $or: [{username},{email}]
   });
   console.log(existedUser)

   if(existedUser){
      throw new ApiError(409,"User with email or username already exist");
   }

   //images handling
   const avatarLocalPath = req.files?.avatar[0]?.path;

   const coverImageLocalPath = req.files?.coverImage[0]?.path;

   if(!avatarLocalPath)
   {
      throw new ApiError(400,"avatar file is required");  
   }

   //upload on cloudinary
   const avatar = await uploadOnCloudinary(avatarLocalPath);

   const coverImage = await uploadOnCloudinary(coverImageLocalPath);

   if(!avatar){
      throw new ApiError(400,"avatar file is required");  
   }

   //user object creation
   const user = await User.create({
      fullname,
      avatar:avatar.url,
      coverImage: coverImage?.url || "",
      password,
      email,
      username:username.toLowerCase()
   })
   //je field mana ache
   const createdUser = await User.findById(user._id).select(
      "-password -refreshToken"
   )

   if(!createdUser){
      throw new ApiError(500,"something went wrong when registering the user");  
   }

   //return response
   return res.status(201).json(
      new ApiResponse(200,createdUser,"user registered successfully")
   )
});
export {registerUser};