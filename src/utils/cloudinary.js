import {v2 as cloudinary} from "cloudinary";

import fs from "fs";

    // Configuration
    cloudinary.config({ 
        cloud_name: process.env.CLOUDINARY_CLOUD_NAME, 
        api_key: process.env.CLOUDINARY_API_KEY, 
        api_secret: process.env.CLOUDINARY_API_SECRET // Click 'View Credentials' below to copy your API secret
    });
    
  const uploadOnCloudinary = async (localFilePath) => {
    try
    {
        if(!localFilePath){
            return null;
        }
        //upload file on cloudinary
        const response = await cloudinary.v2.uploader.upload(localFilePath,{
            resourceType: "auto"
        })
        //file has been uploaded sucessfully
        console.log("file has been uploaded successfully",response.url);
        return response;
    }
    catch(error){
        fs.unlinkSync(localFilePath) //remove the locally saved temporary
        //file as the upload operation got failed

        return null;
    }
  }

export {uploadOnCloudinary}
    
 