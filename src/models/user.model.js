import mongoose,{Schema} from "mongoose";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";

const userSchema = new Schema({
    username:{
        type:String,
        required: true,
        unique:true,
        isLowercase: true,
        trim:true,
        index: true //searching field hesebe use e help kore
    },
    email:{
        type:String,
        required: true,
        unique:true,
        isLowercase: true,
        trim:true
    },
    fullname:{
        type:String,
        required: true,
        trim:true,
        index: true
    },
    avatar:{
        type:String, //cloudinary url debe seta String hesebe store hobe
        required: true
    },
    coverImage:{
        type:String
    },
    watchHistory:[{
        type:Schema.Types.ObjectId,
        ref:"Video"
    }],
    password:{
        type:String,
        required:   [true,'password is required']
    },
    refreshToken:{
        type:String
    }
},{timestamps: true});

userSchema.pre("save",async function(next){
    if(this.isModified("password"))
    {
        this.password = bcrypt.hash(this.password,10); //modified sobsomoy hobe na start e jokon password dibi tokon ar update er somoy password modify hoye thake 
        next();
    }
    else{
        return next();
    }
});

userSchema.methods.isPasswordCorrect = async function(password){
    return await bcrypt.compare(password,this.password);
} //eta checking hoy user ke export korar somoy

//jwt is barer token

userSchema.methods.generateAccessToken = function(){
 return jwt.sign(
    {
        _id:this.id,
        email:this.email,
        username:this.username,
        fullname:this.fullname
    },
    process.env.ACCESS_TOKEN_SECRET,
    {
        expiresIn: process.env.ACCESS_TOKEN_EXPIRY
    }
  )
}


userSchema.methods.generateRefreshToken = function(){
    return jwt.sign(
        {
            _id:this.id
          
        },
        process.env.REFRESH_TOKEN_SECRET,
        {
            expiresIn: process.env.REFRESH_TOKEN_EXPIRY
        }
      )
} 



export const User = mongoose.model("User",userSchema);