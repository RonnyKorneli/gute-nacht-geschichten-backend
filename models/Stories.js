import mongoose from "mongoose"

const { Schema, model } = mongoose

const required = true
const timestamps = true

const StorySchema = new Schema({
    title: { type: String, required },
    author:{ type: String, required },
    introduction: { type: String, required },
    body: { 
        mainStoryPartOne:{ type: String, required },
        mainStoryPartTwo:{ type: String, required },
        mainStoryPartThree:{ type: String, required },
     },
    readTime: { type: Number, required },
    recomendedAge: { type: Number, required },
    rating: { type: Number},
    imageUrl: { type: String, required},
    secondImageUrl: { type: String},
    thirdImageUrl: { type: String},
    youtubeUrl: { type: String},
    priority: { type: Number },
}, { timestamps })

const Story = model("Story", StorySchema)
export default Story








