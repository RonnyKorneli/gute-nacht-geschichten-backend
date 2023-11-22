import express from 'express'
import Story from '../models/Stories.js'
import GenerateUploadUrl from '../s3.js'

//TASKS
//1.Make Logic to give Images/Stories a priority


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

//Generate signed url for frontend to upload image to s3
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

storiesRouter.get('/get-all-stories', async (req, res) => {
    console.log("get stories")
    try {
        const stories = await Story.find()
        res.json(stories)
    } catch (error) {
        console.log(error)
        res.status(500).json({ error: error.message })
    }
})

storiesRouter.get('/get-story/:id', async (req, res) => {
    console.log("get story")
    try {
        const story = await Story.findById(req.params.id)
        res.json(story)
    } catch (error) {
        console.log(error)
        res.status(500).json({ error: error.message })
    }
})



export default storiesRouter