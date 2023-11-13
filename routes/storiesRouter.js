import express from 'express'
import Story from '../models/Stories.js'
import GenerateUploadUrl from '../s3.js'


const storiesRouter = express.Router();

storiesRouter.post('/create', async (req, res) => {
    console.log(req.body, "req.body")
     try {
        const story = await Story.create(req.body)
        res.json(story)
    } catch (error) {
        console.log(error)
        res.status(500).json({ error: error.message })
    }
})

//Generate signed url
storiesRouter.get('/s3Url', async (req, res) => {
    console.log("s3Url");
    try {
        const url = await GenerateUploadUrl();
        res.send({ url });
      } catch (error) {
        console.error("Error generating S3 URL:", error);
        res.status(500).send({ error: "Internal Server Errorrrrrr" });
      }
})




export default storiesRouter