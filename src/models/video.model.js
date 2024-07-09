import mongoose,{Schema} from "mongoose"
import mongooseAggregatePagiante from "mongoose-aggregate-paginate-v2";

const videoSchema = new Schema({
    videoFile:{
        type:String, //cloudinary theke url ese store hobe
        required:true
    },
    thumbnail:{
        type:String, //cloudinary theke url ese store hobe
        required:true
    },
    title:{
        type:String,
        required: true
    },
    description:{
        type:String,
        required: true
    },
    duration:{
        type:Number, //cloudinary theke url ese store hobe
        required: true
    },
    views:{
        type:Number,
        default: 0
    },
    isPublished:{
        type: Boolean,
        default:true
    },
    owner:{
        type: Schema.Types.ObjectId,
        ref:"User"
    }
},{timestamps:true});

videoSchema.plugin(mongooseAggregatePagiante);

export const Video = mongoose.model("Video",videoSchema);