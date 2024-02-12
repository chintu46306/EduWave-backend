
import app from './app.js';  // Require app.js
import connectionToDB from './config/dbConnection.js';  // Require connectionToDB from dbConnection.js  
import cloudinary from 'cloudinary';  // Require cloudinary from cloudinary


const PORT = process.env.PORT || 5000;  // Set port

// cloudinary configuration
cloudinary.v2.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,  // Set cloud_name
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET,
  });

app.listen(PORT, async () => {
    await connectionToDB(); // Connect to DB
    console.log(`App is running at https://localhost:${PORT}`);  // Listen on port
});
