import express from "express";
import {PORT, mongoDBURL} from "./config.js";
import mongoose from "mongoose";
import userRoute from './routes/userRoute.js';
import mediaContentRoute from './routes/mediaContentRoute.js';
import cors from 'cors';

const app = express();

app.use(express.json());

app.use(cors());

app.get('/', (req, res) => {
    console.log(req);
    return res.status(234).send('Welcome to MERN');
});

app.use('/mediaContents', mediaContentRoute);
app.use('/users', userRoute);

mongoose
    .connect(mongoDBURL)
    .then(() => {
        console.log('Connected to MongoDB');
        app.listen(PORT, () => {
            console.log(`listening on port ${PORT}`);
        });
    })
    .catch((err) => {
        console.log(err);    
    });
