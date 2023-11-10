import express from 'express';
import cors from 'cors';
import storiesRouter from './routes/storiesRouter.js';
import dotenv from 'dotenv';
import { connectDb } from "./lib/db.js";


const app = express()
dotenv.config();
app.use(cors());
app.use(express.json());
connectDb();

//const port = 2000

//routes
app.use('/api/stories', storiesRouter);

app.get('/', (req, res) => {
  res.send('Backend!')
})



const port = process.env.PORT || 2000;
app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})
