
import app from './app.js';  // Require app.js
import connectionToDB from './config/dbConnection.js';

const PORT = process.env.PORT || 5000;  // Set port
app.listen(PORT, async () => {
    await connectionToDB(); // Connect to DB
    console.log(`App is running at http:localhost:${PORT}`);  // Listen on port
});
