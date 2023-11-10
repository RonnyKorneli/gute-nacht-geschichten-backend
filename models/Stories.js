import mongoose from "mongoose"

const { Schema, model } = mongoose

const required = true
const timestamps = true

const StorySchema = new Schema({
    title: { type: String, required },
    author:{ type: String, required },
    body: { type: String, required },
    readTime: { type: Number, required },
    recomendedAge: { type: Number, required },
    rating: { type: Number},
}, { timestamps })

const Story = model("Story", StorySchema)
export default Story