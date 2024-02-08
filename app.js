import express from 'express';  // Require express
import cors from'cors';  // Require cors
import cookieParser from'cookie-parser';  // Require cookie-parser
import { config } from 'dotenv';  // Require dotenv
import morgan from 'morgan';  // Require morgan
import userRoutes from './routes/user.routes.js';  // Require userRoutes
config();  // Configure dotenv


const app = express();  // Create express app

app.use(express.json());  // Use express.json()

app.use(cors({              // Use cors
    origin: [process.env.FRONTEND_URL],
    credentials: true,
}));   


app.use(cookieParser());  // Use cookieParser

app.use(morgan('dev'));  // Use morgan

app.use('/ping', function(req, res){
    res.send('Pong');
});

// routes of 3 models
app.use('/api/v1/user', userRoutes)

app.all('*', (req, res) => {              // this is use when we search wrong url then it will show 404 page not found
    res.status(404).send('OOPS!! 404 page not found');
});


export  default app;  // Export app