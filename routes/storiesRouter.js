import express from 'express'
import Story from '../models/Stories.js'


const storiesRouter = express.Router();

storiesRouter.post('/create', async (req, res) => {

     try {
        const story = await Story.create(req.body)
        res.json(story)
    } catch (error) {
        console.log(error)
        res.status(500).json({ error: error.message })
    }
})

export default storiesRouter